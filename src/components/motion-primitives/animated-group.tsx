'use client'
import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'

export const AnimatedGroup = ({
    variants = {},
    className,
    children,
    ...props
}: {
    className?: string
    variants?: any
    children: React.ReactNode
}) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                container: {
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                },
                ...variants,
            }}
            className={cn(className)}
            {...props}>
            {React.Children.map(children, (child, i) => (
                <motion.div
                    key={i}
                    variants={variants.item}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    )
}
