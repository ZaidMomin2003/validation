

'use client';

import { useState, useEffect } from 'react';
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
        <div className="w-full h-64 bg-zinc-800/60 rounded p-2 text-base text-zinc-400 overflow-hidden">
            <p>Paste your unstructured or scraped text here. For example, you can reach our team at <mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">contact@example.com</mark>. For support inquiries, please use <mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">support@example.com</mark>. Our developer is <mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">dev-team@corp.net</mark>.</p>
        </div>
        <div className="flex justify-center my-3">
            <div className="w-px h-6 bg-gradient-to-b from-primary/50 to-transparent"></div>
        </div>
        <div className="w-full bg-zinc-800/60 rounded p-2 text-sm flex flex-wrap gap-1">
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
        <div className="w-full h-full mt-2 bg-zinc-800/60 rounded p-2 text-xs text-zinc-400 overflow-auto">
            <p>Dear Friend,</p>
            <br />
            <p>Don't miss this <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">amazing</mark> deal. This is a <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">once in a lifetime</mark> opportunity to get a <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">free gift</mark> with your purchase. Our product is <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">guaranteed</mark> to change your life!</p>
            <br />
            <p>This is not <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">spam</mark>. <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">Click here</mark> to claim your <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">prize</mark> and see the <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">unbelievable</mark> results for yourself. This is a <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">risk-free</mark> offer with no hidden charges.</p>
             <br />
             <p>Sincerely,</p>
             <p>The Marketing Team</p>
        </div>
        <div className="mt-3">
            <p className="text-xs text-red-400 text-center">10 Spam Words Detected</p>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-1">
                <div className="bg-red-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
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
        className="w-full h-full p-4 bg-zinc-900/50 rounded-lg border border-zinc-700/50 flex flex-col justify-center text-xs font-mono"
    >
        <div className="bg-zinc-800/60 rounded-lg p-2 text-zinc-400 shadow-inner">
            <p className="text-zinc-500 text-center mb-1"># messy-data.csv</p>
            <div className="grid grid-cols-[1fr_2fr] gap-x-2 text-zinc-300 border-b border-zinc-700/80 pb-1">
                <p>Name</p><p>Emails</p>
            </div>
             <div className="grid grid-cols-[1fr_2fr] gap-x-2 mt-1">
                <p>Company A</p><p>"<mark className="bg-primary/20 text-primary-foreground rounded-sm">sales@a.com</mark>, <mark className="bg-primary/20 text-primary-foreground rounded-sm">support@a.com</mark>"</p>
            </div>
        </div>
         <div className="flex justify-center my-3">
             <motion.div 
                initial={{ rotate: 90, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                className="w-px h-6 bg-gradient-to-b from-primary/80 to-transparent"
             >
                <div className="text-primary -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 rotate-90">➔</div>
             </motion.div>
        </div>
        <div className="bg-zinc-800/60 rounded-lg p-2 text-zinc-400 shadow-inner">
            <p className="text-zinc-500 text-center mb-1"># cleaned-data.csv</p>
            <div className="grid grid-cols-[1fr_2fr] gap-x-2 text-zinc-300 border-b border-zinc-700/80 pb-1">
                <p>Name</p><p>Email</p>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-x-2 mt-1">
                <p>Company A</p><p>sales@a.com</p>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-x-2 mt-1">
                <p>Company A</p><p>support@a.com</p>
            </div>
        </div>
    </motion.div>
);


export function ToolsShowcase() {
    const [activeTool, setActiveTool] = useState(tools[0]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setActiveTool(prevTool => {
                const currentIndex = tools.findIndex(t => t.id === prevTool.id);
                const nextIndex = (currentIndex + 1) % tools.length;
                return tools[nextIndex];
            });
        }, 5000); // Change tool every 5 seconds

        return () => clearInterval(interval);
    }, [isHovered]);

  return (
    <section 
        className="py-16 md:py-24 text-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
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
            <div className="relative h-[32rem] rounded-2xl bg-zinc-900 p-2 border border-zinc-800">
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
