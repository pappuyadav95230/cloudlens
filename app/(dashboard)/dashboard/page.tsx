"use client";

import { DollarSign, FolderKanban, Bell, PiggyBank, BarChart, RefreshCw } from "lucide-react";
import StatCard from "@/app/(dashboard)/_components/StatCard";
import SpendingChart from "@/app/(dashboard)/_components/SpendingChart";
import CostBreakdownChart from "@/app/(dashboard)/_components/CostBreakdownChart";
import { dashboardStats, spendingTrend, costByService, alerts } from "@/app/(dashboard)/_data/mockData";

const severityColors: Record<string, string> = {
    critical: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    high: "bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    medium: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    low: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
};

export default function UserDashboardPage() {
    return (
        <div className="space-y-6 w-full">
            {/* Page title */}
            {/* Hero Header Card */}
            <div className="relative overflow-hidden px-8 py-8 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-900 border border-indigo-400/30 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white shadow-lg shadow-indigo-500/20 rounded-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
                    <BarChart size={140} />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-sm text-indigo-100 mt-2 font-medium leading-relaxed">
                        Monitor, govern, and drill into all your synchronized GCP and AWS cloud environments from a single unified control plane.
                    </p>
                </div>
                <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0 mt-4 md:mt-0">
                    <div className="hidden sm:block px-4 py-3.5 bg-black/20 backdrop-blur-md rounded-xl text-xs font-semibold text-indigo-100 border border-white/10 shadow-sm shadow-black/10 tracking-wide">
                        LAST SYNCED: <span className="text-white ml-1">JUST NOW</span>
                    </div>
                    <button className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold flex items-center gap-2 transition-all shadow-lg backdrop-blur-md active:scale-95">
                        <RefreshCw size={18} /> Sync Engine
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Spend (MTD)"
                    value={dashboardStats.totalSpend.toLocaleString()}
                    change={dashboardStats.totalSpendChange}
                    icon={DollarSign}
                    prefix="$"
                />
                <StatCard
                    title="Active Projects"
                    value={dashboardStats.activeProjects.toString()}
                    change={dashboardStats.activeProjectsChange}
                    icon={FolderKanban}
                />
                <StatCard
                    title="Alerts Triggered"
                    value={dashboardStats.alertsTriggered.toString()}
                    change={dashboardStats.alertsTriggeredChange}
                    icon={Bell}
                />
                <StatCard
                    title="Savings Identified"
                    value={dashboardStats.savingsIdentified.toLocaleString()}
                    change={dashboardStats.savingsIdentifiedChange}
                    icon={PiggyBank}
                    prefix="$"
                />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Spending Trend */}
                <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Spending Trend (30 Days)</h3>
                    <SpendingChart
                        labels={spendingTrend.map((d) => d.date)}
                        data={spendingTrend.map((d) => d.amount)}
                        height={280}
                    />
                </div>

                {/* Cost Breakdown */}
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Cost by Service</h3>
                    <CostBreakdownChart
                        labels={costByService.map((c) => c.service)}
                        data={costByService.map((c) => c.amount)}
                        colors={costByService.map((c) => c.color)}
                        height={280}
                    />
                </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Alerts</h3>
                    <a href="/dashboard/alerts" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium transition-colors">
                        View All →
                    </a>
                </div>
                <div className="space-y-3">
                    {alerts.slice(0, 4).map((alert) => (
                        <div
                            key={alert.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${severityColors[alert.severity]}`}>
                                    {alert.severity.toUpperCase()}
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{alert.message}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">{alert.project} · {alert.service}</p>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">${alert.amount.toLocaleString()}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">{alert.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
