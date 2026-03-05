"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { SidebarProvider, useSidebar } from "@/app/providers/SidebarContext";
import Sidebar from "./_components/Sidebar";
import DashboardHeader from "./_components/DashboardHeader";

function DashboardContent({ children }: { children: React.ReactNode }) {
    const { collapsed } = useSidebar();

    return (
        <div className={`transition-all duration-300 ${collapsed ? "ml-[72px]" : "ml-[260px]"}`}>
            <DashboardHeader />
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a]">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
                <Sidebar />
                <DashboardContent>{children}</DashboardContent>
            </div>
        </SidebarProvider>
    );
}
