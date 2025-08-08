
"use client";

import { Sun, Cloud, CloudRain, Droplets, Wind, Leaf, Mountain, Sparkles, Cloudy, Moon, Gauge, Eye, Sunrise, Sunset, Compass, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import LocationClock from './location-clock';

export interface WeatherData {
  location: Location
  current: Current
  forecast: Forecast
}

export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export interface Current {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
  air_quality: AirQuality
}

export interface Condition {
  text: string
  icon: string
  code: number
}

export interface AirQuality {
  co: number
  no2: number
  o3: number
  so2: number
  pm2_5: number
  pm10: number
  "us-epa-index": number
  "gb-defra-index": number
}

export interface Forecast {
  forecastday: Forecastday[]
}

export interface Forecastday {
  date: string
  date_epoch: number
  day: Day
  astro: Astro
  hour: Hour[]
}

export interface Day {
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_mph: number
  maxwind_kph: number
  totalprecip_mm: number
  totalprecip_in: number
  totalsnow_cm: number
  avgvis_km: number
  avgvis_miles: number
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  condition: Condition2
  uv: number
}

export interface Condition2 {
  text: string
  icon: string
  code: number
}

export interface Astro {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: number
  is_moon_up: number
  is_sun_up: number
}

export interface Hour {
  time_epoch: number
  time: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition3
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  snow_cm: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  vis_miles: number
  gust_mph: number
  gust_kph: number
  uv: number
  air_quality?: AirQuality
}

export interface Condition3 {
  text: string
  icon: string
  code: number
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
    "Patchy rain nearby": <CloudRain className="h-10 w-10 text-blue-400" />,
  "Patchy light rain": <CloudRain className="h-10 w-10 text-blue-400" />,
  "Light rain": <CloudRain className="h-10 w-10 text-blue-500" />,
  "Moderate rain at times": <CloudRain className="h-10 w-10 text-blue-500" />,
  "Moderate rain": <CloudRain className="h-10 w-10 text-blue-600" />,
  "Heavy rain at times": <CloudRain className="h-10 w-10 text-blue-600" />,
  "Heavy rain": <CloudRain className="h-10 w-10 text-blue-700" />,
  "Light rain shower": <CloudRain className="h-10 w-10 text-blue-400" />,
  "Moderate or heavy rain shower": <CloudRain className="h-10 w-10 text-blue-500" />,
  "Torrential rain shower": <CloudRain className="h-10 w-10 text-blue-700" />,
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

const getAqiInfo = (index: number): { variant: BadgeProps["variant"], label: string, textColorClass: string } => {
    switch (index) {
        case 1: return { variant: "default", label: "Good", textColorClass: "text-green-500" };
        case 2: return { variant: "secondary", label: "Moderate", textColorClass: "text-yellow-500" };
        case 3: return { variant: "destructive", label: "Unhealthy for Sensitive Groups", textColorClass: "text-orange-500" };
        case 4: return { variant: "destructive", label: "Unhealthy", textColorClass: "text-red-500" };
        case 5: return { variant: "destructive", label: "Very Unhealthy", textColorClass: "text-purple-500" };
        case 6: return { variant: "destructive", label: "Hazardous", textColorClass: "text-fuchsia-800" };
        default: return { variant: "default", label: "Unknown", textColorClass: "" };
    }
};

const getDefraAqiInfo = (index: number): { variant: BadgeProps["variant"], label: string, textColorClass: string } => {
    if (index >= 1 && index <= 3) return { variant: "default", label: "Low", textColorClass: "text-green-500" };
    if (index >= 4 && index <= 6) return { variant: "secondary", label: "Moderate", textColorClass: "text-yellow-500" };
    if (index >= 7 && index <= 9) return { variant: "destructive", label: "High", textColorClass: "text-red-500" };
    if (index === 10) return { variant: "destructive", label: "Very High", textColorClass: "text-purple-500" };
    return { variant: "default", label: "Unknown", textColorClass: "" };
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
  
  const { location, current, forecast } = data;
  const usEpaAqi = current.air_quality["us-epa-index"];
  const usEpaAqiInfo = getAqiInfo(usEpaAqi);
  const gbDefraAqi = current.air_quality["gb-defra-index"];
  const gbDefraAqiInfo = getDefraAqiInfo(gbDefraAqi);


  const pollutantData = [
    { name: "PM2.5", value: current.air_quality.pm2_5, fill: "var(--color-pm2_5)" },
    { name: "PM10", value: current.air_quality.pm10, fill: "var(--color-pm10)" },
    { name: "NO₂", value: current.air_quality.no2, fill: "var(--color-no2)" },
    { name: "O₃", value: current.air_quality.o3, fill: "var(--color-o3)" },
    { name: "SO₂", value: current.air_quality.so2, fill: "var(--color-so2)" },
    { name: "CO", value: current.air_quality.co, fill: "var(--color-co)" },
  ];

  const hourlyData = forecast.forecastday[0].hour.map(h => ({
      time: format(new Date(h.time), "ha"),
      temp: h.temp_c
  }));
  
  const forecastChartData = forecast.forecastday.map(day => ({
    name: format(new Date(day.date), "EEE"),
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
  }));
  
  const chartConfig = {
    value: { label: "µg/m³" },
    pm2_5: { label: "PM2.5", color: "hsl(var(--chart-1))" },
    pm10: { label: "PM10", color: "hsl(var(--chart-2))" },
    no2: { label: "NO₂", color: "hsl(var(--chart-3))" },
    o3: { label: "O₃", color: "hsl(var(--chart-4))" },
    so2: { label: "SO₂", color: "hsl(var(--chart-5))" },
    co: { label: "CO", color: "hsl(var(--accent))" },
  }
   const hourlyChartConfig = {
    temp: {
      label: "Temp.",
      color: "hsl(var(--chart-1))",
    },
  }
  
  const forecastChartConfig = {
    maxTemp: { label: "Max Temp", color: "hsl(var(--chart-1))" },
    minTemp: { label: "Min Temp", color: "hsl(var(--chart-2))" },
  };

  const getWeatherIcon = (condition: string, isDay: number) => {
    const conditionText = condition.trim();
    if (conditionText === "Clear" && !isDay) {
        return weatherIcons["Clear"];
    }
    if (conditionText === "Sunny" && !isDay) {
        return weatherIcons["Clear"];
    }
    return weatherIcons[conditionText] || <Sun className="h-10 w-10 text-yellow-400" />;
  }

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20 animate-in fade-in-50 duration-500">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-3xl font-bold font-headline">{location.name}, {location.region}, {location.country}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Lat: {location.lat}, Lon: {location.lon} &bull; Timezone: {location.tz_id}
        </CardDescription>
        <LocationClock initialTimeEpoch={location.localtime_epoch} />
        <CardDescription className="text-lg">{current.condition.text}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-start">
              <span className="text-8xl font-bold">{Math.round(current.temp_c)}</span>
              <span className="text-3xl font-medium mt-2">°C</span>
            </div>
            {getWeatherIcon(current.condition.text, current.is_day)}
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-md">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Thermometer className="h-5 w-5" />
                <span>Feels like</span>
                <span className="font-semibold text-foreground">{Math.round(current.feelslike_c)}°C</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Droplets className="h-5 w-5" />
                <span>Humidity</span>
                <span className="font-semibold text-foreground">{current.humidity}%</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wind className="h-5 w-5" />
                <span>Wind</span>
                <span className="font-semibold text-foreground">{current.wind_kph} km/h</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Compass className="h-5 w-5" />
                <span>Direction</span>
                <span className="font-semibold text-foreground">{current.wind_dir}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="h-5 w-5" />
                <span>Pressure</span>
                <span className="font-semibold text-foreground">{current.pressure_mb} mb</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CloudRain className="h-5 w-5" />
                <span>Precip.</span>
                <span className="font-semibold text-foreground">{current.precip_mm} mm</span>
              </div>
               <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-5 w-5" />
                <span>Visibility</span>
                <span className="font-semibold text-foreground">{current.vis_km} km</span>
              </div>
               <div className="flex items-center gap-2 text-muted-foreground">
                <Sun className="h-5 w-5" />
                <span>UV Index</span>
                <span className="font-semibold text-foreground">{current.uv}</span>
              </div>
          </div>
        </div>
        
        <Separator className="my-6" />
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sunrise className="h-6 w-6" />
              <span>Sunrise:</span>
              <span className="font-semibold text-foreground">{forecast.forecastday[0].astro.sunrise}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sunset className="h-6 w-6" />
              <span>Sunset:</span>
              <span className="font-semibold text-foreground">{forecast.forecastday[0].astro.sunset}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Moon className="h-6 w-6" />
                <span>Moon:</span>
                <span className="font-semibold text-foreground">{forecast.forecastday[0].astro.moon_phase}</span>
            </div>
        </div>
        <Separator className="my-6" />

        <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 font-headline">Air Quality Index</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="font-bold">US-EPA:</span>
                    <span className={`text-2xl font-bold ${usEpaAqiInfo.textColorClass}`}>{usEpaAqi}</span>
                    <Badge variant={usEpaAqiInfo.variant} className="px-3 py-1 text-sm font-semibold">
                    {usEpaAqiInfo.label}
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold">GB-DEFRA:</span>
                    <span className={`text-2xl font-bold ${gbDefraAqiInfo.textColorClass}`}>{gbDefraAqi}</span>
                    <Badge variant={gbDefraAqiInfo.variant} className="px-3 py-1 text-sm font-semibold">
                    {gbDefraAqiInfo.label}
                    </Badge>
                </div>
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
           <h3 className="text-xl font-semibold mb-4 text-center font-headline">Hourly Forecast</h3>
            <ChartContainer config={hourlyChartConfig} className="w-full h-[200px]">
                <AreaChart
                    accessibilityLayer
                    data={hourlyData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                    dataKey="temp"
                    type="natural"
                    fill="var(--color-temp)"
                    fillOpacity={0.4}
                    stroke="var(--color-temp)"
                    stackId="a"
                    />
                </AreaChart>
            </ChartContainer>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="text-xl font-semibold mb-4 text-center font-headline">3-Day Forecast</h3>
           <ChartContainer config={forecastChartConfig} className="w-full h-[200px]">
              <BarChart data={forecastChartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="maxTemp" fill="var(--color-maxTemp)" radius={4} />
                <Bar dataKey="minTemp" fill="var(--color-minTemp)" radius={4} />
              </BarChart>
            </ChartContainer>
        </div>

      </CardContent>
    </Card>
  );
}
