"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_CONTENT } from "@/data/content";
import { getLagosTime } from "@/lib/utils";
import { ArrowDown, Mail, ArrowUpRight } from "lucide-react";

export function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(getLagosTime());
    const interval = setInterval(() => {
      setTime(getLagosTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#A39E92] uppercase tracking-widest border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6A2B] pulse-dot" />
          <span className="text-[#F2EEE6] font-medium">Open to work</span>
          <span className="text-[#6B665C]">/</span>
          <span>Lagos, WAT {time || "10:30"}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>Full-Stack Engineer</span>
          <span className="text-[#6B665C]">·</span>
          <span>MERN + Next.js + Postgres</span>
        </div>
      </div>

      {/* Main Hero Identity Display */}
      <div className="my-auto py-10 md:py-16">
        <div className="mb-3">
          <span className="block font-mono text-xs sm:text-sm text-[#FF6A2B] uppercase tracking-widest">
            01 / Identity & Direction
          </span>
        </div>

        {/* Display Name & Role */}
        <div className="space-y-3">
          <div className="overflow-hidden">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#F2EEE6] leading-[0.92] select-none">
              Mustapha Lawal
            </h1>
          </div>
          <p className="font-mono text-sm sm:text-base text-[#FF6A2B] uppercase tracking-wider font-medium">
            Full-stack developer in Lagos, Nigeria
          </p>
        </div>

        {/* Hairline Divider */}
        <div className="h-[1px] bg-white/[0.12] origin-left my-6 sm:my-8" />

        {/* Positioning Statement & Subline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
          <div className="md:col-span-8">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F2EEE6] leading-snug">
              &ldquo;{PORTFOLIO_CONTENT.identity.positioning}&rdquo;
            </p>
            <p className="mt-4 font-sans text-base sm:text-lg text-[#A39E92] leading-relaxed max-w-2xl">
              {PORTFOLIO_CONTENT.identity.subline}
            </p>
          </div>

          {/* Quick Stats Column */}
          <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs text-[#A39E92] md:border-l md:border-white/[0.08] md:pl-6">
            <div>
              <span className="text-[#6B665C]">Core Focus /</span>
              <p className="text-[#F2EEE6] mt-0.5">Real-time collaboration & CRDTs</p>
            </div>
            <div>
              <span className="text-[#6B665C]">Verification /</span>
              <p className="text-[#F2EEE6] mt-0.5">Playwright E2E on 390px iPhone & Desktop</p>
            </div>
            <div>
              <span className="text-[#6B665C]">Delivery /</span>
              <p className="text-[#F2EEE6] mt-0.5">Edge-first architectures ($0 overhead)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons & Bottom Anchor */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group px-6 py-3.5 bg-[#F2EEE6] hover:bg-[#FF6A2B] text-[#0E0D0B] font-mono text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>See the work</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3.5 border border-white/[0.18] hover:border-[#FF6A2B] text-[#F2EEE6] hover:text-[#FF6A2B] font-mono text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-3.5 h-3.5 text-[#FF6A2B]" />
            <span>Email me</span>
          </a>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 font-mono text-xs text-[#A39E92]">
          <a
            href={PORTFOLIO_CONTENT.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F2EEE6] transition-colors flex items-center gap-1"
          >
            GitHub
            <ArrowUpRight className="w-3 h-3 text-[#FF6A2B]" />
          </a>
          <a
            href={PORTFOLIO_CONTENT.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F2EEE6] transition-colors flex items-center gap-1"
          >
            WhatsApp
            <ArrowUpRight className="w-3 h-3 text-[#FF6A2B]" />
          </a>
        </div>
      </div>
    </section>
  );
}
