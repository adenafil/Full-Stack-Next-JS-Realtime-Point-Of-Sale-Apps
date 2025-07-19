import { environment } from "@/config/environment";
import { createBrowserClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type CreateClientOptions = {
    isAdmin?: boolean;
};

export async function createClient({ isAdmin = false }: CreateClientOptions) {
  const cookieStore = await cookies();

  return createBrowserClient(environment.SUPABASE_URL!, isAdmin ? environment.SUPABASE_SERVICE_ROLE_KEY! : environment.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => {
        return cookieStore.getAll();
      },
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          console.error("Failed to set cookies", cookieStore);
        }
      },
    },
  });
}