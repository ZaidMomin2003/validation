
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldAlert, ShieldCheck, ShieldX, ListChecks, Star, ArrowRight, Zap } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SPAM_WORDS } from '@/lib/spam-words';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import Link from 'next/link';

type SpamResult = {
  score: number;
  verdict: 'Good' | 'High Risk' | 'Potential Issues';
  issues: string[];
};

const HighlightingInput = ({ value, onChange, placeholder, isTextarea = false }: { value: string, onChange: (value: string) => void, placeholder: string, isTextarea?: boolean }) => {
    const highlightedContent = useMemo(() => {
        if (!value) return <span className="text-muted-foreground">{placeholder}</span>;

        const regex = new RegExp(`\\b(${Array.from(SPAM_WORDS).join('|')})\\b`, 'gi');
        
        if (isTextarea) {
            return value.split('\n').map((line, lineIndex) => (
                <div key={lineIndex}>
                    {line.split(regex).map((part, index) =>
                        regex.test(part) && SPAM_WORDS.has(part.toLowerCase()) ? (
                            <mark key={index} className="bg-yellow-300 dark:bg-yellow-700 text-black dark:text-white rounded-sm px-0.5">
                                {part}
                            </mark>
                        ) : (
                            <React.Fragment key={index}>{part}</React.Fragment>
                        )
                    )}
                </div>
            ));
        }

        const parts = value.split(regex);
        return parts.map((part, index) =>
            regex.test(part) && SPAM_WORDS.has(part.toLowerCase()) ? (
                <mark key={index} className="bg-yellow-300 dark:bg-yellow-700 text-black dark:text-white rounded-sm px-0.5">
                    {part}
                </mark>
            ) : (
                <React.Fragment key={index}>{part}</React.Fragment>
            )
        );
    }, [value, placeholder, isTextarea]);

    const InputComponent = isTextarea ? 'textarea' : 'input';

    return (
        <div className="relative w-full">
            <div
                className={cn(
                    "w-full rounded-md border border-input bg-transparent px-3 py-2 text-base whitespace-pre-wrap break-words",
                    isTextarea ? "min-h-[250px]" : "h-10 flex items-center"
                )}
            >
                <div className="truncate">
                    {highlightedContent}
                </div>
            </div>
            <InputComponent
                value={value}
                onChange={(e: any) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    "absolute inset-0 w-full h-full bg-transparent text-transparent caret-foreground resize-none border-none p-3 text-base focus:outline-none",
                     isTextarea ? "" : "py-2"
                )}
            />
        </div>
    );
};


