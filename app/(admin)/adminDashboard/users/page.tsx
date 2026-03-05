"use client";

import { adminUsers } from "@/app/(dashboard)/_data/mockData";
import { MoreHorizontal } from "lucide-react";

const statusColors: Record<string, string> = {
    active: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400",
    inactive: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
    suspended: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400",
};

const planColors: Record<string, string> = {
    Enterprise: "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400",
    Pro: "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
    Starter: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
};

export default function AdminUsersPage() {
    return (
        <div className="space-y-6 max-w-7xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Users</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage all platform users</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-white">{adminUsers.length}</span> total users
                </div>
            </div>

            {/* Users table */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a]">
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">User</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Plan</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Projects</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Cloud Spend</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Joined</th>
                                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {adminUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-bold">{user.name.split(" ").map(n => n[0]).join("")}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${planColors[user.plan]}`}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusColors[user.status]}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-slate-900 dark:text-white">{user.projects}</td>
                                    <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">${user.spend.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">{user.joined}</td>
                                    <td className="px-5 py-4 text-right">
                                        <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
