"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export function HeaderWrapper() {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");
    if (isStudio) return null;
    return (
        <Suspense fallback={<div className="h-20 bg-white" />}>
            <Header />
        </Suspense>
    );
}

export function FooterWrapper() {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");
    if (isStudio) return null;
    return <Footer />;
}
