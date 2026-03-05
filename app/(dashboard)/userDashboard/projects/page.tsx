"use client";

import Link from "next/link";
import { Cloud, ExternalLink } from "lucide-react";
import { projects } from "@/app/(dashboard)/_data/mockData";

const statusColors: Record<string, string> = {
    healthy: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400",
    warning: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
    critical: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400",
};

const providerColors: Record<string, string> = {
    GCP: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
    AWS: "bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400",
};

export default function ProjectsPage() {
    return (
        <div className="space-y-6 max-w-7xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">All connected cloud projects and their spending</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                    <Cloud size={16} />
                    Connect Project
                </button>
            </div>

            {/* Projects table */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a]">
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Project</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Provider</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Monthly Spend</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Budget</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Updated</th>
                                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {projects.map((p) => {
                                const utilization = Math.round((p.monthlySpend / p.budget) * 100);
                                return (
                                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{p.name}</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500">{p.services} services</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${providerColors[p.provider]}`}>
                                                {p.provider}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">${p.monthlySpend.toLocaleString()}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${utilization > 100 ? "bg-red-500" : utilization > 80 ? "bg-amber-500" : "bg-green-500"
                                                            }`}
                                                        style={{ width: `${Math.min(utilization, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">{utilization}%</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusColors[p.status]}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-400 dark:text-slate-500">{p.lastUpdated}</td>
                                        <td className="px-5 py-4 text-right">
                                            <Link
                                                href={`/userDashboard/projects/${p.id}`}
                                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
                                            >
                                                <ExternalLink size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
