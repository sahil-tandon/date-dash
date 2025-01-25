import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { DateIdea } from '@/types';

const redis = new Redis({
  url: `${process.env.UPSTASH_REDIS_REST_URL}`,
  token: `${process.env.UPSTASH_REDIS_REST_TOKEN}`,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

const PROMPT = `Generate 5 unique and creative date ideas for {city}. Format as JSON array with properties: title (max 50 chars), description (max 150 chars), estimatedCost (e.g. "$30-50"), icon (single emoji). Return only valid JSON like: {"ideas":[{"title":"Sample Date","description":"Sample description","estimatedCost":"$30-50","icon":"🎸"}]}`;

export async function POST(req: Request) {
  try {
    const { city } = await req.json();

    if (!city || typeof city !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid city name' },
        { status: 400 }
      );
    }

    const cacheKey = `date-ideas:${city.toLowerCase()}`;
    const cachedIdeas = await redis.get<DateIdea[]>(cacheKey);
    
    if (cachedIdeas) {
      return NextResponse.json({ success: true, data: cachedIdeas });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    try {
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

      const dateIdeas: DateIdea[] = parsedResponse.ideas;

      const isValidIdea = (idea: DateIdea): idea is DateIdea => {
        return (
          typeof idea.title === 'string' &&
          typeof idea.description === 'string' &&
          typeof idea.estimatedCost === 'string' &&
          typeof idea.icon === 'string'
        );
      };

      if (!dateIdeas.every(isValidIdea)) {
        throw new Error('Invalid date idea structure in response');
      }

      await redis.setex(cacheKey, ONE_YEAR_IN_SECONDS, dateIdeas);

      return NextResponse.json({ success: true, data: dateIdeas });
    } catch (aiError) {
      console.error('AI Generation Error:', aiError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to generate date ideas. Please try again.' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('General Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}