'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, FileInput, Mail, ScanText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const tools = [
  {
    id: 'extractor',
    title: 'Email Extractor',
    description: 'Paste any unstructured text—from articles, logs, or documents—and our tool will instantly find and list every email address for you.',
    icon: <ScanText />,
    link: '/Email-extract'
  },
  {
    id: 'spam-checker',
    title: 'Spam Word Analysis',
    description: 'Check your email content against a comprehensive list of common spam trigger words. Improve your deliverability by cleaning up your copy before you send.',
    icon: <CheckCircle />,
    link: '/check-spam'
  },
  {
    id: 'cleaner',
    title: 'List Cleaner',
    description: 'Upload a sheet with multiple emails crammed into one cell. We automatically unpivot your data, creating a clean, structured list with one email per row.',
    icon: <FileInput />,
    link: '/bulk-validate',
  },
];

const ExtractorUI = () => (
    <motion.div 
        key="extractor"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full p-4 bg-zinc-900/50 rounded-lg border border-zinc-700/50 flex flex-col justify-center"
    >
        <div className="w-full h-32 bg-zinc-800/60 rounded p-2 text-xs text-zinc-400 overflow-hidden">
            <p>Paste your unstructured or scraped text here. For example, you can reach our team at <mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">contact@example.com</mark>. For support inquiries, please use <mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">support@example.com</mark>. Our developer is <mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">dev-team@corp.net</mark>.</p>
        </div>
        <div className="flex justify-center my-3">
            <div className="w-px h-6 bg-gradient-to-b from-primary/50 to-transparent"></div>
        </div>
        <div className="w-full bg-zinc-800/60 rounded p-2 text-xs flex flex-wrap gap-1">
            <Badge variant="secondary">contact@example.com</Badge>
            <Badge variant="secondary">support@example.com</Badge>
            <Badge variant="secondary">dev-team@corp.net</Badge>
        </div>
    </motion.div>
)

const SpamCheckUI = () => (
    <motion.div
        key="spam-checker"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full p-4 bg-zinc-900/50 rounded-lg border border-zinc-700/50 flex flex-col"
    >
        <p className="text-sm text-zinc-300">Subject: <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">Act now</mark>! <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">Limited time</mark> offer!</p>
        <div className="w-full h-full mt-2 bg-zinc-800/60 rounded p-2 text-xs text-zinc-400 overflow-hidden">
            <p>Don't miss this <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">amazing</mark> deal. Get a <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">free gift</mark> with your purchase. <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">Click here</mark> to claim your <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">prize</mark>.</p>
        </div>
        <div className="mt-3">
            <p className="text-xs text-red-400 text-center">6 Spam Words Detected</p>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-1">
                <div className="bg-red-500 h-1.5 rounded-full" style={{width: '40%'}}></div>
            </div>
        </div>
    </motion.div>
)

const CleanerUI = () => (
    <motion.div
        key="cleaner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full p-4 bg-zinc-900/50 rounded-lg border border-zinc-700/50 flex flex-col justify-center text-xs"
    >
        <div className="bg-zinc-800/60 rounded p-2 text-zinc-400 font-mono">
            <p className="text-zinc-500"># messy-data.csv</p>
            <p>Name,Emails</p>
            <p>Company A,"<mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">sales@a.com</mark>, <mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">support@a.com</mark>"</p>
        </div>
         <div className="flex justify-center my-2">
            <div className="w-px h-4 bg-gradient-to-b from-primary/50 to-transparent"></div>
        </div>
        <div className="bg-zinc-800/60 rounded p-2 text-zinc-400 font-mono">
            <p className="text-zinc-500"># cleaned-data.csv</p>
            <p>Name,Email</p>
            <p>Company A,sales@a.com</p>
            <p>Company A,support@a.com</p>
        </div>
    </motion.div>
);


export function ToolsShowcase() {
    const [activeTool, setActiveTool] = useState(tools[0]);

  return (
    <section className="py-16 md:py-24 text-white">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl">
            A Suite of Powerful Tools
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Access our free utilities to analyze, clean, and prepare your data for maximum deliverability.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative h-80 rounded-2xl bg-zinc-900 p-2 border border-zinc-800">
                <div className="w-full h-full rounded-lg bg-dot-white/[0.1]">
                    <AnimatePresence mode="wait">
                       {activeTool.id === 'extractor' && <ExtractorUI />}
                       {activeTool.id === 'spam-checker' && <SpamCheckUI />}
                       {activeTool.id === 'cleaner' && <CleanerUI />}
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex flex-col gap-6">
               {tools.map((tool) => (
                    <div
                        key={tool.id}
                        onMouseEnter={() => setActiveTool(tool)}
                        className={cn(
                            "p-6 rounded-lg cursor-pointer border-2 transition-all duration-300",
                            activeTool.id === tool.id ? 'bg-primary/10 border-primary/50' : 'border-transparent hover:bg-white/5'
                        )}
                    >
                         <Link href={tool.link}>
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                                    activeTool.id === tool.id ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/10 border-white/20 text-white'
                                )}>
                                    {tool.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-100">{tool.title}</h3>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {tool.description}
                            </p>
                        </Link>
                    </div>
               ))}
            </div>
        </div>
      </div>
    </section>
  );
}
