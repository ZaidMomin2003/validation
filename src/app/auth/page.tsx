
'use client';

import { useState } from 'react';
import { LogoIcon } from '@/components/logo-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthContext } from '@/firebase/provider';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    sendEmailVerification,
    updateProfile
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SignInForm = ({ email, setEmail, password, setPassword, showPassword, setShowPassword, handleEmailPasswordSignIn, isLoading }: any) => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="email-signin" className="block text-sm">
                Email
            </Label>
            <Input type="email" required name="email" id="email-signin" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>

        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="pwd-signin" className="text-sm">
                    Password
                </Label>
                <Button asChild variant="link" size="sm" className="p-0 h-auto">
                    <Link href="/auth/forgot-password" className="text-sm text-primary">
                        Forgot your Password?
                    </Link>
                </Button>
            </div>
            <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} required name="pwd" id="pwd-signin" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>
        </div>

        <Button className="w-full font-semibold" onClick={handleEmailPasswordSignIn} disabled={isLoading}>
             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
        </Button>
    </div>
);

const SignUpForm = ({ fullName, setFullName, email, setEmail, password, setPassword, showPassword, setShowPassword, handleEmailPasswordSignUp, isLoading }: any) => (
    <div className="space-y-6">
         <div className="space-y-2">
            <Label htmlFor="name-signup" className="block text-sm">
                Full Name
            </Label>
            <Input type="text" required name="name" id="name-signup" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your Name"/>
        </div>
        <div className="space-y-2">
            <Label htmlFor="email-signup" className="block text-sm">
                Email
            </Label>
            <Input type="email" required name="email" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"/>
        </div>

        <div className="space-y-2">
            <Label htmlFor="pwd-signup" className="text-sm">
                Password
            </Label>
            <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} required name="pwd" id="pwd-signup" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>
        </div>

        <Button className="w-full font-semibold" onClick={handleEmailPasswordSignUp} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
        </Button>
    </div>
);


export default function LoginPage() {
    const router = useRouter();
    const auth = useAuthContext();
    const [activeTab, setActiveTab] = useState('signin');
    const { toast } = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);


    const handleEmailPasswordSignUp = async () => {
        if (!auth) return;
        setIsSigningUp(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: fullName,
            });
            await sendEmailVerification(userCredential.user);
            toast({
                title: 'Verification Email Sent',
                description: 'Please check your inbox to verify your email address.',
            });
            setActiveTab('signin');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Sign Up Failed',
                description: error.message,
            });
        } finally {
            setIsSigningUp(false);
        }
    };

    const handleEmailPasswordSignIn = async () => {
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
    
    const isLoading = isSigningIn || isSigningUp || isGoogleLoading;

    return (
        <section className="relative flex min-h-screen w-full items-center justify-center bg-background px-4 py-16 md:py-32 overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-neutral-950 dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]"></div>
            <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-3/4 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 right-1/2 h-72 w-72 -translate-y-1/4 translate-x-3/4 rounded-full bg-accent/10 blur-3xl" />

            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                     <Link href="/" aria-label="go home" className="inline-block">
                        <LogoIcon />
                    </Link>
                    <h1 className="mb-1 mt-4 text-2xl font-bold tracking-tight">
                        {activeTab === 'signin' ? 'Welcome Back' : 'Create an Account'}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {activeTab === 'signin'
                            ? 'Sign in to access your dashboard'
                            : 'Get started with Veriflow today'}
                    </p>
                </div>
                
                <div className="rounded-xl border bg-card/50 p-1.5 shadow-lg backdrop-blur-lg">
                    <Tabs defaultValue="signin" className="w-full" onValueChange={(tab) => {
                        setActiveTab(tab);
                        setEmail('');
                        setPassword('');
                        setFullName('');
                    }}>
                        <TabsList className="grid w-full grid-cols-2 bg-muted/60">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Create Account</TabsTrigger>
                        </TabsList>
                        <div className="p-6">
                            <TabsContent value="signin" className="m-0">
                                <div className="space-y-6">
                                     <Button type="button" variant="outline" className="w-full font-medium" onClick={handleGoogleSignIn} disabled={isLoading}>
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
                                        Continue with Google
                                    </Button>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-card px-2 text-muted-foreground">
                                            Or continue with
                                            </span>
                                        </div>
                                    </div>
                                    <SignInForm 
                                        email={email}
                                        setEmail={setEmail}
                                        password={password}
                                        setPassword={setPassword}
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                        handleEmailPasswordSignIn={handleEmailPasswordSignIn}
                                        isLoading={isSigningIn}
                                    />
                                </div>
                            </TabsContent>
                             <TabsContent value="signup" className="m-0">
                                <SignUpForm 
                                    fullName={fullName}
                                    setFullName={setFullName}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    handleEmailPasswordSignUp={handleEmailPasswordSignUp}
                                    isLoading={isSigningUp}
                                />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </section>
    );
}
