import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

/* ─── Font Configuration ─── */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/* ─── SEO Metadata ─── */
export const metadata: Metadata = {
  title: "Ranju — Game Developer & Full Spectrum Engineer",
  description:
    "Cinematic portfolio of Ranju — a Game Developer crafting immersive worlds in Unity & Unreal Engine, and a Full Spectrum Engineer building scalable systems with React, Next.js, Python, and cloud infrastructure.",
  keywords: [
    "game developer",
    "unity developer",
    "unreal engine",
    "full stack engineer",
    "portfolio",
    "C#",
    "C++",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Ranju" }],
  openGraph: {
    title: "Ranju — Game Developer & Full Spectrum Engineer",
    description:
      "Building immersive worlds & engineering scalable systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranju — Game Developer & Full Spectrum Engineer",
    description:
      "Building immersive worlds & engineering scalable systems.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090b",
};

/* ─── Root Layout ─── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body data-loading="true">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>

        {/* Inline script to prevent scroll restoration flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(typeof history!=='undefined'){history.scrollRestoration='manual';}`,
          }}
        />
      </body>
    </html>
  );
}
