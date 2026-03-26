"use client";

import { LifeBuoy, Book, MessageSquare, ExternalLink } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Help & Support</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Stuck on a cloud integration? We are here to help you get your data flowing.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-indigo-300 group cursor-pointer">
                    <Book className="w-8 h-8 text-indigo-500 mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">Documentation</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Read our guides on how to properly extract GCP Service Account JSON keys and configure AWS Cost Explorer permissions.
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        Read Docs <ExternalLink size={14} />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-emerald-300 group cursor-pointer">
                    <MessageSquare className="w-8 h-8 text-emerald-500 mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Open a Ticket</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Get direct technical assistance from our platform engineers if your BigQuery tables are refusing connections.
                    </p>
                    <button className="mt-4 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 px-4 py-2 rounded-xl text-sm font-semibold group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-500/30 flex items-center justify-center shrink-0">
                    <LifeBuoy className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise SLA</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        Are you on the Enterprise plan? You have access to 24/7 dedicated Slack support and guaranteed 1-hour response times. Email your account manager to get started.
                    </p>
                </div>
            </div>
        </div>
    );
}
