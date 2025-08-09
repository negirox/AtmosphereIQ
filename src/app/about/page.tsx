
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 bg-background text-foreground">
      <div className="w-full max-w-4xl">
        <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline text-center">About AtmosphereIQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg text-muted-foreground text-center">
            <p>
              AtmosphereIQ is a sleek, SEO-optimized, and fully responsive web application that provides real-time localized weather and air quality (AQI) data for any location on Earth.
            </p>
            <p>
              Built with a clean UI and powered by free public APIs, AtmosphereIQ is perfect for users who care about the environment, health, and accurate weather forecasting. Our mission is to make complex environmental data easy to understand and accessible to everyone.
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
