'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FaqSection() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'How accurate is the email validation?',
            answer: 'Our service uses a multi-layered approach, including syntax checks, domain/MX record verification, and disposable email detection. This ensures a high level of accuracy for identifying valid and deliverable email addresses.',
        },
        {
            id: 'item-2',
            question: 'What types of emails are marked as "Bad"?',
            answer: '"Bad" emails include those with syntax errors, non-existent domains, typos in common domains (like \'gnail.com\'), and addresses from known disposable email providers.',
        },
        {
            id: 'item-3',
            question: 'Is it safe to upload my email lists?',
            answer: "Yes, absolutely. Your data is your property. We use secure, encrypted connections (HTTPS) for all data transfers. Your lists are processed in a secure environment and are never shared with any third parties.",
        },
        {
            id: 'item-4',
            question: 'How does the pricing work?',
            answer: 'We offer a free plan to get you started, a pay-as-you-go option for one-time needs, and a Lifetime Deal for power users. All paid plans come with a generous number of email verification credits.',
        },
        {
            id: 'item-5',
            question: 'Do you offer an API for developers?',
            answer: 'An API for developers is on our roadmap and will be available soon. This will allow you to integrate our validation service directly into your own applications and sign-up forms.',
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Find quick answers to common questions about our email validation service, features, and pricing.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8 text-center">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            href="/support"
                            className="text-primary font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
