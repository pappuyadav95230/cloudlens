import Link from "next/link";
import { ArrowRight, Cloud, Shield, Zap, Target, Users, Globe } from "lucide-react";

export const metadata = {
    title: "About Us | CloudLens",
    description: "Our mission to bring clarity and control back to cloud spending for engineering teams worldwide.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] selection:bg-indigo-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
                <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
                
                {/* Decorative background glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Our Story
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white capitalize leading-[1.1]">
                            Bringing Clarity to <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-600">Cloud Chaos.</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            We believe engineering teams should spend time building the future, not decoding cryptic billing reports. CloudLens was built to make cloud finance legible, actionable, and entirely transparent.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="py-24 bg-white dark:bg-[#1e293b] border-y border-slate-200 dark:border-slate-800 relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div className="space-y-6">
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                                The cloud is amazing, but managing its cost is broken.
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Five years ago, our founding team was managing infrastructure for a high-growth startup. We loved the agility of AWS and GCP, but dreaded the end of the month.
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Invoices were a black box. A simple architectural change could result in thousands of dollars in hidden data transfer fees. Existing tools were either too complex to set up or too enterprise-heavy to afford. We decided there had to be a better way: a platform that engineers actually enjoyed using.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
                            <div className="relative bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                </div>
                                <div className="space-y-3 font-mono text-sm text-slate-400">
                                    <p><span className="text-indigo-400">SELECT</span> sum(cost) <span className="text-purple-400">AS</span> total_bleeding</p>
                                    <p><span className="text-indigo-400">FROM</span> `billing_exports.gcp_billing`</p>
                                    <p><span className="text-indigo-400">WHERE</span> service.description = 'Cloud Spanner'</p>
                                    <p className="pt-4 text-emerald-400">&gt; Query failed: Human comprehension not found.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in duration-1000">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">Built on First Principles</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            We didn't just build another dashboard. We built a philosophy around how engineering organizations should treat their infrastructure.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <Zap className="w-6 h-6 text-indigo-500" />,
                                title: "Zero Configuration Tax",
                                desc: "No agents to install. No massive terraform modules. Just connect your read-only BigQuery export or AWS Cost Explorer and get immediate insights."
                            },
                            {
                                icon: <Shield className="w-6 h-6 text-purple-500" />,
                                title: "Security by Default",
                                desc: "Your cloud credentials are the keys to the kingdom. We never store them in plaintext. Everything is vaulted securely using AES-256 encryption."
                            },
                            {
                                icon: <Target className="w-6 h-6 text-emerald-500" />,
                                title: "Actionable Granularity",
                                desc: "Seeing a $5,000 bill is useless. Seeing exactly which developer's test environment left an idle GPU running is powerful. We expose the exact unit economics."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group relative bg-white dark:bg-[#1e293b] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-all duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Metrics/Scale Section */}
            <section className="py-24 bg-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-indigo-400/30">
                        <div>
                            <p className="text-4xl lg:text-5xl font-black text-white mb-2">$500M+</p>
                            <p className="text-indigo-200 font-medium">Cloud Spend Analyzed</p>
                        </div>
                        <div>
                            <p className="text-4xl lg:text-5xl font-black text-white mb-2">10B+</p>
                            <p className="text-indigo-200 font-medium">Data Rows Processed</p>
                        </div>
                        <div>
                            <p className="text-4xl lg:text-5xl font-black text-white mb-2">99.9%</p>
                            <p className="text-indigo-200 font-medium">Uptime Guarantee</p>
                        </div>
                        <div>
                            <p className="text-4xl lg:text-5xl font-black text-white mb-2">24/7</p>
                            <p className="text-indigo-200 font-medium">Support Available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center px-4 relative bg-white dark:bg-[#1e293b]">
                <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Ready to stop guessing?</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        Join hundreds of engineering teams who have regained control of their infrastructure.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0">
                            Start Optimizing Today <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/pricing" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold transition-all flex items-center justify-center hover:-translate-y-0.5 active:translate-y-0 shadow-sm">
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
