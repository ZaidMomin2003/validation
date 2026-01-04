'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import type { IconName } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FaqSection() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'bar-chart' as IconName,
            question: 'How accurate is the email validation?',
            answer: 'Our service uses a multi-layered approach, including syntax checks, domain/MX record verification, and disposable email detection. This ensures a high level of accuracy for identifying valid and deliverable email addresses.',
        },
        {
            id: 'item-2',
            icon: 'x-circle' as IconName,
            question: 'What types of emails are marked as "Bad"?',
            answer: '"Bad" emails include those with syntax errors, non-existent domains, typos in common domains (like \'gnail.com\'), and addresses from known disposable email providers.',
        },
        {
            id: 'item-3',
            icon: 'shield-check' as IconName,
            question: 'Is it safe to upload my email lists?',
            answer: "Yes, absolutely. Your data is your property. We use secure, encrypted connections (HTTPS) for all data transfers. Your lists are processed in a secure environment and are never shared with any third parties.",
        },
        {
            id: 'item-4',
            icon: 'credit-card' as IconName,
            question: 'How does the pricing work?',
            answer: 'We offer a free plan to get you started, a pay-as-you-go option for one-time needs, and a Lifetime Deal for power users. All paid plans come with a generous number of email verification credits.',
        },
        {
            id: 'item-5',
            icon: 'code' as IconName,
            question: 'Do you offer an API for developers?',
            answer: 'An API for developers is on our roadmap and will be available soon. This will allow you to integrate our validation service directly into your own applications and sign-up forms.',
        },
    ]

    return (
        <section className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can't find what you're looking for? Contact our{' '}
                                <Link
                                    href="/support"
                                    className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 text-left hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base text-muted-foreground">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
