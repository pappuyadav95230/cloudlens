"use client";

import { useState } from "react";
import { Check, Info } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const plans = [
    {
        name: "Starter",
        description: "Perfect for small teams and startups starting with cloud.",
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
            "Up to 3 Cloud Accounts",
            "Basic Cost Analysis",
            "Daily Email Reports",
            "Community Support",
        ],
        highlighted: false,
        buttonText: "Start for free",
        buttonLink: "/login",
    },
    {
        name: "Pro",
        description: "Advanced analytics and alerts for growing businesses.",
        monthlyPrice: 49,
        yearlyPrice: 39,
        features: [
            "Unlimited Cloud Accounts",
            "Advanced Cost Forecasting",
            "Real-time Alerts & webhooks",
            "Custom Logic & Dashboards",
            "Priority Email Support",
        ],
        highlighted: true,
        buttonText: "Get Started",
        buttonLink: "/login",
    },
    {
        name: "Enterprise",
        description: "Dedicated infrastructure, SLAs, and direct support.",
        monthlyPrice: 199,
        yearlyPrice: 159,
        features: [
            "Everything in Pro",
            "Dedicated Account Manager",
            "99.9% Uptime SLA",
            "SSO & Custom Security",
            "On-premise Deployment Auth",
        ],
        highlighted: false,
        buttonText: "Contact Sales",
        buttonLink: "/login",
    },
];

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(true);

    return (
        <section id="pricing" className="bg-white dark:bg-[#1e293b] transition-colors duration-500 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 mb-4">
                            Pricing
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Simple pricing that <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">scales</span> with you
                        </h2>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            Save up to 40% on your cloud costs. Only pay a fraction of what you save.
                        </p>

                        {/* Toggle */}
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <span className={`text-sm font-medium ${!isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                                Monthly
                            </span>
                            <button
                                onClick={() => setIsYearly(!isYearly)}
                                className="relative inline-flex h-7 w-14 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                            >
                                <span
                                    className={`${isYearly ? "translate-x-8 bg-indigo-600" : "translate-x-1 bg-white dark:bg-slate-300"
                                        } inline-block h-5 w-5 transform rounded-full transition-transform duration-200 ease-in-out shadow-sm`}
                                />
                            </button>
                            <span className={`text-sm font-medium ${isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                                Yearly <span className="ml-1.5 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Save 20%</span>
                            </span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan, i) => (
                        <ScrollReveal key={plan.name} stagger={i * 0.15}>
                            <div
                                className={`relative h-full flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl ${plan.highlighted
                                    ? "bg-slate-900 dark:bg-slate-800 border-slate-800 dark:border-slate-700 shadow-xl shadow-indigo-900/20 md:-translate-y-2 md:scale-105 z-10"
                                    : "bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className={`text-xl font-bold ${plan.highlighted ? "text-white" : "text-slate-900 dark:text-white"}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`mt-2 text-sm ${plan.highlighted ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-8 flex items-baseline text-slate-900 dark:text-white">
                                    <span className={`text-5xl font-extrabold tracking-tight ${plan.highlighted ? "text-white" : ""}`}>
                                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    </span>
                                    <span className={`ml-1 text-xl font-medium ${plan.highlighted ? "text-slate-400" : "text-slate-500 dark:text-slate-500"}`}>
                                        /mo
                                    </span>
                                </div>

                                <ul className="flex-1 space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <div className={`shrink-0 flex items-center justify-center rounded-full p-1 mr-3 ${plan.highlighted ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"}`}>
                                                <Check size={14} className="stroke-[3]" />
                                            </div>
                                            <span className={`text-sm ${plan.highlighted ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={plan.buttonLink}
                                    className={`w-full py-3.5 px-6 rounded-xl text-center text-sm font-bold transition-all duration-300 ${plan.highlighted
                                        ? "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white shadow-lg shadow-indigo-500/30 hover:scale-[1.02]"
                                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                                        }`}
                                >
                                    {plan.buttonText}
                                </Link>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Footer note */}
                <ScrollReveal stagger={0.3}>
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
                        <Info size={16} /> All plans include a 14-day free trial. No credit card required.
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
}
