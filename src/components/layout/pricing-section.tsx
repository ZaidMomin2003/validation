
'use client'
import { Button } from '@/components/ui/button'
import { Check, Star } from 'lucide-react'
import Link from 'next/link'
import { Cover } from '@/components/ui/cover';
import Image from 'next/image';
import React from 'react';

const features = {
    pro: [
        'Unlimited List Cleaning',
        'Unlimited Lead Generation',
        'Unlimited Email Extraction',
        'Unlimited Spam Checking',
        'Lifetime Access & Updates'
    ]
};

export default function PricingSection() {
    return (
        <div className="relative py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-bold text-gray-200 md:text-4xl lg:text-5xl">The only plan you'll ever need. <Cover>Unlimited access</Cover></h2>
                </div>
                <div className="mt-8 md:mt-20">
                    <div className="bg-white text-gray-800 relative rounded-3xl border border-primary/20 shadow-2xl shadow-blue-950/50">
                        <div className="grid items-center gap-12 divide-y divide-primary/20 p-8 sm:p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
                            <div className="pb-12 text-center md:pb-0 md:pr-12">
                                <div className='mt-8'>
                                    <div className="flex items-center justify-center gap-2">
                                        <Star className="h-6 w-6 text-amber-400" />
                                        <h3 className="text-2xl font-semibold text-gray-900">Lifetime Deal</h3>
                                    </div>
                                    <p className="mt-2 text-lg text-gray-500">One-time payment, unlimited features.</p>
                                    <span className="mb-6 mt-4 inline-block text-6xl font-bold text-gray-900">
                                        <span className="text-4xl">$</span>29
                                        <span className="text-lg font-normal text-gray-400 line-through opacity-70 ml-2">$99</span>
                                    </span>
                                </div>
                                <div className="flex justify-center">
                                    <Button asChild size="lg">
                                        <Link href="/pricing">Get Lifetime Access</Link>
                                    </Button>
                                </div>
                                <p className="mt-4 text-xs text-gray-500">New users get a 1-day free trial.</p>
                            </div>
                            <div className="relative pt-12 md:pt-0 md:pl-12">
                                <ul role="list" className="space-y-4 text-gray-700">
                                    {features.pro.map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <Check className="size-4 text-primary" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-500 mt-6 text-sm">Full access to all current and future tools with a single purchase.</p>
                                <div className="mt-12 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src="https://i.pravatar.cc/100?u=a042581f4e29026704d"
                                            alt="User testimonial"
                                            width={48}
                                            height={48}
                                            className="h-12 w-12 rounded-full object-cover"
                                            data-ai-hint="person photo"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">"An absolute game-changer. The lifetime deal has incredible value. Cleaned my lists in minutes!"</p>
                                            <p className="text-sm text-gray-500">- Sarah K., Marketing Manager</p>
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
