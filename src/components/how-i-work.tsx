"use client";

import React from "react";
import { PORTFOLIO_CONTENT } from "@/data/content";

export function HowIWork() {
  return (
    <section id="process" className="py-20 md:py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/[0.12]">
      {/* Section Header */}
      <div className="border-b border-white/[0.12] pb-6 mb-12">
        <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest block mb-2">
          06 / Engineering Depth
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-tight">
          How I Build & Ship
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#A39E92] mt-2 max-w-xl">
          Concrete engineering principles proven through actual implementation. No hypothetical theories or buzzwords.
        </p>
      </div>

      {/* Four Short Columns with Hairline Dividers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.12]">
        {PORTFOLIO_CONTENT.engineeringPillars.map((pillar, idx) => (
          <div
            key={pillar.title}
            className="p-6 sm:p-8 first:pl-0 last:pr-0 space-y-4 hover:bg-white/[0.015] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#FF6A2B]">
                0{idx + 1}
              </span>
              <span className="font-mono text-[10px] text-[#6B665C] border border-white/[0.08] px-1.5 py-0.5 rounded-xs">
                {pillar.project}
              </span>
            </div>

            <h3 className="font-serif text-2xl text-[#F2EEE6] tracking-tight">
              {pillar.title}
            </h3>

            <p className="font-sans text-sm text-[#A39E92] leading-relaxed">
              {pillar.summary}
            </p>

            <div className="pt-2 font-mono text-[11px] text-[#6B665C]">
              Strict production standards
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
