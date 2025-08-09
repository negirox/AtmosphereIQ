
"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

interface LocationSearchProps {
  onSearch: (city: string) => void;
  onGeolocate: () => void;
  isLoading: boolean;
}

export default function LocationSearch({ onSearch, onGeolocate, isLoading }: LocationSearchProps) {
  const [city, setCity] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim() && !isLoading) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearch} className="flex w-full flex-col sm:flex-row items-center gap-2">
        <Input
          type="text"
          placeholder="Search by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
          className="w-full flex-grow bg-card text-card-foreground border-border focus:ring-primary"
          aria-label="City Search"
        />
        <Button type="submit" size="icon" disabled={isLoading} aria-label="Search" className="w-full sm:w-auto sm:h-12 sm:w-12 flex-shrink-0">
          <Search />
        </Button>
      </form>
      <Button variant="outline" onClick={onGeolocate} disabled={isLoading} className="w-full">
        <MapPin />
        Use My Current Location
      </Button>
    </div>
  );
}
