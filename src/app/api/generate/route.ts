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

const PROMPT = `Generate 5 unique and creative date ideas for {city}. Each idea should be suitable for the local area, considering culture, weather, and available attractions. Format the response as a JSON array of objects with these exact properties:
- title: A catchy, brief title (max 50 chars)
- description: A clear, engaging description (max 500 chars)
- estimatedCost: Cost range in USD (e.g., "$30-50")
- icon: A single emoji representing the activity

Return only valid JSON without any additional text. Format example:
{
  "ideas": [
    {
      "title": "Adventure at Whitewater Center",
      "description": "Experience outdoor fun at the U.S. National Whitewater Center. Go kayaking, zip-lining, or enjoy live music and craft beers by the river.",
      "estimatedCost": "$30-60",
      "icon": "🚣"
    },
  ]
}`;

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
    
    const result = await model.generateContent(PROMPT.replace('{city}', city));
    const response = result.response.text();
    
    const parsedResponse = JSON.parse(response);
    const dateIdeas: DateIdea[] = parsedResponse.ideas;

    await redis.setex(cacheKey, ONE_YEAR_IN_SECONDS, dateIdeas);

    return NextResponse.json({ success: true, data: dateIdeas });
  } catch (error) {
    console.error('Error generating date ideas:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate date ideas' },
      { status: 500 }
    );
  }
}