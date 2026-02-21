"use client";

import { motion } from "framer-motion";

interface SteamEffectProps {
    className?: string;
}

export default function SteamEffect({ className }: SteamEffectProps) {
    return (
        <div className={`relative ${className}`}>
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    className="absolute bg-orange-50/40 blur-lg rounded-full"
                    style={{
                        width: 20 + i * 8,
                        height: 20 + i * 8,
                        left: "50%",
                        bottom: "0%",
                    }}
                    initial={{ opacity: 0, y: 0, scale: 0.5, x: "-50%" }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        y: [-20, -180],
                        scale: [0.5, 2.2],
                        x: ["-50%", `${-50 + (i % 2 === 0 ? 25 : -25)}%`]
                    }}
                    transition={{
                        duration: 4 + i * 0.8,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Sharper steam wisps */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={`wisp-${i}`}
                    className="absolute bg-white/30 blur-md rounded-full"
                    style={{
                        width: 12 + i * 4,
                        height: 35 + i * 10,
                        left: "50%",
                        bottom: "10%",
                    }}
                    initial={{ opacity: 0, y: 0, scale: 0.8, x: "-50%" }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        y: [-10, -130],
                        scale: [1, 1.5],
                        x: ["-50%", `${-50 + (i % 2 === 0 ? 15 : -15)}%`],
                        rotate: [0, i % 2 === 0 ? 15 : -15]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}
