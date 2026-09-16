import type { Metadata } from "next";
import { Inter, Manrope, Geist_Mono, Instrument_Serif, Playwrite_US_Trad } from "next/font/google";
import "./globals.css";
import BottomNav from "../components/BottomNav";
import PageTransition from "../components/PageTransition";
import Assistant from "../components/Assistant";
import CustomCursor from "../components/CustomCursor";
import SmoothScroll from "../components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
// Only for the "ds" mark that stands in for Home in the dock.
// A school-cursive hand for one playful word ("tinkering") in the side projects heading.
const script = Playwrite_US_Trad({ weight: "400", variable: "--font-script" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument" });

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
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} ${instrument.variable} ${script.variable}`}
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
