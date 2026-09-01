import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://travis-dickens.dev"),
  title: {
    default: "Travis Dickens · Junior Software Developer",
    template: "%s · Travis Dickens",
  },
  description:
    "Junior software developer building reliable backend services, REST APIs, full-stack applications, and data-driven systems.",
  openGraph: {
    type: "website",
    url: "https://travis-dickens.dev",
    title: "Travis Dickens · Junior Software Developer",
    description:
      "Junior software developer building reliable backend services, REST APIs, full-stack applications, and data-driven systems.",
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
    title: "Travis Dickens · Junior Software Developer",
    description:
      "Junior software developer building reliable backend services, REST APIs, full-stack applications, and data-driven systems.",
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
        className={`${instrumentSerif.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen">
            <div
              className="pointer-events-none fixed inset-0 -z-10"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 15% 10%, rgba(201, 132, 74, 0.04), transparent 70%)",
              }}
            />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
