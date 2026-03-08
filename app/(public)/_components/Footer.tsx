import Link from "next/link";
import { ArrowRight, Github, Twitter, Linkedin, Mail } from "lucide-react";
import CloudLensLogo from "./CloudLensLogo";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent"></div>
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
            
            <ScrollReveal>
                <div className="max-w-7xl mx-auto pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
                        {/* Brand & Newsletter Column - Takes up 2 columns */}
                        <div className="lg:col-span-2 space-y-6">
                            <Link href="/" className="inline-flex items-center gap-2 group">
                                <div className="p-1 rounded-xl bg-white/5 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                                    <CloudLensLogo size={28} />
                                </div>
                                <span className="text-[20px] font-bold tracking-tight text-white">
                                    Cloud<span className="text-indigo-400">Lens</span>
                                </span>
                            </Link>
                            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                                The unified cloud cost intelligence platform. Stop guessing about your cloud bills and start optimizing your multicloud spend.
                            </p>
                            
                            {/* Newsletter Form */}
                            <div className="pt-4 max-w-sm">
                                <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Subscribe to updates</p>
                                <form className="flex gap-2">
                                    <input 
                                        type="email" 
                                        placeholder="Engineering email" 
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder:text-slate-500 transition-all font-mono"
                                    />
                                    <button 
                                        type="button" 
                                        className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition-colors flex items-center justify-center shrink-0 border border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Product Links */}
                        <div className="space-y-5">
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h4>
                            <ul className="space-y-3">
                                {[
                                    { name: "Features", href: "/#features" },
                                    { name: "Pricing", href: "/pricing" },
                                    { name: "Customers", href: "/clients" },
                                    { name: "Changelog", href: "#", badge: "New" },
                                    { name: "Integrations", href: "#" },
                                ].map((item) => (
                                    <li key={item.name} className="flex items-center gap-2">
                                        <Link href={item.href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200">
                                            {item.name}
                                        </Link>
                                        {item.badge && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                                {item.badge}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div className="space-y-5">
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h4>
                            <ul className="space-y-3">
                                {[
                                    { name: "Documentation", href: "#" },
                                    { name: "API Reference", href: "#" },
                                    { name: "Blog", href: "#" },
                                    { name: "Cloud Cost Guide", href: "#" },
                                    { name: "Security", href: "#" },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div className="space-y-5">
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
                            <ul className="space-y-3">
                                {[
                                    { name: "About Us", href: "/about" },
                                    { name: "Careers", href: "#" },
                                    { name: "Contact", href: "#" },
                                    { name: "Privacy Policy", href: "#" },
                                    { name: "Terms of Service", href: "#" },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bottom */}
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>© {new Date().getFullYear()} CloudLens Inc.</span>
                            <span className="w-1 h-1 rounded-full bg-slate-700 mx-1"></span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                All systems operational
                            </span>
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a href="#" aria-label="Github" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-indigo-500 hover:border-indigo-400 hover:text-white transition-all">
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="#" aria-label="Twitter" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" aria-label="Email" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-rose-500 hover:border-rose-400 hover:text-white transition-all">
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </footer>
    );
}
