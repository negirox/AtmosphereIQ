
"use client";

import { useState, useEffect, useCallback } from "react";
import LocationSearch from "@/components/location-search";
import WeatherCard, { type WeatherData } from "@/components/weather-card";
import { useToast } from "@/hooks/use-toast";
import Faq from "@/components/faq";
import AdSenseUnit from "@/components/adsense-unit";
import Link from "next/link";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleLocationSearch = useCallback(async (city: string) => {
    setIsLoading(true);
    try {
      const apiKey = "f520cd345377420e81d193619250808";
      if (!apiKey) {
        throw new Error("API key is not configured.");
      }
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=yes`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }
      const data: WeatherData = await response.json();

      if (!data.forecast || !data.forecast.forecastday) {
        throw new Error('Invalid data structure from Weather API');
      }

      setWeatherData(data);

    } catch (error) {
      console.error(error);
      const description = error instanceof Error ? error.message : "Could not fetch weather data. Please try again later.";
      toast({
        variant: "destructive",
        title: "API Error",
        description,
      });
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleGeolocate = useCallback(() => {
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
          handleLocationSearch("New York");
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation Error",
        description: "Geolocation is not supported by your browser.",
      });
      setIsLoading(false);
      handleLocationSearch("New York");
    }
  }, [handleLocationSearch, toast]);

  useEffect(() => {
    handleGeolocate();
  }, [handleGeolocate]);

  return (
    <main className="relative flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 bg-background text-foreground">
      <AdSenseUnit adSlot={"5342210952"} autoMode={"auto"} />
      <div className="z-10 w-full max-w-5xl items-center justify-center font-headline text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary-foreground" style={{ color: 'hsl(var(--primary-foreground))' }}>AtmosphereIQ</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your real-time air quality and weather guide</p>
      </div>
      <div className="w-full max-w-md mt-8">
        <AdSenseUnit adSlot={"9089081944"} autoMode={"autorelaxed"}/>
      </div>

      <div className="w-full max-w-md mt-8">
        <LocationSearch onSearch={handleLocationSearch} onGeolocate={handleGeolocate} isLoading={isLoading} />
      </div>

      <div className="mt-8 w-full max-w-5xl">
        <WeatherCard data={weatherData} isLoading={isLoading} />
      </div>

      <div className="mt-12 w-full max-w-5xl">
        <Faq />
      </div>

      <footer className="mt-12 w-full max-w-5xl text-center text-muted-foreground border-t border-border/20 pt-8">
         <div className="flex justify-center gap-4 mb-4">
            <Link href="/about" className="hover:text-primary hover:underline">About</Link>
            <Link href="/privacy-policy" className="hover:text-primary hover:underline">Privacy Policy</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Negirox. All rights reserved.</p>
      </footer>
    </main>
  );
}
