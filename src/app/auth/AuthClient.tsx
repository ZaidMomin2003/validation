
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
    GoogleAuthProvider, 
    signInWithPopup
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, Zap, FileUp, ListChecks, ScanText } from 'lucide-react';
import { useAuthContext } from '@/firebase/provider';
import Logo from '@/components/logo';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ValidatorUI = () => (
    <motion.div 
        key="validator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full p-4 bg-zinc-900/50 rounded-lg border border-zinc-700/50 flex flex-col justify-center text-xs font-mono"
    >
        <div className="bg-zinc-800/60 rounded-lg p-2 text-zinc-400 shadow-inner">
            <p className="text-zinc-500 text-center mb-1"># upload.csv</p>
            <div className="grid grid-cols-[2fr_1fr] gap-x-2 text-zinc-300 border-b border-zinc-700/80 pb-1">
                <p>email</p><p>name</p>
            </div>
             <div className="grid grid-cols-[2fr_1fr] gap-x-2 mt-1">
                <p>good@email.com</p><p>Valid User</p>
            </div>
             <div className="grid grid-cols-[2fr_1fr] gap-x-2 mt-1">
                <p className="text-red-400">bad@domain.xyz</p><p>Invalid User</p>
            </div>
             <div className="grid grid-cols-[2fr_1fr] gap-x-2 mt-1">
                <p className="text-yellow-400">info@company.com</p><p>Risky User</p>
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
            <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                    <p className="text-lg font-bold text-green-400">1</p>
                    <p className="text-zinc-500">Good</p>
                </div>
                 <div>
                    <p className="text-lg font-bold text-yellow-400">1</p>
                    <p className="text-zinc-500">Risky</p>
                </div>
                 <div>
                    <p className="text-lg font-bold text-red-400">1</p>
                    <p className="text-zinc-500">Bad</p>
                </div>
            </div>
        </div>
    </motion.div>
);

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
            <p>Don't miss this <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">amazing</mark> deal. This is a <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">once in a lifetime</mark> opportunity to get a <mark className="bg-destructive/20 text-red-300 rounded-sm px-0.5">free gift</mark> with your purchase.</p>
        </div>
        <div className="mt-3">
            <p className="text-xs text-red-400 text-center">Spam Score: 4.5/10</p>
            <Progress value={45} className="h-2 mt-1" />
        </div>
    </motion.div>
);

const ExtractorUI = () => (
    <motion.div 
        key="extractor"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full p-4 bg-zinc-900/50 rounded-lg border border-zinc-700/50 flex flex-col justify-center"
    >
        <div className="w-full h-40 bg-zinc-800/60 rounded p-2 text-xs text-zinc-400 overflow-hidden">
            <p>Paste your unstructured or scraped text here. For example, you can reach our team at <mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">contact@example.com</mark>. For support inquiries, please use <mark className="bg-primary/20 text-primary-foreground rounded-sm px-0.5">support@example.com</mark>.</p>
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
        <div className="w-full bg-zinc-800/60 rounded p-2 text-xs flex flex-wrap gap-1">
            <Badge variant="secondary">contact@example.com</Badge>
            <Badge variant="secondary">support@example.com</Badge>
        </div>
    </motion.div>
);


const features = [
    {
        id: 'validator',
        icon: <ShieldCheck className="h-5 w-5 text-primary" />,
        text: "Email Validation",
        description: "Verify emails in real-time to reduce bounce rates and protect your sender reputation.",
        ui: <ValidatorUI />
    },
    {
        id: 'cleaner',
        icon: <FileUp className="h-5 w-5 text-primary" />,
        text: "List Cleaning",
        description: "Clean messy data by un-pivoting files with multiple emails in a single cell.",
        ui: <CleanerUI />
    },
    {
        id: 'spam-checker',
        icon: <ListChecks className="h-5 w-5 text-primary" />,
        text: "Spam Analysis",
        description: "Check your email content for spam trigger words to improve your deliverability.",
        ui: <SpamCheckUI />
    },
    {
        id: 'extractor',
        icon: <ScanText className="h-5 w-5 text-primary" />,
        text: "Email Extractor",
        description: "Paste any block of text to instantly find and extract all email addresses.",
        ui: <ExtractorUI />
    }
];

export default function AuthClient() {
    const router = useRouter();
    const auth = useAuthContext();
    const { toast } = useToast();
    
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [activeFeature, setActiveFeature] = useState(features[0]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveFeature(prev => {
                const currentIndex = features.findIndex(f => f.id === prev.id);
                const nextIndex = (currentIndex + 1) % features.length;
                return features[nextIndex];
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovered]);


    const handleGoogleSignIn = async () => {
        if (!auth) return;
        setIsGoogleLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/pricing');
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
        <div className="dark min-h-screen w-full bg-background text-foreground grid lg:grid-cols-2">
            <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-neutral-950/50 relative overflow-hidden">
                 <div className="absolute top-8 left-8">
                    <Logo />
                </div>
                
                <div 
                    className="m-auto w-full max-w-md"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative h-72 rounded-xl bg-zinc-900 p-2 border border-zinc-800">
                         <AnimatePresence mode="wait">
                            {activeFeature.ui}
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                onMouseEnter={() => setActiveFeature(feature)}
                                className={cn(
                                    "p-4 rounded-lg cursor-pointer border-2 transition-all duration-300",
                                    activeFeature.id === feature.id ? 'bg-primary/10 border-primary/50' : 'border-transparent hover:bg-white/5'
                                )}
                            >
                                <div className="flex items-center gap-4">
                                     <div className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                                        activeFeature.id === feature.id ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/10 border-white/20 text-white'
                                    )}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-100">{feature.text}</h3>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-xs text-neutral-500 absolute bottom-8 left-1/2 -translate-x-1/2">
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
                    <div className="lg:hidden mb-10 flex justify-center">
                        <Logo />
                    </div>
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
