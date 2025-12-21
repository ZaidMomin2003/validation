
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

export function FaqSection() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'How accurate is the email validation?',
      answer:
        'Our service uses a multi-layered approach, including syntax checks, domain/MX record verification, and disposable email detection. This ensures a high level of accuracy for identifying valid and deliverable email addresses.',
    },
    {
      id: 'item-2',
      question: 'What types of emails are marked as "Bad"?',
      answer:
        'We mark emails as "Bad" if they have invalid syntax, belong to a non-existent or misconfigured domain (no MX records), or are from a known disposable email provider. We also flag role-based emails (e.g., support@, admin@).',
    },
    {
      id: 'item-3',
      question: 'Is it safe to upload my email lists?',
      answer:
        'Absolutely. Your data is processed securely and is never shared. All uploaded lists are stored privately in your account using Firestore\'s robust security rules, and you can delete them at any time.',
    },
    {
      id: 'item-4',
      question: 'How does the pricing work?',
      answer:
        'We offer two simple plans. The Pro Plan is a yearly subscription for $69 that gives you 500,000 verification credits annually. The Pay-as-you-go plan is a one-time purchase of $9 for 50,000 credits that never expire.',
    },
    {
      id: 'item-5',
      question: 'Do you offer an API for developers?',
      answer:
        'A public API is on our roadmap! We plan to allow developers to integrate our validation service directly into their own applications. Stay tuned for updates in our changelog.',
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold text-gray-200 md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Find quick answers to common questions about our email validation service, features, and pricing.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
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
              className="text-primary font-medium hover:underline"
            >
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
