
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Server, Mailbox, Send, Users, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Server className="h-8 w-8 text-primary" />,
    title: 'Dedicated SMTP Server',
    description: 'A private, powerful SMTP server configured for maximum deliverability and performance, giving you full control over your sending reputation.',
  },
  {
    icon: <Mailbox className="h-8 w-8 text-primary" />,
    title: '50 Ready-to-Send Mailboxes',
    description: 'We set up 50 individual mailboxes for you, primed and ready for your outreach campaigns from day one.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: '50 Warmed-Up Email Accounts',
    description: 'Each of your 50 accounts undergoes a professional warm-up process, building trust with ISPs to ensure your emails land in the inbox, not spam.',
  },
  {
    icon: <Send className="h-8 w-8 text-primary" />,
    title: 'High-Volume Sending Capacity',
    description: 'Your system will be optimized to reliably send up to 20,000 emails per day, allowing you to scale your outreach efforts without technical limitations.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Unlimited Lead Generation',
    description: 'Gain full access to our powerful lead generation tool to build targeted prospect lists from LinkedIn and other sources, with no restrictions.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'One-Time Ownership',
    description: 'No recurring fees. You own the entire infrastructure. We build it, configure it, and hand you the keys for a single, transparent price.',
  },
];

export default function EmailSystemPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="bg-muted/30">
        <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                The Ultimate Cold Emailing Infrastructure
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                Stop fighting deliverability issues and blacklists. We'll build and hand over a complete, high-performance email system designed for massive outreach, all for a one-time fee.
            </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <Card key={index} className="bg-card/50">
                    <CardHeader>
                        <div className="flex items-center justify-center h-16 w-16 bg-primary/10 rounded-xl mb-4">
                            {feature.icon}
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
      
      <div className="bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-16">
             <Card className="text-center p-8 md:p-12 shadow-2xl shadow-primary/10 border-primary/20">
                <CardTitle className="text-3xl">Get Your Complete Email System Today</CardTitle>
                <div className="my-6">
                    <span className="text-6xl font-bold">$999</span>
                    <span className="text-muted-foreground">/ one-time payment</span>
                </div>
                <CardContent className="max-w-xl mx-auto text-muted-foreground">
                    <p>
                        This is a complete handover. You get full ownership of a powerful, scalable email infrastructure built by experts, ready to fuel your growth.
                    </p>
                </CardContent>
                <Button size="lg" className="mt-4 text-lg h-14 px-10">
                    Book a Discovery Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Card>
        </div>
      </div>
    </main>
  );
}
