
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck, Sparkles, Star, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const plans = [
    {
        name: "Lifetime Deal",
        price: "$29",
        priceDetails: "/ one-time",
        description: "Unlimited access to all features, forever. One-time payment.",
        features: [
            "Unlimited Email Validation",
            "Unlimited List Cleaning",
            "Unlimited Email Extraction",
            "Unlimited Spam Checking",
            "Unlimited Lead Generation",
            "All Future Tools Included",
            "Lifetime Updates & Support",
        ],
        cta: "Upgrade for Life",
        planId: "lifetime",
        isPrimary: true,
    }
];

export default function PricingPage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const getButton = (plan: typeof plans[0]) => {
    if (plan.planId === 'lifetime') {
        if (loading) {
            return <Button className="w-full" size="lg" disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading...</Button>
        }
        if (user?.plan === 'Lifetime') {
            return <Button className="w-full" size="lg" disabled>You have Lifetime Access</Button>
        }
        if (!user) {
             return (
                <Button asChild className="w-full" size="lg">
                    <Link href="/auth"><Zap className="mr-2 h-4 w-4" />Sign In to Upgrade</Link>
                </Button>
             )
        }
        return (
            <Button 
                className="w-full" 
                size="lg"
                disabled
            >
             Coming Soon
            </Button>
        );
    }

    return null;
  }


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-headline">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upgrade to a lifetime plan with a single purchase to unlock all features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-md mx-auto items-start pt-8 w-full">
            {plans.map(plan => (
                <Card 
                    key={plan.planId} 
                    className={cn(
                        "flex flex-col h-full", 
                        plan.isPrimary && "border-primary shadow-2xl shadow-primary/20 relative"
                    )}
                >
                    {plan.isPrimary && (
                        <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                            <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                <span>Best Value</span>
                            </div>
                        </div>
                    )}
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold font-headline">{plan.name}</CardTitle>
                         <div className="flex items-baseline justify-center gap-1 mt-4">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">{plan.priceDetails}</span>
                        </div>
                        <CardDescription className="pt-2">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-4">
                            {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                            </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="flex-col items-center pt-6">
                        {getButton(plan)}
                         {plan.planId === 'lifetime' && (
                             <div className="flex items-center text-xs text-muted-foreground mt-4 h-6">
                                {user && user.plan !== 'Lifetime' && (
                                     <>
                                        <ShieldCheck className="h-4 w-4 mr-1.5" />
                                        <span>Secure one-time payment.</span>
                                     </>
                                )}
                            </div>
                         )}
                    </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </main>
  );
}
