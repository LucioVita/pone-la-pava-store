"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
    icon: string;
}

export default function AnimatedCategoryIcon({ icon }: Props) {
    const isImage = icon.includes('.') || icon.startsWith('/');

    return (
        <motion.div
            whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
            }}
            className="text-7xl mb-6 relative z-10 block w-32 h-32"
        >
            {isImage ? (
                <div className="relative w-full h-full">
                    <Image
                        src={icon}
                        alt="Categoría Icono"
                        fill
                        className="object-contain"
                    />
                </div>
            ) : (
                icon
            )}
        </motion.div>
    );
}
