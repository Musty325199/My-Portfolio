"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { PORTFOLIO_CONTENT, Project } from "@/data/content";
import { BrowserFrame, PhoneFrame } from "./device-frames";
import { ArrowUpRight, Check, AlertCircle, ShieldCheck, Database, Zap, Download } from "lucide-react";
import { isReducedMotion } from "@/lib/motion";

function ImageReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(isReducedMotion());
  }, []);

  return (
    <motion.div
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
      }
      whileInView={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
      }
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SecondaryProjects() {
  const stockflow = PORTFOLIO_CONTENT.projects.find((p) => p.id === "stockflow")!;
  const nook = PORTFOLIO_CONTENT.projects.find((p) => p.id === "nook")!;
  const hostvale = PORTFOLIO_CONTENT.projects.find((p) => p.id === "hostvale")!;
  const yipo = PORTFOLIO_CONTENT.projects.find((p) => p.id === "yipo")!;

  return (
    <section className="py-20 md:py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/[0.12]">
      {/* Section Header */}
      <div className="border-b border-white/[0.12] pb-6 mb-16">
        <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest block mb-2">
          04 / Commercial, Web & Mobile Applications
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-tight">
          Production Systems in the Wild
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#A39E92] mt-2 max-w-2xl">
          Real products built for real merchants, community savings organizers, travelers, and property managers. No templates, no dummy mockups.
        </p>
      </div>

      <div className="space-y-24 sm:space-y-32">
        {/* ============================================================== */}
        {/* STOCKFLOW */}
        {/* ============================================================== */}
        <div id="stockflow" className="scroll-mt-24">
          <div className="flex flex-col lg:flex-row items-baseline justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#FF6A2B] border border-[#FF6A2B]/40 px-2 py-0.5 rounded-xs">
                  02 / SAAS
                </span>
                <span className="font-mono text-xs text-[#A39E92]">Live in Production</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F2EEE6] tracking-tight mt-2">
                StockFlow
              </h3>
              <p className="font-serif italic text-lg sm:text-xl text-[#A39E92]">
                Inventory and sales management for small businesses.
              </p>
            </div>

            {stockflow.liveUrl && (
              <a
                href={stockflow.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#F2EEE6] hover:bg-[#FF6A2B] text-[#0E0D0B] font-mono text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <span>Visit StockFlow</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-5 space-y-4">
              <p className="font-sans text-sm sm:text-base text-[#A39E92] leading-relaxed">
                StockFlow empowers retail shop owners to control inventory, register point-of-sale transactions, and manage customers. Built end-to-end to withstand everyday commerce demands in emerging markets.
              </p>

              <div className="p-4 rounded-sm border border-white/[0.08] bg-[#141311] space-y-2">
                <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block">
                  Hardest Engineering Challenge
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#A39E92] leading-relaxed">
                  {stockflow.hardestPart}
                </p>
              </div>

              <div className="pt-2">
                <span className="font-mono text-xs text-[#6B665C] uppercase tracking-wider block mb-2">
                  Key Capabilities
                </span>
                <ul className="space-y-1.5 font-mono text-xs text-[#A39E92]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B]" />
                    <span>Real-time stock depletion & low-stock alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B]" />
                    <span>Pay-later credit sales ledger with installment tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B]" />
                    <span>POS-style rapid counter checkout</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs text-[#A39E92]">
                {stockflow.stack.map((t) => (
                  <span key={t} className="border border-white/[0.08] px-2 py-0.5 rounded-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Screenshots slot */}
            <div className="lg:col-span-7 space-y-4">
              <BrowserFrame url={stockflow.liveUrl ? stockflow.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : ""}>
                <ImageReveal className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src="/assets/stockflow/stockflow-2026-10.jpg"
                    alt="StockFlow landing page showcasing the inventory and sales management platform for African retailers"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 650px"
                  />
                </ImageReveal>
              </BrowserFrame>
              <div className="grid grid-cols-2 gap-4">
                <ImageReveal className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08]">
                  <Image
                    src="/assets/stockflow/stockflow-features-2026-10.jpg"
                    alt="StockFlow live operational dashboard showing daily sales, cash collected, and low-stock threshold alerts"
                    fill
                    className="object-cover"
                    sizes="350px"
                  />
                </ImageReveal>
                <ImageReveal className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08]">
                  <Image
                    src="/assets/stockflow/stockflow-pricing-2026-10.jpg"
                    alt="StockFlow transparent pricing plans: 14-day free trial and StockFlow Pro tier"
                    fill
                    className="object-cover"
                    sizes="350px"
                  />
                </ImageReveal>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* NOOK */}
        {/* ============================================================== */}
        <div id="nook" className="scroll-mt-24 border-t border-white/[0.08] pt-16">
          <div className="flex flex-col lg:flex-row items-baseline justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#FF6A2B] border border-[#FF6A2B]/40 px-2 py-0.5 rounded-xs">
                  03 / DIRECTORY & ADMIN
                </span>
                <span className="font-mono text-xs text-[#A39E92]">Next.js 16 + Prisma 7</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F2EEE6] tracking-tight mt-2">
                NOOK
              </h3>
              <p className="font-serif italic text-lg sm:text-xl text-[#A39E92]">
                A curated guide to stays and experiences in Lagos, with the admin to run it.
              </p>
            </div>

            {nook.liveUrl && (
              <a
                href={nook.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#F2EEE6] hover:bg-[#FF6A2B] text-[#0E0D0B] font-mono text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <span>Visit NOOK Lagos</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-5 space-y-4">
              <p className="font-sans text-sm sm:text-base text-[#A39E92] leading-relaxed">
                Built from the ground up on Next.js 16 App Router and Prisma 7 on Supabase Postgres. Couples a high-aesthetic public directory with a bulletproof administrative back-office.
              </p>

              {/* Architectural Highlights */}
              <div className="space-y-2.5 pt-2">
                <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block">
                  Engineering Depth Highlights
                </span>
                <div className="space-y-2 font-sans text-xs sm:text-sm text-[#A39E92]">
                  <div className="p-3 bg-[#141311] border border-white/[0.08] rounded-xs flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#FF6A2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F2EEE6] font-mono text-xs block">Idempotent Enquiries</strong>
                      <span>Guarantees zero duplicate booking submissions on rapid double-taps with cryptographic idempotency keys.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#141311] border border-white/[0.08] rounded-xs flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#FF6A2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F2EEE6] font-mono text-xs block">Scrypt + HMAC Sessions</strong>
                      <span>Admin authentication protected by scrypt password hashing and HMAC-signed session envelopes.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#141311] border border-white/[0.08] rounded-xs flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-[#FF6A2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F2EEE6] font-mono text-xs block">Per-page SEO & JSON-LD</strong>
                      <span>Full schema.org microdata for luxury stays, combined with continuous uptime monitoring endpoints.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs text-[#A39E92]">
                {nook.stack.map((t) => (
                  <span key={t} className="border border-white/[0.08] px-2 py-0.5 rounded-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Screenshots slot */}
            <div className="lg:col-span-7 space-y-4">
              <BrowserFrame url={nook.liveUrl ? nook.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : ""}>
                <ImageReveal className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src="/assets/nook/screen-1.jpg"
                    alt="NOOK Lagos home page: curated directory of luxury stays and experiences"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 650px"
                  />
                </ImageReveal>
              </BrowserFrame>
              <ImageReveal className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08]">
                <Image
                  src="/assets/nook/screen-2.jpg"
                  alt="NOOK stay detail page: architectural photo gallery and reservation enquiry"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
              </ImageReveal>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* HOSTVALE */}
        {/* ============================================================== */}
        <div id="hostvale" className="scroll-mt-24 border-t border-white/[0.08] pt-16">
          <div className="flex flex-col lg:flex-row items-baseline justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#FF6A2B] border border-[#FF6A2B]/40 px-2 py-0.5 rounded-xs">
                  04 / PROPERTY TECH
                </span>
                <span className="font-mono text-xs text-[#A39E92]">
                  Live in Production
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F2EEE6] tracking-tight mt-2">
                Hostvale
              </h3>
              <p className="font-serif italic text-lg sm:text-xl text-[#A39E92]">
                Operations app for shortlet hosts across Nigeria: bookings, caution fees, guests, and a per-host mini website.
              </p>
            </div>

            {hostvale.liveUrl && (
              <a
                href={hostvale.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#F2EEE6] hover:bg-[#FF6A2B] text-[#0E0D0B] font-mono text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <span>Visit Hostvale</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-5 space-y-4">
              <p className="font-sans text-sm sm:text-base text-[#A39E92] leading-relaxed">
                Nigerian shortlet operators face recurring friction with untracked caution fees, guest identity fraud, and disjointed booking channels. Hostvale replaces chaotic spreadsheets with a purpose-built operational cockpit.
              </p>

              <div className="p-4 rounded-sm border border-white/[0.08] bg-[#141311] space-y-2">
                <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block">
                  Caution Fee Escrow Machine
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#A39E92] leading-relaxed">
                  Engineered with state machines that track caution deposits, inspection clearances, deduction audits, and scheduled customer refunds.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-[#6B665C] uppercase tracking-wider block mb-2">
                  System Architecture
                </span>
                <ul className="space-y-1.5 font-mono text-xs text-[#A39E92]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B]" />
                    <span>Next.js App Router + Supabase Postgres with RLS policies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B]" />
                    <span>Per-host multi-tenant mini storefronts with direct booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B]" />
                    <span>Guest KYC verification and automated WhatsApp dispatch</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs text-[#A39E92]">
                {hostvale.stack.map((t) => (
                  <span key={t} className="border border-white/[0.08] px-2 py-0.5 rounded-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Screenshots slot */}
            <div className="lg:col-span-7 space-y-4">
              <BrowserFrame url={hostvale.liveUrl ? hostvale.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : ""}>
                <ImageReveal className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src="/assets/hostvale/screen-1.jpg"
                    alt="Hostvale operations and caution fee tracking overview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 650px"
                  />
                </ImageReveal>
              </BrowserFrame>
              <ImageReveal className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08]">
                <Image
                  src="/assets/hostvale/screen-2.jpg"
                  alt="Hostvale bookings management and reservation roster portal"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
              </ImageReveal>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* YÍPO (FEATURED MOBILE APP) */}
        {/* ============================================================== */}
        <div id="yipo" className="scroll-mt-24 border-t border-white/[0.08] pt-16">
          <div className="flex flex-col lg:flex-row items-baseline justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#FF6A2B] border border-[#FF6A2B]/40 px-2 py-0.5 rounded-xs">
                  05 / MOBILE APP (ANDROID)
                </span>
                <span className="font-mono text-xs text-[#A39E92]">
                  Live in Production • APK Available
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F2EEE6] tracking-tight mt-2">
                Yípo
              </h3>
              <p className="font-serif italic text-lg sm:text-xl text-[#A39E92]">
                Offline Ajo &amp; Esusu Mobile Record Keeper
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {yipo.liveUrl && (
                <a
                  href={yipo.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#F2EEE6] hover:bg-[#FF6A2B] text-[#0E0D0B] font-mono text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download APK</span>
                </a>
              )}

              {yipo.githubUrl && (
                <a
                  href={yipo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 border border-white/20 hover:border-[#FF6A2B] text-[#F2EEE6] hover:text-[#FF6A2B] font-mono text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#FF6A2B] bg-[#FF6A2B]/10 border border-[#FF6A2B]/30 px-2 py-0.5 rounded-xs">
                  {yipo.role}
                </span>
              </div>

              <p className="font-sans text-sm sm:text-base text-[#A39E92] leading-relaxed">
                {yipo.oneLiner}
              </p>

              <div className="p-4 rounded-sm border border-white/[0.08] bg-[#141311] space-y-2">
                <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block">
                  100% Offline-First Architecture
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#A39E92] leading-relaxed">
                  Built with local Expo SQLite database using transactional ACID writes, versioned migration schemas, and JSON backup/restore. Operates with zero network dependency.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-[#6B665C] uppercase tracking-wider block mb-2">
                  Key Engineering Highlights
                </span>
                <ul className="space-y-2 font-mono text-xs text-[#A39E92]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] shrink-0 mt-1.5" />
                    <span><strong>Interactive Skia Visuals:</strong> Custom Skia-powered rotating turn ring with dynamic collector spotlight and haptic feedback.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] shrink-0 mt-1.5" />
                    <span><strong>Native Hardware Integrations:</strong> Biometric App Lock (Fingerprint/Face ID), Android Share Intent receiver, and contact picker.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] shrink-0 mt-1.5" />
                    <span><strong>Direct WhatsApp Automation:</strong> One-tap formatted payment receipt and customizable reminder generation deep-linked to WhatsApp.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] shrink-0 mt-1.5" />
                    <span><strong>Offline Document Engine:</strong> Custom A4 PDF statement generation with embedded base64 typography for zero-network printing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] shrink-0 mt-1.5" />
                    <span><strong>Multi-Architecture Build:</strong> Universal production APK compiled for both 32-bit (armeabi-v7a) and 64-bit (arm64-v8a) ARM architectures.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs text-[#A39E92]">
                {yipo.stack.map((t) => (
                  <span key={t} className="border border-white/[0.08] px-2 py-0.5 rounded-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Screenshots slot */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 sm:p-6 rounded-lg border border-white/[0.08] bg-[#141311]/50 flex flex-col sm:flex-row items-center justify-center gap-6">
                <ImageReveal className="relative">
                  <PhoneFrame
                    src="/assets/yipo/yipo-active-ring-screen.png"
                    alt="Yípo Android interactive Ajo turn ring showing collector spotlight and member contributions"
                  />
                  <span className="font-mono text-[10px] text-[#A39E92] text-center block mt-2">
                    Main Pot Ring (Skia Visuals)
                  </span>
                </ImageReveal>

                <ImageReveal className="relative">
                  <PhoneFrame
                    src="/assets/yipo/yipo-payment-drawer-screen.png"
                    alt="Yípo payment recording bottom sheet with instant undo toast"
                  />
                  <span className="font-mono text-[10px] text-[#A39E92] text-center block mt-2">
                    One-Tap Payment Drawer
                  </span>
                </ImageReveal>
              </div>

              <ImageReveal className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08]">
                <Image
                  src="/assets/yipo/yipo-preview-card.png"
                  alt="Yípo application overview banner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
