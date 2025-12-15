import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Note: This is a placeholder for the actual Firebase config.
// The real config will be populated by the build process.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


interface FirebaseInstances {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

let firebaseInstances: FirebaseInstances | null = null;

export const initializeFirebase = (): FirebaseInstances => {
  if (typeof window !== 'undefined') {
    if (!firebaseInstances) {
      const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      const auth = getAuth(app);
      const firestore = getFirestore(app);
      firebaseInstances = { firebaseApp: app, auth, firestore };
    }
    return firebaseInstances;
  }
  // This is a server-side render, so we can't initialize Firebase.
  // We'll throw an error if someone tries to use Firebase on the server.
  // This is a bit of a hack, but it's the best we can do for now.
  const handler = {
    get: (target: any, prop: any) => {
      if (prop === 'then') {
        return Promise.resolve();
      }
      throw new Error('Firebase is not available on the server.');
    },
  };
  return new Proxy({}, handler) as FirebaseInstances;
};
