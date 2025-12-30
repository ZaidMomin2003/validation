
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck, Sparkles, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    name: "Lifetime Deal",
    price: 69,
    credits: 500000,
    description: "For power users and businesses. Limited time offer!",
    features: [
      "500,000 Verifications/Year",
      "Bulk List Cleaning",
      "Unlimited Email Extraction",
      "Priority Support",
      "Lifetime Access & Updates",
    ],
    cta: "Get the Deal",
    isCurrent: false,
    isFeatured: true,
    priceDetails: "/ lifetime",
    note: "Offer expires on January 10th!",
    planId: "lifetime"
  },
  {
    name: "Pay as you go",
    price: 19,
    credits: 50000,
    description: "For one-off validation needs.",
    features: [
      "50,000 Verifications",
      "Bulk List Cleaning",
      "Unlimited Email Extraction",
      "Standard Support",
      "Credits never expire"
    ],
    cta: "Get Started",
    isCurrent: false,
    priceDetails: "/ one-time",
    planId: "payg"
  },
];

const freePlan = {
  name: "Free Plan",
  price: 0,
  description: "For getting started and small projects.",
  features: [
    "1,000 Verifications/Month",
    "Spam Checker (Free Forever)",
    "Email Extractor (100k chars)",
    "Community Support",
  ],
  cta: "Start for Free",
  isCurrent: true,
};

export default function PricingPage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (plan: typeof plans[0]) => {
    if (!user) {
        router.push('/auth');
        return;
    }
    
    setIsLoading(plan.planId);

    const res = await loadRazorpay();
    if (!res) {
      toast({
        variant: 'destructive',
        title: 'Payment Gateway Error',
        description: 'Failed to load Razorpay. Please check your network and try again.',
      });
      setIsLoading(null);
      return;
    }

    try {
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan.planId }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order.');
      }
      
      const order = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Cleanmails',
        description: `Payment for ${plan.name}`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
             // Update user's plan in Firestore
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
              plan: plan.name,
              creditsTotal: plan.credits,
            });

            toast({
                title: 'Payment Successful!',
                description: `Thank you for your purchase. Your ${plan.name} is now active.`,
            });
            router.push('/lists');
          } catch (error: any) {
             toast({
                variant: 'destructive',
                title: 'Failed to Update Plan',
                description: 'Your payment was successful, but we failed to update your plan. Please contact support.',
            });
          }
        },
        prefill: {
          name: user.displayName || 'Cleanmails User',
          email: user.email,
        },
        theme: {
          color: '#3b82f6',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
          toast({
            variant: 'destructive',
            title: 'Payment Failed',
            description: response.error.description || 'Something went wrong during payment.',
          });
      });
      paymentObject.open();

    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: error.message || 'Could not initiate the payment process.',
      });
    } finally {
        setIsLoading(null);
    }
  };


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
                  <span className="text-4xl font-bold">${plan.price}</span>
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
                  disabled={plan.isCurrent || isLoading === plan.planId}
                  variant={plan.isFeatured ? "default" : "outline"}
                  onClick={() => handlePayment(plan)}
                >
                  {isLoading === plan.planId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : plan.cta}
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
                    ${freePlan.price}
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
