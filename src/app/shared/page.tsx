"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DateIdea } from '@/types';
import { DateIdeaCard } from '@/components/DateIdeaCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SharedDateIdea() {
  const searchParams = useSearchParams();
  const [sharedIdea, setSharedIdea] = useState<DateIdea | null>(null);
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    const idea: DateIdea = {
      title: searchParams.get('title') || '',
      description: searchParams.get('description') || '',
      estimatedCost: searchParams.get('cost') || '',
      icon: searchParams.get('icon') || '💝'
    };
    
    setSharedIdea(idea);
    setCity(searchParams.get('city') || '');
  }, [searchParams]);

  if (!sharedIdea || !city) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-xl text-primary/90 font-pompiere mb-4">
          Oops! This shared date idea link seems to be invalid.
        </p>
        <Link href="/">
          <Button className="font-pompiere text-lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Date Ideas
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-normal tracking-wide text-primary font-barrio">
            SHARED DATE IDEA
          </h1>
          <p className="text-xl text-primary/90 font-oooh-baby">
            A romantic suggestion for {city}...
          </p>
        </div>

        <DateIdeaCard 
          idea={sharedIdea}
          city={city}
          onLove={() => {}}
        />

        <div className="text-center">
          <Link href="/">
            <Button className="font-pompiere text-lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Find More Date Ideas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}