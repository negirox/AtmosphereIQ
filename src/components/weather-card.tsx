"use client";

import { Sun, Cloud, CloudRain, Droplets, Wind, Leaf, Mountain, Sparkles, Cloudy, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


export interface WeatherData {
    location: string;
    temperature: number;
    condition: string;
    isDay: boolean;
    humidity: number;
    windSpeed: number;
    aqi: number;
    pollutants: {
      pm25: number;
      pm10: number;
      no2: number;
    };
    forecast: {
      day: string;
      temp: number;
      condition: string;
    }[];
}

interface WeatherCardProps {
  data: WeatherData | null;
  isLoading: boolean;
}

const CloudyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" />
    </svg>
  );

const weatherIcons: { [key: string]: React.ReactNode } = {
  "Sunny": <Sun className="h-10 w-10 text-secondary-foreground" />,
  "Clear": <Moon className="h-10 w-10 text-muted-foreground" />,
  "Partly cloudy": <Cloud className="h-10 w-10 text-muted-foreground" />,
  "Cloudy": <CloudyIcon className="h-10 w-10 text-muted-foreground" />,
  "Overcast": <Cloud className="h-10 w-10 text-muted-foreground" />,
  "Mist": <Cloud className="h-10 w-10 text-muted-foreground" />,
  "Patchy rain possible": <CloudRain className="h-10 w-10 text-primary" />,
  "Patchy snow possible": <CloudRain className="h-10 w-10 text-primary" />,
  "Patchy sleet possible": <CloudRain className="h-10 w-10 text-primary" />,
  "Patchy freezing drizzle possible": <CloudRain className="h-10 w-10 text-primary" />,
  "Thundery outbreaks possible": <CloudRain className="h-10 w-10 text-primary" />,
  "Blowing snow": <CloudRain className="h-10 w-10 text-primary" />,
  "Blizzard": <CloudRain className="h-10 w-10 text-primary" />,
  "Fog": <Cloud className="h-10 w-10 text-muted-foreground" />,
  "Freezing fog": <Cloud className="h-10 w-10 text-muted-foreground" />,
  "Patchy light drizzle": <CloudRain className="h-10 w-10 text-primary" />,
  "Light drizzle": <CloudRain className="h-10 w-10 text-primary" />,
  "Freezing drizzle": <CloudRain className="h-10 w-10 text-primary" />,
  "Heavy freezing drizzle": <CloudRain className="h-10 w-10 text-primary" />,
  "Patchy light rain": <CloudRain className="h-10 w-10 text-primary" />,
  "Light rain": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate rain at times": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate rain": <CloudRain className="h-10 w-10 text-primary" />,
  "Heavy rain at times": <CloudRain className="h-10 w-10 text-primary" />,
  "Heavy rain": <CloudRain className="h-10 w-10 text-primary" />,
  "Light freezing rain": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate or heavy freezing rain": <CloudRain className="h-10 w-10 text-primary" />,
  "Light sleet": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate or heavy sleet": <CloudRain className="h-10 w-10 text-primary" />,
  "Patchy light snow": <CloudRain className="h-10 w-10 text-primary" />,
  "Light snow": <CloudRain className="h-10 w-10 text-primary" />,
  "Patchy moderate snow": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate snow": <CloudRain className="h-10 w-10 text-primary" />,
  "Patchy heavy snow": <CloudRain className="h-10 w-10 text-primary" />,
  "Heavy snow": <CloudRain className="h-10 w-10 text-primary" />,
  "Ice pellets": <CloudRain className="h-10 w-10 text-primary" />,
  "Light rain shower": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate or heavy rain shower": <CloudRain className="h-10 w-10 text-primary" />,
  "Torrential rain shower": <CloudRain className="h-10 w-10 text-primary" />,
  "Light sleet showers": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate or heavy sleet showers": <CloudRain className="h-10 w-10 text-primary" />,
  "Light snow showers": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate or heavy snow showers": <CloudRain className="h-10 w-10 text-primary" />,
  "Light showers of ice pellets": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate or heavy showers of ice pellets": <CloudRain className="h-10 w-10 text-primary" />,
  "Patchy light rain with thunder": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate or heavy rain with thunder": <CloudRain className="h-10 w-10 text-primary" />,
  "Patchy light snow with thunder": <CloudRain className="h-10 w-10 text-primary" />,
  "Moderate or heavy snow with thunder": <CloudRain className="h-10 w-10 text-primary" />,
};

