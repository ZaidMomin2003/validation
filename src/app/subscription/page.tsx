
'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

const lifetimeFeatures = [
    "Unlimited Email Validation",
    "Unlimited List Cleaning",
    "Unlimited Email Extraction",
    "Unlimited Spam Checking",
    "Unlimited Lead Generation",
    "All Future Tools Included",
    "Priority Support for Life",
];


export default function SubscriptionPage() {
  const { user, loading } = useAuth();

  const renderTrialContent = () => {
    const trialEnds = user?.trialEndsAt ? new Date(user.trialEndsAt) : null;
    const isExpired = trialEnds ? trialEnds.getTime() < Date.now() : true;
    
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Your Current Plan</CardTitle>
                <div className="flex justify-center pt-2">
                    <Badge variant="secondary" className="text-base">Free Trial</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <Card className="bg-muted/50 border-border/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Trial Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isExpired ? (
                            <p className="text-destructive font-semibold">Your free trial has expired.</p>
                        ) : (
                            <p className="text-muted-foreground">
                                Your free trial ends in {formatDistanceToNow(trialEnds!, { addSuffix: true })}. 
                                Upgrade now to keep uninterrupted access.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </CardContent>
            <CardFooter className="flex-col gap-4 p-6 border-t">
                <h3 className="text-lg font-semibold text-center">Ready to unlock everything?</h3>
                <Button asChild size="lg">
                    <Link href="/pricing">
                        <Zap className="mr-2 h-4 w-4" />
                        Upgrade to Lifetime Deal
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
  };
  
  const renderLifetimeContent = () => (
    <Card className="w-full max-w-2xl bg-gradient-to-br from-primary/10 to-background border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader className="items-center text-center">
             <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-400/50 bg-amber-400/10 mb-4">
                <Star className="h-8 w-8 text-amber-400 fill-amber-400" />
            </div>
            <CardTitle className="text-2xl">You Have Lifetime Access!</CardTitle>
            <CardDescription>
                Thank you for being a lifetime member of Cleanmails.
            </CardDescription>
             <div className="flex justify-center pt-2">
                <Badge className="text-base bg-primary/20 text-primary-foreground hover:bg-primary/30">Lifetime Plan</Badge>
            </div>
        </CardHeader>
        <CardContent className="p-6">
            <h4 className="font-semibold mb-4 text-center">Your plan includes:</h4>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {lifetimeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter className="flex-col gap-4 p-6 border-t">
             <p className="text-sm text-muted-foreground text-center">You have full access to all tools and future updates. No further action is needed.</p>
             <Button asChild>
                <Link href="/email-validation">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
    </Card>
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 items-center">
      <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Subscription
          </h1>
          <p className="text-muted-foreground">
            Manage your plan and billing details.
          </p>
        </div>

        <div className="mt-8 w-full flex justify-center">
            {loading ? (
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading your subscription details...</p>
                </div>
            ) : user?.plan === 'Lifetime' ? renderLifetimeContent() : renderTrialContent()}
        </div>
    </main>
  );
}
