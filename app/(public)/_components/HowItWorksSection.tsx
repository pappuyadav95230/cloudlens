"use client";

import { CloudUpload, Settings, Eye } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import LottieLoader from "./LottieLoader";

const steps = [
    {
        id: "step-1",
        number: "01",
        title: "Connect Your Cloud",
        description: "Securely link your AWS or GCP accounts in seconds. We extract your raw billing data using read-only APIs without any agents.",
        icon: CloudUpload,
        lottie: "https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json",
        gradient: "from-blue-500 to-indigo-500",
        bgLight: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
        id: "step-2",
        number: "02",
        title: "AI Ingests & Analyzes",
        description: "Our intelligence engine instantly processes millions of billing rows, untangling complex data into unified, actionable unit economics.",
        icon: Settings,
        lottie: "https://assets9.lottiefiles.com/packages/lf20_fcfjwiyb.json",
        gradient: "from-indigo-500 to-purple-500",
        bgLight: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
        id: "step-3",
        number: "03",
        title: "Eliminate Waste",
        description: "Receive instant alerts on cost spikes and access one-click recommendations to terminate idle resources before the bill arrives.",
        icon: Eye,
        lottie: "https://assets3.lottiefiles.com/packages/lf20_qp1q7mct.json",
        gradient: "from-purple-500 to-rose-500",
        bgLight: "bg-rose-50 dark:bg-rose-950/20",
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500 py-32 overflow-hidden relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 mb-6">
                            How It Works
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                            From raw billing data to <br className="hidden md:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500">
                                maximum profitability.
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            A seamless three-step pipeline designed to give you absolute control over your cloud spend.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Vertical Staggered Layout */}
                <div className="space-y-32">
                    {steps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        const Icon = step.icon;

                        return (
                            <div key={step.id} className="relative">
                                {/* Ambient Background Glow */}
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr ${step.gradient} rounded-full blur-[120px] opacity-[0.03] dark:opacity-10 pointer-events-none`}></div>

                                <ScrollReveal className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}>
                                    
                                    {/* Text Content Side */}
                                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="font-mono text-5xl font-black text-slate-200 dark:text-slate-800 pointer-events-none select-none">
                                                {step.number}
                                            </div>
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.bgLight}`}>
                                                <Icon className={`w-6 h-6 text-slate-900 dark:text-white opacity-80`} />
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                            {step.title}
                                        </h3>
                                        
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Animation Side */}
                                    <div className="w-full md:w-1/2">
                                        <div className="relative group">
                                            {/* Beautiful container for animation */}
                                            <div className={`absolute inset-0 bg-gradient-to-tr ${step.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}></div>
                                            <div className="relative bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
                                                
                                                {/* Noise texture overlay */}
                                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
                                                
                                                <div className="w-full max-w-[320px] mx-auto aspect-square relative z-10 transition-transform duration-700 group-hover:scale-105">
                                                    <LottieLoader
                                                        url={step.lottie}
                                                        className="w-full h-full drop-shadow-xl"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </ScrollReveal>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
