"use client";

import SpendingChart from "@/app/(dashboard)/_components/SpendingChart";
import { invoices, monthlyComparison } from "@/app/(dashboard)/_data/mockData";
import { CreditCard, TrendingUp, PieChart, BarChart2, Download } from "lucide-react";

const statusStyles: Record<string, string> = {
    current: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
    paid: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400",
    overdue: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400",
};

export default function BillingPage() {
    return (
        <div className="space-y-6 max-w-7xl">
            {/* Hero Header Card */}
            <div className="relative overflow-hidden px-8 py-8 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-900 border border-indigo-400/30 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white shadow-lg shadow-indigo-500/20 rounded-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
                    <CreditCard size={150} />
                </div>
                
                <div className="relative z-10 flex-1">
                    <h1 className="text-3xl font-bold tracking-tight">Billing & Invoices</h1>
                    <p className="text-sm text-indigo-100 mt-2 font-medium leading-relaxed max-w-xl">
                        Manage your active subscriptions, view historical payment ledgers, and download official tax invoices.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 bg-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                    <div>
                        <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest mb-0.5">Current Plan</p>
                        <p className="text-2xl font-bold text-white tracking-tight">Pro Tier</p>
                        <p className="text-xs text-indigo-200 mt-1 font-medium">Billed monthly · Mar 1, 2026</p>
                    </div>
                    <div className="h-12 w-px bg-white/20 hidden sm:block mx-2"></div>
                    <button className="px-5 py-2.5 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 text-sm font-bold transition-all shadow-lg active:scale-95 w-full sm:w-auto mt-2 sm:mt-0">
                        Upgrade
                    </button>
                </div>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">YTD Spend</h3>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">$14,250</p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-bold tracking-wide">↓ 12% VS LAST YEAR</p>
                    </div>
                    
                    <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                <PieChart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Avg. Monthly</h3>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">$4,750</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 font-bold tracking-wide uppercase">Across 4 Projects</p>
                    </div>
                </div>

                <div className="lg:col-span-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-indigo-500" /> 
                        Trailing 6-Month Expenditure
                    </h3>
                    <SpendingChart
                        labels={monthlyComparison.map((m) => m.month)}
                        data={monthlyComparison.map((m) => m.amount)}
                        label="Monthly Ledger"
                        height={260}
                    />
                </div>
            </div>

            {/* Invoices table */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Invoices</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a]">
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Invoice</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Period</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Amount</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Due Date</th>
                                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-5 py-4 text-sm font-bold text-indigo-600 dark:text-indigo-400">{inv.id}</td>
                                    <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-white">{inv.month}</td>
                                    <td className="px-5 py-4 text-sm font-bold text-slate-900 dark:text-white">${inv.amount.toLocaleString()}</td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${statusStyles[inv.status]}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">{inv.dueDate}</td>
                                    <td className="px-5 py-4 text-right">
                                        <button className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                            <Download size={16} />
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
