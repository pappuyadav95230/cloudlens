"use client";

import { CreditCard, Wallet, ArrowUpRight, History } from "lucide-react";

export default function WalletPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Wallet & Plans</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your Razorpay subscriptions, add wallet funds, and view billing history.
                    </p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2">
                    <Wallet size={16} />
                    Add Funds
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 col-span-1 md:col-span-1 border border-indigo-400/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Wallet size={80} /></div>
                    <p className="text-indigo-100 font-medium text-sm">Available Balance</p>
                    <h2 className="text-4xl font-bold mt-2 tracking-tight">$0.00</h2>
                    <p className="text-indigo-200 text-xs mt-4">Your cloud ingestion will pause if balance falls below $0.</p>
                </div>

                {/* Current Plan Card */}
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm col-span-1 md:col-span-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Pro Tier</h3>
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">ACTIVE</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                You are currently on the Pro plan allowing up to 10 cloud connections.
                            </p>
                        </div>
                        <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors">
                            Upgrade to Enterprise
                        </button>
                    </div>
                </div>
            </div>

            {/* Transaction History Placeholder */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <History className="w-5 h-5 text-slate-400" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">Transaction History</h3>
                </div>
                <div className="p-8 text-center flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                    <CreditCard className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm">No transactions yet.</p>
                    <p className="text-xs mt-1 max-w-sm">When you add funds or subscribe to a plan, your billing records will appear here.</p>
                </div>
            </div>
        </div>
    );
}
