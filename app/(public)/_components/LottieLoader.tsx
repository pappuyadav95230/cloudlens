"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface LottieLoaderProps {
    url: string;
    className?: string;
    loop?: boolean;
    autoplay?: boolean;
}

export default function LottieLoader({
    url,
    className = "",
    loop = true,
    autoplay = true,
}: LottieLoaderProps) {
    const [animationData, setAnimationData] = useState<object | null>(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch(() => setAnimationData(null));
    }, [url]);

    if (!animationData) {
        return <div className={`${className} animate-pulse bg-slate-200 dark:bg-slate-700 rounded-xl`} />;
    }

    return (
        <Lottie
            animationData={animationData}
            loop={loop}
            autoPlay={autoplay}
            className={className}
        />
    );
}
