"use client";

import React, { useState } from "react";
import { PORTFOLIO_CONTENT } from "@/data/content";
import { motion, AnimatePresence } from "motion/react";
import { Info } from "lucide-react";

export function StackSection() {
  const [selectedTech, setSelectedTech] = useState<{
    name: string;
    usedIn: string;
    note: string;
  } | null>(null);

  return (
    <section id="stack" className="py-20 md:py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/[0.12]">
      {/* Header */}
      <div className="border-b border-white/[0.12] pb-6 mb-12">
        <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest block mb-2">
          05 / Engineering Stack
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-tight">
          Practical Tooling, Verified in Production
        </h2>
        <p className="font-serif italic text-xl sm:text-2xl text-[#FF6A2B] mt-2">
          &ldquo;{PORTFOLIO_CONTENT.identity.editorialNote}&rdquo;
        </p>
        <p className="font-mono text-xs text-[#6B665C] mt-2">
          Hover or tap any technology below to see which live project it powers.
        </p>
      </div>

      {/* Stack Groups */}
      <div className="space-y-12">
        {PORTFOLIO_CONTENT.stackGroups.map((group, groupIdx) => (
          <div
            key={group.title}
            className="border-b border-white/[0.08] pb-10 last:border-b-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline mb-6">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block">
                  0{groupIdx + 1} / GROUP
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6] tracking-tight mt-1">
                  {group.title}
                </h3>
              </div>
              <p className="lg:col-span-8 font-sans text-sm sm:text-base text-[#A39E92]">
                {group.description}
              </p>
            </div>

            {/* Grid of Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.items.map((item) => {
                const isSelected = selectedTech?.name === item.name;

                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setSelectedTech(item)}
                    onClick={() => setSelectedTech(isSelected ? null : item)}
                    className={`p-4 rounded-sm border transition-all cursor-pointer select-none ${
                      isSelected
                        ? "border-[#FF6A2B] bg-[#1F1B16] shadow-[0_4px_20px_rgba(255,106,43,0.15)]"
                        : "border-white/[0.08] bg-[#141311] hover:border-white/20 hover:bg-[#181714]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg sm:text-xl text-[#F2EEE6]">
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF6A2B] border border-[#FF6A2B]/30 px-1.5 py-0.5 rounded-xs">
                        {item.usedIn.split(",")[0]}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/[0.06] flex flex-col gap-1 font-mono text-xs">
                      <div className="text-[#A39E92] text-[11px]">
                        <span className="text-[#6B665C]">Used in: </span>
                        <span className="text-[#F2EEE6]">{item.usedIn}</span>
                      </div>
                      <p className="text-[11px] text-[#6B665C] line-clamp-2">
                        {item.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Active Inspector Footer banner */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-8 p-4 rounded-sm border border-[#FF6A2B]/40 bg-[#1A1612] flex items-center justify-between gap-4 font-mono text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FF6A2B]" />
              <span className="text-[#F2EEE6] font-semibold">{selectedTech.name}</span>
              <span className="text-[#6B665C]">|</span>
              <span className="text-[#A39E92]">Evidence in {selectedTech.usedIn}: {selectedTech.note}</span>
            </div>
            <button
              onClick={() => setSelectedTech(null)}
              className="text-[#A39E92] hover:text-[#F2EEE6] underline text-[11px] cursor-pointer"
            >
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
