'use client';

import { useSavedIdeas } from '@/hooks/useSavedIdeas';
import { DateIdeaCard } from '@/components/DateIdeaCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { savedIdeas, isSaved, toggleSave } = useSavedIdeas();

  // Convert savedIdeas object to array
  const savedIdeasArray = Object.values(savedIdeas);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 font-pompiere">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-primary fill-current" />
            <h1 className="text-4xl md:text-5xl font-normal tracking-wide text-primary font-barrio">
              My Saved Ideas
            </h1>
          </div>
          <p className="text-xl text-primary/90 font-oooh-baby mt-2">
            Your favorite date ideas in one place
          </p>
        </div>

        {/* Empty State */}
        {savedIdeasArray.length === 0 && (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-primary/30 mx-auto mb-4" />
            <h2 className="text-2xl text-primary/70 font-pompiere mb-2">
              No saved ideas yet
            </h2>
            <p className="text-lg text-primary/60 font-pompiere mb-6">
              Start exploring date ideas and save your favorites!
            </p>
            <Link href="/">
              <Button className="font-pompiere text-lg">
                Discover Date Ideas
              </Button>
            </Link>
          </div>
        )}

        {/* Saved Ideas Grid */}
        {savedIdeasArray.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedIdeasArray.map((entry) => (
              <DateIdeaCard
                key={`${entry.city}::${entry.idea.title}`}
                idea={entry.idea}
                city={entry.city}
                onLove={() => toggleSave(entry.city, entry.idea)}
                isSaved={isSaved(entry.city, entry.idea.title)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
