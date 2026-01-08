
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Zap, Server, Mailbox, Send, Users, ArrowRight, Milestone, Calendar, Handshake, CreditCard, Award } from 'lucide-react';

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

const processSteps = [
    {
        icon: <Milestone className="h-6 w-6 text-primary" />,
        title: '1. Discovery Call',
        description: 'We start with a meeting to understand your goals and ensure this system is the perfect fit for your business.',
    },
    {
        icon: <CreditCard className="h-6 w-6 text-primary" />,
        title: '2. Project Kick-off (20% Payment)',
        description: 'A 20% down payment secures your spot and allows us to begin building and configuring your dedicated infrastructure.',
    },
     {
        icon: <Calendar className="h-6 w-6 text-primary" />,
        title: '3. Build & Warm-up (1-4 Weeks)',
        description: 'Your system is delivered in one week. We then begin the crucial 3-week email warm-up process to build sender reputation.',
    },
    {
        icon: <Award className="h-6 w-6 text-primary" />,
        title: '4. Final Handover (80% Payment)',
        description: 'Once warm-up is complete, we conduct a final training session and hand over full ownership after the final 80% payment.',
    }
]

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
        <div className="container mx-auto max-w-5xl px-4 py-16">
             <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Your Path to Email Mastery</h2>
                    <p className="text-muted-foreground">We follow a clear, transparent process to get you from our first conversation to full ownership of a powerful sending machine.</p>
                     <div className="space-y-8 relative before:absolute before:inset-y-0 before:w-px before:bg-primary/20 before:left-6">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative flex items-start gap-6">
                                <div className="h-12 w-12 rounded-full bg-background border border-primary/20 flex items-center justify-center flex-shrink-0">
                                    {step.icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">{step.title}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <Card className="text-center p-8 shadow-2xl shadow-primary/10 border-primary/20">
                    <CardTitle className="text-3xl">Get Your Complete System</CardTitle>
                     <div className="my-6">
                        <span className="text-6xl font-bold">$1199</span>
                        <span className="text-muted-foreground">/ one-time payment</span>
                    </div>
                    <CardContent className="text-muted-foreground text-sm">
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
      </div>
    </main>
  );
}
