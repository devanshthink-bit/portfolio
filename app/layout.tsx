import type { Metadata } from "next";
import { Inter, Manrope, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import BottomNav from "../components/BottomNav";
import PageTransition from "../components/PageTransition";
import Assistant from "../components/Assistant";
import CustomCursor from "../components/CustomCursor";
import SmoothScroll from "../components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
// Type system (14 Sep 2026): Source Serif 4 for headings, figures and quotes; Inter for everything else.
// Manrope and Geist Mono stay loaded only for the Sidedoor page, which is out of scope.
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", axes: ["opsz"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Devansh Somvanshi",
  description: "Designer & Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} ${serif.variable}`}
    >
      <body suppressHydrationWarning>
        <SmoothScroll />
        <CustomCursor />
        <div className="page-wrapper">
          <PageTransition>{children}</PageTransition>
          <Assistant />
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
