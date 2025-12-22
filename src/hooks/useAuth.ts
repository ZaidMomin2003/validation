
"use client";

import { useUser } from "@/firebase/hooks";
import { useCollection } from '@/firebase/hooks';
import { collection, query } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import React from 'react';
import type { List } from '@/types';


export const useAuth = () => {
  const { user, loading, error, signOut } = useUser();
  
  const listsQuery = React.useMemo(() => {
    if (!user) return null;
    return query(collection(db, `users/${user.uid}/lists`));
  }, [user]);

  const { data: lists } = useCollection<List>(listsQuery);

  const creditsUsed = React.useMemo(() => {
    if (!lists) return 0;
    return lists.reduce((acc, list) => acc + (list.emailCount || 0), 0);
  }, [lists]);
  
  if (error) {
    console.error("Authentication error:", error);
  }

  const creditsTotal = user?.creditsTotal ?? 0;
  const creditsLeft = creditsTotal - creditsUsed;

  return { user: user ? {...user, creditsUsed} : null, loading, signOut, creditsLeft };
};

    
