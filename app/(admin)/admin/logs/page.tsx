"use client";

import { Activity, AlertTriangle, TerminalSquare, ShieldAlert } from "lucide-react";

export default function AdminLogsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">System Logs & Health</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Monitor Vercel Cron executions, Database sync anomalies, and Webhook failures.
                    </p>
                </div>
                <button className="bg-white border border-slate-200 text-slate-700 dark:bg-[#1e293b] dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm">
                    Refresh Logs
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Cron Health</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">99.9%</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Client Sync Failures</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">0</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                        <ShieldAlert size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Webhook Rejections</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">0</h3>
                    </div>
                </div>
            </div>

            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-sm h-[500px] flex flex-col">
                <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2 bg-[#1e293b]">
                    <TerminalSquare className="w-5 h-5 text-slate-400" />
                    <h3 className="font-semibold text-slate-200">Live Server Output Stream</h3>
                    <span className="ml-auto flex shrink-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></span>
                </div>
                <div className="p-6 font-mono text-[13px] text-slate-400 overflow-y-auto flex-1 space-y-2">
                    <p className="text-slate-500">System initialization complete. Listening for Supabase connections...</p>
                    <p className="text-slate-500">Waiting for first sync cycle.</p>
                </div>
            </div>
        </div>
    );
}
