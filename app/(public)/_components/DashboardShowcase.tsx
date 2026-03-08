import Link from "next/link";
import { ArrowRight, LayoutGrid, Bell, BarChart3, Shield } from "lucide-react";

const features = [
    {
        badge: "Project Intelligence",
        badgeIcon: <LayoutGrid className="w-3.5 h-3.5" />,
        title: "Every project. Every dollar. One view.",
        description:
            "See all your connected cloud projects at a glance — their provider, monthly spend, budget utilization, health status, and last sync time. No more switching between AWS and GCP consoles.",
        bullets: [
            "Multi-cloud project tracking (GCP + AWS)",
            "Budget utilization bars with health indicators",
            "One-click drill-down into service-level costs",
        ],
        image: "/images/projects-preview.png",
        imageAlt: "CloudLens Projects Dashboard",
        direction: "left" as const,
    },
    {
        badge: "Anomaly Detection",
        badgeIcon: <Bell className="w-3.5 h-3.5" />,
        title: "Catch cost spikes before they cost you.",
        description:
            "CloudLens monitors your spending patterns 24/7 and fires real-time alerts when something looks off — whether it's a training cluster that forgot to shut down or a budget about to blow.",
        bullets: [
            "Critical, High, Medium & Low severity classification",
            "Affected spend shown per anomaly",
            "Automatic idle resource detection",
        ],
        image: "/images/alerts-preview.png",
        imageAlt: "CloudLens Alerts Dashboard",
        direction: "right" as const,
    },
];

export default function DashboardShowcase() {
    return (
        <section className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden" id="take-a-tour">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
                        <BarChart3 className="w-3.5 h-3.5" /> Platform Tour
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                        Inside the Intelligence.
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        Experience the platform that turns millions of raw billing records into actionable unit economics. Built for engineering speed.
                    </p>
                </div>

                {/* Feature Blocks */}
                <div className="space-y-32 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${
                                feature.direction === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
                            } items-center gap-12 lg:gap-20`}
                        >
                            {/* Image Side */}
                            <div className="w-full lg:w-3/5 group">
                                <div className="relative">
                                    {/* Glow behind image */}
                                    <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                    {/* Browser Chrome */}
                                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-300/50 dark:shadow-none bg-white dark:bg-[#1e293b]">
                                        {/* Top bar */}
                                        <div className="h-10 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                                            <div className="ml-3 flex-1 max-w-[200px] h-5 rounded-md bg-slate-200 dark:bg-slate-800 flex items-center px-2.5">
                                                <span className="text-[10px] text-slate-400 font-mono truncate">app.cloudlens.io</span>
                                            </div>
                                        </div>
                                        {/* Screenshot */}
                                        <img
                                            src={feature.image}
                                            alt={feature.imageAlt}
                                            className="w-full h-auto block"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-2/5 space-y-6">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                                    {feature.badgeIcon}
                                    {feature.badge}
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Bullet Points */}
                                <ul className="space-y-3 pt-2">
                                    {feature.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <Shield className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                                                {bullet}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <div className="pt-4">
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all duration-300"
                                    >
                                        Try it yourself <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
