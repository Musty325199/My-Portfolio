import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PORTFOLIO_CONTENT } from "@/data/content";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0E0D0B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: `${PORTFOLIO_CONTENT.identity.fullName} (${PORTFOLIO_CONTENT.identity.shortName}) — Full-Stack Developer`,
  description: `${PORTFOLIO_CONTENT.identity.positioning} ${PORTFOLIO_CONTENT.identity.subline}`,
  keywords: [
    "Mustapha Lawal",
    "Musty",
    "Full-Stack Developer",
    "MERN Stack",
    "Next.js",
    "Lagos Nigeria Developer",
    "Yjs CRDT",
    "Real-time Collaboration",
    "TypeScript",
  ],
  authors: [{ name: PORTFOLIO_CONTENT.identity.fullName }],
  creator: PORTFOLIO_CONTENT.identity.fullName,
  metadataBase: new URL("https://musty-portfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://musty-portfolio.vercel.app",
    title: `${PORTFOLIO_CONTENT.identity.fullName} — ${PORTFOLIO_CONTENT.identity.positioning}`,
    description: PORTFOLIO_CONTENT.identity.subline,
    siteName: `${PORTFOLIO_CONTENT.identity.fullName} Portfolio`,
    images: [
      {
        url: "/assets/tessel/landing.jpg",
        width: 1200,
        height: 630,
        alt: `${PORTFOLIO_CONTENT.identity.fullName} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_CONTENT.identity.fullName} — Full-Stack Developer`,
    description: PORTFOLIO_CONTENT.identity.positioning,
    images: ["/assets/tessel/landing.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#0E0D0B] text-[#F2EEE6] selection:bg-[#FF6A2B] selection:text-[#0E0D0B]">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
