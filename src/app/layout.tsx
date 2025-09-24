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
  title: "Bhavana Portfolio - ASCII Terminal",
  description: "Interactive ASCII art portfolio showcasing projects through command-line interface. Built with Next.js, TypeScript, and FIGlet.",
  keywords: "portfolio, developer, ASCII art, terminal, command line, full stack, Next.js",
  authors: [{ name: "Bhavana Guduru" }],
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/terminal-favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: [
      { url: '/terminal-favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    shortcut: '/terminal-favicon.svg'
  },
  openGraph: {
    title: "ASCII Portfolio - Terminal Style Developer Portfolio",
    description: "Interactive ASCII art portfolio showcasing projects through command-line interface",
    type: "website",
    images: [{
      url: '/terminal-favicon.svg',
      width: 32,
      height: 32,
      alt: 'ASCII Terminal Portfolio'
    }]
  },
  twitter: {
    card: 'summary',
    title: 'ASCII Terminal Portfolio',
    description: 'Interactive command-line portfolio with ASCII art',
    images: ['/terminal-favicon.svg']
  }
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
      <head>
        <link rel="icon" href="/terminal-favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/terminal-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/terminal-favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
