
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
    GoogleAuthProvider, 
    signInWithPopup
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MailCheck, ShieldCheck, Zap, Bot } from 'lucide-react';
import { useAuthContext } from '@/firebase/provider';
import Logo from '@/components/logo';

export default function AuthClient() {
    const router = useRouter();
    const auth = useAuthContext();
    const { toast } = useToast();
    
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        if (!auth) return;
        setIsGoogleLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/email-validation');
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

    const features = [
        {
            icon: <MailCheck className="h-5 w-5 text-primary" />,
            text: "Instant Email Validation"
        },
        {
            icon: <ShieldCheck className="h-5 w-5 text-primary" />,
            text: "Spam Trap Detection"
        },
        {
            icon: <Zap className="h-5 w-5 text-primary" />,
            text: "Blazing Fast Results"
        },
        {
            icon: <Bot className="h-5 w-5 text-primary" />,
            text: "AI-Powered Cleaning"
        }
    ];

    return (
        <div className="dark min-h-screen w-full bg-background text-foreground grid lg:grid-cols-2">
            <div className="hidden lg:flex flex-col items-center justify-between p-12 bg-neutral-950/50 relative overflow-hidden">
                 <div className="absolute top-8 left-8">
                    <Logo />
                </div>
                
                <div className="m-auto max-w-md space-y-8">
                     <h1 className="text-4xl font-bold tracking-tight text-white">
                        Stop bad emails.
                        <br />
                        Boost your deliverability.
                    </h1>
                    <p className="text-neutral-400">
                        Join thousands of marketers who trust Cleanmails to maintain a healthy and effective email list.
                    </p>
                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                {feature.icon}
                                <span className="text-neutral-300">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-xs text-neutral-500">
                    © {new Date().getFullYear()} Cleanmails. All rights reserved.
                </div>
            </div>

            <main className="flex flex-col items-center justify-center p-6 relative">
                 <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 h-full w-full bg-neutral-900/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                    <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]">
                        <div className="absolute inset-0 [transform:rotateX(35deg)]">
                            <div className="animate-grid [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0] [background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_0)] [background-size:80px_80px] [background-repeat:repeat]"></div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-70%"></div>
                    </div>
                 </div>


                <div className="w-full max-w-sm z-10 text-center">
                    <h2 className="text-3xl font-semibold tracking-tight">
                        Get started with Cleanmails
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Sign in with your Google account to begin.
                    </p>
                    
                    <div className="mt-10">
                        <Button 
                            onClick={handleGoogleSignIn} 
                            variant="outline" 
                            className="h-14 w-full rounded-xl text-lg font-semibold border-border bg-white/5 hover:bg-white/10" 
                            disabled={isGoogleLoading}
                        >
                            {isGoogleLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262" className='mr-3 h-5 w-5'>
                                    <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                    <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                    <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                    <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                </svg>
                            )}
                           Sign In With Google
                        </Button>
                    </div>

                    <p className="mt-12 text-xs text-muted-foreground px-8">
                        By continuing, you agree to our <a href="/terms" className="underline hover:text-primary">Terms of Service</a> and <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
                    </p>
                </div>
            </main>
        </div>
    );
}
