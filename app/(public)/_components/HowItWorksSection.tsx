"use client";

import { CloudUpload, Settings, Eye } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import LottieLoader from "./LottieLoader";

const steps = [
    {
        step: "01",
        icon: CloudUpload,
        title: "Connect Your Cloud",
        description: "Link your GCP or AWS account in seconds. We pull billing data automatically via secure APIs.",
        lottie: "https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json",
    },
    {
        step: "02",
        icon: Settings,
        title: "We Analyze Everything",
        description: "Our AI engine detects anomalies, identifies trends, and surfaces optimization opportunities.",
        lottie: "https://assets9.lottiefiles.com/packages/lf20_fcfjwiyb.json",
    },
    {
        step: "03",
        icon: Eye,
        title: "You See Clearly",
        description: "Get a beautiful dashboard with real-time charts, alerts, and actionable insights to cut costs.",
        lottie: "https://assets3.lottiefiles.com/packages/lf20_qp1q7mct.json",
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="bg-white dark:bg-[#1e293b] transition-colors duration-500 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-800 mb-4">
                            How It Works
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Up and Running in 3 Steps
                        </h2>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            No complex setup. Connect your cloud and start saving within minutes.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Steps */}
                <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-10" stagger={0.2}>
                    {steps.map((s) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.step} className="text-center relative group">
                                {/* Lottie animation */}
                                <div className="w-24 h-24 mx-auto mb-4 relative">
                                    <LottieLoader
                                        url={s.lottie}
                                        className="w-full h-full"
                                    />
                                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                                        {s.step}
                                    </span>
                                </div>

                                {/* Fallback icon (hidden when Lottie loads) */}
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {s.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                                    {s.description}
                                </p>
                            </div>
                        );
                    })}
                </ScrollReveal>
            </div>
        </section>
    );
}
