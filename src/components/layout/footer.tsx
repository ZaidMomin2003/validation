'use client';

import Logo from '@/components/logo'
import Link from 'next/link'
import { NewsletterForm } from './newsletter-form';

const links = [
    {
        title: 'Pricing',
        href: '/pricing',
    },
    {
        title: 'Blog',
        href: '/blogs',
    },
    {
        title: 'Extract Emails',
        href: '/Email-extract',
    },
    {
        title: 'Spam Checker',
        href: '/check-spam',
    },
    {
        title: 'Terms',
        href: '/terms',
    },
    {
        title: 'Privacy',
        href: '/privacy',
    },
    {
        title: 'Delivery',
        href: '/delivery',
    },
    {
        title: 'Support',
        href: '/support',
    },
    {
        title: 'Feedback',
        href: '/feedback',
    },
]

export default function Footer() {
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                
                <NewsletterForm />

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                 <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto my-12 block size-fit">
                    <Logo />
                </Link>
                <div className="flex flex-col items-center gap-6">
                    <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Cleanmails, All rights reserved</span>
                </div>
            </div>
        </footer>
    )
}
