import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { DateIdea } from '@/types';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

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

    const mockIdeas: DateIdea[] = [
      {
        title: "Sunset Picnic at Central Park",
        description: "Pack a romantic basket and enjoy the golden hour views",
        estimatedCost: "$30-50",
        icon: "🌅"
      },
      {
        title: "Local Art Gallery Tour",
        description: "Explore contemporary exhibits and discuss art together",
        estimatedCost: "$0-20",
        icon: "🎨"
      },
      {
        title: "Cooking Class Adventure",
        description: "Learn to make authentic local cuisine together",
        estimatedCost: "$60-100",
        icon: "👩‍🍳"
      },
      {
        title: "Rooftop Cinema Night",
        description: "Watch a classic film under the stars",
        estimatedCost: "$40-60",
        icon: "🎬"
      },
      {
        title: "Food Truck Festival",
        description: "Sample different cuisines and enjoy live music",
        estimatedCost: "$25-45",
        icon: "🚚"
      }
    ];

    await redis.setex(cacheKey, ONE_YEAR_IN_SECONDS, mockIdeas);

    return NextResponse.json({ success: true, data: mockIdeas });
    
  } catch (error) {
    console.error('Error generating date ideas:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate date ideas' },
      { status: 500 }
    );
  }
}