const getAqiInfo = (aqi: number): { variant: BadgeProps["variant"], label: string } => {
  if (aqi <= 2) return { variant: "default", label: "Good" };
  if (aqi <= 4) return { variant: "secondary", label: "Moderate" };
  return { variant: "destructive", label: "Unhealthy" };
};

const WeatherCardSkeleton = () => (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20">
      <CardHeader className="text-center p-6">
        <Skeleton className="h-9 w-48 mx-auto" />
        <Skeleton className="h-6 w-24 mx-auto mt-2" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Skeleton className="h-24 w-32" />
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-12" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center">
          <Skeleton className="h-7 w-56 mx-auto mb-4" />
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-16 w-24" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
);

export default function WeatherCard({ data, isLoading }: WeatherCardProps) {
  if (isLoading) {
    return <WeatherCardSkeleton />;
  }

  if (!data) {
    return (
      <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20 animate-in fade-in-50 duration-500">
        <CardHeader className="text-center p-6">
          <CardTitle className="text-2xl font-bold font-headline">No Data</CardTitle>
          <CardDescription className="text-lg">Could not retrieve weather data for the selected location.</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const { location, temperature, condition, humidity, windSpeed, aqi, pollutants, forecast, isDay } = data;
  const aqiInfo = getAqiInfo(aqi);

  const pollutantData = [
    { name: "PM2.5", value: pollutants.pm25, fill: "hsl(var(--chart-1))", icon: Leaf },
    { name: "PM10", value: pollutants.pm10, fill: "hsl(var(--chart-2))", icon: Mountain },
    { name: "NO₂", value: pollutants.no2, fill: "hsl(var(--chart-3))", icon: Sparkles },
  ];
  
  const chartConfig = {
    value: {
      label: "µg/m³",
    },
    pm25: {
      label: "PM2.5",
      color: "hsl(var(--chart-1))",
    },
    pm10: {
      label: "PM10",
      color: "hsl(var(--chart-2))",
    },
    no2: {
      label: "NO₂",
      color: "hsl(var(--chart-3))",
    },
  }

  const getWeatherIcon = (condition: string, isDay: boolean) => {
    if (condition === "Clear" && !isDay) {
        return weatherIcons["Clear"];
    }
    if (condition === "Sunny" && !isDay) {
        // WeatherAPI can return "Sunny" at night
        return weatherIcons["Clear"];
    }
    return weatherIcons[condition] || <Sun className="h-10 w-10 text-secondary-foreground" />;
  }


  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20 animate-in fade-in-50 duration-500">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-3xl font-bold font-headline">{location}</CardTitle>
        <CardDescription className="text-lg">{condition}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-start">
              <span className="text-8xl font-bold">{Math.round(temperature)}</span>
              <span className="text-3xl font-medium mt-2">°C</span>
            </div>
            {getWeatherIcon(condition, isDay)}
          </div>
          <div className="flex flex-col gap-4 text-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Droplets className="h-5 w-5" />
                <span>Humidity</span>
              </div>
              <span className="font-semibold">{humidity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wind className="h-5 w-5" />
                <span>Wind</span>
              </div>
              <span className="font-semibold">{windSpeed} km/h</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2 font-headline">Air Quality Index (AQI)</h3>
          <div className="flex items-center justify-center gap-4">
            <span className="text-6xl font-bold">{aqi}</span>
            <Badge variant={aqiInfo.variant} className="px-4 py-2 text-base font-semibold">
              {aqiInfo.label}
            </Badge>
          </div>
        </div>

        <div className="mt-6">
            <ChartContainer config={chartConfig} className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pollutantData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value, index) => {
                      const Icon = pollutantData[index].icon
                      return value;
                    }}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} unit="µg/m³" />
                   <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="value" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        
        <Separator className="my-6" />

        <div>
          <h3 className="text-xl font-semibold mb-4 text-center font-headline">3-Day Forecast</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {forecast.map((dayForecast) => (
              <div key={dayForecast.day} className="p-4 rounded-lg bg-muted/50 flex flex-col items-center justify-center gap-2">
                <p className="text-lg font-bold">{dayForecast.day}</p>
                {getWeatherIcon(dayForecast.condition, true)}
                <p className="text-2xl font-semibold">{Math.round(dayForecast.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
