import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "CTO at Nimbus",
        quote: "CloudLens saved us $18K in the first month. The anomaly detection caught a runaway Compute Engine instance we had no idea about.",
        rating: 5,
    },
    {
        name: "Marcus Rivera",
        role: "DevOps Lead at Scalepoint",
        quote: "We switched from spreadsheets to CloudLens and immediately got visibility into our multi-project GCP spending. Game changer.",
        rating: 5,
    },
    {
        name: "Priya Sharma",
        role: "Engineering Manager at DataFlow",
        quote: "The budget tracking and alerts alone are worth it. My team no longer worries about surprise bills at the end of the month.",
        rating: 5,
    },
];

export default function TestimonialsSection() {
    return (
        <section id="clients" className="bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800 mb-4">
                            Testimonials
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Trusted by Cloud Teams
                        </h2>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            Hear from engineers who cut their cloud bills with CloudLens.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Cards */}
                <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-6 card-hover hover:shadow-lg dark:hover:shadow-indigo-900/20 transition-all duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{t.name.split(" ").map(n => n[0]).join("")}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    );
}
