export interface DateIdea {
  title: string;
  description: string;
  estimatedCost: string;
  icon: string;
}

export interface GenerateApiResponse {
  success: boolean;
  data?: DateIdea[];
  error?: string;
}

export interface CacheEntry {
  ideas: DateIdea[];
  timestamp: number;
}

export interface DateIdeaCardProps {
  idea: DateIdea;
  onLove?: () => void;
  onShare?: () => void;
  isSaved?: boolean;
}

export interface SavedIdeaEntry {
  idea: DateIdea;
  city: string;
  savedAt: string;
}

export interface SavedIdeasStore {
  [key: string]: SavedIdeaEntry;
}

export interface DateIdeasCarouselProps {
  ideas: DateIdea[];
  isLoading?: boolean;
}

export interface CityInputProps {
  onSubmit: (city: string) => void;
  isLoading?: boolean;
  error?: string;
}