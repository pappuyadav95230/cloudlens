"use client";

import { useState } from "react";
import { alerts } from "@/app/(dashboard)/_data/mockData";

const severityColors: Record<string, string> = {
    critical: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    high: "bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    medium: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    low: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
};

const severityOrder = ["critical", "high", "medium", "low"];

export default function AlertsPage() {
    const [filter, setFilter] = useState<string>("all");

    const filtered = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter);

    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Alerts</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Anomaly detections and cost spike warnings</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {["all", ...severityOrder].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${filter === s
                                ? "bg-indigo-600 text-white"
                                : "bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                            }`}
                    >
                        {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                        <span className="ml-1.5 text-xs opacity-70">
                            ({s === "all" ? alerts.length : alerts.filter((a) => a.severity === s).length})
                        </span>
                    </button>
                ))}
            </div>

            {/* Alerts list */}
            <div className="space-y-3">
                {filtered.map((alert) => (
                    <div
                        key={alert.id}
                        className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-all duration-200"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${severityColors[alert.severity]}`}>
                                        {alert.severity.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-slate-400 dark:text-slate-500">{alert.timestamp}</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{alert.message}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {alert.project} → {alert.service}
                                </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">${alert.amount.toLocaleString()}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">affected spend</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
