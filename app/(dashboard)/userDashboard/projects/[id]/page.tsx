import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
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
            {/* Back + Title */}
            <div className="flex items-center gap-4">
                <Link
                    href="/userDashboard/projects"
                    className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{project.name}</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {project.provider} · {project.services} services · Last updated {project.lastUpdated}
                    </p>
                </div>
                <span className={`ml-auto px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[project.status]}`}>
                    {project.status}
                </span>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Spend</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">${project.monthlySpend.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Budget</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">${project.budget.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Utilization</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                        {Math.round((project.monthlySpend / project.budget) * 100)}%
                    </p>
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
