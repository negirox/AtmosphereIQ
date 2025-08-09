
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 bg-background text-foreground">
      <div className="w-full max-w-4xl">
        <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline text-center">Privacy Policy</CardTitle>
             <CardDescription className="text-center">Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Your privacy is important to us. It is AtmosphereIQ's policy to respect your privacy regarding any information we may collect from you across our website.
            </p>
            <h3 className="font-bold text-xl text-foreground pt-4">Information We Collect</h3>
            <p>
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
            </p>
             <p>
               For the core functionality of this app, we use your browser's geolocation feature to determine your location. This is used solely to fetch weather and air quality data for your area and is not stored or tracked by us. If you use the search feature, the location you enter is used for the same purpose.
            </p>
            <h3 className="font-bold text-xl text-foreground pt-4">Third-Party Services</h3>
            <p>
              Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
            </p>
            <p>
              This site uses Google AdSense, a third-party advertising service. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet.
            </p>
             <div className="pt-6 text-center">
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
