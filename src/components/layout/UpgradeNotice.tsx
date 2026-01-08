
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

const lifetimeFeatures = [
    "Unlimited Email Validation",
    "Unlimited List Cleaning",
    "Unlimited Email Extraction",
    "Unlimited Spam Checking",
    "Unlimited Lead Generation",
    "All Future Tools Included",
    "Lifetime Updates & Support",
];

export default function UpgradeNotice() {
    return (
        <main className="flex flex-1 items-center justify-center p-4 md:p-8">
            <Card className="w-full max-w-lg text-center shadow-2xl shadow-primary/10 border-primary/20">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Your Free Trial Has Ended</CardTitle>
                    <CardDescription>
                        Upgrade to our Lifetime Deal to continue using all our powerful tools without any limits.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg bg-muted/50 p-6 text-left">
                        <h4 className="mb-4 text-lg font-semibold flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-amber-400" />
                            What you get with the Lifetime Deal:
                        </h4>
                        <ul className="space-y-3">
                            {lifetimeFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="my-6">
                        <span className="text-5xl font-bold">$29</span>
                        <span className="text-muted-foreground">/ one-time payment</span>
                    </div>
                </CardContent>
                <div className="border-t p-6">
                    <Button asChild size="lg" className="w-full">
                        <Link href="/pricing">
                            Upgrade to Lifetime Deal
                        </Link>
                    </Button>
                </div>
            </Card>
        </main>
    );
}
