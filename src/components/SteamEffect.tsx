"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SteamEffectProps {
    className?: string;
}

export default function SteamEffect({ className }: SteamEffectProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className={`relative ${className}`} />;

    return (
        <div className={`relative ${className}`}>
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <filter id="steam-blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                    </filter>
                    <linearGradient id="steam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {[0, 1, 2].map((i) => (
                    <motion.path
                        key={i}
                        d={`M 50 100 Q ${40 + i * 5} ${70 - i * 10} 50 ${40 - i * 10} T 50 0`}
                        fill="none"
                        stroke="url(#steam-gradient)"
                        strokeWidth={8 + i * 4}
                        strokeLinecap="round"
                        filter="url(#steam-blur)"
                        initial={{ pathLength: 0, opacity: 0, y: 10 }}
                        animate={{
                            pathLength: [0, 1, 1],
                            opacity: [0, 0.4, 0],
                            y: [10, -80],
                            x: [0, (i % 2 === 0 ? 10 : -10)]
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 1.2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </svg>

            {/* Subtle floating particles */}
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                    key={`p-${i}`}
                    className="absolute bg-white/20 blur-[1px] rounded-full"
                    style={{
                        width: 4,
                        height: 4,
                        left: `${40 + Math.random() * 20}%`,
                        bottom: "20%"
                    }}
                    animate={{
                        y: -100 - Math.random() * 50,
                        opacity: [0, 0.3, 0],
                        x: (Math.random() - 0.5) * 40
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                />
            ))}
        </div>
    );
}
