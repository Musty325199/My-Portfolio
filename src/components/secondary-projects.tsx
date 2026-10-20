"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { PORTFOLIO_CONTENT, Project } from "@/data/content";
import { BrowserFrame } from "./device-frames";
import { ArrowUpRight, Check, AlertCircle, ShieldCheck, Database, Zap } from "lucide-react";
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

  return (
    <section className="py-20 md:py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/[0.12]">
      {/* Section Header */}
      <div className="border-b border-white/[0.12] pb-6 mb-16">
        <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest block mb-2">
          04 / Commercial & Web Applications
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-tight">
          Production Systems in the Wild
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#A39E92] mt-2 max-w-2xl">
          Real products built for real merchants, travelers, and property managers. No templates, no dummy mockups.
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
              <BrowserFrame url="stockflowhq.com">
                <ImageReveal className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src="/assets/stockflow/screen-1.jpg"
                    alt="StockFlow landing page and small business inventory management overview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 650px"
                  />
                </ImageReveal>
              </BrowserFrame>
              <div className="grid grid-cols-2 gap-4">
                <ImageReveal className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08]">
                  <Image
                    src="/assets/stockflow/screen-2.jpg"
                    alt="StockFlow features: real-time stock levels, sales tracking, and customer insights"
                    fill
                    className="object-cover"
                    sizes="350px"
                  />
                </ImageReveal>
                <ImageReveal className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08]">
                  <Image
                    src="/assets/stockflow/screen-3.jpg"
                    alt="StockFlow pricing tiers with 14-day free trial and Pro plan"
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
              <BrowserFrame url="nook-lagos.vercel.app">
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
                <span className="font-mono text-xs text-[#A39E92] bg-white/[0.04] px-2 py-0.5 rounded-xs">
                  Status: In Development
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F2EEE6] tracking-tight mt-2">
                Hostvale
              </h3>
              <p className="font-serif italic text-lg sm:text-xl text-[#A39E92]">
                Operations app for shortlet hosts across Nigeria: bookings, caution fees, guests, and a per-host mini website.
              </p>
            </div>

            <div className="font-mono text-xs text-[#6B665C] border border-white/10 px-3 py-1.5 rounded-xs">
              Live link pending deployment
            </div>
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
              <BrowserFrame url="hostvale.app">
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
      </div>
    </section>
  );
}
