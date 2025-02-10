import { NextResponse } from 'next/server';
import { CITIES } from '@/data/cities';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase().trim();

    if (!query) {
      return NextResponse.json({ cities: [] });
    }

    const matches = [];
    for (let i = 0; i < CITIES.length && matches.length < 10; i++) {
      const city = CITIES[i].toLowerCase();
      
      if (city > query && !city.startsWith(query)) {
        break;
      }
      
      if (city.startsWith(query)) {
        matches.push({
          id: matches.length,
          value: CITIES[i]
        });
      }
    }

    return NextResponse.json({ cities: matches });
  } catch (error) {
    console.error('City search error:', error);
    return NextResponse.json(
      { error: 'Failed to search cities' },
      { status: 500 }
    );
  }
}