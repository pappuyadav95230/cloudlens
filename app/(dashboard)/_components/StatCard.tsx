import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    change: number;
    icon: LucideIcon;
    prefix?: string;
}

export default function StatCard({ title, value, change, icon: Icon, prefix }: StatCardProps) {
    const isPositive = change >= 0;

    return (
        <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
                    <Icon size={20} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isPositive
                        ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400"
                        : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"
                    }`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(change)}%
                </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {prefix}{value}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{title}</p>
        </div>
    );
}
