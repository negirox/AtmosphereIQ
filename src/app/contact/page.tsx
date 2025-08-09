
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 bg-background text-foreground">
      <div className="w-full max-w-4xl">
        <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline text-center">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg text-muted-foreground text-center">
            <p>
              Have questions, feedback, or suggestions? We'd love to hear from you!
            </p>
            <div className="flex justify-center items-center gap-4">
                <Mail className="h-6 w-6" />
                <a href="mailto:support@atmosphereiq.com" className="font-semibold text-primary hover:underline">
                support@atmosphereiq.com
                </a>
            </div>
            <p>
              We are a small team dedicated to providing the best experience possible. We'll do our best to get back to you as soon as we can.
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
