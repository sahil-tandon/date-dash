import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import clientPromise from '@/lib/db/mongodb';
import { DateIdea } from '@/lib/db/types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const PROMPT = `Generate 10 unique and creative date ideas for {city}. Format as JSON array with properties: title (max 50 chars), description (max 150 chars), estimatedCost (e.g. "$30-50"), icon (single emoji). Return only valid JSON like: {"ideas":[{"title":"Sample Date","description":"Sample description","estimatedCost":"$30-50","icon":"🎸"}]}`;

export async function POST(req: Request) {
  try {
    const { city } = await req.json();

    if (!city || typeof city !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid city name' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const dateIdeas = db.collection<DateIdea>('dateIdeas');

    const existingIdeas = await dateIdeas
      .find({ city: { $regex: new RegExp('^' + city + '$', 'i') } })
      .toArray();

    if (existingIdeas.length > 0) {
      return NextResponse.json({ success: true, data: existingIdeas });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(PROMPT.replace('{city}', city));
    const response = result.response.text();
    
    if (!response) {
      throw new Error('Empty response from Gemini API');
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (parseError) {
      console.error('JSON Parse Error:', { error: parseError, response });
      throw new Error('Invalid JSON response from AI');
    }

    if (!parsedResponse.ideas || !Array.isArray(parsedResponse.ideas)) {
      throw new Error('Invalid response structure from AI');
    }

    const newIdeas = parsedResponse.ideas.map((idea: any) => ({
      ...idea,
      city,
      likeCount: 0,
      createdAt: new Date()
    }));

    await dateIdeas.insertMany(newIdeas);

    return NextResponse.json({ success: true, data: newIdeas });
  } catch (error) {
    console.error('Generation Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate or retrieve date ideas. Please try again.' 
      },
      { status: 500 }
    );
  }
}