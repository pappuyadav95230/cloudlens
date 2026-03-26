"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    CreditCard,
    Bell,
    Settings,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
    Shield,
    Plug,
    Wallet,
    LifeBuoy,
    Download,
} from "lucide-react";
import CloudLensLogo from "@/app/(public)/_components/CloudLensLogo";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useAuth } from "@/app/providers/AuthProvider";
import { useSidebar } from "@/app/providers/SidebarContext";

const userNav = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { label: "Cloud Costs", href: "/dashboard/billing", icon: CreditCard },
    { label: "Reports", href: "/dashboard/reports", icon: Download },
    { label: "Alerts", href: "/dashboard/alerts", icon: Bell },
    { label: "Integrations", href: "/dashboard/integrations", icon: Plug },
    { label: "Wallet & Plans", href: "/dashboard/wallet", icon: Wallet },
    { label: "Help & Support", href: "/dashboard/support", icon: LifeBuoy },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { collapsed, toggle } = useSidebar();
    const { theme, toggleTheme } = useTheme();
    const { user, dbUser } = useAuth();

    const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
    const initials = displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-white dark:bg-[#1e293b] border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 z-40 ${collapsed ? "w-[72px]" : "w-[260px]"
                }`}
        >
            {/* Collapse toggle — pill on right edge */}
            <button
                onClick={toggle}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm z-50"
            >
                {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>

            {/* Logo */}
            <div className="flex items-center px-4 h-16 border-b border-slate-200 dark:border-slate-700">
                <Link href="/" className="flex items-center gap-2 overflow-hidden">
                    <CloudLensLogo size={28} />
                    {!collapsed && (
                        <span className="text-[17px] font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                            Cloud<span className="text-indigo-600 dark:text-indigo-400">Lens</span>
                        </span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                {!collapsed && (
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold px-3 mb-2">
                        Dashboard
                    </p>
                )}
                <ul className="space-y-1">
                    {userNav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <item.icon size={18} className="flex-shrink-0" />
                                    {!collapsed && <span>{item.label}</span>}
                                </Link>
                            </li>
                        );
                    })}
                    {dbUser?.role === 'admin' && (
                        <li>
                            <Link
                                href="/admin/users"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === "/admin/users"
                                    ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                                title={collapsed ? "Admin" : undefined}
                            >
                                <Shield size={18} className="flex-shrink-0" />
                                {!collapsed && <span>Admin</span>}
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

            {/* Bottom section */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-3 space-y-2">
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={collapsed ? "Toggle theme" : undefined}
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    {!collapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
                </button>

                {/* User */}
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                            <span className="text-white text-xs font-bold">{initials}</span>
                        )}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{displayName}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
