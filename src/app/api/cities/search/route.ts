import { NextResponse } from 'next/server';
import { CITIES } from '@/data/cities';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase().trim();

    console.log('Search query:', query); // Debug log
    console.log('First few cities:', CITIES.slice(0, 3)); // Debug log

    if (!query || query.length < 2) {
      return NextResponse.json({ cities: [] });
    }

    const matches = [];
    for (let i = 0; i < CITIES.length && matches.length < 10; i++) {
      const city = CITIES[i].toLowerCase();
      
      console.log('Checking city:', city); // Debug log
      
      // Since it's sorted, we can break once we've moved past potential matches
      if (city > query && !city.startsWith(query)) {
        console.log('Breaking at:', city); // Debug log
        break;
      }
      
      if (city.startsWith(query)) {
        console.log('Found match:', CITIES[i]); // Debug log
        matches.push({
          id: matches.length,
          value: CITIES[i]
        });
      }
    }

    console.log('Matches found:', matches.length); // Debug log
    return NextResponse.json({ cities: matches });
  } catch (error) {
    console.error('City search error:', error);
    return NextResponse.json(
      { error: 'Failed to search cities' },
      { status: 500 }
    );
  }
}