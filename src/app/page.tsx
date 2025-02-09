'use client';

import { useState } from 'react';
import { CityInput } from '@/components/CityInput';
import { DateIdeaCard } from '@/components/DateIdeaCard';
import { DateIdea } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>([]);

  const handleCitySubmit = async (city: string) => {
    setIsLoading(true);
    setError(undefined);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate date ideas');
      }

      if (result.success && result.data) {
        setDateIdeas(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setDateIdeas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const topPaddingClass = dateIdeas.length > 0 
    ? "mt-0 mb-32 md:mb-40"
    : "mt-0 mb-40 md:mb-48";

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`flex-1 flex flex-col items-center justify-center ${topPaddingClass}`}>
        <div className="w-full max-w-4xl px-4 pt-16 flex flex-col items-center">          
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              DateDash
            </h1>
            <p className="text-base md:text-lg text-foreground">
              Quick and easy date ideas on the go.
            </p>
          </div>
          
          <div className="w-full max-w-md px-4">
            <CityInput 
              onSubmit={handleCitySubmit}
              error={error}
              isLoading={isLoading}
            />
          </div>

          {isLoading && (
            <div className="mt-8 w-full max-w-md px-4">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          )}

          {!isLoading && dateIdeas.length > 0 && (
            <div className="mt-8 w-full max-w-md px-12">
              <Carousel>
                <CarouselContent>
                  {dateIdeas.map((idea, index) => (
                    <CarouselItem key={index}>
                      <DateIdeaCard
                        idea={idea}
                        onLove={() => console.log('Loved:', idea.title)}
                        onShare={() => console.log('Shared:', idea.title)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}