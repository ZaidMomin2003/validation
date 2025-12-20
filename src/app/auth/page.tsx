
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    GoogleAuthProvider, 
    signInWithPopup
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuthContext } from '@/firebase/provider';
import { LogoIcon } from '@/components/logo-icon';

export default function AuthPage() {
    const router = useRouter();
    const auth = useAuthContext();
    const { toast } = useToast();

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    
    const isLoading = isSigningIn || isSigningUp || isGoogleLoading;

    const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        setIsSigningIn(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/bulk-validate');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Sign In Failed',
                description: error.message,
            });
        } finally {
            setIsSigningIn(false);
        }
    };

    const handleEmailPasswordSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        if (password !== confirmPassword) {
            toast({
                variant: 'destructive',
                title: 'Passwords do not match',
                description: 'Please make sure your passwords match.',
            });
            return;
        }
        setIsSigningUp(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            toast({
                title: 'Verification Email Sent',
                description: 'A verification link has been sent to your email. Please verify before signing in.',
            });
            setIsSignUp(false); // Switch to sign-in view after successful sign-up
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: 'Sign Up Failed',
                description: error.message,
            });
        } finally {
            setIsSigningUp(false);
        }
    }

    const handleGoogleSignIn = async () => {
        if (!auth) return;
        setIsGoogleLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/bulk-validate');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Google Sign-In Failed',
                description: error.message,
            });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
            <main className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <LogoIcon containerSize={80} iconSize={48} />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">
                            {isSignUp ? 'Create an account' : 'Welcome back'}
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            {isSignUp ? "Let's get you started with Verilist" : "Let's get you in to Verilist"}
                        </p>
                    </div>

                    <form onSubmit={isSignUp ? handleEmailPasswordSignUp : handleEmailPasswordSignIn} className="mt-10 space-y-5">
                        <Input 
                            type="email" 
                            placeholder="Your Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 rounded-xl border-border bg-background px-4 text-base placeholder:text-muted-foreground"
                        />
                        <Input 
                            type="password" 
                            placeholder="Your Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 rounded-xl border-border bg-background px-4 text-base placeholder:text-muted-foreground"
                        />
                        {isSignUp && (
                             <Input 
                                type="password" 
                                placeholder="Confirm Password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="h-12 rounded-xl border-border bg-background px-4 text-base placeholder:text-muted-foreground"
                            />
                        )}
                        
                        {!isSignUp && (
                             <div className="pt-1 text-center">
                                <Button variant="link" size="sm" asChild className="p-0 text-foreground hover:text-foreground/80">
                                    <Link href="/auth/forgot-password">
                                        Forgot password?
                                    </Link>
                                </Button>
                            </div>
                        )}
                        
                        <Button type="submit" className="h-12 w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 active:bg-primary/80" disabled={isLoading}>
                             {(isSigningIn || isSigningUp) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                             {isSignUp ? 'Sign up' : 'Sign in'}
                        </Button>
                    </form>
                    
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-background px-2 text-muted-foreground">
                            or
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button onClick={handleGoogleSignIn} variant="outline" className="h-12 w-full rounded-full font-semibold" disabled={isLoading}>
                            {isGoogleLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262" className='mr-2'>
                                    <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                    <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                    <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                    <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                </svg>
                            )}
                           Sign In With Google
                        </Button>
                    </div>

                    <div className="mt-12 text-center">
                        <Button variant="link" size="sm" onClick={() => setIsSignUp(!isSignUp)} className="p-0 text-foreground hover:text-foreground/80">
                             {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
