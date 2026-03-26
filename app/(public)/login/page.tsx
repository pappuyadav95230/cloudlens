"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Lottie from "lottie-react";
import loginAnimation from "@/public/Login.json";
import CloudLensLogo from "../_components/CloudLensLogo";
import { useAuth } from "@/app/providers/AuthProvider";

export default function LoginPage() {
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const router = useRouter();
    const { user, loading, signInWithGoogle } = useAuth();

    // If already authenticated, redirect to dashboard
    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    const handleGoogleSignIn = async () => {
        setError("");
        setBusy(true);
        try {
            await signInWithGoogle();
            router.push("/dashboard");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Google sign-in failed. Please try again.";
            setError(message);
        } finally {
            setBusy(false);
        }
    };

    // Show loading while checking auth state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b1120]">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] flex flex-col lg:flex-row overflow-hidden font-sans">
            
            {/* Top/Left side — Solid Blue Background and Animation */}
            <div className="flex-none lg:flex-1 w-full lg:w-1/2 bg-[#5d4ef2] dark:bg-[#3f31cc] flex items-center justify-center relative p-8 lg:p-0 min-h-[300px] lg:min-h-screen">
                <div className="relative z-10 w-full max-w-[280px] lg:max-w-lg drop-shadow-xl hover:scale-105 transition-transform duration-700">
                    <Lottie animationData={loginAnimation} loop autoplay />
                </div>
            </div>

            {/* Bottom/Right side — Clean White Minimalist Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative bg-[#F8F9FA] dark:bg-[#0b1120]">

                <div className="w-full max-w-[440px] bg-white dark:bg-[#1e293b] p-8 sm:p-12 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex flex-col items-center">
                    
                    {/* Logo & Header */}
                    <Link href="/" className="flex items-center gap-3 mb-10 lg:mb-12 hover:opacity-80 transition-opacity">
                        <div className="p-2.5 bg-[#eef0ff] dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-[#5d4ef2] dark:text-indigo-400">
                            <CloudLensLogo size={28} />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Cloud<span className="text-[#5d4ef2] dark:text-indigo-400">Lens</span>
                        </span>
                    </Link>

                    <div className="mb-10 text-center w-full px-2">
                        <h2 className="text-[26px] font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                            Welcome Back
                        </h2>
                        <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-[1.6]">
                            Sign in to your dashboard to monitor costs, detect anomalies, and optimize your cloud infrastructure.
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="w-full mb-8 px-5 py-4 rounded-xl bg-red-50 dark:bg-red-400/10 border border-red-100 dark:border-red-400/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="flex-shrink-0 mt-0.5">
                                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <p className="text-[14px] text-red-700 dark:text-red-400 font-medium leading-relaxed">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Google Sign In Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={busy}
                        className="w-full relative flex items-center justify-center gap-3 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700/60 rounded-xl px-6 py-[18px] text-[15px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#151f33] hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
                    >
                        {busy ? (
                            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                        ) : (
                            <svg className="w-[18px] h-[18px] transition-transform group-hover:scale-110 duration-300 relative z-10" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        <span className="tracking-wide relative z-10">Continue with Google</span>
                    </button>

                    {/* Footer text */}
                    <div className="mt-14 text-center w-full">
                        <p className="text-[13px] text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
                            By continuing, you agree to CloudLens's <br/>
                            <Link href="/terms" className="font-semibold text-slate-500 dark:text-slate-400 hover:text-[#5d4ef2] dark:hover:text-indigo-400 transition-colors">Terms of Service</Link> and <Link href="/privacy" className="font-semibold text-slate-500 dark:text-slate-400 hover:text-[#5d4ef2] dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
