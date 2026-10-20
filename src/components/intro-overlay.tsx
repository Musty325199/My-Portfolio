"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { isReducedMotion, MOTION } from "@/lib/motion";

export function IntroOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if reduced motion or already shown in this session
    if (isReducedMotion()) return;

    try {
      const seen = sessionStorage.getItem("ml_portfolio_intro_seen");
      if (!seen) {
        setShow(true);
        sessionStorage.setItem("ml_portfolio_intro_seen", "true");
        // Auto-dismiss within 1.15 seconds
        const timer = setTimeout(() => {
          setShow(false);
        }, 1150);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage blocked or restricted
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION.durations.med, ease: MOTION.easings.transitionBezier }}
          className="fixed inset-0 z-[9999] bg-[#0E0D0B] flex flex-col justify-between p-6 sm:p-12 md:p-16 pointer-events-auto"
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-[#A39E92] uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] animate-pulse" />
              Initialising / ML
            </span>
            <button
              onClick={() => setShow(false)}
              className="text-[#A39E92] hover:text-[#FF6A2B] text-xs font-mono uppercase tracking-wider underline cursor-pointer p-2"
            >
              Skip (ESC)
            </button>
          </div>

          {/* Centered Name reveal */}
          <div className="my-auto max-w-4xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.55, ease: MOTION.easings.entranceBezier }}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F2EEE6]"
              >
                Mustapha Lawal
              </motion.h1>
            </div>

            {/* Hairline rule draws across */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.65, delay: 0.25, ease: MOTION.easings.entranceBezier }}
              className="h-[1px] bg-white/20 origin-left my-4 md:my-6"
            />

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.45, ease: MOTION.easings.entranceBezier }}
                className="font-mono text-xs sm:text-sm text-[#A39E92] uppercase tracking-widest"
              >
                Full-Stack Developer · Lagos, Nigeria · Real-Time Systems
              </motion.p>
            </div>
          </div>

          {/* Bottom status */}
          <div className="text-[11px] font-mono text-[#6B665C]">
            01 / PRODUCTION PORTFOLIO
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
