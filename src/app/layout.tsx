import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://travis-dickens.dev"),
  title: {
    default: "Travis Dickens · Junior Software Developer",
    template: "%s · Travis Dickens",
  },
  description:
    "AI/ML-leaning junior software developer building full-stack solutions with reliable backends.",
  openGraph: {
    type: "website",
    url: "https://travis-dickens.dev",
    title: "Travis Dickens · Junior Software Developer",
    description:
      "AI/ML-leaning junior software developer building full-stack solutions with reliable backends.",
    siteName: "Travis Dickens",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Travis Dickens — Junior Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@",
    title: "Travis Dickens · Junior Software Developer",
    description:
      "AI/ML-leaning junior software developer building full-stack solutions with reliable backends.",
    images: ["/og.svg"],
  },
  alternates: { canonical: "https://travis-dickens.dev" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
  className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-b from-slate-50 via-white to-slate-100 text-slate-900 transition-colors dark:bg-gradient-radial dark:from-[#0b0b0d] dark:via-[#050507] dark:to-black dark:text-white`}
      >
        <div className="absolute inset-0 -z-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(180,83,9,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(180,83,9,0.12),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_30%)] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_30%)]" />
        </div>
        <ThemeProvider>
          <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_0%_0%,rgba(255,255,255,0.4),transparent_40%),radial-gradient(1200px_circle_at_100%_40%,rgba(59,130,246,0.15),transparent_35%)] dark:bg-[radial-gradient(800px_circle_at_0%_0%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(1200px_circle_at_100%_40%,rgba(12,74,110,0.08),transparent_35%)]" />
            <div className="relative">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
