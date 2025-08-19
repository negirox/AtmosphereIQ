
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Mail, Package, Lightbulb, Bot, Code } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 bg-background text-foreground">
      <div className="w-full max-w-4xl space-y-8">
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
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline text-center">Explore More Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center justify-center gap-2">
                <Bot />
                <a href="https://mytoolhub.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">mytoolhub.vercel.app</a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Lightbulb />
                <a href="https://neon-ime.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">neon-ime.vercel.app</a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Code />
                <a href="https://algo-viz-nu.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">algo-viz-nu.vercel.app</a>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline text-center">Connect with Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
             <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center justify-center gap-2">
                  <Mail />
                  <a href="mailto:mukeshsingh.negi07@gmail.com" className="hover:text-primary hover:underline">mukeshsingh.negi07@gmail.com</a>
                </li>
                 <li className="flex items-center justify-center gap-2">
                   <Github />
                   <a href="https://github.com/negirox" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">github.com/negirox</a>
                </li>
                 <li className="flex items-center justify-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15 21h- collaborazione-rect-5v-6.97h2.86v-2.83h-2.86v-1.7c0-.77.22-1.3 1.3-1.3h1.49v-2.73h-2.14c-2.45 0-4.16 1.48-4.16 4.28v2.18h-2.1v2.83h2.1v6.97h-8v-21h21v21h-5zm-1-19h-9v19h9v-19z"/></svg>
                   <a href="https://stackoverflow.com/users/12437648/negi-rox" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">Stack Overflow: Negi-Rox</a>
                </li>
                 <li className="flex items-center justify-center gap-2">
                   <Package />
                   <a href="https://www.nuget.org/packages/XLExtension" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">NuGet Package: XLExtension</a>
                </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center pt-4">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
