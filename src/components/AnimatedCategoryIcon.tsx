"use client";

import { motion } from "framer-motion";

interface Props {
    icon: string;
}

export default function AnimatedCategoryIcon({ icon }: Props) {
    return (
        <motion.div
            whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
            }}
            className="text-7xl mb-6 relative z-10 block"
        >
            {icon}
        </motion.div>
    );
}
