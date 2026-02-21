"use client";

import { motion } from "framer-motion";

export default function AnimatedPava() {
    return (
        <div className="relative inline-block">
            <motion.svg
                width="120"
                height="120"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl"
                initial={{ rotate: -5 }}
                animate={{
                    rotate: [-5, 5, -5],
                    y: [0, -5, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Kettle Body */}
                <path
                    d="M50,150 L150,150 L160,100 C160,80 140,70 100,70 C60,70 40,80 40,100 L50,150"
                    fill="#3d2b1f"
                />
                {/* Spout */}
                <path
                    d="M160,110 L185,90 L180,85 L155,105"
                    fill="#3d2b1f"
                />
                {/* Handle */}
                <path
                    d="M60,70 C60,40 140,40 140,70"
                    stroke="#5c4033"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                />
                {/* Base shadow */}
                <ellipse cx="100" cy="155" rx="60" ry="10" fill="rgba(0,0,0,0.1)" />
            </motion.svg>

            {/* Steam clouds */}
            <div className="absolute top-0 right-0 -translate-y-8 translate-x-4">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-orange-200/40 blur-md rounded-full"
                        style={{
                            width: 15 + i * 5,
                            height: 15 + i * 5,
                            left: i * 10
                        }}
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            y: [-20, -60],
                            scale: [0.5, 1.5],
                            x: [0, (i % 2 === 0 ? 10 : -10)]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
