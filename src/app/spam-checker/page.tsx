
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SpamResult = {
  score: number;
  verdict: 'Good' | 'High Risk' | 'Potential Issues';
  issues: string[];
};

export default function SpamCheckerPage() {
  const [subject, setSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [result, setResult] = useState<SpamResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateSpamScore = (): SpamResult => {
    let score = 10;
    const issues: string[] = [];

    // Basic checks for common spam triggers
    if (subject.match(/free|buy now|limited time|urgent|!/gi)) {
      score -= 2;
      issues.push("Subject line contains spammy words like 'free', 'buy now', or excessive punctuation.");
    }
    if (emailContent.match(/(\$|€|£)\d+/g)) {
      score -= 1;
      issues.push("Content includes currency symbols and prices, which can trigger filters.");
    }
    if (emailContent.toUpperCase() === emailContent && emailContent.length > 50) {
        score -= 3;
        issues.push("Email body contains excessive use of uppercase letters (ALL CAPS).");
    }
    if ((emailContent.match(/href/g) || []).length > 5) {
        score -= 1.5;
        issues.push("Contains a high number of links, which can appear suspicious.");
    }
     if (!emailContent.includes("unsubscribe")) {
        score -= 2;
        issues.push("Missing an unsubscribe link, which is a major red flag for spam filters.");
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

    // Simulate analysis delay
    setTimeout(() => {
        const spamResult = calculateSpamScore();
        setResult(spamResult);
        setIsLoading(false);
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
        <Card>
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
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle>Potential Issues Found</AlertTitle>
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

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Spam Checker
          </h1>
          <p className="text-muted-foreground">
            Analyze your email content to predict its spam score before you send it.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email Content</CardTitle>
            <CardDescription>
                Paste your email subject and body below to get an estimated spam score.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject"
                  placeholder="Your amazing email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
             </div>
             <div className="space-y-2">
                <Label htmlFor="email-content">Email Body</Label>
                <Textarea 
                    id="email-content"
                    placeholder="Paste your full email content here..."
                    className="min-h-[250px] text-base"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
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
        
        {isLoading && (
             <div className="flex items-center justify-center rounded-lg border border-dashed p-20">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>Analyzing email content...</p>
                </div>
             </div>
        )}

        {result && renderResult()}

      </div>
    </main>
  );
}
