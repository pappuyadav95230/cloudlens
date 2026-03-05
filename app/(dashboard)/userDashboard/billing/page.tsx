"use client";

import SpendingChart from "@/app/(dashboard)/_components/SpendingChart";
import { invoices, monthlyComparison } from "@/app/(dashboard)/_data/mockData";

const statusStyles: Record<string, string> = {
    current: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
    paid: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400",
    overdue: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400",
};

export default function BillingPage() {
    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Billing</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Invoices and payment history</p>
            </div>

            {/* Plan info */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Current Plan</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">Pro Plan</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">Billed monthly · Next invoice: Mar 1, 2026</p>
                </div>
                <button className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors">
                    Upgrade Plan
                </button>
            </div>

            {/* Monthly comparison chart */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Monthly Cost Comparison</h3>
                <SpendingChart
                    labels={monthlyComparison.map((m) => m.month)}
                    data={monthlyComparison.map((m) => m.amount)}
                    label="Monthly Spend"
                    height={260}
                />
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
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-5 py-3.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">{inv.id}</td>
                                    <td className="px-5 py-3.5 text-sm text-slate-900 dark:text-white">{inv.month}</td>
                                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">${inv.amount.toLocaleString()}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusStyles[inv.status]}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400">{inv.dueDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
