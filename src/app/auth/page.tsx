"use client";

import { useState } from 'react';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/logo';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const router = useRouter();

    const handleAuthAction = () => {
        // In a real app, you'd handle auth here.
        // For this demo, we'll just redirect.
        router.push('/bulk-validate');
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <BackgroundRippleEffect />
      <Tabs defaultValue="sign-in" className="w-full max-w-md z-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Create Account</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <Card>
            <CardHeader className="text-center">
                <div className='flex justify-center mb-4'>
                    <Logo />
                </div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signin">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email-signin" type="email" placeholder="m@example.com" required className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signin">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password-signin" type="password" required className="pl-10" />
                </div>
              </div>
              <Button type="submit" className="w-full" onClick={handleAuthAction}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sign-up">
          <Card>
            <CardHeader className="text-center">
                <div className='flex justify-center mb-4'>
                    <Logo />
                </div>
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>
                Fill in the details below to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name-signup">Full Name</Label>
                 <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="name-signup" placeholder="John Doe" required className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email-signup" type="email" placeholder="m@example.com" required className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                 <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password-signup" type="password" required className="pl-10" />
                </div>
              </div>
              <Button type="submit" className="w-full" onClick={handleAuthAction}>
                Create Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
