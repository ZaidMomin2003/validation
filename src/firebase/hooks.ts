"use client";

import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  Query,
  DocumentReference,
  FirestoreError,
  Unsubscribe,
  DocumentData,
} from 'firebase/firestore';
import { onAuthStateChanged, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth';
import { useAuthContext, useFirestore } from './provider';
import type { User as AppUser } from '@/types';
import { useRouter } from 'next/navigation';

export function useCollection<T>(q: Query | null) {
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

export function useDoc<T>(ref: DocumentReference | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!ref) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe: Unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = {
            id: snapshot.id,
            ...snapshot.data(),
          } as T;
          setData(data);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref]);

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
        // Firebase services not yet initialized
        return;
    }
    
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          // User is authenticated, now fetch their profile from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const unsubscribeProfile = onSnapshot(userDocRef, 
            (docSnapshot) => {
              if (docSnapshot.exists()) {
                const profileData = docSnapshot.data() as AppUser;
                const formattedUser: AppUser = {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName,
                  photoURL: firebaseUser.photoURL,
                  providerId: firebaseUser.providerData[0]?.providerId || 'password',
                  ...profileData, // Merge Firestore profile data
                };
                setUser(formattedUser);
              } else {
                 // Profile doesn't exist, use auth data and maybe create a profile
                 const formattedUser: AppUser = {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName,
                  photoURL: firebaseUser.photoURL,
                  providerId: firebaseUser.providerData[0]?.providerId || 'password',
                  plan: 'Free',
                  creditsUsed: 0,
                  creditsTotal: 1000,
                };
                setUser(formattedUser);
              }
              setLoading(false);
            },
            (profileError) => {
              console.error("Error fetching user profile:", profileError);
              setError(profileError);
              setLoading(false);
            }
          );
          
          return () => unsubscribeProfile();

        } else {
          firebaseSignOut(auth);
          setUser(null);
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    }, (err) => {
        setError(err);
        setLoading(false);
    });

    return () => unsubscribeAuth();
  }, [auth, db]);

  const signOut = async () => {
    if(auth) {
        await firebaseSignOut(auth);
        setUser(null);
        router.push('/auth');
    }
  };

  return { user, loading, error, signOut };
}
