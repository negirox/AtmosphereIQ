'use server';
/**
 * @fileOverview A weather fetching flow.
 * 
 * - fetchWeather - A function that fetches weather data from the WeatherAPI.
 * - WeatherInput - The input type for the fetchWeather function.
 * - WeatherOutput - The return type for the fetchWeather function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { format } from 'date-fns';

const WeatherInputSchema = z.object({
    city: z.string().describe('The city to fetch weather for.'),
});
export type WeatherInput = z.infer<typeof WeatherInputSchema>;

const WeatherOutputSchema = z.object({
    location: z.string(),
    temperature: z.number(),
    condition: z.string(),
    isDay: z.boolean(),
    humidity: z.number(),
    windSpeed: z.number(),
    aqi: z.number(),
    pollutants: z.object({
        pm25: z.number(),
        pm10: z.number(),
        no2: z.number(),
    }),
    forecast: z.array(z.object({
        day: z.string(),
        temp: z.number(),
        condition: z.string(),
    })),
});
export type WeatherOutput = z.infer<typeof WeatherOutputSchema>;




export async function fetchWeather(input: WeatherInput): Promise<WeatherOutput> {
    const encodedApiKey = process.env.WEATHER_API_KEY;
    if (!encodedApiKey) {
        throw new Error('WEATHER_API_KEY is not set');
    }

    const apiKey = Buffer.from(encodedApiKey, 'base64').toString('ascii');

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input.city}&days=3&aqi=yes`;
    
    const response = await fetch(url);
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Weather API error: ${response.statusText}`, errorText);
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

    return {
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
    };
} 

