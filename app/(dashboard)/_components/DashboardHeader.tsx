"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, LogOut, Settings, ChevronDown, CheckCircle2, AlertTriangle, Zap, Info } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";

interface Notification {
    _id: string;
    title: string;
    message: string;
    isRead: boolean;
    type: 'welcome' | 'alert' | 'billing' | 'system';
    createdAt: string;
}

export default function DashboardHeader() {
    const { user, dbUser, logout } = useAuth();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const fetchNotifications = async () => {
        if (!dbUser?.uid) return;
        try {
            const res = await fetch(`${apiUrl}/api/notifications/${dbUser.uid}`);
            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll for new notifications every minute
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, [dbUser?.uid]);

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setNotifOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const res = await fetch(`${apiUrl}/api/notifications/${id}/read`, { method: "PATCH" });
            if (res.ok) {
                setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
            }
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const markAllRead = async () => {
        if (!dbUser?.uid) return;
        try {
            const res = await fetch(`${apiUrl}/api/notifications/${dbUser.uid}/read-all`, { method: "PATCH" });
            if (res.ok) {
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            }
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
    const initials = displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const getNotifIcon = (type: string) => {
        switch (type) {
            case 'welcome': return <Zap size={16} className="text-amber-500" />;
            case 'alert': return <AlertTriangle size={16} className="text-red-500" />;
            case 'billing': return <CheckCircle2 size={16} className="text-emerald-500" />;
            default: return <Info size={16} className="text-blue-500" />;
        }
    };

    const formatTimeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
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
                <div ref={notifRef} className="relative">
                    <button 
                        onClick={() => setNotifOpen(!notifOpen)}
                        className="relative w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        <Bell size={18} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#1e293b]">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {notifOpen && (
                        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-black/30 flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button 
                                        onClick={markAllRead}
                                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-[320px] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                                        No notifications yet.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                        {notifications.map((notif) => (
                                            <div 
                                                key={notif._id} 
                                                className={`p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-default ${!notif.isRead ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}
                                            >
                                                <div className="mt-0.5 flex-shrink-0">
                                                    {getNotifIcon(notif.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className={`text-sm truncate font-medium ${!notif.isRead ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                                            {notif.title}
                                                        </p>
                                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                                                            {formatTimeAgo(notif.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className={`text-xs mt-1 line-clamp-2 ${!notif.isRead ? 'text-slate-600 dark:text-slate-400' : 'text-slate-500 dark:text-slate-500'}`}>
                                                        {notif.message}
                                                    </p>
                                                    {!notif.isRead && (
                                                        <button 
                                                            onClick={(e) => markAsRead(notif._id, e)}
                                                            className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium mt-2 hover:underline"
                                                        >
                                                            Mark as read
                                                        </button>
                                                    )}
                                                </div>
                                                {!notif.isRead && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 mt-1.5 flex-shrink-0" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile dropdown */}
                <div ref={dropdownRef} className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center overflow-hidden">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                                <span className="text-white text-xs font-bold">{initials}</span>
                            )}
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{displayName}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                {dbUser?.role === 'admin' ? 'Admin' : dbUser?.role === 'editor' ? 'Editor' : 'CloudLens User'}
                            </p>
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

