"use client";

import { adminUsers } from "@/app/(dashboard)/_data/mockData";
import CostBreakdownChart from "@/app/(dashboard)/_components/CostBreakdownChart";

export default function AdminClientsPage() {
    // Sort by spend descending
    const sortedUsers = [...adminUsers].sort((a, b) => b.spend - a.spend);
    const totalSpend = sortedUsers.reduce((sum, u) => sum + u.spend, 0);

    const topColors = ["#6366f1", "#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Client Spending</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Cloud spending overview across all clients</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Cloud Spend</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">${totalSpend.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Avg Spend / Client</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">${Math.round(totalSpend / sortedUsers.length).toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Top Client</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{sortedUsers[0].name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">${sortedUsers[0].spend.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Client spending chart */}
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Spend Distribution</h3>
                    <CostBreakdownChart
                        labels={sortedUsers.map((u) => u.name)}
                        data={sortedUsers.map((u) => u.spend)}
                        colors={topColors}
                        height={300}
                    />
                </div>

                {/* Client ranking */}
                <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Client Ranking by Spend</h3>
                    <div className="space-y-3">
                        {sortedUsers.map((user, i) => {
                            const percentage = Math.round((user.spend / totalSpend) * 100);
                            return (
                                <div key={user.id} className="flex items-center gap-4">
                                    <span className="w-6 text-sm font-bold text-slate-400 dark:text-slate-500 text-right">#{i + 1}</span>
                                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xs font-bold">{user.name.split(" ").map(n => n[0]).join("")}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white ml-4">${user.spend.toLocaleString()}</p>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-indigo-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 w-10 text-right">{percentage}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
