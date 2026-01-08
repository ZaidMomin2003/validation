
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
        const newUserProfile: Omit<AppUser, 'plan'> & { plan: 'Free' } = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerId: user.providerData[0]?.providerId || 'password',
            plan: 'Free',
        };
        try {
            await setDoc(userDocRef, newUserProfile);
        } catch (error) {
            console.error("Error creating user profile:", error);
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
        // Firebase is not initialized yet, wait for it.
        // The loading state is already true, so we just return.
        return;
    }
    
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          
          await createUserProfileDocument(db, firebaseUser);

          const unsubscribeProfile = onSnapshot(userDocRef, 
            (docSnapshot) => {
              if (docSnapshot.exists()) {
                const profileData = docSnapshot.data() as AppUser;
                 setUser(profileData);
              } else {
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
  }, [auth, db, router]);

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
