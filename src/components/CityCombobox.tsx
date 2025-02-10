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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

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
            className="w-full justify-between text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : value ? (
              value
            ) : (
              "Select a city..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[--radix-popover-trigger-width] p-0" 
          align="start"
          sideOffset={4}
        >
          <Command className="w-full">
            <CommandInput
              placeholder="Type a city name..."
              value={search}
              onValueChange={setSearch}
              className="h-9 text-lg"
            />
            <div className="max-h-[300px] overflow-y-auto">
              {searching && (
                <div className="py-6 text-center text-lg">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                </div>
              )}
              {!searching && cities.length === 0 && search.length >= 2 && (
                <CommandEmpty className="text-lg">No cities found.</CommandEmpty>
              )}
              {!searching && cities.length > 0 && (
                <CommandGroup>
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
                      className="cursor-pointer text-lg"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === city.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city.value}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-lg text-destructive mt-2">{error}</p>}
    </div>
  );
}