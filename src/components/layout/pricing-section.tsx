
'use client'
import { Button } from '@/components/ui/button'
import { Check, Star } from 'lucide-react'
import Link from 'next/link'
import { Cover } from '@/components/ui/cover';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const features = {
    pro: [
        '500,000 Verifications/Year',
        'Bulk List Cleaning',
        'Bulk CSV Processing',
        'Priority Support',
        'Lifetime Access & Updates'
    ],
    payg: [
        '50,000 Verifications',
        'Bulk List Cleaning',
        'Bulk CSV Processing',
        'Standard Support',
        'Credits never expire'
    ]
};

export default function PricingSection() {
    const [plan, setPlan] = React.useState('pro');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date('2026-01-10T23:59:59') - +new Date();

            let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return newTimeLeft;
        };
        
        // Set initial time left to avoid hydration mismatch
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimerBox = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">{String(value).padStart(2, '0')}</div>
            <div className="text-xs uppercase">{label}</div>
        </div>
    );

    return (
        <div className="relative py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-bold text-gray-200 md:text-4xl lg:text-5xl">Verify thousands of emails <Cover>At Sonic speed</Cover></h2>
                </div>
                <div className="mt-8 md:mt-20">
                    <div className="bg-primary/10 relative rounded-3xl border border-primary/20 shadow-2xl shadow-blue-950/50">
                        <div className="grid items-center gap-12 divide-y divide-primary/20 p-8 sm:p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
                            <div className="pb-12 text-center md:pb-0 md:pr-12">

                                <Tabs defaultValue="pro" onValueChange={setPlan} className="w-full max-w-xs mx-auto">
                                    <TabsList className="grid w-full grid-cols-2 bg-primary/20 text-white/70">
                                        <TabsTrigger value="payg">Pay as you go</TabsTrigger>
                                        <TabsTrigger value="pro">Lifetime</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                
                                <div className='mt-8'>
                                    <div className="flex items-center justify-center gap-2">
                                        {plan === 'pro' && <Star className="h-6 w-6 text-amber-400" />}
                                        <h3 className="text-2xl font-semibold">{plan === 'pro' ? 'Lifetime Deal' : 'Pay As You Go'}</h3>
                                    </div>
                                    <p className="mt-2 text-lg text-muted-foreground">{plan === 'pro' ? 'For power users and businesses' : 'For one-off validation needs'}</p>
                                    <span className="mb-6 mt-4 inline-block text-6xl font-bold">
                                        <span className="text-4xl">$</span>{plan === 'pro' ? '69' : '19'}
                                        <span className={cn("text-lg font-normal text-muted-foreground", plan === 'pro' && 'line-through opacity-70 ml-2')}>$99</span>
                                    </span>
                                </div>

                                 <div className="flex justify-center">
                                    <Button
                                        asChild
                                        size="lg">
                                        <Link href="/pricing">Get started</Link>
                                    </Button>
                                </div>
                                <div className={cn("mt-4 text-xs font-semibold transition-opacity duration-300 min-h-[56px]", plan === 'pro' ? 'opacity-100' : 'opacity-0')}>
                                    {plan === 'pro' ? (
                                        <div className='space-y-2'>
                                            <p className='text-amber-500'>Offer ends in:</p>
                                            <div className="flex justify-center items-center gap-4 text-amber-400">
                                                <TimerBox value={timeLeft.days} label="Days" />
                                                <span className="text-2xl font-bold -translate-y-1">:</span>
                                                <TimerBox value={timeLeft.hours} label="Hours" />
                                                <span className="text-2xl font-bold -translate-y-1">:</span>
                                                <TimerBox value={timeLeft.minutes} label="Mins" />
                                                <span className="text-2xl font-bold -translate-y-1">:</span>
                                                <TimerBox value={timeLeft.seconds} label="Secs" />
                                            </div>
                                        </div>
                                    ) : (
                                        <span>&nbsp;</span>
                                    )}
                                </div>
                            </div>
                            <div className="relative pt-12 md:pt-0 md:pl-12">
                                <ul
                                    role="list"
                                    className="space-y-4">
                                    {(features[plan as keyof typeof features] || []).map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-4 text-primary" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-muted-foreground mt-6 text-sm">{plan === 'pro' ? 'Generous credits for all your validation needs, renewed annually.' : 'A one-time purchase for your immediate validation needs.'}</p>
                                <div className="mt-12 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src="https://picsum.photos/seed/testimonial/100/100"
                                            alt="User testimonial"
                                            width={48}
                                            height={48}
                                            className="h-12 w-12 rounded-full object-cover"
                                            data-ai-hint="person photo"
                                        />
                                        <div>
                                            <p className="font-semibold text-foreground">"An absolute game-changer. The Pro plan has incredible value for the price. Cleaned my lists in minutes!"</p>
                                            <p className="text-sm text-muted-foreground">- Sarah K., Marketing Manager</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
