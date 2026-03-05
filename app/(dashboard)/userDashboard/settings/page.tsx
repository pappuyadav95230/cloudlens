"use client";

import { currentUser } from "@/app/(dashboard)/_data/mockData";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your account and preferences</p>
            </div>

            {/* Profile */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Profile</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">{currentUser.avatar}</span>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{currentUser.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{currentUser.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                defaultValue={currentUser.name}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f172a] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                            <input
                                type="email"
                                defaultValue={currentUser.email}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f172a] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Connected Cloud Accounts</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">GCP</span>
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Google Cloud Platform</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">4 projects connected</p>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">Connected</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400">AWS</span>
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Amazon Web Services</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">3 projects connected</p>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">Connected</span>
                    </div>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Notifications</h3>
                <div className="space-y-4">
                    {[
                        { label: "Email alerts for anomalies", desc: "Get notified when spending spikes are detected", default: true },
                        { label: "Budget threshold warnings", desc: "Alert when project budgets reach 80%", default: true },
                        { label: "Weekly spending summary", desc: "Receive a weekly digest of your cloud costs", default: false },
                        { label: "New feature announcements", desc: "Stay updated with CloudLens product news", default: false },
                    ].map((pref) => (
                        <div key={pref.label} className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{pref.label}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">{pref.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked={pref.default} className="sr-only peer" />
                                <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save */}
            <div className="flex justify-end">
                <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30">
                    Save Changes
                </button>
            </div>
        </div>
    );
}
