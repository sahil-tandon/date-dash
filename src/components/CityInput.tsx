import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CityInputProps } from '@/types';
import { Search } from 'lucide-react';

export function CityInput({ onSubmit, isLoading, error }: CityInputProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSubmit(city.trim());
    }
  };

  return (
    <div className="w-full max-w-md space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter your city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !city.trim()}>
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </form>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}