import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahendra Pujo Prianto | Creative Technologist & Fullstack Engineer",
  description: "Portfolio of Mahendra Pujo Prianto — Fullstack Software Engineer & Creative Technologist specializing in fintech transaction systems, interactive canvas engines, and cinematic video direction.",
  keywords: [
    "Mahendra Pujo Prianto",
    "Fullstack Engineer",
    "Creative Technologist",
    "Laravel",
    "Next.js",
    "Node.js",
    "MySQL",
    "Google UX Design",
    "Meta Database Engineer",
    "Indonesia"
  ],
  authors: [{ name: "Mahendra Pujo Prianto" }],
  creator: "Mahendra Pujo Prianto",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mahendrapujo.vercel.app",
    title: "Mahendra Pujo Prianto — Creative Technologist & Fullstack Engineer",
    description: "High-throughput backend architectures, interactive canvas engines, and cinematic visual media.",
    siteName: "Mahendra Pujo Prianto Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahendra Pujo Prianto — Creative Technologist & Fullstack Engineer",
    description: "High-throughput backend architectures, interactive canvas engines, and cinematic visual media.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
