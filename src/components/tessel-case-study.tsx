"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_CONTENT, CaseStudyChapter } from "@/data/content";
import { BrowserFrame, PhoneFrame } from "./device-frames";
import { TesselArchitecture } from "./tessel-architecture";
import { ArrowUpRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { isReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function TesselCaseStudy() {
  const tesselProject = PORTFOLIO_CONTENT.projects.find((p) => p.id === "tessel")!;
  const chapters = tesselProject.chapters || [];

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const chaptersColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !containerRef.current) return;

    // Use ScrollTrigger matchMedia for desktop pinning, non-pinning on mobile
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Create triggers for each chapter item to update active media index
      const chapterItems = document.querySelectorAll(".chapter-scroll-item");

      chapterItems.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveChapterIndex(index),
          onEnterBack: () => setActiveChapterIndex(index),
        });
      });
    });

    return () => mm.revert();
  }, []);

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  return (
    <section id="tessel" className="py-20 md:py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/[0.12]">
      {/* Case Study Header & Badge */}
      <div className="mb-12 md:mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.12] pb-6 mb-8">
          <div>
            <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest block mb-2">
              03 / Flagship Case Study
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F2EEE6] tracking-tight">
              Tessel.
            </h2>
            <p className="font-serif italic text-2xl sm:text-3xl text-[#A39E92] mt-1">
              A live multiplayer whiteboard.
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            {tesselProject.liveUrl && (
              <a
                href={tesselProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#F2EEE6] hover:bg-[#FF6A2B] text-[#0E0D0B] font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {tesselProject.githubUrl && (
              <a
                href={tesselProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 border border-white/20 hover:border-[#FF6A2B] text-[#F2EEE6] hover:text-[#FF6A2B] uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Code Repo</span>
              </a>
            )}
          </div>
        </div>

        {/* Key Facts Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-white/[0.08] font-mono text-xs text-[#A39E92]">
          {tesselProject.keyFacts?.map((fact, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B]" />
              <span className="text-[#F2EEE6]">{fact}</span>
            </div>
          ))}
        </div>

        {/* Stack Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4 font-mono text-xs text-[#A39E92]">
          <span className="text-[#6B665C]">Stack:</span>
          {tesselProject.stack.map((tech) => (
            <span
              key={tech}
              className="border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 rounded-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Showcase Media: landing.jpg */}
      <div className="mb-20">
        <BrowserFrame url="musty325199.github.io/tessel/">
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src="/assets/tessel/landing.jpg"
              alt="Tessel collaborative workspace landing interface"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </BrowserFrame>
        <p className="mt-3 font-mono text-xs text-[#6B665C] text-right">
          Fig 1.0 — Tessel interface & active session canvas view
        </p>
      </div>

      {/* Two-Column Sticky Storytelling Section on Desktop */}
      <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Column: Chapters (Scrollable) */}
        <div ref={chaptersColRef} className="lg:col-span-5 space-y-16 sm:space-y-24 lg:space-y-36 py-4">
          {chapters.map((chapter, index) => {
            const isActive = activeChapterIndex === index;

            return (
              <div
                key={chapter.id}
                className="chapter-scroll-item transition-opacity duration-300 pt-4"
              >
                {/* Chapter Number & Title */}
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#FF6A2B] mb-2">
                  <span>CHAPTER {chapter.number}</span>
                  <span className="text-[#6B665C]">/</span>
                  <span className="text-[#A39E92]">{chapter.title}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6] tracking-tight leading-snug">
                  {chapter.headline}
                </h3>

                <p className="mt-4 font-sans text-sm sm:text-base text-[#A39E92] leading-relaxed">
                  {chapter.description}
                </p>

                {chapter.technicalDetails && chapter.technicalDetails.length > 0 && (
                  <ul className="mt-4 space-y-2 font-mono text-xs text-[#6B665C]">
                    {chapter.technicalDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#FF6A2B] mt-0.5">›</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Mobile View: Render media directly beneath each chapter */}
                <div className="mt-6 lg:hidden">
                  <ChapterMediaRenderer chapter={chapter} />
                  {chapter.media.caption && (
                    <p className="mt-2 font-mono text-[11px] text-[#6B665C]">
                      {chapter.media.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Media Display on Desktop */}
        <div className="hidden lg:block lg:col-span-7">
          <div className="sticky top-28 w-full">
            <div className="relative w-full overflow-hidden rounded-lg border border-white/[0.12] bg-[#141311] p-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChapter.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ChapterMediaRenderer chapter={currentChapter} />
                </motion.div>
              </AnimatePresence>

              {/* Caption Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-t border-white/[0.08] mt-2 font-mono text-xs text-[#A39E92]">
                <span className="text-[#FF6A2B]">
                  {currentChapter.number} / {currentChapter.title}
                </span>
                <span className="text-[11px] text-[#6B665C] truncate max-w-sm">
                  {currentChapter.media.caption}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture SVG Diagram */}
      <TesselArchitecture />

      {/* Tessel Closing Section */}
      <div className="mt-16 pt-12 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block">
              Outcome & Live Environment
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F2EEE6] tracking-tight">
              Production Canvas in Real Time
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#A39E92] leading-relaxed">
              Tessel is live on GitHub Pages with automated CI deployments. Open multiple browser tabs or load it on an iPhone to test conflict-free CRDT synchronization, offline persistence, and live multiplayer awareness.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <a
                href={tesselProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#F2EEE6] hover:bg-[#FF6A2B] text-[#0E0D0B] font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <span>Launch Live Board</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={tesselProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 border border-white/20 hover:border-[#FF6A2B] text-[#F2EEE6] hover:text-[#FF6A2B] uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <span>Inspect Monorepo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <BrowserFrame url="musty325199.github.io/tessel/live">
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src="/assets/tessel/board.jpg"
                  alt="Tessel live multiplayer canvas session showing real-time concurrent drawing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
              </div>
            </BrowserFrame>
            <p className="mt-2 font-mono text-xs text-[#6B665C] text-right">
              Live multi-user board session with concurrent peers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterMediaRenderer({ chapter }: { chapter: CaseStudyChapter }) {
  const { media } = chapter;

  if (chapter.id === "offline") {
    // Phone frame representation for offline chapter
    return (
      <div className="w-full flex items-center justify-center p-2 sm:p-4 bg-[#0E0D0B] rounded-sm">
        <PhoneFrame src={media.src} alt={media.alt} />
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={media.poster}
          preload="metadata"
          className="w-full h-full object-cover"
        >
          {media.webmSrc && <source src={media.webmSrc} type="video/webm" />}
          <source src={media.src} type="video/mp4" />
          {/* Fallback to original GIF */}
          <img
            src="/assets/tessel/demo.gif"
            alt={media.alt}
            className="w-full h-full object-cover"
          />
        </video>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm bg-[#12110E]">
      <Image
        src={media.src}
        alt={media.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 650px"
      />
    </div>
  );
}
