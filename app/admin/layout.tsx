"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Don't check auth for the login page
            if (pathname === "/admin/login") {
                setLoading(false);
                return;
            }

            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push("/admin/login");
            } else {
                setAuthenticated(true);
            }
            setLoading(false);
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                setAuthenticated(false);
                router.push("/admin/login");
            } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                setAuthenticated(true);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
                <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
                <p className="text-xl font-bold">Verifying Session...</p>
            </div>
        );
    }

    // If it's the login page, just show it
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // If not authenticated (and loading is done), don't show children yet
    // because the router.push is still happening
    if (!authenticated) {
        return null;
    }

    return <>{children}</>;
}
