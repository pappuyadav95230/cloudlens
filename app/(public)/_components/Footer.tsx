import Link from "next/link";
import CloudLensLogo from "./CloudLensLogo";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-700 transition-colors duration-500 py-12">
            <ScrollReveal>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                        {/* Brand */}
                        <div>
                            <Link href="/" className="flex items-center gap-2 group mb-3">
                                <CloudLensLogo size={28} />
                                <span className="text-[18px] font-bold tracking-tight text-slate-900 dark:text-white">
                                    Cloud<span className="text-indigo-600 dark:text-indigo-400">Lens</span>
                                </span>
                            </Link>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                AI-powered cloud cost monitoring. Track spending, detect anomalies,
                                and optimize your budget.
                            </p>
                        </div>

                        {/* Product */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                                Product
                            </h4>
                            <ul className="space-y-2">
                                {["Features", "Pricing", "Changelog", "Docs"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                                Company
                            </h4>
                            <ul className="space-y-2">
                                {["About", "Blog", "Careers", "Contact"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                                Legal
                            </h4>
                            <ul className="space-y-2">
                                {["Privacy", "Terms", "Security"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
                        <p className="text-sm text-slate-400 dark:text-slate-500">
                            © {new Date().getFullYear()} CloudLens. All rights reserved.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </footer>
    );
}
