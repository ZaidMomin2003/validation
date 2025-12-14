"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebaseClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512S0 403.3 0 261.8 106.5 11.8 244 11.8c67.6 0 129 23.2 176.3 62.5l-65.8 65.4C333.6 118.2 291.5 96 244 96c-82.6 0-149.3 67.2-149.3 150.1s66.6 150.1 149.3 150.1c48.2 0 85.5-19.4 111.4-44.4 20.8-19.8 33.3-46.8 37-80.3H244V256h244c1.4 9.1 2.2 18.5 2.2 28.2z"></path>
    </svg>
);


export default function AuthForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleUserCreation = async (user: any) => {
    if (user && user.metadata.creationTime === user.metadata.lastSignInTime) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      let userCredential;
      if (authMode === "signup") {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await handleUserCreation(userCredential.user);
        toast({ title: "Account created successfully!" });
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        toast({ title: "Signed in successfully!" });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Authentication failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsGoogleSubmitting(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await handleUserCreation(result.user);
      toast({ title: "Signed in with Google successfully!" });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Google Sign-In failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isGoogleSubmitting}>
        {isGoogleSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        Google
      </Button>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        {authMode === "signin"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Button
          variant="link"
          className="p-0"
          onClick={() =>
            setAuthMode(authMode === "signin" ? "signup" : "signin")
          }
        >
          {authMode === "signin" ? "Sign up" : "Sign in"}
        </Button>
      </p>
    </div>
  );
}
