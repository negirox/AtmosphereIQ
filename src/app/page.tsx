"use client";

import { useState, useEffect, useCallback } from "react";
import LocationSearch from "@/components/location-search";
import WeatherCard, { type WeatherData } from "@/components/weather-card";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleLocationSearch = useCallback(async (city: string) => {
    setIsLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not configured.");
      }
      const decodedApiKey = atob(apiKey);
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${decodedApiKey}&q=${city}&days=3&aqi=yes`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }
      const data = await response.json();

      if (!data.forecast || !data.forecast.forecastday) {
        throw new Error('Invalid data structure from Weather API');
      }

      const forecast = data.forecast.forecastday.map((day: any) => ({
        day: format(new Date(day.date), 'EEE'),
        temp: day.day.avgtemp_c,
        condition: day.day.condition.text,
      }));

      setWeatherData({
        location: `${data.location.name}, ${data.location.country}`,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        isDay: data.current.is_day === 1,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        aqi: data.current.air_quality['us-epa-index'],
        pollutants: {
          pm25: data.current.air_quality.pm2_5,
          pm10: data.current.air_quality.pm10,
          no2: data.current.air_quality.no2,
        },
        forecast,
      });

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
  }, [handleLocationSearch]);

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
