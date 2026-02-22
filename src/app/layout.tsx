import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/SEOJsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ponelapava.ar"),
  title: "Pone La Pava - Tienda de Mates y Termos | Industria Argentina",
  description: "Descubrí la mejor selección de Mates Imperiales, Termos Stanley y Lumilagro, bombillas y accesorios. Equipá tu ritual matero con envíos a todo el país.",
  keywords: ["mate imperial", "termo stanley", "mate de calabaza", "bombilla mate", "mate argentina", "termo lumilagro", "cómo curar un mate"],
  openGraph: {
    title: "Pone La Pava - Tienda de Mates y Termos",
    description: "La tienda especialista en el ritual del mate. Mates artesanales, personalizados y termos de alta gama.",
    url: "https://ponelapava.ar",
    siteName: "Pone La Pava",
    images: [
      {
        url: "/images/og-image.webp", // Generará la url a partir de NEXT_PUBLIC_APP_URL si se configura baseUrl
        width: 1200,
        height: 630,
        alt: "Pone La Pava - Mates y Termos Premium",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationJsonLd
          name="Pone La Pava"
          url="https://ponelapava.ar"
          description="Tienda de confianza para el ritual del mate en Argentina."
        />
        <WebSiteJsonLd name="Pone La Pava" url="https://ponelapava.ar" />
        <CartProvider>
          {children}
          <CartSidebar />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
