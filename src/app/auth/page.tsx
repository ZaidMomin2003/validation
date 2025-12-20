'use client';

import { useState } from 'react';
import { LogoIcon } from '@/components/logo-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/firebase/provider';
import { 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Logo from '@/components/logo';

export default function AuthPage() {
    const router = useRouter();
    const auth = useAuthContext();
    const { toast } = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    
    const isLoading = isSigningIn || isGoogleLoading;

    const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        setIsSigningIn(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user.emailVerified) {
                router.push('/bulk-validate');
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Email Not Verified',
                    description: 'Please verify your email before signing in.',
                });
                if (auth) {
                    await auth.signOut();
                }
            }
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
        <div className="flex min-h-screen w-full flex-col bg-black text-white">
            <header className="flex h-14 shrink-0 items-center justify-between px-4">
                <div></div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/">Skip</Link>
                </Button>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
                <div className="w-full max-w-sm">
                    <div className="text-center">
                        <h1 className='text-3xl font-medium'>Verilist</h1>
                        <h2 className="mt-8 text-2xl font-semibold">Welcome back</h2>
                        <p className="mt-2 text-neutral-400">Let's get you in to Verilist</p>
                    </div>

                    <form onSubmit={handleEmailPasswordSignIn} className="mt-10 space-y-5">
                        <Input 
                            type="email" 
                            placeholder="Your Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 rounded-xl border-neutral-700 bg-neutral-900 px-4 text-base placeholder:text-neutral-500"
                        />
                        <Input 
                            type="password" 
                            placeholder="Your Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 rounded-xl border-neutral-700 bg-neutral-900 px-4 text-base placeholder:text-neutral-500"
                        />
                        <div className="pt-1 text-center">
                            <Button variant="link" size="sm" asChild className="p-0 text-white hover:text-neutral-300">
                                <Link href="/auth/forgot-password">
                                    Forgot password?
                                </Link>
                            </Button>
                        </div>
                        
                        <Button type="submit" className="h-12 w-full rounded-full bg-white text-black font-semibold hover:bg-neutral-200 active:bg-neutral-300" disabled={isLoading}>
                             {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign in
                        </Button>
                    </form>
                    
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-700" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-black px-2 text-neutral-500">
                            or
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button onClick={handleGoogleSignIn} className="h-12 w-full rounded-full bg-neutral-900 border border-neutral-700 font-semibold text-white hover:bg-neutral-800" disabled={isLoading}>
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
                        <Button variant="link" size="sm" asChild className="p-0 text-white hover:text-neutral-300">
                             <Link href="/auth">
                                Don't have an account?
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
