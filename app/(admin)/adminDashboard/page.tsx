"use client";

import { Users, DollarSign, CreditCard, Cloud } from "lucide-react";
import StatCard from "@/app/(dashboard)/_components/StatCard";
import SpendingChart from "@/app/(dashboard)/_components/SpendingChart";
import { adminStats, userGrowth, revenueByMonth, adminUsers } from "@/app/(dashboard)/_data/mockData";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Panel</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Platform overview and management</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Users"
                    value={adminStats.totalUsers.toString()}
                    change={adminStats.totalUsersChange}
                    icon={Users}
                />
                <StatCard
                    title="Monthly Revenue"
                    value={adminStats.totalRevenue.toLocaleString()}
                    change={adminStats.totalRevenueChange}
                    icon={DollarSign}
                    prefix="$"
                />
                <StatCard
                    title="Active Subscriptions"
                    value={adminStats.activeSubscriptions.toString()}
                    change={adminStats.activeSubscriptionsChange}
                    icon={CreditCard}
                />
                <StatCard
                    title="Cloud Spend Monitored"
                    value={`$${(adminStats.totalCloudMonitored / 1000000).toFixed(1)}M`}
                    change={adminStats.totalCloudMonitoredChange}
                    icon={Cloud}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">User Growth</h3>
                    <SpendingChart
                        labels={userGrowth.map((d) => d.month)}
                        data={userGrowth.map((d) => d.users)}
                        label="Users"
                        height={260}
                    />
                </div>
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Revenue Trend</h3>
                    <SpendingChart
                        labels={revenueByMonth.map((d) => d.month)}
                        data={revenueByMonth.map((d) => d.revenue)}
                        label="Revenue ($)"
                        height={260}
                    />
                </div>
            </div>

            {/* Recent sign-ups */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Sign-ups</h3>
                    <a href="/adminDashboard/users" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium transition-colors">
                        View All →
                    </a>
                </div>
                <div className="space-y-3">
                    {adminUsers.slice(0, 4).map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{user.name.split(" ").map(n => n[0]).join("")}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                    {user.plan}
                                </span>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{user.joined}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
