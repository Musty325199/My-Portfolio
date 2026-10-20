"use client";

import React from "react";
import { PORTFOLIO_CONTENT } from "@/data/content";
import { MapPin, Smartphone, Layers, Terminal } from "lucide-react";

export function AboutSection() {
  const { bio, currently } = PORTFOLIO_CONTENT.about;

  return (
    <section id="about" className="py-20 md:py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/[0.12]">
      {/* Section Header */}
      <div className="border-b border-white/[0.12] pb-6 mb-12">
        <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest block mb-2">
          07 / Background & Focus
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-tight">
          About Mustapha Lawal
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Human Editorial Bio */}
        <div className="lg:col-span-7 space-y-6">
          {bio.map((paragraph, index) => (
            <p
              key={index}
              className={`leading-relaxed ${
                index === 0
                  ? "font-serif text-2xl sm:text-3xl text-[#F2EEE6] leading-snug"
                  : "font-sans text-base sm:text-lg text-[#A39E92]"
              }`}
            >
              {paragraph}
            </p>
          ))}

          {/* Core Philosophy Markers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08] font-mono text-xs text-[#A39E92]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF6A2B] shrink-0" />
              <span>Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#FF6A2B] shrink-0" />
              <span>iPhone-First Mindset</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FF6A2B] shrink-0" />
              <span>Full Lifecycle Ownership</span>
            </div>
          </div>
        </div>

        {/* Right: "Currently" Mono List */}
        <div className="lg:col-span-5 bg-[#141311] border border-white/[0.12] rounded-lg p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              CURRENT STATUS
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-6 font-mono text-xs">
            {currently.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <span className="text-[#6B665C] uppercase tracking-wider block">
                  // {item.label}
                </span>
                <p className="text-[#F2EEE6] font-sans text-sm leading-relaxed">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08] font-mono text-[11px] text-[#A39E92] flex items-center justify-between">
            <span>Availability: Immediate</span>
            <span className="text-[#FF6A2B]">Remote / Contract</span>
          </div>
        </div>
      </div>
    </section>
  );
}
