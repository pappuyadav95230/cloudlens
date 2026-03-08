"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
    {
        question: "What cloud providers do you support?",
        answer: "We currently support Google Cloud Platform (GCP) and Amazon Web Services (AWS). Azure support is on our roadmap and coming soon.",
    },
    {
        question: "How does anomaly detection work?",
        answer: "Our AI engine computes a 7-day rolling average for each service. If today's cost exceeds the mean plus two standard deviations, it's flagged as an anomaly with severity levels from Low to Critical.",
    },
    {
        question: "Is there a free plan?",
        answer: "Yes! Our free tier includes one cloud account, 30-day data retention, and basic anomaly detection. Perfect for individual developers and small projects.",
    },
    {
        question: "How secure is my billing data?",
        answer: "We use read-only API access to your cloud billing data. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never store your cloud credentials.",
    },
    {
        question: "Can I set custom budget alerts?",
        answer: "Absolutely. You can set budgets per project, service, or team. Alerts are sent via email and in-app notifications when thresholds are approached or exceeded.",
    },
    {
        question: "How do I connect my cloud account?",
        answer: "Sign in with Google, click 'Connect Cloud', and follow the guided setup. For GCP, we use BigQuery billing export. For AWS, we use Cost Explorer APIs. Setup takes under 2 minutes.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="relative bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500 py-24 overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Split layout: Info Left + Accordion Right */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

                    {/* Left Side — Sticky Info Panel */}
                    <ScrollReveal className="lg:col-span-2 lg:sticky lg:top-28" direction="left">
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800 mb-4">
                                FAQ
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                Got{" "}
                                <span className="bg-linear-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                                    Questions?
                                </span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8">
                                Everything you need to know about CloudLens. Can&apos;t find the answer you&apos;re looking for? Reach out to our support team.
                            </p>

                            {/* Contact CTA */}
                            <div className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
                                        <HelpCircle size={20} className="text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Still have questions?</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">We&apos;re here to help</p>
                                    </div>
                                </div>
                                <a
                                    href="mailto:support@cloudlens.dev"
                                    className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                                >
                                    Contact Support →
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right Side — Accordion */}
                    <div className="lg:col-span-3">
                        <ScrollReveal className="space-y-3" stagger={0.08}>
                            {faqs.map((faq, i) => {
                                const isOpen = openIndex === i;
                                return (
                                    <div
                                        key={i}
                                        className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen
                                            ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-md shadow-indigo-100/50 dark:shadow-indigo-900/20"
                                            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a] hover:border-slate-300 dark:hover:border-slate-600"
                                            }`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : i)}
                                            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
                                        >
                                            <span className={`text-sm font-semibold transition-colors duration-200 ${isOpen
                                                ? "text-indigo-700 dark:text-indigo-300"
                                                : "text-slate-900 dark:text-white"
                                                }`}>
                                                {faq.question}
                                            </span>
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${isOpen
                                                ? "bg-indigo-600 text-white rotate-180"
                                                : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                                                }`}>
                                                <ChevronDown size={14} />
                                            </div>
                                        </button>
                                        <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                                            <div>
                                                <div className="px-5 pb-4">
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
