"use client";

import { useState, Fragment } from "react";
import { Search, Filter, FolderKanban, ChevronDown, ChevronUp, Cloud } from "lucide-react";
import { SiGooglecloud, SiAmazonwebservices } from "react-icons/si";

// Mock Data for scaffolding
const mockProjects = [
    {
        id: "proj_1",
        userId: "user_a",
        userEmail: "enterprise@client.com",
        provider: "GCP",
        projectName: "production-cluster-alpha",
        status: "active",
        monthlyBudget: 5000,
        currentSpend: 4230.50,
    },
    {
        id: "proj_2",
        userId: "user_b",
        userEmail: "startup@tech.io",
        provider: "AWS",
        projectName: "backend-services-eu",
        status: "active",
        monthlyBudget: 1000,
        currentSpend: 850.20,
    },
    {
        id: "proj_3",
        userId: "user_a",
        userEmail: "enterprise@client.com",
        provider: "GCP",
        projectName: "data-warehouse-beta",
        status: "warning",
        monthlyBudget: 10000,
        currentSpend: 9800.00,
    }
];

export default function AdminProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterProvider, setFilterProvider] = useState("ALL");
    const [filterUser, setFilterUser] = useState("ALL");
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    // Get unique users for the dropdown
    const uniqueUsers = Array.from(new Set(mockProjects.map(p => p.userEmail)));

    // Filtering logic
    const filteredProjects = mockProjects.filter((project) => {
        const matchesSearch = project.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              project.projectName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProvider = filterProvider === "ALL" || project.provider === filterProvider;
        const matchesUser = filterUser === "ALL" || project.userEmail === filterUser;
        return matchesSearch && matchesProvider && matchesUser;
    });

    return (
        <div className="space-y-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Client Projects
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Global overview of all connected cloud projects and their active budgets.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by User Email or Project Name..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="relative w-full sm:w-auto">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                        className="w-full sm:w-48 pl-10 pr-4 py-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer appearance-none"
                        value={filterProvider}
                        onChange={(e) => setFilterProvider(e.target.value)}
                    >
                        <option value="ALL">All Cloud Providers</option>
                        <option value="GCP">Google Cloud (GCP)</option>
                        <option value="AWS">Amazon Web Services (AWS)</option>
                    </select>
                </div>

                {/* Filter by User Dropdown */}
                <div className="relative w-full sm:w-auto">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                        className="w-full sm:w-56 pl-10 pr-4 py-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer appearance-none"
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                    >
                        <option value="ALL">All Client Users</option>
                        {uniqueUsers.map(email => (
                            <option key={email} value={email}>{email}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Master Projects Table */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a]">
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Project Details
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Owner (User)
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Monthly Budget Limit
                                </th>
                                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Current Spend
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                        <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No projects match your current filters.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredProjects.map((project) => (
                                    <Fragment key={project.id}>
                                        <tr 
                                            onClick={() => setExpandedRow(expandedRow === project.id ? null : project.id)}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${project.provider === 'GCP' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-500' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-500'}`}>
                                                        {project.provider === 'GCP' ? <SiGooglecloud size={20} /> : <SiAmazonwebservices size={20} />}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                                            {project.projectName}
                                                            {expandedRow === project.id ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                                        </p>
                                                        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 mt-1 inline-block">
                                                            {project.provider} Integration
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {project.userEmail}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-mono">
                                                ${project.monthlyBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`text-sm font-bold font-mono ${project.status === 'warning' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                                    ${project.currentSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </span>
                                            </td>
                                        </tr>

                                        {/* Expanded Budget Overview Row */}
                                        {expandedRow === project.id && (
                                            <tr className="bg-slate-50/50 dark:bg-slate-800/20 border-t-0">
                                                <td colSpan={4} className="px-6 py-6">
                                                    <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <Cloud className="w-4 h-4 text-indigo-500" />
                                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Detailed Budget Overview</h4>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                            <div>
                                                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Budget Utilization</p>
                                                                <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                                                    {((project.currentSpend / project.monthlyBudget) * 100).toFixed(1)}%
                                                                </div>
                                                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-2">
                                                                    <div 
                                                                        className={`h-2.5 rounded-full ${project.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                                                        style={{ width: `${Math.min((project.currentSpend / project.monthlyBudget) * 100, 100)}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Project Status</p>
                                                                <span className={`mt-2 inline-flex px-3 py-1 rounded-lg text-xs font-bold ${project.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                                                                    {project.status === 'warning' ? 'AT RISK OF EXCEEDING BUDGET' : 'HEALTHY'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-end">
                                                                <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-lg transition-colors">
                                                                    View Full Analytics
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
