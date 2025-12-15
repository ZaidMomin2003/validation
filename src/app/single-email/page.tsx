
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, ArrowUp, Loader2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { validate } from '@/lib/email-validator';

type ValidationResult = {
  status: 'Good' | 'Bad';
  notes: string;
  email: string;
};

export default function SingleEmailPage() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = async () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const validationResponse = await validate(
        [{ 'email': email }], 
        'email', 
        () => {} // No progress callback needed for single validation
      );

      if (validationResponse && validationResponse.data.length > 0) {
        const singleResult = validationResponse.data[0];
        setResult({
            status: singleResult.Status,
            notes: singleResult.Notes,
            email: email,
        });
      } else {
        throw new Error("Validation failed to return a result.");
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred during validation.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const isGood = result.status === 'Good';

    return (
        <Card className={isGood ? 'border-green-500' : 'border-red-500'}>
            <CardHeader>
                <div className="flex items-center gap-4">
                     {isGood ? (
                        <CheckCircle className="h-10 w-10 text-green-500 flex-shrink-0" />
                    ) : (
                        <XCircle className="h-10 w-10 text-red-500 flex-shrink-0" />
                    )}
                    <div>
                        <CardTitle className="text-2xl">{result.email}</CardTitle>
                        <CardDescription className={isGood ? 'text-green-600' : 'text-red-600'}>
                            Verdict: This email is <strong>{result.status}</strong>.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            {!isGood && result.notes && (
                <CardContent>
                    <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Reason</AlertTitle>
                        <AlertDescription>{result.notes}</AlertDescription>
                    </Alert>
                </CardContent>
            )}
        </Card>
    )
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Single Email Verification
          </h1>
          <p className="text-muted-foreground">
            Instantly check the validity of a single email address.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter Email Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <Input 
                type="email" 
                placeholder="example@example.com"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                    setResult(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
              />
              <Button onClick={handleValidate} disabled={isLoading}>
                 {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 ) : (
                    <ArrowUp className="mr-2 h-4 w-4 -rotate-45" />
                 )}
                Validate
              </Button>
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </CardContent>
        </Card>

        {isLoading && (
             <div className="flex items-center justify-center rounded-lg border border-dashed p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
        )}

        {renderResult()}
      </div>
    </main>
  );
}
