
'use client';

import { useState } from 'react';
import { LogoIcon } from '@/components/logo-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { auth } from '@/firebase/firebaseClient';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handlePasswordReset = async () => {
        if (!email) {
            toast({
                variant: 'destructive',
                title: 'Email Required',
                description: 'Please enter your email address.',
            });
            return;
        }

        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setEmailSent(true);
            toast({
                title: 'Password Reset Email Sent',
                description: `A reset link has been sent to ${email}. Please check your inbox.`,
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error Sending Email',
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <div className="m-auto h-fit w-full max-w-sm">
                <div className="p-8 pb-6 text-center">
                     <Link href="/" aria-label="go home" className="inline-block">
                        <LogoIcon />
                    </Link>
                    <h1 className="mb-1 mt-4 text-xl font-semibold">
                        {emailSent ? 'Check Your Inbox' : 'Forgot Password'}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {emailSent
                            ? `We've sent a password reset link to ${email}.`
                            : "Enter your email address and we'll send you a link to reset your password."}
                    </p>
                </div>
                
                <div className="bg-card rounded-lg border p-6 shadow-md">
                    {emailSent ? (
                        <div className="text-center">
                             <Button asChild className="w-full">
                                <Link href="/auth">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Sign In
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email-reset" className="block text-sm">
                                    Email
                                </Label>
                                <Input 
                                    type="email" 
                                    required 
                                    name="email" 
                                    id="email-reset" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>

                            <Button className="w-full" onClick={handlePasswordReset} disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                Send Reset Link
                            </Button>
                            <Button asChild variant="ghost" className="w-full">
                                <Link href="/auth">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Sign In
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
