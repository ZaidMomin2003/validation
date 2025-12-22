
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const plans = [
  {
    name: "Lifetime Deal",
    price: "$69",
    description: "For power users and businesses. Limited time offer!",
    features: [
      "500,000 Verifications/Year",
      "Bulk List Cleaning",
      "Bulk CSV Processing",
      "Priority Support",
      "Lifetime Access & Updates",
    ],
    cta: "Get the Deal",
    isCurrent: false,
    isFeatured: true,
    priceDetails: "/ lifetime",
    note: "Offer expires on December 31st!"
  },
  {
    name: "Pay as you go",
    price: "$19",
    description: "For one-off validation needs.",
    features: [
      "50,000 Verifications",
      "Bulk List Cleaning",
      "Bulk CSV Processing",
      "Standard Support",
      "Credits never expire"
    ],
    cta: "Get Started",
    isCurrent: false,
    priceDetails: "/ one-time"
  },
];

const freePlan = {
  name: "Free Plan",
  price: "$0",
  description: "For getting started and small projects.",
  features: [
    "1,000 Verifications/Month",
    "Bulk List Cleaning",
    "Bulk CSV Processing",
    "Community Support",
  ],
  cta: "Start for Free",
  isCurrent: true,
};

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-headline">
            The Right Plan for You
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you need ongoing verification or a one-time clean, we have a plan that fits. Simple, transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-start pt-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn("flex flex-col h-full", plan.isFeatured && "border-primary shadow-2xl relative")}>
              {plan.isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span>Best Value</span>
                    </div>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold font-headline">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-2 mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.priceDetails && <span className="text-muted-foreground">{plan.priceDetails}</span>}
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
              <CardFooter className="flex-col items-center pt-6">
                 {plan.note && <p className="text-xs text-amber-500 mb-4 font-semibold">{plan.note}</p>}
                <Button 
                  className="w-full" 
                  disabled={plan.isCurrent}
                  variant={plan.isFeatured ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
                <div className="flex items-center text-xs text-muted-foreground mt-4 h-6">
                    <ShieldCheck className="h-4 w-4 mr-1.5" />
                    <span>Guaranteed safe and secure checkout. Powered by Razorpay.</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto w-full pt-8">
          <Card className="bg-muted/30">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    <Sparkles className="h-4 w-4" />
                    {freePlan.name}
                </div>
                <p className="mt-4 text-lg font-semibold">{freePlan.description}</p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                    {freePlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
              </div>
              <div className="p-8 border-t md:border-t-0 md:border-l flex flex-col items-center justify-center text-center">
                  <p className="text-4xl font-bold">
                    {freePlan.price}
                    <span className="text-base font-normal text-muted-foreground">/ month</span>
                  </p>
                  <Button asChild className="mt-4 w-full max-w-xs">
                    <Link href="/auth">{freePlan.cta}</Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">No credit card required.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
