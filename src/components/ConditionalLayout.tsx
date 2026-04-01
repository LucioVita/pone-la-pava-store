"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export function HeaderWrapper() {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");
    if (isStudio) return null;
    return <Header />;
}

export function FooterWrapper() {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");
    if (isStudio) return null;
    return <Footer />;
}
