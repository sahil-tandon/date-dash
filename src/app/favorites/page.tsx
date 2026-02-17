'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, HeartOff } from 'lucide-react';
import { DateIdeaCard } from '@/components/DateIdeaCard';
import { Button } from '@/components/ui/button';
import { useSavedIdeas } from '@/hooks/useSavedIdeas';
import { SavedIdeaEntry } from '@/types';

export default function FavoritesPage() {
  const { savedIdeas, toggleSave } = useSavedIdeas();

  const savedArray = useMemo<SavedIdeaEntry[]>(
    () =>
      Object.values(savedIdeas).sort(
        (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
      ),
    [savedIdeas]
  );

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-12 pb-20">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-normal tracking-wide text-primary font-barrio">
            My Favorites
          </h1>
          <p className="text-xl md:text-2xl text-primary/90 font-oooh-baby">
            Your saved date ideas
          </p>
        </div>

        {savedArray.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-6 mt-16">
            <HeartOff className="h-16 w-16 text-secondary" strokeWidth={1.5} />
            <p className="text-xl text-primary/70 font-pompiere text-center max-w-md">
              No saved ideas yet. Head back and tap the heart on any date idea to
              save it here!
            </p>
            <Button asChild variant="outline" className="mt-2 font-pompiere text-lg border-primary/30 hover:border-primary">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArray.map((entry) => (
                <DateIdeaCard
                  key={`${entry.city}::${entry.idea.title}`}
                  idea={entry.idea}
                  city={entry.city}
                  isSaved={true}
                  onLove={() => toggleSave(entry.city, entry.idea)}
                />
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button asChild variant="outline" className="font-pompiere text-lg border-primary/30 hover:border-primary">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
