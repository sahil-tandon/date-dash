import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import clientPromise from '@/lib/db/mongodb';
import { DateIdea, AIResponse, AIDateIdea } from '@/lib/db/types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const maxDuration = 30;

const PROMPT = `Generate 10 unique and creative date ideas for {city}. Format as JSON array with properties: title (max 50 chars), description (max 150 chars), estimatedCost (local and USD e.g. £30-50 ($38-63 USD)), icon (single emoji). Return only valid JSON like: {"ideas":[{"title":"Sample Date","description":"Sample description","estimatedCost":"£30-50 ($38-63 USD)","icon":"🎸"}]}`;

export async function POST(req: Request) {
  try {
    const { city } = await req.json();
    console.log('[generate] Request for city:', city);

    if (!city || typeof city !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid city name' },
        { status: 400 }
      );
    }

    console.log('[generate] Connecting to MongoDB...');
    console.log('[generate] MONGODB_URI set:', !!process.env.MONGODB_URI);
    console.log('[generate] MONGODB_DB set:', !!process.env.MONGODB_DB);
    const client = await clientPromise;
    console.log('[generate] MongoDB connected');

    const db = client.db(process.env.MONGODB_DB);
    const dateIdeas = db.collection<DateIdea>('dateIdeas');

    console.log('[generate] Querying for existing ideas...');
    const existingIdeas = await dateIdeas
      .find({ city: { $regex: new RegExp('^' + city + '$', 'i') } })
      .toArray();
    console.log('[generate] Found', existingIdeas.length, 'existing ideas');

    if (existingIdeas.length > 0) {
      return NextResponse.json({ success: true, data: existingIdeas });
    }

    console.log('[generate] No cached ideas, calling Gemini API...');
    console.log('[generate] GOOGLE_API_KEY set:', !!process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const result = await model.generateContent(PROMPT.replace('{city}', city));
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
      city,
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