
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
            icon: 'wrench' as IconName,
            question: 'What does the "Clean List" tool do?',
            answer: 'It\'s designed for messy spreadsheets. If you have a file (CSV or XLSX) where multiple email addresses are stuck in a single cell (e.g., "email1@test.com, email2@test.com"), our tool automatically separates them, creating a clean, properly formatted list with one email per row.',
        },
        {
            id: 'item-2',
            icon: 'scan-text' as IconName,
            question: 'What is the Email Extractor for?',
            answer: 'The Email Extractor allows you to paste any block of unstructured text—from articles, web pages, or documents—and it will instantly find and list every email address within that text. It\'s a quick way to gather contacts without manual searching.',
        },
        {
            id: 'item-3',
            icon: 'shield-check' as IconName,
            question: 'How does the Spam Checker improve my emails?',
            answer: 'Our Spam Checker analyzes your email subject and body content against a comprehensive list of common spam trigger words. By identifying and highlighting these words, it helps you revise your copy to reduce the chances of landing in the spam folder and improve your overall deliverability.',
        },
        {
            id: 'item-4',
            icon: 'users' as IconName,
            question: 'How does the Lead Generation tool work?',
            answer: 'It helps you find professionals on LinkedIn by building advanced Google search queries. You can specify job titles, locations, and other keywords to generate a targeted search URL that uncovers public LinkedIn profiles, saving you time on prospecting.',
        },
        {
            id: 'item-5',
            icon: 'credit-card' as IconName,
            question: 'How does the pricing work?',
            answer: 'We offer a straightforward Lifetime Deal. This one-time purchase grants you full, permanent access to all our tools—including the List Cleaner, Lead Generator, Email Extractor, and Spam Checker—along with all future updates. There are no recurring subscriptions or hidden fees.',
        },
        {
            id: 'item-6',
            icon: 'lock' as IconName,
            question: 'Is it safe to upload my files and data?',
            answer: "Yes, absolutely. Your data is your property. We use secure, encrypted connections for all data transfers. Your files are processed securely and are never shared with any third parties or used for any other purpose.",
        },
         {
            id: 'item-7',
            icon: 'shield-check' as IconName,
            question: 'Is my payment information secure?',
            answer: 'Yes. We use Razorpay, a leading global payment gateway, to handle all transactions. Your payment information is encrypted and processed on their secure servers. We never see or store your card details. It is a safe and guaranteed checkout. You can learn more about Razorpay at their website.',
        },
    ]

    return (
        <section className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-3xl px-4 md:px-6 relative z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
                </div>
                
                <Accordion
                    type="single"
                    collapsible
                    className="mt-12 w-full space-y-2">
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

                <p className="text-muted-foreground mt-12 text-center">
                    Can't find what you're looking for? Contact our{' '}
                    <Link
                        href="/support"
                        className="text-primary font-medium hover:underline">
                        customer support team
                    </Link>
                </p>
            </div>
        </section>
    )
}
