"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function CTASection() {
    return (
        <section className="relative bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 py-24 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/8 blur-[100px] rounded-full" />
            </div>

            <ScrollReveal>
                <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-5">
                        Start Saving on{" "}
                        <span className="bg-linear-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                            Cloud Costs
                        </span>{" "}
                        Today
                    </h2>

                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Free to start. No credit card required. Set up in under 2 minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/login"
                            className="group inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30"
                        >
                            Get Started Free
                            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="#features"
                            className="inline-flex items-center justify-center border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl text-base font-semibold hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                        >
                            Explore Features
                        </Link>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}
