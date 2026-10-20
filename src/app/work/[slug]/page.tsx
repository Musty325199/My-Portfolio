import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PORTFOLIO_CONTENT, Project } from "@/data/content";
import { BrowserFrame, PhoneFrame } from "@/components/device-frames";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_CONTENT.projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_CONTENT.projects.find((p) => p.id === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://musty-portfolio.vercel.app";
  const url = `${siteUrl}/work/${slug}`;
  const title = `${project.title} — ${project.tagline} | Mustapha Lawal`;
  const description = `${project.oneLiner} Engineered by Mustapha Lawal using ${project.stack.slice(0, 5).join(", ")}.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Mustapha Lawal Portfolio",
      locale: "en_NG",
      images: [
        {
          url: `${url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${project.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${url}/opengraph-image`],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PORTFOLIO_CONTENT.projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://musty-portfolio.vercel.app";

  // Project-specific JSON-LD structured data
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    headline: project.tagline,
    description: project.oneLiner,
    applicationCategory: project.category,
    operatingSystem: "Web, iOS, Android",
    author: {
      "@type": "Person",
      name: "Mustapha Lawal",
      url: siteUrl,
    },
    url: project.liveUrl && project.liveUrl.startsWith("http") ? project.liveUrl : `${siteUrl}/work/${slug}`,
  };

  const projectIndex = PORTFOLIO_CONTENT.projects.findIndex((p) => p.id === slug);
  const nextProject = PORTFOLIO_CONTENT.projects[(projectIndex + 1) % PORTFOLIO_CONTENT.projects.length];

  return (
    <article className="min-h-[100svh] bg-[#0E0D0B] text-[#F2EEE6] selection:bg-[#FF6A2B] selection:text-[#0E0D0B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      {/* Top Header / Breadcrumb Bar */}
      <header className="sticky top-0 z-40 bg-[#0E0D0B]/90 backdrop-blur-md border-b border-white/[0.08] py-4 px-6 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#A39E92] hover:text-[#FF6A2B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Work</span>
          </Link>

          <div className="flex items-center gap-3 font-mono text-xs text-[#A39E92]">
            <span className="text-[#FF6A2B]">/{project.number}</span>
            <span className="hidden sm:inline">{project.title}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-16 md:py-24 space-y-16">
        {/* Project Title Block */}
        <section className="space-y-4 border-b border-white/[0.12] pb-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#FF6A2B] border border-[#FF6A2B]/40 px-2 py-0.5 rounded-xs">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#A39E92]">
              Status: {project.status || "Live in Production"}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F2EEE6] tracking-tight">
            {project.title}
          </h1>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#A39E92]">
            {project.tagline}
          </p>

          <p className="font-sans text-base sm:text-lg text-[#F2EEE6] leading-relaxed pt-2">
            {project.oneLiner}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
            {project.liveUrl && project.liveUrl.startsWith("http") && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#F2EEE6] hover:bg-[#FF6A2B] text-[#0E0D0B] font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <span>Visit Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-white/20 hover:border-[#FF6A2B] text-[#F2EEE6] hover:text-[#FF6A2B] uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Inspect Source Code</span>
              </a>
            )}
          </div>
        </section>

        {/* Primary Showcase Media Frame */}
        <section className="space-y-4">
          <BrowserFrame url={project.liveUrl ? project.liveUrl.replace("https://", "") : `${project.id}.app`}>
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image
                src={project.previewImage}
                alt={`${project.title} interface showcase`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
            </div>
          </BrowserFrame>
          <p className="font-mono text-xs text-[#6B665C] text-right">
            Production Interface & Real-time State
          </p>
        </section>

        {/* Technical Deep Dive: What I Built & Hardest Part */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="p-6 sm:p-8 rounded-lg border border-white/[0.08] bg-[#141311] space-y-3">
            <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block">
              01 / Architecture & Implementation
            </span>
            <h2 className="font-serif text-2xl text-[#F2EEE6]">What I Built</h2>
            <p className="font-sans text-sm sm:text-base text-[#A39E92] leading-relaxed">
              {project.whatIBuilt}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-lg border border-white/[0.08] bg-[#141311] space-y-3">
            <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block">
              02 / Core Engineering Challenge
            </span>
            <h2 className="font-serif text-2xl text-[#F2EEE6]">The Hardest Part</h2>
            <p className="font-sans text-sm sm:text-base text-[#A39E92] leading-relaxed">
              {project.hardestPart}
            </p>
          </div>
        </section>

        {/* Stack Tags */}
        <section className="space-y-3 border-t border-white/[0.08] pt-8">
          <span className="font-mono text-xs text-[#6B665C] uppercase tracking-wider block">
            Verified Stack & Dependencies
          </span>
          <div className="flex flex-wrap gap-2.5 font-mono text-xs text-[#A39E92]">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border border-white/[0.12] bg-[#141311] px-3 py-1.5 rounded-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Extra Screenshots if available */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="space-y-6 border-t border-white/[0.08] pt-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
              Screen Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.screenshots.map((screen, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.12] bg-[#141311]">
                    <Image
                      src={screen.src}
                      alt={screen.caption}
                      fill
                      className="object-cover"
                      sizes="500px"
                    />
                  </div>
                  <p className="font-mono text-[11px] text-[#6B665C]">
                    {screen.caption}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next Project Nav Footer */}
        <footer className="border-t border-white/[0.12] pt-12 flex flex-col sm:flex-row items-baseline justify-between gap-6">
          <Link
            href="/#work"
            className="font-mono text-xs text-[#A39E92] hover:text-[#FF6A2B] uppercase tracking-wider"
          >
            ← View All Works
          </Link>

          <Link
            href={`/work/${nextProject.id}`}
            className="group flex flex-col items-end text-right"
          >
            <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest">
              Next Project →
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-[#F2EEE6] group-hover:text-[#FF6A2B] transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </footer>
      </main>
    </article>
  );
}
