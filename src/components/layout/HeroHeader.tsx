'use client'
import Link from 'next/link'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { PartyPopper } from 'lucide-react'

export const HeroHeader = () => {
    const [scrolled, setScrolled] = React.useState(false)
    const { user, loading } = useAuth()

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header className="fixed z-50 w-full">
             <div className="bg-primary text-primary-foreground">
                <Link href="/pricing" className="group">
                    <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-1.5 text-sm">
                        <PartyPopper className="mr-2 h-4 w-4" />
                        <span className="font-semibold md:hidden">New Year Offer: $29 Lifetime Deal!</span>
                        <span className="hidden font-semibold md:inline">New Year Special: Grab the $29 Lifetime Deal now!</span>
                    </div>
                </Link>
            </div>
            <nav
                className={cn('w-full border-b transition-colors duration-150', scrolled ? 'border-border bg-background/50 backdrop-blur-3xl' : 'border-transparent')}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex-1 flex items-center justify-start">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>
                        </div>
                        
                        <div className="absolute left-1/2 -translate-x-1/2">
                           {/* This space can be used for a centered logo on mobile if needed */}
                        </div>

                        <div className="flex flex-1 items-center justify-end">
                            <div className="flex w-full justify-end md:w-fit">
                                {loading ? null : user ? (
                                    <Button asChild size="sm">
                                        <Link href="/bulk-validate">
                                            <span>Go To App</span>
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button asChild size="sm">
                                        <Link href="/auth">
                                            <span>Try for free</span>
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
