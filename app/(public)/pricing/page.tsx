"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, ArrowRight, HelpCircle } from "lucide-react";

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] selection:bg-indigo-500/30">
            {/* Header */}
            <section className="pt-32 pb-16 lg:pt-48 lg:pb-24 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div className="max-w-3xl mx-auto text-center relative z-10 animate-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white capitalize leading-[1.1] mb-6">
                        Predictable pricing for <br className="hidden lg:block" /> un-predictable clouds.
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
                        Stop paying a percentage of your cloud spend. We charge a flat, transparent fee based on the features you need.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-semibold ${!isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>Billed Monthly</span>
                        <button 
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                        >
                            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${isAnnual ? "translate-x-8 bg-indigo-600" : ""}`}></div>
                        </button>
                        <span className={`text-sm font-semibold flex items-center gap-2 ${isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                            Billed Annually
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-bold">
                                Save 20%
                            </span>
                        </span>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24 px-4 relative z-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
                    
                    {/* Starter Tier */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Starter</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 h-10">Perfect for indie hackers and early-stage startups.</p>
                        <div className="mb-6">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">${isAnnual ? "0" : "0"}</span>
                            <span className="text-slate-500 hidden">/mo</span>
                            <p className="text-sm text-slate-500 mt-1">Free forever</p>
                        </div>
                        <Link href="/login" className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-center rounded-xl font-semibold transition-colors mb-8">
                            Get Started
                        </Link>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Includes:</p>
                            <ul className="space-y-3">
                                {[
                                    { text: "Up to $10k/mo tracked spend", included: true },
                                    { text: "1 Cloud Provider connection", included: true },
                                    { text: "Basic Hierarchical Dashboard", included: true },
                                    { text: "CSV Exports", included: true },
                                    { text: "Anomaly Detection Alerts", included: false },
                                    { text: "Slack & Email Integrations", included: false },
                                ].map((feature, i) => (
                                    <li key={i} className={`flex items-start gap-3 text-sm ${feature.included ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-600"}`}>
                                        {feature.included ? <Check className="w-5 h-5 text-indigo-500 shrink-0" /> : <X className="w-5 h-5 shrink-0" />}
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Pro Tier (Highlighted) */}
                    <div className="bg-slate-900 dark:bg-indigo-950/20 rounded-3xl p-8 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 relative transform md:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Most Popular
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                        <p className="text-sm text-indigo-200 mb-6 h-10">For growing engineering teams managing multicloud scale.</p>
                        <div className="mb-6">
                            <span className="text-4xl font-black text-white">${isAnnual ? "99" : "129"}</span>
                            <span className="text-indigo-200">/mo</span>
                            <p className="text-sm text-indigo-300 mt-1">Billed {isAnnual ? "annually ($1,188/yr)" : "monthly"}</p>
                        </div>
                        <Link href="/login" className="block w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white text-center rounded-xl font-semibold transition-colors mb-8 shadow-lg shadow-indigo-500/30">
                            Start 14-Day Free Trial
                        </Link>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-white uppercase tracking-wider">Everything in Starter, plus:</p>
                            <ul className="space-y-3">
                                {[
                                    { text: "Unlimited tracked spend", included: true },
                                    { text: "Unlimited Provider connections", included: true },
                                    { text: "AI-Powered Anomaly Detection", included: true },
                                    { text: "Slack & Email Alerts", included: true },
                                    { text: "Custom API Access", included: true },
                                    { text: "SSO (SAML/OIDC)", included: false },
                                ].map((feature, i) => (
                                    <li key={i} className={`flex items-start gap-3 text-sm ${feature.included ? "text-slate-300" : "text-slate-600"}`}>
                                        {feature.included ? <Check className="w-5 h-5 text-indigo-400 shrink-0" /> : <X className="w-5 h-5 shrink-0" />}
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Enterprise</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 h-10">Custom setups, compliance, and highly tailored support.</p>
                        <div className="mb-6">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">Custom</span>
                            <p className="text-sm text-slate-500 mt-1">Tailored to your scale</p>
                        </div>
                        <button className="w-full py-3 px-4 bg-white dark:bg-[#0f172a] border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-900 dark:text-white text-center rounded-xl font-semibold transition-colors mb-8">
                            Contact Sales
                        </button>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Everything in Pro, plus:</p>
                            <ul className="space-y-3">
                                {[
                                    { text: "SSO (SAML/OIDC)", included: true },
                                    { text: "Role-Based Access Control (RBAC)", included: true },
                                    { text: "Dedicated Success Manager", included: true },
                                    { text: "Custom Contract & SLA", included: true },
                                    { text: "On-Premises Deployment Option", included: true },
                                    { text: "Advanced Audit Logging", included: true },
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-slate-50 dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-6">
                        {[
                            {
                                q: "How do you track my spending?",
                                a: "We require read-only access strictly to the billing export datasets configured in your GCP or AWS environments. We never ask for production application access."
                            },
                            {
                                q: "Do you charge a percentage of my cloud spend?",
                                a: "No. Unlike other tools that penalize you for scale by taking a cut of your overall bill or savings, we charge a flat, predictable monthly fee."
                            },
                            {
                                q: "Can I cancel anytime?",
                                a: "Yes, you can cancel your subscription at any time from the billing dashboard. Annual plans are paid upfront and are non-refundable after the first 30 days."
                            },
                            {
                                q: "What happens if I exceed the Starter tier limits?",
                                a: "If your tracked cloud spend exceeds $10k in a given month on the Starter plan, we will notify you and give a grace period before requiring a Pro upgrade to view new data."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-start gap-3 mb-2">
                                    <HelpCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
                                    {faq.q}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 pl-9 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
