import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Date Idea';
    const city = searchParams.get('city') || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #fce7f3 0%, #fecdd3 50%, #fda4af 100%)',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '60px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              maxWidth: '900px',
              border: '4px solid #be123c',
            }}
          >
            {/* Brand */}
            <div
              style={{
                display: 'flex',
                fontSize: '56px',
                fontWeight: 'bold',
                color: '#be123c',
                letterSpacing: '-0.02em',
                marginBottom: '30px',
              }}
            >
              DateDash
            </div>

            {/* City */}
            {city && (
              <div
                style={{
                  fontSize: '32px',
                  color: '#e11d48',
                  marginBottom: '24px',
                  fontWeight: '600',
                  display: 'flex',
                }}
              >
                {city}
              </div>
            )}

            {/* Title */}
            <div
              style={{
                fontSize: title.length > 50 ? '44px' : '56px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                textAlign: 'center',
                lineHeight: 1.3,
                maxWidth: '800px',
                display: 'flex',
              }}
            >
              {title}
            </div>

            {/* Tagline */}
            <div
              style={{
                marginTop: '30px',
                fontSize: '28px',
                color: '#666',
                fontStyle: 'italic',
                display: 'flex',
              }}
            >
              Your next adventure awaits
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Failed to generate OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
