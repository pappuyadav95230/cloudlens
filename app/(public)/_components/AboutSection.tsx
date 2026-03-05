"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const team = [
    {
        name: "Pappu Kumar Yadav",
        role: "Founder & CEO",
        bio: "Visionary engineer passionate about cloud infrastructure and cost optimization. Building CloudLens to make cloud spending transparent for every team.",
        avatar: "PY",
        color: "from-indigo-500 to-blue-500",
        socials: { github: "#", linkedin: "#", twitter: "#" },
    },
    {
        name: "Rupesh",
        role: "CTO",
        bio: "Architect of CloudLens's core platform. Expert in scalable systems, cloud-native architecture, and real-time data pipelines.",
        avatar: "R",
        color: "from-purple-500 to-pink-500",
        socials: { github: "#", linkedin: "#", twitter: "#" },
    },
    {
        name: "Sachin Tiwari",
        role: "Lead Engineer",
        bio: "Full-stack engineer specializing in real-time data systems, anomaly detection algorithms, and building performant UIs.",
        avatar: "ST",
        color: "from-cyan-500 to-teal-500",
        socials: { github: "#", linkedin: "#", twitter: "#" },
    },
];

const stats = [
    { value: "$4.2M+", label: "Cloud costs saved", numericEnd: 4.2 },
    { value: "500+", label: "Teams onboarded", numericEnd: 500 },
    { value: "99.9%", label: "Uptime SLA", numericEnd: 99.9 },
    { value: "< 2 min", label: "Setup time", numericEnd: 2 },
];

function AnimatedCounter({ value, label }: { value: string; label: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="text-center bg-slate-50 dark:bg-[#0f172a] rounded-xl p-6 border border-slate-200 dark:border-slate-700 card-hover"
        >
            <p
                className={`text-2xl md:text-3xl font-extrabold bg-linear-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
            >
                {value}
            </p>
            <p
                className={`text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
            >
                {label}
            </p>
        </div>
    );
}

export default function AboutSection() {
    return (
        <section id="about" className="bg-white dark:bg-[#1e293b] transition-colors duration-500 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-800 mb-4">
                            About Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Built by Cloud Engineers,{" "}
                            <span className="bg-linear-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                                for Cloud Engineers
                            </span>
                        </h2>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            We&apos;ve seen the pain of surprise cloud bills firsthand. CloudLens was born from our mission to make cloud cost visibility effortless.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat) => (
                        <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
                    ))}
                </div>

                {/* Team Header */}
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                            Meet the Team
                        </h3>
                        <p className="mt-3 text-slate-500 dark:text-slate-400 text-base max-w-xl mx-auto">
                            A small, focused team obsessed with helping you save on cloud infrastructure.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Team Grid */}
                <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
                    {team.map((member) => (
                        <div
                            key={member.name}
                            className="group bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl p-6 card-hover hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 text-center"
                        >
                            {/* Avatar */}
                            <div className={`w-16 h-16 rounded-full bg-linear-to-br ${member.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <span className="text-white font-bold text-lg">{member.avatar}</span>
                            </div>

                            {/* Info */}
                            <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                                {member.name}
                            </h4>
                            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
                                {member.role}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                                {member.bio}
                            </p>

                            {/* Socials */}
                            <div className="flex justify-center gap-3">
                                <Link href={member.socials.github} className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                                    <Github size={16} />
                                </Link>
                                <Link href={member.socials.linkedin} className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                                    <Linkedin size={16} />
                                </Link>
                                <Link href={member.socials.twitter} className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                                    <Twitter size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    );
}
