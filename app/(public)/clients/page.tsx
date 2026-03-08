import Link from "next/link";
import { ArrowRight, Quote, BarChart3, TrendingDown, Clock } from "lucide-react";

export const metadata = {
    title: "Customers | CloudLens",
    description: "See how modern engineering teams use CloudLens to take control of their infrastructure economics.",
};

const caseStudies = [
    {
        company: "Acme Corp",
        logo: "A",
        color: "bg-rose-500",
        metric: "42%",
        metricLabel: "Reduction in AWS spend",
        quote: "Before CloudLens, our engineering and finance teams spoke completely different languages. Now, every developer knows exactly what their architecture decisions cost in real-time.",
        author: "Sarah Chen, VP of Engineering",
        highlights: [
            { icon: <TrendingDown className="w-4 h-4 text-emerald-500" />, text: "Identified $12k/mo in idle RDS instances" },
            { icon: <Clock className="w-4 h-4 text-emerald-500" />, text: "Reduced monthly reporting time by 40 hours" },
        ]
    },
    {
        company: "Nexus AI",
        logo: "N",
        color: "bg-blue-500",
        metric: "$1.2M",
        metricLabel: "Annualized savings",
        quote: "Training AI models is expensive. CloudLens helped us map exactly which research experiments were bleeding money, allowing us to reallocate budget to our most promising models.",
        author: "Dr. Marcus Thorne, Head of Research",
        highlights: [
            { icon: <BarChart3 className="w-4 h-4 text-emerald-500" />, text: "Granular GPU cluster cost attribution" },
            { icon: <TrendingDown className="w-4 h-4 text-emerald-500" />, text: "Eliminated orphaned storage volumes" },
        ]
    },
    {
        company: "Stark Logistics",
        logo: "S",
        color: "bg-amber-500",
        metric: "100%",
        metricLabel: "Cost visibility achieved",
        quote: "As a bootstrap startup, every dollar matters. The zero-configuration setup meant we went from guessing our GCP bill to having a beautiful, categorized dashboard in exactly 3 minutes.",
        author: "Elena Rodriguez, CTO",
        highlights: [
            { icon: <Clock className="w-4 h-4 text-emerald-500" />, text: "3-minute onboarding time" },
            { icon: <BarChart3 className="w-4 h-4 text-emerald-500" />, text: "Automated daily spending digests" },
        ]
    }
];

export default function ClientsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] selection:bg-indigo-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                            Trusted by teams <br /> building the future.
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            From bootstrapped startups to enterprise unicorns, see how engineering organizations use CloudLens to build cost-aware cultures.
                        </p>
                    </div>
                </div>
            </section>

            {/* Logo Cloud */}
            <section className="py-12 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">
                        Powering infrastructure economics at
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Abstract representations of company logos */}
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"><div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div> ACME</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"><div className="w-8 h-8 rounded-md bg-slate-200 dark:bg-slate-700 rotate-45"></div> NEXUS</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"><div className="w-8 h-8 rounded-tl-xl rounded-br-xl bg-slate-200 dark:bg-slate-700"></div> GLOBEX</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"><div className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700"></div> SOYLENT</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"><div className="w-6 h-8 rounded-sm bg-slate-200 dark:bg-slate-700"></div> INITECH</div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="space-y-24 max-w-6xl mx-auto">
                        {caseStudies.map((study, index) => (
                            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center group`}>
                                
                                {/* Image / Visual side */}
                                <div className="w-full lg:w-1/2">
                                    <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group-hover:shadow-indigo-500/20 transition-all duration-500">
                                        <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-900 opacity-50"></div>
                                        
                                        {/* Abstract UI overlay */}
                                        <div className="absolute inset-8 border border-slate-700/50 rounded-2xl bg-[#0f172a]/80 backdrop-blur-md p-6 flex flex-col pt-12">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl ${study.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                                        {study.logo}
                                                    </div>
                                                    <div>
                                                        <div className="h-4 w-24 bg-slate-700 rounded-md"></div>
                                                        <div className="h-3 w-16 bg-slate-800 rounded-md mt-2"></div>
                                                    </div>
                                                </div>
                                                <div className="h-8 w-8 rounded-full bg-slate-800"></div>
                                            </div>
                                            
                                            <div className="flex-1 border-t border-slate-700/50 pt-8 flex items-end gap-2">
                                                <div className="w-1/6 bg-indigo-500/20 hover:bg-indigo-500/40 transition-colors h-[40%] rounded-t-md"></div>
                                                <div className="w-1/6 bg-indigo-500/30 hover:bg-indigo-500/50 transition-colors h-[60%] rounded-t-md"></div>
                                                <div className="w-1/6 bg-indigo-500/50 hover:bg-indigo-500/70 transition-colors h-[30%] rounded-t-md"></div>
                                                <div className="w-1/6 bg-emerald-500/50 hover:bg-emerald-500/70 transition-colors h-[20%] rounded-t-md relative">
                                                    <div className="absolute -top-3 w-full border-t-2 border-dashed border-emerald-400"></div>
                                                </div>
                                                <div className="w-1/6 bg-emerald-500/40 hover:bg-emerald-500/60 transition-colors h-[20%] rounded-t-md"></div>
                                                <div className="w-1/6 bg-emerald-500/30 hover:bg-emerald-500/50 transition-colors h-[15%] rounded-t-md"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-1/2 space-y-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                        Case Study
                                    </div>
                                    
                                    <div>
                                        <p className="text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                                            {study.metric}
                                        </p>
                                        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                                            {study.metricLabel}
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <Quote className="absolute -top-4 -left-6 w-12 h-12 text-slate-200 dark:text-slate-800 -z-10 transform -rotate-12" />
                                        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                            "{study.quote}"
                                        </p>
                                        <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium">
                                            — {study.author}
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                                        {study.highlights.map((highlight, hIndex) => (
                                            <div key={hIndex} className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                                    {highlight.icon}
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 font-medium">{highlight.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-32 text-center px-4 bg-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                    <h2 className="text-4xl font-bold text-white">Join the best engineering teams.</h2>
                    <p className="text-xl text-indigo-100">
                        Stop burning capital on idle infrastructure. Get full visibility in 3 minutes.
                    </p>
                    <div className="pt-4">
                        <Link href="/login" className="inline-flex px-8 py-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold transition-all shadow-xl shadow-indigo-900/20 items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0">
                            Create Free Account <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
