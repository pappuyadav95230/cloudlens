import { BarChart3, Shield, Bell, DollarSign, Cloud, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
    {
        icon: BarChart3,
        title: "Real-Time Analytics",
        description: "Track cloud spending across all services with live dashboards and detailed breakdowns.",
    },
    {
        icon: Shield,
        title: "Anomaly Detection",
        description: "AI-powered spike detection alerts you before costs spiral out of control.",
    },
    {
        icon: Bell,
        title: "Smart Alerts",
        description: "Get instant notifications when spending exceeds thresholds or unusual patterns emerge.",
    },
    {
        icon: DollarSign,
        title: "Budget Tracking",
        description: "Set budgets per project or service and monitor real-time progress against limits.",
    },
    {
        icon: Cloud,
        title: "Multi-Cloud Support",
        description: "Connect GCP, AWS, and Azure accounts and view unified spending in one place.",
    },
    {
        icon: Zap,
        title: "Optimization Tips",
        description: "Get actionable recommendations to eliminate waste and reduce your cloud bill.",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 mb-4">
                            Features
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Everything You Need to Control Costs
                        </h2>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            Powerful tools to monitor, analyze, and optimize your cloud infrastructure spending.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.12}>
                    {features.map((f) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={f.title}
                                className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-6 card-hover hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 group"
                            >
                                <div className="w-11 h-11 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-all duration-300 group-hover:scale-110">
                                    <Icon size={22} className="text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.description}</p>
                            </div>
                        );
                    })}
                </ScrollReveal>
            </div>
        </section>
    );
}
