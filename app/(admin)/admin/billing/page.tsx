"use client";

import { CreditCard, TrendingUp, Users } from "lucide-react";

export default function AdminBillingPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Platform Billing & MRR</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Track globally processed transactions, active subscriptions, and Razorpay payouts.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Monthly Recurring Revenue</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">$0.00</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Paid Clients</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">0</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Users size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sm:col-span-2 lg:col-span-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Wallets Handled</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">$0.00</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <CreditCard size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm mt-8">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Recent Client Transactions</h3>
                </div>
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                    <p className="text-sm">Database connection required to load Razorpay transaction history.</p>
                </div>
            </div>
        </div>
    );
}
