
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals getting started.",
    features: [
      "300 Email Verifications / day",
      "300 Email Cleans / day",
      "Basic support",
    ],
    cta: "Current Plan",
    isCurrent: true,
  },
  {
    name: "Lifetime",
    price: "$49",
    description: "For power users and businesses.",
    features: [
      "Unlimited Email Verifications",
      "Unlimited Email Cleans",
      "Lifetime Access & Updates",
      "Priority Support",
    ],
    cta: "Upgrade to Lifetime",
    isCurrent: false,
    isFeatured: true,
  },
];

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-headline">
            The Right Plan for You
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're just starting out or need unlimited power, we have a plan that fits. Simple, one-time pricing for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn("flex flex-col h-full", plan.isFeatured && "border-primary shadow-2xl relative")}>
              {plan.isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Best Value
                    </div>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold font-headline">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-2 mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.name === "Lifetime" && <span className="text-muted-foreground">/ one-time</span>}
                </div>
                <CardDescription className="pt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  disabled={plan.isCurrent}
                  variant={plan.isFeatured ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
