"use client";

import { useState } from "react";
import { Download, FileText, FileSpreadsheet, Archive, Calendar, Filter, Layers, CheckCircle2, RefreshCw } from "lucide-react";
import { projects } from "@/app/(dashboard)/_data/mockData";

export default function ReportsPage() {
    const [selectedProject, setSelectedProject] = useState("ALL");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <div className="space-y-8 max-w-7xl animate-in fade-in duration-500">
            {/* Master Header Card */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                
                {/* Top Bar: Title & Actions */}
                <div className="relative overflow-hidden px-6 py-8 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-900 border-b border-indigo-400/30 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white shadow-lg shadow-indigo-500/20 rounded-t-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
                        <Filter size={140} />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl font-bold tracking-tight">Report Generator</h1>
                        <p className="text-sm text-indigo-100 mt-2 font-medium leading-relaxed">
                            Filter by date range and specific projects to instantly generate custom billing ledgers, anomaly detection summaries, and exportable CSVs.
                        </p>
                    </div>
                    <div className="relative z-10 flex items-center gap-2 shrink-0 mt-2 md:mt-0">
                        <button className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold flex items-center gap-2 transition-all shadow-md backdrop-blur-md active:scale-95">
                            <RefreshCw size={18} /> Sync Engine
                        </button>
                    </div>
                </div>

                {/* Bottom Bar: Filters */}
                <div className="px-6 py-5 bg-slate-50/50 dark:bg-[#0f172a]/50">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-4 h-4 text-indigo-500" />
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Data Constraints</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6">
                        <div className="space-y-1.5 md:col-span-1">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Select Project</label>
                            <div className="relative">
                                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select 
                                    value={selectedProject}
                                    onChange={(e) => setSelectedProject(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none shadow-sm transition-all"
                                >
                                    <option value="ALL">All Projects (Global)</option>
                                    {projects.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name} ({p.provider})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Start Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="date" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all" 
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">End Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="date" 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Generated Data Preview & Exports */}
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* PDF Export */}
                        <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-[#1e293b] p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm transition-all hover:border-red-300 group cursor-pointer flex flex-col justify-between">
                            <div>
                                <FileText className="w-8 h-8 text-red-500 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">Executive PDF Summary</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                                    A highly visual, board-ready PDF containing graphs and high-level anomaly summaries for the selected constraints.
                                </p>
                            </div>
                            <button className="mt-6 w-full bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-md">
                                <Download size={16} /> Download PDF
                            </button>
                        </div>

                        {/* CSV Export */}
                        <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-[#1e293b] p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm transition-all hover:border-emerald-300 group cursor-pointer flex flex-col justify-between">
                            <div>
                                <FileSpreadsheet className="w-8 h-8 text-emerald-500 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Raw Data CSV</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                                    Every single line item matching the constraints, ready for massive pivot tables and custom accounting macros.
                                </p>
                            </div>
                            <button className="mt-6 w-full bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-md">
                                <Download size={16} /> Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Data Preview Table */}
                    <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                Data Preview ({selectedProject === "ALL" ? "All Projects" : projects.find(p => p.id === selectedProject)?.name})
                            </h3>
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                {startDate || "Beginning of Time"} — {endDate || "Today"}
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-700">
                                        <th className="text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">Project Name</th>
                                        <th className="text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">Cloud Provider</th>
                                        <th className="text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">Total Spend</th>
                                        <th className="text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">Budget Utilization</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {projects
                                        .filter(p => selectedProject === "ALL" || p.id === selectedProject)
                                        .map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{p.name}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                                                    {p.provider}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono font-medium text-slate-700 dark:text-slate-300">${p.monthlySpend.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                                        <div className={`h-2 rounded-full ${p.status === 'critical' ? 'bg-red-500' : p.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min((p.monthlySpend / p.budget) * 100, 100)}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{Math.round((p.monthlySpend / p.budget) * 100)}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );
}
