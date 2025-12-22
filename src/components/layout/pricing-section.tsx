
'use client'
import { Button } from '@/components/ui/button'
import { Check, Star } from 'lucide-react'
import Link from 'next/link'
import { Cover } from '@/components/ui/cover';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
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
    return (
        <div className="relative py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-bold text-gray-200 md:text-4xl lg:text-5xl">Verify thousands of emails <Cover>At Sonic speed</Cover></h2>
                </div>
                <div className="mt-8 md:mt-20">
                    <div className="bg-card relative rounded-3xl border shadow-2xl shadow-zinc-950/5">
                        <div className="grid items-center gap-12 divide-y p-8 sm:p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
                            <div className="pb-12 text-center md:pb-0 md:pr-12">

                                <Tabs defaultValue="pro" onValueChange={setPlan} className="w-full max-w-xs mx-auto">
                                    <TabsList className="grid w-full grid-cols-2">
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
                                <p className={cn("text-amber-500 mt-4 text-xs font-semibold transition-opacity duration-300", plan === 'pro' ? 'opacity-100' : 'opacity-0')}>
                                    Offer expires on December 31st!
                                </p>
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
