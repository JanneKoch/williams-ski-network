import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Zilla_Slab, Newsreader } from 'next/font/google'

const zillaSlab = Zilla_Slab({
  variable: '--font-slab',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
})

const newsreader = Newsreader({
  variable: '--font-serif-accent',
  weight: ['400', '500'],
  style: ['italic'],
  subsets: ['latin'],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Williams Ski Network",
  description: "Alpine & Nordic ski alumni network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${zillaSlab.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}