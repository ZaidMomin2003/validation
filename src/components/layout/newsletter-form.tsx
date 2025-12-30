
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


export function NewsletterForm() {
  const db = useFirestore();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !db) return;

    setIsLoading(true);
    
    const newSubscriber = {
        email: email,
        subscribedAt: Date.now(),
    };
    
    const subscribersCollection = collection(db, 'subscribers');

    addDoc(subscribersCollection, newSubscriber)
      .then(() => {
        toast({
          title: 'Subscription Successful!',
          description: "Thanks for joining our newsletter. You're in!",
        });
        setEmail('');
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
            path: subscribersCollection.path,
            operation: 'create',
            requestResourceData: newSubscriber,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 p-8 text-center shadow-lg backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white">Join Our Newsletter</h3>
        <p className="mt-2 text-muted-foreground">
            Get the latest tips on email deliverability, marketing trends, and product updates.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md mx-auto items-center space-x-2">
            <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 border-white/20 text-base h-12"
            />
            <Button type="submit" disabled={isLoading} size="lg" className="h-12">
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                        <span>Subscribe</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>
        </form>
         <p className="mt-4 text-xs text-muted-foreground">We respect your privacy. No spam.</p>
    </div>
  );
}
