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
      <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Search by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
          className="flex-grow bg-card text-card-foreground border-border focus:ring-primary"
          aria-label="City Search"
        />
        <Button type="submit" size="icon" disabled={isLoading} aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      <Button variant="outline" onClick={onGeolocate} disabled={isLoading} className="w-full">
        <MapPin className="mr-2 h-4 w-4" />
        Use My Current Location
      </Button>
    </div>
  );
}
