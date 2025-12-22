
"use client";

import { useUser } from "@/firebase/hooks";

export const useAuth = () => {
  const { user, loading, error, signOut } = useUser();
  
  if (error) {
    console.error("Authentication error:", error);
  }

  // Pass the user object directly from the centralized hook
  return { user, loading, signOut };
};
