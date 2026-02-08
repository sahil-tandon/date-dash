'use client';

import { useState, useEffect, useCallback } from 'react';
import { DateIdea, SavedIdeasStore } from '@/types';

const STORAGE_KEY = 'date-dash:saved';

function getSavedKey(city: string, title: string): string {
  return `${city}::${title}`;
}

function readStore(): SavedIdeasStore {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(store: SavedIdeasStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage full or unavailable — fail silently
  }
}

export function useSavedIdeas() {
  const [savedIdeas, setSavedIdeas] = useState<SavedIdeasStore>({});

  useEffect(() => {
    setSavedIdeas(readStore());
  }, []);

  const isSaved = useCallback(
    (city: string, title: string): boolean => {
      return getSavedKey(city, title) in savedIdeas;
    },
    [savedIdeas]
  );

  const toggleSave = useCallback(
    (city: string, idea: DateIdea): void => {
      const key = getSavedKey(city, idea.title);
      const updated = { ...savedIdeas };

      if (key in updated) {
        delete updated[key];
      } else {
        updated[key] = {
          idea,
          city,
          savedAt: new Date().toISOString(),
        };
      }

      setSavedIdeas(updated);
      writeStore(updated);
    },
    [savedIdeas]
  );

  return { savedIdeas, isSaved, toggleSave };
}
