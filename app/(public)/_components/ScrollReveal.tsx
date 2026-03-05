"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
    duration?: number;
    stagger?: number;
    once?: boolean;
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
    distance = 50,
    duration = 0.8,
    stagger = 0,
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const directionMap = {
            up: { y: distance, x: 0 },
            down: { y: -distance, x: 0 },
            left: { x: distance, y: 0 },
            right: { x: -distance, y: 0 },
        };

        const { x, y } = directionMap[direction];

        const targets = stagger > 0 ? el.children : el;

        gsap.set(targets, { opacity: 0, x, y });

        gsap.to(targets, {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            stagger: stagger > 0 ? stagger : 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: once ? "play none none none" : "play none none reverse",
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === el) trigger.kill();
            });
        };
    }, [delay, direction, distance, duration, stagger, once]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
