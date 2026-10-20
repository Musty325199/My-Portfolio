import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
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

const siteUrl = getSiteUrl();
const metaTitle = "Mustapha Lawal | Full-Stack Developer (MERN) in Lagos, Nigeria";
const metaDescription =
  "Mustapha Lawal is a full-stack developer (MERN & Next.js) in Lagos building real-time apps. Creator of Tessel whiteboard, StockFlow, NOOK, and Hostvale.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: metaTitle,
  description: metaDescription,
  keywords: [
    "Mustapha Lawal",
    "Musty",
    "Full-Stack Developer",
    "MERN Stack",
    "Next.js",
    "Lagos Nigeria Developer",
    "Real-time apps",
    "Yjs CRDT",
    "Tessel",
    "StockFlow",
    "NOOK",
    "Hostvale",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
  ],
  authors: [{ name: PORTFOLIO_CONTENT.identity.fullName, url: siteUrl }],
  creator: PORTFOLIO_CONTENT.identity.fullName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    title: metaTitle,
    description: metaDescription,
    siteName: "Mustapha Lawal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "jfC58YUHs-XIbPfdRCDivYlrRJIc0Fftva-TEkAFpJA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Comprehensive Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Mustapha Lawal",
        alternateName: "Musty",
        jobTitle: "Full-Stack Developer",
        url: siteUrl,
        email: PORTFOLIO_CONTENT.links.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "NG",
        },
        knowsAbout: [
          "MERN",
          "React",
          "Node.js",
          "TypeScript",
          "Next.js",
          "MongoDB",
          "PostgreSQL",
          "WebSockets",
          "Yjs",
        ],
        sameAs: [
          PORTFOLIO_CONTENT.links.github,
          PORTFOLIO_CONTENT.links.linkedin,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Mustapha Lawal | Full-Stack Developer",
        description: metaDescription,
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-NG",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: metaTitle,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        mainEntity: { "@id": `${siteUrl}/#person` },
      },
      ...PORTFOLIO_CONTENT.projects.map((project) => ({
        "@type": "SoftwareApplication",
        name: project.title,
        headline: project.tagline,
        description: project.oneLiner,
        applicationCategory: project.category,
        operatingSystem: "Web, iOS, Android",
        url: `${siteUrl}/work/${project.id}`,
        author: { "@id": `${siteUrl}/#person` },
      })),
    ],
  };

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#0E0D0B] text-[#F2EEE6] selection:bg-[#FF6A2B] selection:text-[#0E0D0B]">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
