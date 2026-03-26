"use client";

import { useState } from "react";
import { LifeBuoy, Search, Filter, MessageSquare, Clock, CheckCircle2, AlertCircle, ChevronDown, Reply } from "lucide-react";

// Mock global tickets from all users
const globalTickets = [
    { id: "TCK-9901", userName: "Acme Corp", userEmail: "admin@acme.com", subject: "AWS Billing sync suddenly stopped", status: "Open", priority: "Critical", date: "22 mins ago", unread: true },
    { id: "TCK-9900", userName: "Stark Industries", userEmail: "tony@stark.com", subject: "Need help configuring budget alerts", status: "In Progress", priority: "Medium", date: "4 hours ago", unread: false },
    { id: "TCK-9899", userName: "Wayne Enterprises", userEmail: "finance@wayne.com", subject: "PDF Export formatting issue", status: "Open", priority: "Low", date: "1 day ago", unread: true },
    { id: "TCK-9898", userName: "Globex", userEmail: "hank@globex.com", subject: "Can I pay via wire transfer?", status: "Resolved", priority: "High", date: "3 days ago", unread: false },
];

const priorityColors: Record<string, string> = {
    "Low": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    "Medium": "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    "High": "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    "Critical": "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-900/50",
};

const statusColors: Record<string, string> = {
    "Open": "text-emerald-500",
    "In Progress": "text-amber-500",
    "Resolved": "text-slate-400",
};

export default function AdminSupportPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredTickets = globalTickets.filter(t => {
        if (statusFilter !== "All" && t.status !== statusFilter) return false;
        if (searchQuery && !t.subject.toLowerCase().includes(searchQuery.toLowerCase()) && !t.userName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Support Help Desk</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Manage and respond to all client support inquiries and system issues globally.
                </p>
            </div>

            {/* Metrics & KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Open Tickets</p>
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">12</p>
                </div>
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Avg. Response Time</p>
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">4h 15m</p>
                </div>
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Resolved (This Week)</p>
                        <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">45</p>
                </div>
            </div>

            {/* Mailbox Interface */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[600px]">
                
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-[#0f172a]/50">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by client or subject..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <Filter size={14} className="text-slate-400" />
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-transparent outline-none cursor-pointer"
                            >
                                <option>All</option>
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Queue */}
                <div className="flex-1 overflow-y-auto">
                    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                        {filteredTickets.map((ticket) => (
                            <li key={ticket.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4 relative">
                                {/* Unread Indicator */}
                                {ticket.unread && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                                )}
                                
                                <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 text-center">
                                    <div className={`w-2 h-2 rounded-full mb-1 ${statusColors[ticket.status]}`}></div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ticket.id.split("-")[1]}</span>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-4 mb-1">
                                        <div className="flex items-center gap-2 truncate">
                                            <span className={`text-sm font-bold truncate ${ticket.unread ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                                                {ticket.userName}
                                            </span>
                                            <span className="text-xs text-slate-500 truncate hidden sm:inline-block">({ticket.userEmail})</span>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${priorityColors[ticket.priority]}`}>
                                            {ticket.priority}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <p className={`text-sm truncate ${ticket.unread ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-500 dark:text-slate-400"}`}>
                                            {ticket.subject}
                                        </p>
                                        <span className="text-xs font-medium text-slate-400 shrink-0">{ticket.date}</span>
                                    </div>
                                </div>

                                <div className="hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pl-4">
                                    <button className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors tooltip-trigger relative">
                                        <Reply size={16} />
                                    </button>
                                </div>
                            </li>
                        ))}
                        {filteredTickets.length === 0 && (
                            <li className="p-12 text-center">
                                <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Inbox Zero</h3>
                                <p className="text-sm text-slate-500 mt-1">No support tickets match your filters.</p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
