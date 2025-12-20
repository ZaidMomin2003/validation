
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
import { Eye, EyeOff } from 'lucide-react';

const SignInForm = ({ email, setEmail, password, setPassword, showPassword, setShowPassword, handleEmailPasswordSignIn }: any) => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="email-signin" className="block text-sm">
                Email
            </Label>
            <Input type="email" required name="email" id="email-signin" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="pwd-signin" className="text-sm">
                    Password
                </Label>
                <Button asChild variant="link" size="sm">
                    <Link href="/auth/forgot-password" className="text-sm">
                        Forgot your Password ?
                    </Link>
                </Button>
            </div>
            <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} required name="pwd" id="pwd-signin" value={password} onChange={(e) => setPassword(e.target.value)} />
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

        <Button className="w-full" onClick={handleEmailPasswordSignIn}>
            Sign In
        </Button>
    </div>
);

const SignUpForm = ({ fullName, setFullName, email, setEmail, password, setPassword, showPassword, setShowPassword, handleEmailPasswordSignUp }: any) => (
    <div className="space-y-6">
         <div className="space-y-2">
            <Label htmlFor="name-signup" className="block text-sm">
                Full Name
            </Label>
            <Input type="text" required name="name" id="name-signup" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="email-signup" className="block text-sm">
                Email
            </Label>
            <Input type="email" required name="email" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="space-y-2">
            <Label htmlFor="pwd-signup" className="text-sm">
                Password
            </Label>
            <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} required name="pwd" id="pwd-signup" value={password} onChange={(e) => setPassword(e.target.value)} />
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

        <Button className="w-full" onClick={handleEmailPasswordSignUp}>
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

    const handleEmailPasswordSignUp = async () => {
        if (!auth) return;
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
            // You might want to redirect the user to a page that tells them to check their email
            // For now, we'll just stay here.
            setActiveTab('signin');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Sign Up Failed',
                description: error.message,
            });
        }
    };

    const handleEmailPasswordSignIn = async () => {
        if (!auth) return;
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
        }
    };

    const handleGoogleSignIn = async () => {
        if (!auth) return;
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
                        {activeTab === 'signin' ? 'Sign In to Veriflow' : 'Create an Account'}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {activeTab === 'signin'
                            ? 'Welcome back! Sign in to continue'
                            : 'Get started with your new account'}
                    </p>
                </div>
                <Tabs defaultValue="signin" className="w-full" onValueChange={(tab) => {
                    setActiveTab(tab);
                    setEmail('');
                    setPassword('');
                    setFullName('');
                }}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Create Account</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <div className="bg-card rounded-b-lg border p-6 shadow-md">
                            <div className="mt-6 grid grid-cols-1 gap-3">
                                <Button type="button" variant="outline" onClick={handleGoogleSignIn}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                                        <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                        <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                        <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                        <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                    </svg>
                                    <span>Google</span>
                                </Button>
                            </div>
                            <hr className="my-4 border-dashed" />
                            <SignInForm 
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                handleEmailPasswordSignIn={handleEmailPasswordSignIn}
                            />
                        </div>
                    </TabsContent>
                     <TabsContent value="signup">
                        <div className="bg-card rounded-b-lg border p-6 shadow-md">
                           <div className="mt-6 grid grid-cols-1 gap-3">
                                <Button type="button" variant="outline" onClick={handleGoogleSignIn}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                                        <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                        <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                        <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                        <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                    </svg>
                                    <span>Google</span>
                                </Button>
                            </div>
                            <hr className="my-4 border-dashed" />
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
                           />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}

    

    