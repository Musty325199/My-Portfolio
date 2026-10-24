"use client";

import React from "react";

const MARQUEE_ITEMS = [
  "TESSEL / MULTIPLAYER WHITEBOARD",
  "YÍPO / OFFLINE AJO & ESUSU (ANDROID)",
  "REACT NATIVE & EXPO (SDK 58)",
  "SHOPIFY SKIA 60FPS",
  "EXPO SQLITE ACID",
  "STOCKFLOW / SAAS INVENTORY",
  "NOOK / LAGOS GUIDE",
  "HOSTVALE / SHORTLET OPERATIONS",
  "WEBSOCKET SYNC ENGINE",
  "OFFLINE-FIRST INDEXEDDB",
  "PLAYWRIGHT E2E (390PX + DESKTOP)",
  "STRUCTURED GEMINI AI",
  "MERN + NEXT.JS + REACT NATIVE",
];

export function ProjectMarquee() {
  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden border-y border-white/[0.08] py-3.5 bg-[#0E0D0B] select-none"
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap font-mono text-xs text-[#A39E92] uppercase tracking-widest">
        {/* Render twice for continuous loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-[#F2EEE6] transition-colors">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B]" />
          </div>
        ))}
      </div>
    </div>
  );
}
