import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

export const metadata: Metadata = {
  title: 'AtmosphereIQ',
  description: 'Real-time air quality and weather information for your location. Get current conditions, 3-day forecasts, and detailed pollutant data.',
  keywords: "weather, air quality, forecast, AQI, pollutants, temperature, humidity, wind, PM2.5, PM10, real-time weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Live Weather & Air Quality Tracker | {metadata?.title}</title>
        <meta name="description" content="Check real-time weather and air quality (AQI) for your location. See temperature, humidity, PM2.5, and more. Breathe easy with local air insights." />
        <meta name="keywords" content="Weather, Air Quality, AQI, PM2.5, Temperature, Local Forecast, Pollution, Health Air Index" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Real-Time Weather & Air Quality Tracker" />
        <meta property="og:description" content="Track weather and air pollution levels instantly." />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Live Weather & Air Quality Dashboard" />
        <meta name="twitter:description" content="See local AQI, temperature, and pollution levels." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
