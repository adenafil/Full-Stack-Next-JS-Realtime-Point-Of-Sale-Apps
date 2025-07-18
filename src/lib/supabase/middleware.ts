import { environment } from "@/config/environment";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request
    });

    const supabase = createServerClient(
        environment.SUPABASE_URL!,
        environment.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => {
                    return request.cookies.getAll();
                },
                setAll: (cookiesToStore) => {
                    cookiesToStore.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request
                    });
                    cookiesToStore.forEach(({ name, value, options }) => {
                        return supabaseResponse.cookies.set(name, value, options);
                    })
                }
            }
        }
    )

    const { data: { user } } = await supabase.auth.getUser();

    if (!user && !request.nextUrl.pathname.startsWith("/login")) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    if (user && request.nextUrl.pathname.startsWith("/login")) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}