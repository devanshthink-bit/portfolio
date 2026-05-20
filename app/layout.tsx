import type { Metadata } from "next";
import { Inter, Manrope, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import Assistant from "../components/Assistant";
import CursorGlow from "../components/CursorGlow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", style: ["normal", "italic"], weight: ["400", "500", "600", "700"] });

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
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} ${lora.variable}`}
    >
      <body suppressHydrationWarning>
        <CursorGlow />
        <div className="page-wrapper">
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Assistant />
        </div>
      </body>
    </html>
  );
}
