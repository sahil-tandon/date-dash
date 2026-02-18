import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import clientPromise from '@/lib/db/mongodb';
import { DateIdea, AIResponse, AIDateIdea } from '@/lib/db/types';
import { checkRateLimit } from '@/lib/rateLimit';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const maxDuration = 30;

const CITY_MAX_LENGTH = 100;
const CITY_PATTERN = /^[\p{L}\p{M}\s\-'.,()\u0600-\u06FF]+$/u;

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const PROMPT = `Generate 10 unique and creative date ideas for {city}. Format as JSON array with properties: title (max 50 chars), description (max 150 chars), estimatedCost (local and USD e.g. £30-50 ($38-63 USD)), icon (single emoji). Return only valid JSON like: {"ideas":[{"title":"Sample Date","description":"Sample description","estimatedCost":"£30-50 ($38-63 USD)","icon":"🎸"}]}`;

export async function POST(req: Request) {
  try {
    // --- Rate limiting ---
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
    const limit = await checkRateLimit(ip);

    if (!limit.allowed) {
      const retryAfter = Math.ceil(limit.retryAfterMs / 1000);
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } },
      );
    }

    // --- Input validation ---
    const { city } = await req.json();
    console.log('[generate] Request for city:', city);

    if (!city || typeof city !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid city name' },
        { status: 400 }
      );
    }

    const trimmedCity = city.trim();

    if (trimmedCity.length === 0 || trimmedCity.length > CITY_MAX_LENGTH) {
      return NextResponse.json(
        { success: false, error: 'City name must be between 1 and 100 characters' },
        { status: 400 }
      );
    }

    if (!CITY_PATTERN.test(trimmedCity)) {
      return NextResponse.json(
        { success: false, error: 'City name contains invalid characters' },
        { status: 400 }
      );
    }

    console.log('[generate] Connecting to MongoDB...');
    const client = await clientPromise;
    console.log('[generate] MongoDB connected');

    const db = client.db(process.env.MONGODB_DB);
    const dateIdeas = db.collection<DateIdea>('dateIdeas');

    // Escape special regex chars to prevent ReDoS
    const escapedCity = escapeRegExp(trimmedCity);
    console.log('[generate] Querying for existing ideas...');
    const existingIdeas = await dateIdeas
      .find({ city: { $regex: new RegExp('^' + escapedCity + '$', 'i') } })
      .toArray();
    console.log('[generate] Found', existingIdeas.length, 'existing ideas');

    if (existingIdeas.length > 0) {
      return NextResponse.json({ success: true, data: existingIdeas });
    }

    console.log('[generate] No cached ideas, calling Gemini API...');
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const result = await model.generateContent(PROMPT.replace('{city}', trimmedCity));
    console.log('[generate] Gemini API responded');
    const response = result.response.text();
    console.log('[generate] Response text length:', response?.length);

    if (!response) {
      throw new Error('Empty response from Gemini API');
    }

    // Strip markdown code fences if present (e.g. ```json ... ```)
    const cleanedResponse = response.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');

    let parsedResponse: AIResponse;
    try {
      parsedResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('[generate] JSON Parse Error:', { error: parseError, response });
      throw new Error('Invalid JSON response from AI');
    }

    if (!parsedResponse.ideas || !Array.isArray(parsedResponse.ideas)) {
      console.error('[generate] Invalid response structure:', parsedResponse);
      throw new Error('Invalid response structure from AI');
    }

    console.log('[generate] Parsed', parsedResponse.ideas.length, 'ideas, saving to MongoDB...');
    const newIdeas: DateIdea[] = parsedResponse.ideas.map((idea: AIDateIdea) => ({
      ...idea,
      city: trimmedCity,
      likeCount: 0,
      createdAt: new Date()
    }));

    await dateIdeas.insertMany(newIdeas);
    console.log('[generate] Saved to MongoDB successfully');

    return NextResponse.json({ success: true, data: newIdeas });
  } catch (error) {
    console.error('[generate] ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate or retrieve date ideas. Please try again.'
      },
      { status: 500 }
    );
  }
}
