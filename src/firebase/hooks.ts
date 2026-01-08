
"use client";

import { useState, useEffect } from 'react';
import {
  doc,
  onSnapshot,
  FirestoreError,
  Unsubscribe,
  setDoc,
  getDoc,
  Firestore,
  query,
  collection
} from 'firebase/firestore';
import { onAuthStateChanged, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth';
import { useAuthContext, useFirestore } from './provider';
import type { User as AppUser, List } from '@/types';
import { useRouter } from 'next/navigation';

const createUserProfileDocument = async (db: Firestore, user: FirebaseUser) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        const trialEndsAt = Date.now() + 24 * 60 * 60 * 1000; // 1 day from now
        const newUserProfile: AppUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerId: user.providerData[0]?.providerId || 'password',
            plan: 'Trial',
            trialEndsAt: trialEndsAt
        };
        try {
            // Using setDoc with merge: false to ensure it only creates, not updates.
            await setDoc(userDocRef, newUserProfile);
        } catch (error) {
            console.error("Error creating user profile:", error);
            // Optionally re-throw or handle the error in a way that informs the user
        }
    }
};


export function useCollection<T>(q: query.Query | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!q) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe: Unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return { data, loading, error };
}

export function useUser() {
  const auth = useAuthContext();
  const db = useFirestore();
  const router = useRouter();
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth || !db) {
        setLoading(false);
        return;
    }
    
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          
          // Ensure profile document is created before setting up the listener
          await createUserProfileDocument(db, firebaseUser);

          const unsubscribeProfile = onSnapshot(userDocRef, 
            (docSnapshot) => {
              if (docSnapshot.exists()) {
                const profileData = docSnapshot.data() as AppUser;
                 setUser(profileData);
              } else {
                 // This case should be rare now, but as a fallback, we can try creating it again
                 // Or we can assume the auth state is inconsistent and sign out.
                 console.error("User profile does not exist even after creation attempt.");
                 setUser(null);
              }
              setLoading(false);
            },
            (profileError) => {
              console.error("Error fetching user profile:", profileError);
              setError(profileError);
              setUser(null);
              setLoading(false);
            }
          );
          
          return () => unsubscribeProfile();

        } else {
          // If email is not verified, sign out the user
           if (auth.currentUser) {
            firebaseSignOut(auth);
           }
           setUser(null);
           setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    }, (authError) => {
        console.error("Auth state error:", authError);
        setError(authError);
        setLoading(false);
    });

    return () => unsubscribeAuth();
  }, [auth, db]);

  const signOut = async () => {
    if(auth) {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            router.push('/auth');
        } catch(e) {
            console.error("Sign out error", e);
        }
    }
  };

  return { user, loading, error, signOut };
}
