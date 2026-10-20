"use client";

import React, { useEffect, useState } from "react";
import { isReducedMotion } from "@/lib/motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isReducedMotion()) return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      const p = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 bottom-0 w-[2px] bg-white/[0.04] z-50 pointer-events-none hidden md:block"
    >
      <div
        className="w-full bg-[#FF6A2B] transition-transform duration-75 origin-top"
        style={{
          height: "100%",
          transform: `scaleY(${progress / 100})`,
        }}
      />
    </div>
  );
}
