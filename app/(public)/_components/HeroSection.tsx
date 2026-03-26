"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        "-=0.3"
      );
  }, []);

  return (
    <section className="relative min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-500 flex flex-col overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-indigo-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-150 h-150 bg-blue-500/10 blur-[140px] rounded-full" />
        {/* Extra subtle accent */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-24">
        <h1
          ref={headingRef}
          className="text-4xl sm:text-6xl lg:text-8xl font-extrabold leading-tight text-slate-900 dark:text-white"
          style={{ opacity: 0 }}
        >
          See Every Dollar.
          <br />
          <span className="bg-linear-to-r from-indigo-600 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-text bg-[length:200%_auto]">
            Stop Every Leak.
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-400"
          style={{ opacity: 0 }}
        >
          AI-powered cloud cost monitoring for GCP & AWS.
          <span className="block text-sm mt-2 text-slate-400 dark:text-slate-500">
            Trusted by 500+ engineering teams worldwide.
          </span>
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4" style={{ opacity: 0 }}>
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-200 dark:hover:shadow-indigo-900/40 animate-pulse-glow"
          >
            Start Free Trial
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
          >
            See How It Works
          </Link>
        </div>
      </div>

      {/* Bottom Image */}
      <div className="w-full flex justify-center px-6 pb-12 mt-16">
        <div ref={imageRef} className="relative w-full max-w-6xl animate-float" style={{ opacity: 0 }}>
          <div className="absolute -inset-4 bg-linear-to-r from-indigo-500 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>

          <div className="relative bg-white dark:bg-[#1e293b] border-8 border-white dark:border-[#1e293b] rounded-3xl shadow-2xl overflow-hidden">
            <img
              src="/images/overview-preview.png"
              alt="Cloud Cost Dashboard Overview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