export default function SpamCheckerPage() {
  const [subject, setSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [result, setResult] = useState<SpamResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPromoDialog, setShowPromoDialog] = useState(false);

  useEffect(() => {
    // Cleanup timer if component unmounts
    return () => {
      // This is a placeholder for a potential timer cleanup
    };
  }, []);

  const detectedSpamWords = useMemo(() => {
    const content = `${subject} ${emailContent}`.toLowerCase();
    const detected: Set<string> = new Set();
    
    if(!content) return [];

    SPAM_WORDS.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(content)) {
        detected.add(word);
      }
    });

    return Array.from(detected);
  }, [subject, emailContent]);

  const calculateSpamScore = (): SpamResult => {
    let score = 10;
    const issues: string[] = [];

    if (detectedSpamWords.length > 0) {
        score -= detectedSpamWords.length * 0.5;
        issues.push(`Found ${detectedSpamWords.length} potential spam trigger words. Try to replace them with more neutral language.`);
    }

    if (subject.match(/!{2,}|(\?|!)\s*(\?|!)/g)) {
        score -= 1.5;
        issues.push("Subject line contains excessive or repeated punctuation (e.g., '!!', '?!').");
    }

    if (emailContent.toUpperCase() === emailContent && emailContent.length > 50) {
        score -= 3;
        issues.push("Email body contains excessive use of uppercase letters (ALL CAPS).");
    }
    if ((emailContent.match(/href/g) || []).length > 5) {
        score -= 1.5;
        issues.push("Contains a high number of links, which can appear suspicious.");
    }
     if (!emailContent.toLowerCase().includes("unsubscribe")) {
        score -= 2.5;
        issues.push("Missing an unsubscribe link. This is a major red flag for spam filters and is often legally required.");
    }

    score = Math.max(0, score);
    
    let verdict: SpamResult['verdict'] = 'Good';
    if (score < 5) {
        verdict = 'High Risk';
    } else if (score < 8) {
        verdict = 'Potential Issues';
    }

    return { score, verdict, issues };
  };

  const handleCheckSpam = () => {
    if (!emailContent) return;
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
        const spamResult = calculateSpamScore();
        setResult(spamResult);
        setIsLoading(false);

        // Trigger the promo dialog 3 seconds after results are shown
        setTimeout(() => {
            setShowPromoDialog(true);
        }, 3000);

    }, 1500);
  };
  
  const getScoreColor = (score: number) => {
    if (score < 5) return 'text-red-500';
    if (score < 8) return 'text-yellow-500';
    return 'text-green-500';
  }

  const renderResult = () => {
    if (!result) return null;

    let VerdictIcon = ShieldCheck;
    let verdictColor = 'text-green-500';
    if (result.verdict === 'High Risk') {
        VerdictIcon = ShieldX;
        verdictColor = 'text-red-500';
    } else if (result.verdict === 'Potential Issues') {
        VerdictIcon = ShieldAlert;
        verdictColor = 'text-yellow-500';
    }

    return (
        <Card className="md:col-span-3 bg-card/5 border-white/10 text-white">
            <CardHeader>
                <CardTitle className="text-2xl">Analysis Complete</CardTitle>
                <CardDescription>Here's the breakdown of your email's spam score.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Spam Score</p>
                        <p className={`text-7xl font-bold ${getScoreColor(result.score)}`}>
                            {result.score.toFixed(1)}/10
                        </p>
                    </div>
                     <div className="text-center">
                        <p className="text-sm text-muted-foreground">Verdict</p>
                        <div className={`flex items-center gap-2 text-2xl font-bold ${verdictColor}`}>
                            <VerdictIcon className="h-8 w-8" />
                            <span>{result.verdict}</span>
                        </div>
                    </div>
                </div>
                <Progress value={result.score * 10} className="h-3" />
                
                {result.issues.length > 0 && (
                    <Alert>
                        <ListChecks className="h-4 w-4" />
                        <AlertTitle>Recommendations for Improvement</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc list-inside space-y-1 mt-2">
                                {result.issues.map((issue, index) => (
                                    <li key={index}>{issue}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}
                 {result.issues.length === 0 && (
                    <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <AlertTitle className="text-green-700 dark:text-green-300">Looking Good!</AlertTitle>
                        <AlertDescription className="text-green-600 dark:text-green-400">
                            Our checker didn't find any major spam-related issues.
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
  }

  const promoFeatures = [
    "Validate millions of emails via CSV/XLSX",
    "Clean messy lists with multiple emails per cell",
    "Real-time validation progress tracking",
    "Download detailed reports (Good, Risky, Bad)",
    "Securely store and manage lists",
    "Priority support"
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8">
        <div className="md:col-span-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Spam Checker
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            Analyze your email content to predict its spam score before you send it. Our tool highlights common trigger words and provides actionable recommendations.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto w-full">
            <Card className="md:col-span-2 bg-card/5 border-white/10 text-white">
            <CardHeader>
                <CardTitle>Email Content</CardTitle>
                <CardDescription>
                    Paste your email subject and body below to get an estimated spam score.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <HighlightingInput
                        value={subject}
                        onChange={setSubject}
                        placeholder="Your amazing email subject"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email-content">Email Body</Label>
                    <HighlightingInput
                        isTextarea
                        value={emailContent}
                        onChange={setEmailContent}
                        placeholder="Paste your full email content here..."
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleCheckSpam} disabled={isLoading || !emailContent}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <ShieldCheck className="mr-2 h-4 w-4" />
                    )}
                    Check Score
                </Button>
            </CardFooter>
            </Card>

             <Card className="bg-card/5 border-white/10 text-white">
                <CardHeader>
                    <CardTitle>Trigger Words Found</CardTitle>
                    <CardDescription>
                        These words may trigger spam filters. Try to replace them.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {detectedSpamWords.length > 0 ? (
                        <ScrollArea className="h-96">
                            <div className="flex flex-col gap-2">
                                {detectedSpamWords.map(word => (
                                    <Badge key={word} variant="destructive" className="w-fit">{word}</Badge>
                                ))}
                            </div>
                        </ScrollArea>
                    ) : (
                        <p className="text-sm text-muted-foreground">No spam words detected yet.</p>
                    )}
                </CardContent>
            </Card>
        
            {isLoading && (
                 <div className="flex items-center justify-center rounded-lg border border-dashed border-white/20 p-20 md:col-span-3">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p>Analyzing email content...</p>
                    </div>
                 </div>
            )}

            {result && renderResult()}
        </div>

      </div>

      <Dialog open={showPromoDialog} onOpenChange={setShowPromoDialog}>
        <DialogContent className="w-11/12 max-w-md rounded-lg bg-card/80 dark:bg-zinc-900/80 backdrop-blur-lg border-primary/20 text-white">
            <DialogHeader>
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <DialogTitle className="text-center text-2xl">Unlock the Full Power of Cleanmails</DialogTitle>
                <DialogDescription className="text-center">
                    This free checker is just the beginning. Get access to powerful bulk validation tools.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <ul className="space-y-2">
                    {promoFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <div className="!mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-center">
                    <div className="flex items-center justify-center gap-2 font-bold text-amber-400">
                        <Star className="h-5 w-5" />
                        Limited Time Lifetime Deal
                    </div>
                    <p className="mt-2 text-3xl font-bold">$69 <span className="text-base font-normal text-muted-foreground">one-time payment</span></p>
                </div>
            </div>
            <DialogFooter className="sm:justify-center">
                <Button asChild size="lg">
                    <Link href="/auth">
                        Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
