
"use client";

import { Sun, Cloud, CloudRain, Droplets, Wind, Leaf, Mountain, Sparkles, Cloudy, Moon, Gauge, Eye, Sunrise, Sunset, Compass, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


export interface WeatherData {
    location: string;
    localtime: string;
    temperature: number;
    condition: string;
    isDay: boolean;
    humidity: number;
    windSpeed: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
    aqi: number;
    pollutants: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm25: number;
      pm10: number;
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
  "Sunny": <Sun className="h-10 w-10 text-yellow-400" />,
  "Clear": <Moon className="h-10 w-10 text-gray-400" />,
  "Partly cloudy": <Cloud className="h-10 w-10 text-gray-400" />,
  "Cloudy": <CloudyIcon className="h-10 w-10 text-gray-500" />,
  "Overcast": <Cloud className="h-10 w-10 text-gray-600" />,
  "Mist": <Cloud className="h-10 w-10 text-gray-400" />,
  "Patchy rain possible": <CloudRain className="h-10 w-10 text-blue-400" />,
  "Patchy snow possible": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Patchy sleet possible": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Patchy freezing drizzle possible": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Thundery outbreaks possible": <CloudRain className="h-10 w-10 text-yellow-500" />,
  "Blowing snow": <CloudRain className="h-10 w-10 text-white" />,
  "Blizzard": <CloudRain className="h-10 w-10 text-white" />,
  "Fog": <Cloud className="h-10 w-10 text-gray-400" />,
  "Freezing fog": <Cloud className="h-10 w-10 text-gray-300" />,
  "Patchy light drizzle": <CloudRain className="h-10 w-10 text-blue-400" />,
  "Light drizzle": <CloudRain className="h-10 w-10 text-blue-400" />,
  "Freezing drizzle": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Heavy freezing drizzle": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Patchy light rain": <CloudRain className="h-10 w-10 text-blue-400" />,
  "Light rain": <CloudRain className="h-10 w-10 text-blue-500" />,
  "Moderate rain at times": <CloudRain className="h-10 w-10 text-blue-500" />,
  "Moderate rain": <CloudRain className="h-10 w-10 text-blue-600" />,
  "Heavy rain at times": <CloudRain className="h-10 w-10 text-blue-600" />,
  "Heavy rain": <CloudRain className="h-10 w-10 text-blue-700" />,
  "Light freezing rain": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Moderate or heavy freezing rain": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Light sleet": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Moderate or heavy sleet": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Patchy light snow": <CloudRain className="h-10 w-10 text-white" />,
  "Light snow": <CloudRain className="h-10 w-10 text-white" />,
  "Patchy moderate snow": <CloudRain className="h-10 w-10 text-white" />,
  "Moderate snow": <CloudRain className="h-10 w-10 text-white" />,
  "Patchy heavy snow": <CloudRain className="h-10 w-10 text-white" />,
  "Heavy snow": <CloudRain className="h-10 w-10 text-white" />,
  "Ice pellets": <CloudRain className="h-10 w-10 text-blue-200" />,
  "Light rain shower": <CloudRain className="h-10 w-10 text-blue-400" />,
  "Moderate or heavy rain shower": <CloudRain className="h-10 w-10 text-blue-500" />,
  "Torrential rain shower": <CloudRain className="h-10 w-10 text-blue-700" />,
  "Light sleet showers": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Moderate or heavy sleet showers": <CloudRain className="h-10 w-10 text-blue-300" />,
  "Light snow showers": <CloudRain className="h-10 w-10 text-white" />,
  "Moderate or heavy snow showers": <CloudRain className="h-10 w-10 text-white" />,
  "Light showers of ice pellets": <CloudRain className="h-10 w-10 text-blue-200" />,
  "Moderate or heavy showers of ice pellets": <CloudRain className="h-10 w-10 text-blue-200" />,
  "Patchy light rain with thunder": <CloudRain className="h-10 w-10 text-yellow-500" />,
  "Moderate or heavy rain with thunder": <CloudRain className="h-10 w-10 text-yellow-600" />,
  "Patchy light snow with thunder": <CloudRain className="h-10 w-10 text-yellow-400" />,
  "Moderate or heavy snow with thunder": <CloudRain className="h-10 w-10 text-yellow-500" />,
};

const getAqiInfo = (aqi: number): { variant: BadgeProps["variant"], label: string } => {
  if (aqi <= 1) return { variant: "default", label: "Good" };
  if (aqi <= 2) return { variant: "secondary", label: "Moderate" };
  if (aqi <= 3) return { variant: "destructive", label: "Unhealthy for Sensitive Groups" };
  if (aqi <= 4) return { variant: "destructive", label: "Unhealthy" };
  if (aqi <= 5) return { variant: "destructive", label: "Very Unhealthy" };
  return { variant: "destructive", label: "Hazardous" };
};

const WeatherCardSkeleton = () => (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20">
      <CardHeader className="text-center p-6">
        <Skeleton className="h-9 w-48 mx-auto" />
        <Skeleton className="h-6 w-36 mx-auto mt-2" />
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
        <div className="mt-8 h-[250px]">
             <Skeleton className="h-full w-full" />
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
  
  const { location, localtime, temperature, condition, humidity, windSpeed, wind_dir, pressure_mb, precip_mm, cloud, feelslike_c, vis_km, uv, aqi, pollutants, forecast, isDay } = data;
  const aqiInfo = getAqiInfo(aqi);

  const pollutantData = [
    { name: "PM2.5", value: pollutants.pm25, fill: "hsl(var(--chart-1))" },
    { name: "PM10", value: pollutants.pm10, fill: "hsl(var(--chart-2))" },
    { name: "NO₂", value: pollutants.no2, fill: "hsl(var(--chart-3))" },
    { name: "O₃", value: pollutants.o3, fill: "hsl(var(--chart-4))" },
    { name: "SO₂", value: pollutants.so2, fill: "hsl(var(--chart-5))" },
    { name: "CO", value: pollutants.co, fill: "hsl(var(--muted))" },
  ];
  
  const chartConfig = {
    value: { label: "µg/m³" },
    pm25: { label: "PM2.5", color: "hsl(var(--chart-1))" },
    pm10: { label: "PM10", color: "hsl(var(--chart-2))" },
    no2: { label: "NO₂", color: "hsl(var(--chart-3))" },
    o3: { label: "O₃", color: "hsl(var(--chart-4))" },
    so2: { label: "SO₂", color: "hsl(var(--chart-5))" },
    co: { label: "CO", color: "hsl(var(--muted))" },
  }

  const getWeatherIcon = (condition: string, isDay: boolean) => {
    if (condition === "Clear" && !isDay) {
        return weatherIcons["Clear"];
    }
    if (condition === "Sunny" && !isDay) {
        return weatherIcons["Clear"];
    }
    return weatherIcons[condition] || <Sun className="h-10 w-10 text-yellow-400" />;
  }

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20 animate-in fade-in-50 duration-500">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-3xl font-bold font-headline">{location}</CardTitle>
        <CardDescription className="text-lg">{condition} &bull; {new Date(localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</CardDescription>
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
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-md">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Thermometer className="h-5 w-5" />
                <span>Feels like</span>
                <span className="font-semibold text-foreground">{Math.round(feelslike_c)}°C</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Droplets className="h-5 w-5" />
                <span>Humidity</span>
                <span className="font-semibold text-foreground">{humidity}%</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wind className="h-5 w-5" />
                <span>Wind</span>
                <span className="font-semibold text-foreground">{windSpeed} km/h</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Compass className="h-5 w-5" />
                <span>Direction</span>
                <span className="font-semibold text-foreground">{wind_dir}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="h-5 w-5" />
                <span>Pressure</span>
                <span className="font-semibold text-foreground">{pressure_mb} mb</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CloudRain className="h-5 w-5" />
                <span>Precip.</span>
                <span className="font-semibold text-foreground">{precip_mm} mm</span>
              </div>
               <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-5 w-5" />
                <span>Visibility</span>
                <span className="font-semibold text-foreground">{vis_km} km</span>
              </div>
               <div className="flex items-center gap-2 text-muted-foreground">
                <Sun className="h-5 w-5" />
                <span>UV Index</span>
                <span className="font-semibold text-foreground">{uv}</span>
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
            <h3 className="text-xl font-semibold mb-2 text-center font-headline">Pollutant Levels</h3>
            <ChartContainer config={chartConfig} className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pollutantData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} unit=" µg/m³" />
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
                <p className="text-sm text-muted-foreground">{dayForecast.condition}</p>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
