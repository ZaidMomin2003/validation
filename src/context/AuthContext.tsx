"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
});

const demoUser: User = {
  uid: 'demouser',
  email: 'demo@example.com',
  displayName: 'Demo User',
  photoURL: 'https://i.pravatar.cc/150?u=demouser',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(demoUser);
  const [loading, setLoading] = useState(false);

  const signOut = () => {
    setUser(null);
    // In a real app, you'd redirect to the login page.
    // For this demo, we'll just log them back in after a short delay.
    setTimeout(() => setUser(demoUser), 1000);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
