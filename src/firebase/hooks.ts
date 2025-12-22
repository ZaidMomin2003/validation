
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

const createUserProfileDocument = async (db: Firestore, user: FirebaseUser) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        const newUserProfile: Partial<AppUser> = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerId: user.providerData[0]?.providerId || 'password',
            plan: 'Free',
            creditsUsed: 0,
            creditsTotal: 1000,
        };
        try {
            await setDoc(userDocRef, newUserProfile);
        } catch (error) {
            console.error("Error creating user profile:", error);
        }
    }
};


export function useUser() {
  const auth = useAuthContext();
  const db = useFirestore();
  const router = useRouter();
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth || !db) {
        return;
    }
    
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          
          await createUserProfileDocument(db, firebaseUser);

          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const unsubscribeProfile = onSnapshot(userDocRef, 
            (docSnapshot) => {
              if (docSnapshot.exists()) {
                const profileData = docSnapshot.data() as Omit<AppUser, 'uid' | 'email' | 'providerId' >;
                const formattedUser: AppUser = {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName,
                  photoURL: firebaseUser.photoURL,
                  providerId: firebaseUser.providerData[0]?.providerId || 'password',
                  ...profileData,
                };
                setUser(formattedUser);
              } else {
                 // If the profile doesn't exist for some reason, create it and then listen again
                 createUserProfileDocument(db, firebaseUser);
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
