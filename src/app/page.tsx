'use client';

import { CityInput } from '@/components/CityInput';

export default function Home() {
  const handleCitySubmit = (city: string) => {
    console.log('City submitted:', city);
    // We'll implement the API call here later
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-primary">DateDash</h1>
      <CityInput 
        onSubmit={handleCitySubmit}
        error={undefined}
        isLoading={false}
      />
    </main>
  );
}