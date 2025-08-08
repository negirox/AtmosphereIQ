import { Sun, Cloud, CloudRain, Droplets, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface WeatherData {
  location: string;
  temperature: number;
  condition: "Sunny" | "Cloudy" | "Rainy";
  humidity: number;
  windSpeed: number;
  aqi: number;
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
  };
}

interface WeatherCardProps {
  data: WeatherData | null;
  isLoading: boolean;
}

const weatherIcons: { [key in WeatherData['condition']]: React.ReactNode } = {
  Sunny: <Sun className="h-16 w-16 text-secondary-foreground" />,
  Cloudy: <Cloud className="h-16 w-16 text-muted-foreground" />,
  Rainy: <CloudRain className="h-16 w-16 text-primary" />,
};

const getAqiInfo = (aqi: number): { variant: BadgeProps["variant"], label: string } => {
  if (aqi <= 50) return { variant: "default", label: "Good" };
  if (aqi <= 100) return { variant: "secondary", label: "Moderate" };
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
    return null;
  }
  
  const { location, temperature, condition, humidity, windSpeed, aqi, pollutants } = data;
  const aqiInfo = getAqiInfo(aqi);

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
              <span className="text-8xl font-bold">{temperature}</span>
              <span className="text-3xl font-medium mt-2">°C</span>
            </div>
            {weatherIcons[condition]}
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
        
        <Separator className="my-8" />

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 font-headline">Air Quality Index (AQI)</h3>
          <div className="flex items-center justify-center gap-4">
            <span className="text-6xl font-bold">{aqi}</span>
            <Badge variant={aqiInfo.variant} className="px-4 py-2 text-base font-semibold">
              {aqiInfo.label}
            </Badge>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">PM2.5</p>
            <p className="text-2xl font-semibold">{pollutants.pm25} <span className="text-sm text-muted-foreground">µg/m³</span></p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">PM10</p>
            <p className="text-2xl font-semibold">{pollutants.pm10} <span className="text-sm text-muted-foreground">µg/m³</span></p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">NO₂</p>
            <p className="text-2xl font-semibold">{pollutants.no2} <span className="text-sm text-muted-foreground">µg/m³</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
