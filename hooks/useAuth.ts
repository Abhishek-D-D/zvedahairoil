"use client";

/**
 * hooks/useAuth.ts
 *
 * Convenience hooks for auth state.
 *
 * Usage:
 *   const { user, loading } = useAuth();
 *   useRequireAuth(); // redirects to /login if not signed in
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";

/** Access current auth state from any Client Component. */
export function useAuth() {
  return useAuthContext();
}

/**
 * Redirect to /login if no active session.
 * Call this at the top of any protected page component.
 */
export function useRequireAuth(redirectTo?: string) {
  const { user, session, loading, signOut } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const returnPath =
        redirectTo ?? (typeof window !== "undefined" ? window.location.pathname : "/");
      router.replace(`/login?redirect=${encodeURIComponent(returnPath)}`);
    }
  }, [user, loading, router, redirectTo]);

  return { user, session, loading, signOut };
}
