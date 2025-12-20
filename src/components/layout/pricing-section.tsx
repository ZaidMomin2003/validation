'use client'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Cover } from '@/components/ui/cover';
import Image from 'next/image';

export default function PricingSection() {
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
                                <h3 className="text-2xl font-semibold">Lifetime Plan</h3>
                                <p className="mt-2 text-lg">For power users and businesses</p>
                                <span className="mb-6 mt-12 inline-block text-6xl font-bold">
                                    <span className="text-4xl">$</span>49
                                </span>
                                 <div className="flex justify-center">
                                    <Button
                                        asChild
                                        size="lg">
                                        <Link href="/pricing">Get started</Link>
                                    </Button>
                                </div>
                                 <p className="text-muted-foreground mt-12 text-sm">Includes : Unlimited validations, unlimited list cleaning, and lifetime updates.</p>
                            </div>
                            <div className="relative pt-12 md:pt-0 md:pl-12">
                                <ul
                                    role="list"
                                    className="space-y-4">
                                    {['Unlimited Email Verifications', 'Unlimited List Cleaning', 'Bulk CSV Processing', 'Priority Support'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-muted-foreground mt-6 text-sm">Stop worrying about credits. Get unlimited access to all features, forever.</p>
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
                                            <p className="font-semibold text-foreground">"An absolute game-changer. The lifetime deal is unbeatable for the value you get. Cleaned my lists in minutes!"</p>
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
