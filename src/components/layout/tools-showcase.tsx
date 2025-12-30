
'use client';

import Link from 'next/link';
import { FileText, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const tools = [
  {
    icon: <FileText className="h-8 w-8 text-blue-400" />,
    title: 'Email Extractor',
    description: 'Paste any block of text and instantly pull out all the email addresses. Perfect for harvesting contacts from articles, documents, or logs.',
    href: '/Email-extract',
    bgColor: 'from-blue-900/40 to-blue-950/20',
    borderColor: 'border-blue-700/60',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-green-400" />,
    title: 'Spam Checker',
    description: 'Analyze your email subject and body for common trigger words. Improve your deliverability by avoiding spam filters before you send.',
    href: '/check-spam',
    bgColor: 'from-green-900/40 to-green-950/20',
    borderColor: 'border-green-700/60',
  },
];

export function ToolsShowcase() {
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      },
    },
  };

  return (
    <section className="py-16 md:py-24 text-white">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl">
            Powerful Free Tools
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Access our suite of free utilities to clean, analyze, and prepare your data. No sign-up required.
          </p>
        </div>
        <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
        >
          {tools.map((tool, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link href={tool.href} className="group block h-full">
                <div className={`relative h-full overflow-hidden rounded-2xl border p-8 bg-gradient-to-br transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20 ${tool.bgColor} ${tool.borderColor}`}>
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(120,119,198,0.15),_transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 border border-white/20">
                            {tool.icon}
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-gray-100">{tool.title}</h3>
                        <p className="mt-2 text-muted-foreground">{tool.description}</p>
                        <div className="mt-6 flex items-center gap-2 font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                            <span>Use Tool</span>
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

