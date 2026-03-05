"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const clients = [
    { name: "Acme Corp", logo: "AC" },
    { name: "GlobalTech", logo: "GT" },
    { name: "Nexus Innovations", logo: "NI" },
    { name: "Quantum Data", logo: "QD" },
    { name: "Stellar Cloud", logo: "SC" },
    { name: "Vertex System", logo: "VS" },
];

export default function ClientsSection() {
    return (
        <section id="clients" className="bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 py-24 border-y border-slate-200 dark:border-slate-800/60 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/60 mb-4">
                            Trusted By
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                            Powering the world&apos;s most innovative teams
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Marquee Wrapper */}
                <div className="relative flex overflow-x-hidden">
                    {/* Gradient Masks */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#0f172a] to-transparent z-10 pointer-events-none"></div>

                    {/* Scrolling Content - Duplicate for seamless loop */}
                    <div className="flex w-fit items-center gap-12 sm:gap-24 animate-marquee whitespace-nowrap px-4 hover:[animation-play-state:paused] transition-all duration-300">
                        {[...clients, ...clients, ...clients].map((client, idx) => (
                            <div
                                key={`${client.name}-${idx}`}
                                className="group flex items-center justify-center w-36 h-16 sm:w-48 sm:h-20 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 cursor-pointer"
                            >
                                <div className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-400 group-hover:from-indigo-600 group-hover:to-blue-500 dark:group-hover:from-indigo-400 dark:group-hover:to-blue-400 transition-all duration-300">
                                    {client.logo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
