
"use client";

import { useUser } from "@/firebase/hooks";

export const useAuth = () => {
  const { user, loading, error, signOut } = useUser();
  
  if (error) {
    console.error("Authentication error:", error);
  }

  return { user, loading, signOut };
};
