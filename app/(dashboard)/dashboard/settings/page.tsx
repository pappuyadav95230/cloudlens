"use client";

import { useState, useEffect } from "react";
import { User, Bell } from "lucide-react";
import { auth } from "@/lib/firebase"; 

export default function SettingsPage() {
    // Auth State
    const [userName, setUserName] = useState("Loading...");
    const [userEmail, setUserEmail] = useState("Loading...");
    const [userPhoto, setUserPhoto] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName || "CloudLens User");
                setUserEmail(user.email || "No email provided");
                setUserPhoto(user.photoURL);
            } else {
                setUserName("Not logged in");
                setUserEmail("Please sign in");
                setUserPhoto(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your personal profile and notification preferences.
                    </p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile */}
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm h-fit">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                        <User className="w-5 h-5 text-indigo-500" />
                        <h3 className="font-semibold text-slate-900 dark:text-white">Profile Information</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            {userPhoto ? (
                                <img src={userPhoto} alt="Profile" className="w-20 h-20 rounded-full shadow-lg shadow-indigo-500/30 object-cover border-2 border-white dark:border-slate-800" />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                    <span className="text-white text-3xl font-bold">{userName.charAt(0).toUpperCase()}</span>
                                </div>
                            )}
                            <div className="text-center sm:text-left">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{userName}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{userEmail}</p>
                                <button className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                                    Change Avatar
                                </button>
                            </div>
                        </div>
                        
                        <hr className="border-slate-200 dark:border-slate-800" />

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={userName}
                                    readOnly
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a] text-sm text-slate-900 dark:text-white opacity-70 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    readOnly
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a] text-sm text-slate-900 dark:text-white opacity-70 cursor-not-allowed"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 text-center">Managed securely by Firebase Authentication</p>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm h-fit">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-amber-500" />
                        <h3 className="font-semibold text-slate-900 dark:text-white">Global Budgets & Alerts</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Global Monthly Spend Threshold</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    defaultValue={8000}
                                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a] text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                                We will fire critical alerts to your email and dashboard if your total combined cloud spend (across all projects) crosses this threshold.
                            </p>
                        </div>

                        <hr className="border-slate-200 dark:border-slate-800" />

                        <div className="space-y-5">
                            {[
                            { label: "Email alerts for anomalies", desc: "Get notified when spending spikes are detected", default: true },
                            { label: "Budget threshold warnings", desc: "Alert when project budgets reach 80%", default: true },
                            { label: "Weekly spending summary", desc: "Receive a weekly digest of your cloud costs", default: false },
                        ].map((pref) => (
                            <div key={pref.label} className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{pref.label}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pref.desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                                    <input type="checkbox" defaultChecked={pref.default} className="sr-only peer" />
                                    <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                </label>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
