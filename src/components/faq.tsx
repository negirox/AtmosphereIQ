
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "What is a Safe AQI Level for Children?",
    answer:
      "For children, who are more vulnerable to air pollution, an AQI level between 0 and 50 (Good) is considered safe. When AQI levels are between 51 and 100 (Moderate), outdoor activities should be reduced, especially for those with respiratory issues. It's best to keep children indoors when the AQI exceeds 100.",
  },
  {
    question: "Top 5 Cities with Cleanest Air Today",
    answer:
      "Air quality changes daily based on weather and human activity. To find the cities with the cleanest air, you can check real-time AQI rankings on various environmental protection agency websites or use air quality monitoring apps. Typically, cities with more green space and less industrial activity rank higher.",
  },
  {
    question: "Weather vs. Air Pollution – Is There a Connection?",
    answer:
      "Yes, there is a strong connection. Weather patterns can significantly impact air pollution levels. For example, a lack of wind can cause pollutants to stagnate over an area, leading to higher AQI values. Rain can help wash away pollutants from the air, temporarily improving air quality. Temperature inversions can trap pollutants close to the ground, worsening air quality.",
  },
  {
    question: "How Does PM2.5 Affect Your Health?",
    answer:
      "PM2.5 refers to fine particulate matter with a diameter of 2.5 micrometers or less. These tiny particles can penetrate deep into the lungs and even enter the bloodstream. Long-term exposure to PM2.5 can lead to respiratory and cardiovascular problems, including asthma, heart attacks, and reduced lung function. It is one of the most dangerous air pollutants.",
  },
];

export default function Faq() {
  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline text-center">
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
