"use client";

import { useState, useEffect } from "react";
import LocationSearch from "@/components/location-search";
import WeatherCard, { type WeatherData } from "@/components/weather-card";
import { useToast } from "@/hooks/use-toast";
import { fetchWeather } from "@/ai/flows/weather";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleLocationSearch = async (city: string) => {
    setIsLoading(true);
    try {
      const data = await fetchWeather({ city });
      setWeatherData(data);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "API Error",
        description: "Could not fetch weather data. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeolocate = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latLon = `${position.coords.latitude},${position.coords.longitude}`;
          handleLocationSearch(latLon);
        },
        (err) => {
          toast({
            variant: "destructive",
            title: "Geolocation Error",
            description: "Could not get location. Please grant permission or use search.",
          });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation Error",
        description: "Geolocation is not supported by your browser.",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLocationSearch("New York");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24 bg-background text-foreground">
      <div className="z-10 w-full max-w-3xl items-center justify-center font-headline text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary-foreground" style={{color: 'hsl(var(--primary-foreground))'}}>AtmosphereIQ</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your real-time air quality and weather guide</p>
      </div>
      
      <div className="w-full max-w-md mt-8">
        <LocationSearch onSearch={handleLocationSearch} onGeolocate={handleGeolocate} isLoading={isLoading} />
      </div>

      <div className="mt-8 w-full max-w-3xl">
        <WeatherCard data={weatherData} isLoading={isLoading} />
      </div>
    </main>
  );
}
