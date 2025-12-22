
"use client";

import { useUser } from "@/firebase/hooks";

export const useAuth = () => {
  const { user, loading, error, signOut } = useUser();
  
  if (error) {
    console.error("Authentication error:", error);
  }

  const creditsUsed = user?.creditsUsed ?? 0;
  const creditsTotal = user?.creditsTotal ?? 1000;
  const creditsLeft = creditsTotal - creditsUsed;

  return { user, loading, signOut, creditsLeft };
};

    
