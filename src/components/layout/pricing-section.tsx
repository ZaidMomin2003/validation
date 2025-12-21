
'use client'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Cover } from '@/components/ui/cover';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

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
                        <div className="grid items-center gap-12 divide-y p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
                            <div className="pb-12 text-center md:pb-0 md:pr-12">

                                <Tabs defaultValue="pro" onValueChange={setPlan} className="w-full max-w-xs mx-auto">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="payg">Pay as you go</TabsTrigger>
                                        <TabsTrigger value="pro">Pro Plan</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                
                                <div className='mt-8'>
                                    <h3 className="text-2xl font-semibold">{plan === 'pro' ? 'Pro Plan' : 'Pay As You Go'}</h3>
                                    <p className="mt-2 text-lg">{plan === 'pro' ? 'For power users and businesses' : 'For one-off validation needs'}</p>
                                    <span className="mb-6 mt-4 inline-block text-6xl font-bold">
                                        <span className="text-4xl">$</span>{plan === 'pro' ? '69' : '9'}
                                        {plan === 'pro' && <span className="text-lg font-normal text-muted-foreground">/year</span>}
                                    </span>
                                </div>

                                 <div className="flex justify-center">
                                    <Button
                                        asChild
                                        size="lg">
                                        <Link href="/pricing">Get started</Link>
                                    </Button>
                                </div>
                                 <p className="text-muted-foreground mt-12 text-sm">{plan === 'pro' ? 'Includes: 500,000 verifications per year, bulk cleaning, and priority support.' : 'Includes: 50,000 verifications. Credits do not expire. Use them when you need them.'}</p>
                            </div>
                            <div className="relative pt-12 md:pt-0 md:pl-12">
                                <ul
                                    role="list"
                                    className="space-y-4">
                                    {[
                                        '500,000 Verifications/Year', 
                                        'Bulk List Cleaning', 
                                        'Bulk CSV Processing', 
                                        'Priority Support'
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-muted-foreground mt-6 text-sm">Generous credits for all your validation needs, renewed annually.</p>
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
