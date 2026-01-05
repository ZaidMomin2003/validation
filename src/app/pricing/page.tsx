
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
import { doc, updateDoc, getDoc, DocumentData, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const lifetimePlan = {
  name: "Lifetime Deal",
  price: 29,
  description: "Unlimited access to all features, forever. One-time payment.",
  features: [
    "Unlimited List Cleaning",
    "Unlimited Email Extraction",
    "Unlimited Spam Checking",
    "Unlimited Lead Generation",
    "All Future Tools Included",
    "Lifetime Updates & Support",
  ],
  cta: "Upgrade for Life",
  planId: "lifetime"
};

export default function PricingPage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [trialTimeLeft, setTrialTimeLeft] = useState('');

  useEffect(() => {
    if (user && user.plan === 'Trial' && user.trialEndsAt) {
      const trialEndDate = new Date(user.trialEndsAt);
      if (trialEndDate > new Date()) {
        setIsTrialActive(true);
        const updateTimer = () => {
          const now = new Date();
          const difference = trialEndDate.getTime() - now.getTime();
          if (difference > 0) {
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            setTrialTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
          } else {
            setIsTrialActive(false);
            setTrialTimeLeft('00:00:00');
          }
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [user]);


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

  const handlePayment = async () => {
    if (!user || !db) {
        router.push('/auth');
        return;
    }
    
    setIsLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      toast({
        variant: 'destructive',
        title: 'Payment Gateway Error',
        description: 'Failed to load Razorpay. Please check your network and try again.',
      });
      setIsLoading(false);
      return;
    }
    
    const userDocRef = doc(db, 'users', user.uid);
    let currentUserData: DocumentData;
    try {
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
            throw new Error('User profile not found.');
        }
        currentUserData = userDocSnap.data();
    } catch(e) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not retrieve user profile.' });
        setIsLoading(null);
        return;
    }

    try {
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: lifetimePlan.planId }),
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
        description: `Payment for ${lifetimePlan.name}`,
        order_id: order.id,
        handler: async function (response: any) {
            const newPlanData = {
              ...currentUserData,
              plan: "Lifetime",
            };

            updateDoc(userDocRef, newPlanData)
                .then(() => {
                    toast({
                        title: 'Payment Successful!',
                        description: `Thank you for your purchase. You now have lifetime access.`,
                    });
                    router.push('/bulk-validate');
                })
                .catch((serverError: any) => {
                    const permissionError = new FirestorePermissionError({
                        path: userDocRef.path,
                        operation: 'update',
                        requestResourceData: newPlanData,
                    });
                    errorEmitter.emit('permission-error', permissionError);
                     toast({
                        variant: "destructive",
                        title: "Update Failed",
                        description: "Your payment was successful, but we failed to update your plan. Please contact support.",
                    });
                });
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
        setIsLoading(false);
    }
  };


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-headline">
            Simple, One-Time Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get unlimited access to all current and future tools with a single purchase. No subscriptions, no hidden fees.
          </p>
        </div>
        
        {isTrialActive && (
          <div className="mx-auto max-w-md w-full">
            <Card className="bg-primary/10 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle>Your Free Trial is Active!</CardTitle>
                <CardDescription>You have unlimited access to all features.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">Time Remaining:</p>
                  <p className="text-4xl font-bold font-mono text-primary">{trialTimeLeft}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start pt-8">
          <Card className="flex flex-col h-full border-primary shadow-2xl relative md:col-span-2">
            <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>Best Value</span>
                </div>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-headline">{lifetimePlan.name}</CardTitle>
              <div className="flex items-baseline justify-center gap-2 mt-4">
                <span className="text-4xl font-bold">${lifetimePlan.price}</span>
                <span className="text-muted-foreground">/ one-time payment</span>
              </div>
              <CardDescription className="pt-2">{lifetimePlan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {lifetimePlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex-col items-center pt-6">
              <Button 
                className="w-full max-w-xs" 
                size="lg"
                disabled={isLoading || user?.plan === 'Lifetime'}
                onClick={handlePayment}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (user?.plan === 'Lifetime' ? 'You have Lifetime Access' : lifetimePlan.cta) }
              </Button>
              <div className="flex items-center text-xs text-muted-foreground mt-4 h-6">
                  <ShieldCheck className="h-4 w-4 mr-1.5" />
                  <span>Guaranteed safe and secure checkout. Powered by Razorpay.</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        {user?.plan !== 'Lifetime' && !isTrialActive && (
          <div className="max-w-4xl mx-auto w-full pt-8">
            <Card className="bg-muted/30">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
                <div>
                  <h3 className="text-lg font-semibold">New to Cleanmails?</h3>
                  <p className="text-muted-foreground mt-1">
                    Sign up today and get a 1-day free trial with unlimited access. No credit card required.
                  </p>
                </div>
                <Button asChild className="w-full md:w-auto flex-shrink-0">
                  <Link href="/auth">
                    <Zap className="mr-2 h-4 w-4" />
                    Start Your Free Trial
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        )}

      </div>
    </main>
  );
}
