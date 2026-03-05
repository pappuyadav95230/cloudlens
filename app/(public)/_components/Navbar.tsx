"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import CloudLensLogo from "./CloudLensLogo";
import { useTheme } from "@/app/providers/ThemeProvider";

const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "About", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Pricing", href: "/pricing" },
    { label: "Clients", href: "/clients" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-gray-200/60 dark:border-gray-800/60"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-[72px]">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <CloudLensLogo size={34} />
                        <span className="text-[20px] font-bold tracking-tight text-gray-900 dark:text-white">
                            Cloud<span className="text-indigo-600 dark:text-indigo-400">Lens</span>
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="group relative px-4 py-2 text-[15px] font-semibold text-gray-800 dark:text-gray-200 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-300 group-hover:w-2/3" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-2">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
                            aria-label="Toggle theme"
                        >
                            <Sun
                                size={18}
                                className={`absolute transition-all duration-300 ${theme === "light"
                                    ? "opacity-100 rotate-0 scale-100 text-amber-500"
                                    : "opacity-0 rotate-90 scale-0 text-amber-500"
                                    }`}
                            />
                            <Moon
                                size={18}
                                className={`absolute transition-all duration-300 ${theme === "dark"
                                    ? "opacity-100 rotate-0 scale-100 text-indigo-400"
                                    : "opacity-0 -rotate-90 scale-0 text-indigo-400"
                                    }`}
                            />
                        </button>

                        <Link
                            href="/login"
                            className="px-4 py-2 text-[15px] font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/login"
                            className="group inline-flex items-center gap-1.5 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-[14px] font-bold hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/40"
                        >
                            Get Started
                            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            <Sun
                                size={18}
                                className={`absolute transition-all duration-300 ${theme === "light"
                                    ? "opacity-100 rotate-0 scale-100 text-amber-500"
                                    : "opacity-0 rotate-90 scale-0 text-amber-500"
                                    }`}
                            />
                            <Moon
                                size={18}
                                className={`absolute transition-all duration-300 ${theme === "dark"
                                    ? "opacity-100 rotate-0 scale-100 text-indigo-400"
                                    : "opacity-0 -rotate-90 scale-0 text-indigo-400"
                                    }`}
                            />
                        </button>
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200/60 dark:border-gray-800/60 px-4 py-5 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-[15px] font-semibold text-gray-800 dark:text-gray-200 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 mt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-[15px] font-semibold text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-3 rounded-lg text-[15px] font-bold hover:bg-indigo-700 transition shadow-sm"
                        >
                            Get Started
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
