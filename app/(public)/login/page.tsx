"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Lottie from "lottie-react";
import loginAnimation from "@/public/Login.json";
import CloudLensLogo from "../_components/CloudLensLogo";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useAuth } from "@/app/providers/AuthProvider";

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const router = useRouter();
    const { theme } = useTheme();
    const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();

    // If already authenticated, redirect to dashboard
    useEffect(() => {
        if (!loading && user) {
            router.push("/userDashboard");
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setBusy(true);
        try {
            if (isSignUp) {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
            router.push("/userDashboard");
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Authentication failed. Please try again.";
            setError(message);
        } finally {
            setBusy(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setBusy(true);
        try {
            await signInWithGoogle();
            router.push("/userDashboard");
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Google sign-in failed. Please try again.";
            setError(message);
        } finally {
            setBusy(false);
        }
    };

    // Show nothing while we check auth status
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f172a]">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-500 flex">
            {/* Left side — Branding panel (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-indigo-600 via-indigo-700 to-blue-800 overflow-hidden">
                {/* Subtle glow effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-blue-400/10 blur-[80px] rounded-full" />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <CloudLensLogo size={32} />
                        <span className="text-xl font-bold text-white tracking-tight">
                            Cloud<span className="text-indigo-200">Lens</span>
                        </span>
                    </Link>

                    {/* Center content */}
                    <div className="flex flex-col items-center">
                        {/* Lottie Animation */}
                        <div className="w-[320px] h-[320px] mb-6 drop-shadow-2xl">
                            <Lottie animationData={loginAnimation} loop autoplay />
                        </div>

                        <h1 className="text-3xl font-extrabold text-white leading-tight mb-3 text-center">
                            Take Control of Your Cloud Spending
                        </h1>
                        <p className="text-indigo-200 text-base leading-relaxed max-w-md text-center">
                            Monitor costs, detect anomalies, and optimize your cloud infrastructure — all in one place.
                        </p>

                        {/* Feature pills */}
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {["Real-Time Analytics", "AI Anomaly Detection", "Multi-Cloud"].map((f) => (
                                <span key={f} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white border border-white/10">
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bottom */}
                    <p className="text-indigo-300 text-sm">
                        © {new Date().getFullYear()} CloudLens. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Right side — Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <Link href="/" className="flex items-center gap-2">
                            <CloudLensLogo size={28} />
                            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                                Cloud<span className="text-indigo-600 dark:text-indigo-400">Lens</span>
                            </span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {isSignUp ? "Create your account" : "Welcome back"}
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {isSignUp
                                ? "Start monitoring your cloud costs in minutes"
                                : "Sign in to your CloudLens dashboard"
                            }
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={busy}
                        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {busy ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                        <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name (sign up only) */}
                        {isSignUp && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot password (sign in only) */}
                        {!isSignUp && (
                            <div className="text-right">
                                <Link href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={busy}
                            className="group w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {busy ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <>
                                    {isSignUp ? "Create Account" : "Sign In"}
                                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle sign in / sign up */}
                    <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
                            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
