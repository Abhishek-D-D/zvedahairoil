/**
 * lib/supabase/server.ts
 *
 * Server-side Supabase client (cookies-based, SSR-safe).
 * Use this in Server Components, Route Handlers, and middleware.
 *
 * Usage (Server Component):
 *   import { supabaseServer } from "@/lib/supabase/server";
 *   const supabase = await supabaseServer();
 *   const { data: { session } } = await supabase.auth.getSession();
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function supabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // In Server Components, cookies can't be set — the middleware
            // handles session refreshes. This catch prevents the error.
          }
        },
      },
    }
  );
}
