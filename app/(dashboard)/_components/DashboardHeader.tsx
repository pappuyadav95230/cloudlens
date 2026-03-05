"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, LogOut, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { alerts } from "@/app/(dashboard)/_data/mockData";

export default function DashboardHeader() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadAlerts = alerts.filter((a) => a.severity === "critical" || a.severity === "high").length;

    const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
    const initials = displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <header className="h-16 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Search */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
                <div className="relative w-full">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search projects, alerts..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <Bell size={18} />
                    {unreadAlerts > 0 && (
                        <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {unreadAlerts}
                        </span>
                    )}
                </button>

                {/* Profile dropdown */}
                <div ref={dropdownRef} className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center overflow-hidden">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                                <span className="text-white text-xs font-bold">{initials}</span>
                            )}
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{displayName}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">Pro Plan</p>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-black/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* User info */}
                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{displayName}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.email}</p>
                            </div>

                            {/* Menu items */}
                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        router.push("/userDashboard/settings");
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <Settings size={16} />
                                    Settings
                                </button>
                            </div>

                            {/* Logout */}
                            <div className="border-t border-slate-100 dark:border-slate-700 py-1">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
