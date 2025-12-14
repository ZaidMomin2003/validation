'use client'
import React from 'react'
import { motion, type MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type Presets = 'fade-in' | 'fade-in-blur'

type TextEffectProps = {
    as?: React.ElementType
    preset?: Presets
    className?: string
    children: React.ReactNode
    speedSegment?: number
    delay?: number
    per?: 'word' | 'letter' | 'line'
}

const transitionVariants = {
    'fade-in': {
        item: {
            hidden: { opacity: 0 },
            visible: (i: number) => ({
                opacity: 1,
                transition: {
                    delay: i * 0.05,
                    duration: 0.5,
                    ease: 'linear',
                },
            }),
        },
    },
    'fade-in-blur': {
        item: {
            hidden: {
                opacity: 0,
                filter: 'blur(8px)',
            },
            visible: (i: number) => ({
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                    delay: i * 0.05,
                    duration: 0.5,
                },
            }),
        },
    },
}

export function TextEffect({
    as: Comp = 'div',
    preset = 'fade-in',
    className,
    children,
    delay = 0,
    per = 'word',
    speedSegment,
    ...props
}: TextEffectProps & MotionProps) {
    if (typeof children !== 'string') {
        return <div className={className}>{children}</div>
    }

    const words = children.split(' ')

    const items = per === 'letter' ? children.split('') : per === 'line' ? children.split('\n') : words

    return (
        <Comp
            className={cn(className)}
            {...props}>
            <motion.span
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: speedSegment ?? 0.05, delayChildren: delay } },
                }}>
                {items.map((item, index) => (
                    <motion.span
                        key={index}
                        variants={transitionVariants[preset].item}
                        className={cn('inline-block', per === 'line' && 'block')}
                        custom={index}>
                        {item}
                        {per !== 'line' && per !== 'letter' && <span>&nbsp;</span>}
                    </motion.span>
                ))}
            </motion.span>
        </Comp>
    )
}