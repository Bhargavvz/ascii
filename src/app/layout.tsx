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
  title: "ASCII Portfolio - Terminal Style Developer Portfolio",
  description: "Interactive ASCII art portfolio showcasing projects through command-line interface. Built with Next.js, TypeScript, and FIGlet.",
  keywords: "portfolio, developer, ASCII art, terminal, command line, full stack, Next.js",
  authors: [{ name: "ASCII Developer" }],
  robots: "index, follow",
  openGraph: {
    title: "ASCII Portfolio - Terminal Style Developer Portfolio",
    description: "Interactive ASCII art portfolio showcasing projects through command-line interface",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
