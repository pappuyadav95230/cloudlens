import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Download, Target, RefreshCw } from "lucide-react";
import SpendingChart from "@/app/(dashboard)/_components/SpendingChart";
import { projects, projectServiceBreakdown } from "@/app/(dashboard)/_data/mockData";

export function generateStaticParams() {
    return projects.map((p) => ({ id: p.id }));
}

const statusColors: Record<string, string> = {
    healthy: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400",
    warning: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
    critical: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400",
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const project = projects.find((p) => p.id === params.id) || projects[0];

    const dailyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const totalDaily = dailyLabels.map((_, di) =>
        projectServiceBreakdown.reduce((sum, s) => sum + s.daily[di], 0)
    );

    return (
        <div className="space-y-6 max-w-7xl">
            {/* Master Header Card */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                
                {/* Top Bar: Title & Actions */}
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <Link href="/dashboard/projects" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-0.5 shrink-0">
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white">{project.name}</h1>
                                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${statusColors[project.status]}`}>
                                    {project.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide">
                                {project.provider} LOGIC · {project.services} ACTIVE APIS · UPDATED {project.lastUpdated}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-2 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                            <RefreshCw size={14} /> Refresh
                        </button>
                        <button className="px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all shadow-sm">
                            <Download size={14} /> Export
                        </button>
                    </div>
                </div>

                {/* Middle Bar: KPI Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 bg-slate-50/50 dark:bg-[#0f172a] text-center md:text-left">
                    <div className="px-6 py-5">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Monthly Spend</p>
                        <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">${project.monthlySpend.toLocaleString()}</p>
                    </div>
                    <div className="px-6 py-5">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Total Budget</p>
                        <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">${project.budget.toLocaleString()}</p>
                    </div>
                    <div className="px-6 py-5 flex flex-col justify-center">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">Utilization</p>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-200 dark:bg-slate-700/50 rounded-full h-3 max-w-[200px] overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-1000 ${project.status === 'critical' ? 'bg-red-500' : project.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min((project.monthlySpend / project.budget) * 100, 100)}%` }}></div>
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{Math.round((project.monthlySpend / project.budget) * 100)}%</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Configure Budget Limit */}
                <div className="px-6 py-4 border-t border-indigo-100 dark:border-slate-800 bg-indigo-50/50 dark:bg-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-500" />
                        <span className="text-sm font-bold text-indigo-900 dark:text-white">Configure Budget Constraints</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-auto">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">$</span>
                            <input type="number" defaultValue={project.budget} className="w-full sm:w-32 pl-7 pr-3 py-1.5 bg-white dark:bg-[#0f172a] border border-indigo-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" />
                        </div>
                        <select className="w-full sm:w-auto px-3 py-1.5 bg-white dark:bg-[#0f172a] border border-indigo-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm">
                            <option>Alert at 50%</option>
                            <option>Alert at 80%</option>
                            <option>Alert at 90%</option>
                            <option>Alert at 100%</option>
                        </select>
                        <button className="w-full sm:w-auto px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1">
                            Save Limit
                        </button>
                    </div>
                </div>
            </div>

            {/* Daily spending chart */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Daily Spending (This Week)</h3>
                <SpendingChart labels={dailyLabels} data={totalDaily} height={260} />
            </div>

            {/* Service breakdown table */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Cost by Service</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a]">
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Service</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Total</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Trend</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Daily Avg</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {projectServiceBreakdown.map((s) => {
                                const avg = Math.round(s.daily.reduce((a, b) => a + b, 0) / s.daily.length);
                                return (
                                    <tr key={s.service} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-5 py-3.5 text-sm font-medium text-slate-900 dark:text-white">{s.service}</td>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">${s.total.toLocaleString()}</td>
                                        <td className="px-5 py-3.5">
                                            <div className={`inline-flex items-center gap-1 text-xs font-semibold ${s.trend >= 0 ? "text-red-500" : "text-green-500"
                                                }`}>
                                                {s.trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                                {Math.abs(s.trend)}%
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400">${avg}/day</td>
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
