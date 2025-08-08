"use client";

import { useState, useEffect } from "react";
import LocationSearch from "@/components/location-search";
import WeatherCard, { type WeatherData } from "@/components/weather-card";
import { useToast } from "@/hooks/use-toast";

const mockWeatherData: { [key: string]: WeatherData } = {
  "New York": {
    location: "New York, USA",
    temperature: 18,
    condition: "Cloudy",
    humidity: 65,
    windSpeed: 15,
    aqi: 78,
    pollutants: {
      pm25: 23,
      pm10: 45,
      no2: 30,
    },
    forecast: [
      { day: "Mon", temp: 20, condition: "Cloudy" },
      { day: "Tue", temp: 22, condition: "Sunny" },
      { day: "Wed", temp: 19, condition: "Rainy" },
    ],
  },
  "London": {
    location: "London, UK",
    temperature: 12,
    condition: "Rainy",
    humidity: 85,
    windSpeed: 22,
    aqi: 42,
    pollutants: {
      pm25: 12,
      pm10: 20,
      no2: 15,
    },
    forecast: [
      { day: "Mon", temp: 14, condition: "Rainy" },
      { day: "Tue", temp: 15, condition: "Cloudy" },
      { day: "Wed", temp: 13, condition: "Rainy" },
    ],
  },
  "Tokyo": {
    location: "Tokyo, JP",
    temperature: 22,
    condition: "Sunny",
    humidity: 50,
    windSpeed: 10,
    aqi: 55,
    pollutants: {
      pm25: 15,
      pm10: 25,
      no2: 18,
    },
    forecast: [
        { day: "Mon", temp: 24, condition: "Sunny" },
        { day: "Tue", temp: 23, condition: "Sunny" },
        { day: "Wed", temp: 21, condition: "Cloudy" },
    ],
  },
  "Current Location": {
    location: "Your Location",
    temperature: 25,
    condition: "Sunny",
    humidity: 40,
    windSpeed: 8,
    aqi: 30,
    pollutants: {
        pm25: 8,
        pm10: 14,
        no2: 10,
    },
    forecast: [
        { day: "Mon", temp: 26, condition: "Sunny" },
        { day: "Tue", temp: 27, condition: "Sunny" },
        { day: "Wed", temp: 25, condition: "Cloudy" },
    ],
  }
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleLocationSearch = (city: string) => {
    setIsLoading(true);
    // Capitalize first letter for mock data key
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    setTimeout(() => { 
      const data = mockWeatherData[formattedCity] || mockWeatherData["New York"];
      setWeatherData(data);
      setIsLoading(false);
    }, 1000);
  };

  const handleGeolocate = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
           setTimeout(() => {
            const data = { ...mockWeatherData["Current Location"], location: `Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}` };
            setWeatherData(data);
            setIsLoading(false);
          }, 1000);
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
