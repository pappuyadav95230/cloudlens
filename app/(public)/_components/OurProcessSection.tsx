"use client";

import { useEffect, useRef } from "react";
import { Cloud, Cpu, TrendingDown, ArrowRight, ShieldCheck } from "lucide-react";
import gsap from "gsap";

const steps = [
    {
        id: "01",
        title: "Connect Cloud Accounts",
        description: "Secure, read-only integration with AWS and GCP in under 5 minutes. No agents to install.",
        icon: <Cloud className="w-8 h-8 text-indigo-500" />,
        color: "from-blue-500 to-indigo-500",
        stats: "100% Secure & Non-intrusive"
    },
    {
        id: "02",
        title: "AI Ingests & Analyzes",
        description: "Our machine learning engine processes millions of billing rows, untangling complex billing data into clear unit economics.",
        icon: <Cpu className="w-8 h-8 text-emerald-500" />,
        color: "from-emerald-400 to-teal-500",
        stats: "Processes 1B+ rows daily"
    },
    {
        id: "03",
        title: "Stop Leaks. Save Money.",
        description: "Receive instant anomaly alerts and automated recommendations to terminate idle resources and right-size instances.",
        icon: <TrendingDown className="w-8 h-8 text-rose-500" />,
        color: "from-rose-400 to-orange-500",
        stats: "Average 30% cut in cloud spend"
    }
];

export default function OurProcessSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Simple intersection observer to trigger animations when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    // Animate the connecting line
                    gsap.to(lineRef.current, {
                        height: "100%",
                        duration: 1.5,
                        ease: "power3.inOut"
                    });

                    // Animate the cards staggeringly
                    gsap.fromTo(cardsRef.current, 
                        { x: -50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: "back.out(1.7)", delay: 0.2 }
                    );

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                            How It Works
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                        From raw data to <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500">
                            actionable savings.
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        A seamless 3-step process to regain absolute control over your cloud infrastructure costs.
                    </p>
                </div>

                {/* Animated Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* The continuous vertical line (Desktop) */}
                    <div className="absolute left-12 top-10 bottom-10 w-1 bg-slate-200 dark:bg-slate-800 rounded-full hidden md:block">
                        {/* Animated fill line */}
                        <div ref={lineRef} className="w-full bg-gradient-to-b from-indigo-500 via-emerald-500 to-rose-500 rounded-full" style={{ height: "0%" }}></div>
                    </div>

                    <div className="space-y-12 md:space-y-0">
                        {steps.map((step, index) => (
                            <div 
                                key={step.id} 
                                ref={el => { cardsRef.current[index] = el; }}
                                className="relative flex flex-col md:flex-row items-start gap-6 md:gap-12 md:pb-16 last:pb-0"
                                style={{ opacity: 0 }}
                            >
                                {/* Step Indicator */}
                                <div className="shrink-0 relative z-10 flex flex-row md:flex-col items-center gap-4">
                                    <div className={`w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center relative overflow-hidden group`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                        {step.icon}
                                    </div>
                                    <div className="md:hidden font-mono font-bold text-3xl text-slate-300 dark:text-slate-700">
                                        {step.id}
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="flex-1 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                                        <span className={`font-mono font-black text-8xl text-transparent bg-clip-text bg-gradient-to-b ${step.color}`}>
                                            {step.id}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 relative z-10 max-w-xl">
                                        {step.description}
                                    </p>
                                    
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 relative z-10">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {step.stats}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
