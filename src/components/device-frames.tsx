"use client";

import React from "react";
import Image from "next/image";

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
}

export function BrowserFrame({ children, url = "", className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`rounded-lg border border-white/[0.14] bg-[#141311] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.65)] ${className}`}
    >
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1B1A16] border-b border-white/[0.08] select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <div className="font-mono text-[11px] text-[#A39E92] bg-[#0E0D0B] px-4 py-0.5 rounded-xs border border-white/[0.06] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          <span>https://{url}</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Viewport content */}
      <div className="relative w-full">{children}</div>
    </div>
  );
}

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

export function PhoneFrame({ src, alt, className = "" }: PhoneFrameProps) {
  return (
    <div className={`flex justify-center items-center py-2 ${className}`}>
      <div className="relative w-[280px] sm:w-[310px] aspect-[9/19] rounded-[42px] border-[6px] border-[#252420] bg-[#0E0D0B] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden p-2">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#252420] rounded-full z-20 flex items-center justify-end pr-2.5">
          <div className="w-2 h-2 rounded-full bg-[#12110E]" />
        </div>

        {/* Screen Content */}
        <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 280px, 320px"
          />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-20" />
      </div>
    </div>
  );
}
