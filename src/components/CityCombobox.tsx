import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, Loader2 } from "lucide-react";

interface City {
  id: number;
  value: string;
}

interface CityComboboxProps {
  onSelect: (city: string) => void;
  error?: string;
  isLoading?: boolean;
}

export function CityCombobox({ onSelect, error, isLoading }: CityComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [cities, setCities] = React.useState<City[]>([]);
  const [searching, setSearching] = React.useState(false);

  React.useEffect(() => {
    if (!search || search.length < 2) {
      setCities([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const response = await fetch(
          `/api/cities/search?q=${encodeURIComponent(search)}`
        );
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data.cities || []);
      } catch (error) {
        console.error("Failed to search cities:", error);
        setCities([]);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="relative w-full font-pompiere text-lg">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-lg bg-white border-secondary/30 rounded-xl h-12 px-4 font-pompiere text-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : value ? (
              value
            ) : (
              "Select a city..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[--radix-popover-trigger-width] p-0 overflow-hidden" 
          align="start"
          sideOffset={4}
        >
          <Command className="w-full rounded-xl border-none">
            <CommandInput
              placeholder="Type a city name..."
              value={search}
              onValueChange={setSearch}
              className="h-11 text-lg font-pompiere border-none focus:ring-0 focus-visible:ring-0 text-primary/90"
            />
            <div className="max-h-[300px] overflow-y-auto pt-1 custom-scrollbar">
              {searching && (
                <div className="py-6 text-center text-lg">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                </div>
              )}
              {!searching && cities.length === 0 && search.length >= 2 && (
                <CommandEmpty className="text-lg font-pompiere text-primary/90 py-2">
                  <div className="px-4">No cities found.</div>
                </CommandEmpty>
              )}
              {!searching && cities.length > 0 && (
                <CommandGroup className="p-0">
                  {cities.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={city.value}
                      onSelect={() => {
                        setValue(city.value);
                        setOpen(false);
                        onSelect(city.value);
                        setSearch("");
                      }}
                      className="cursor-pointer text-lg font-pompiere py-2 text-primary/90 aria-selected:bg-secondary/10"
                    >
                      <div className="px-2">{city.value}</div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-lg text-destructive/80 mt-2 font-pompiere">{error}</p>}
    </div>
  );
}