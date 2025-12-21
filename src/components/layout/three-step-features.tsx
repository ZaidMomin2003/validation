
'use client';

import { motion } from 'framer-motion';
import { Columns, MailCheck, Download } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: <Columns className="h-8 w-8 text-blue-400" />,
    title: 'Unpivot and Clean Messy Lists',
    description:
      'Have a list with multiple emails crammed into one cell? Just upload it. Verilist automatically unnests, cleans, and structures your data into a clean, multi-row sheet, one email per row.',
  },
  {
    icon: <MailCheck className="h-8 w-8 text-green-400" />,
    title: 'Validate with Precision',
    description:
      'Our powerful validation engine checks for syntax errors, verifies domain and MX records, and flags disposable or role-based addresses to ensure your list is ready for outreach.',
  },
  {
    icon: <Download className="h-8 w-8 text-purple-400" />,
    title: 'Store and Download Anytime',
    description:
      'Your validated lists are securely stored in your account. Access and download your clean, ready-to-use CSV files anytime you need them, from any device.',
  },
];

export function ThreeStepFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          className="grid gap-12 md:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-start gap-8"
              variants={itemVariants}
            >
              <div className="relative flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                  {feature.icon}
                </div>
                 {index < features.length - 1 && (
                   <div className="absolute left-1/2 top-full mt-4 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-blue-400/50 via-green-400/50 to-purple-400/50 md:hidden" />
                )}
              </div>
              <div className="md:ml-4">
                <h3 className="text-xl font-bold text-gray-100">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
