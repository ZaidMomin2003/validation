
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck, Star, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


declare global {
    interface Window {
        Razorpay: any;
    }
}

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
            "Priority Support for Life",
        ],
        cta: "Upgrade for Life",
        planId: "lifetime",
        isPrimary: true,
    }
];

export default function PricingPage() {
  const { user, loading: authLoading } = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handlePayment = async (plan: typeof plans[0]) => {
    if (!user || !db || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not process payment. User or configuration missing.' });
        return;
    }

    setIsProcessingPayment(true);

    try {
        const orderResponse = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan: plan.planId }),
        });

        if (!orderResponse.ok) {
            const errorData = await orderResponse.json();
            throw new Error(errorData.error || 'Failed to create payment order.');
        }
        
        const order = await orderResponse.json();
        
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Cleanmails',
            description: 'Lifetime Deal',
            image: '/logo-icon.png', // You should host a logo image in /public
            order_id: order.id,
            handler: async function (response: any) {
                const userDocRef = doc(db, 'users', user.uid);
                const newPlanData = { plan: 'Lifetime' };

                updateDoc(userDocRef, newPlanData)
                .then(() => {
                    toast({
                        title: 'Upgrade Successful!',
                        description: 'You now have lifetime access to all features.',
                    });
                    router.push('/email-validation');
                })
                .catch((serverError: any) => {
                    const permissionError = new FirestorePermissionError({
                        path: userDocRef.path,
                        operation: 'update',
                        requestResourceData: newPlanData,
                    });
                    errorEmitter.emit('permission-error', permissionError);
                });
            },
            prefill: {
                name: user.displayName || '',
                email: user.email || '',
            },
            theme: {
                color: '#E60023' // Your primary color
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Payment Error',
            description: error instanceof Error ? error.message : 'An unexpected error occurred.',
        });
    } finally {
        setIsProcessingPayment(false);
    }
  };


  const getButton = (plan: typeof plans[0]) => {
    if (plan.planId === 'lifetime') {
        if (authLoading) {
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
                onClick={() => handlePayment(plan)}
                disabled={isProcessingPayment}
            >
             {isProcessingPayment ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
             {plan.cta}
            </Button>
        );
    }

    return null;
  }


  return (
    <>
    <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-headline">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Your 24-hour trial gives you full access. After that, upgrade with a single purchase to unlock all features, forever.
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
                                        <span>Secure one-time payment via Razorpay.</span>
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
    </>
  );
}
