"use client";

import { Tag, Plus, Percent } from "lucide-react";

export default function AdminCouponsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Coupon Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Generate and distribute discount codes for monthly, 6-month, and yearly subscriptions.
                    </p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg active:scale-95 flex items-center gap-2">
                    <Plus size={16} />
                    Create Coupon
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Coupons</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">0</h3>
                </div>
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Redemptions</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">0</h3>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <Percent className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">Generated Discount Codes</h3>
                </div>
                <div className="p-12 text-center text-slate-500 dark:text-slate-400 flex flex-col items-center">
                    <Tag className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-300">No coupons active.</p>
                    <p className="text-xs mt-1 max-w-sm">Click "Create Coupon" to generate a code that users can apply during Razorpay checkout.</p>
                </div>
            </div>
        </div>
    );
}
