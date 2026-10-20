"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { isReducedMotion } from "@/lib/motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide completely on touch devices or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches || isReducedMotion()) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const moveHandler = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const mouseLeaveHandler = () => setIsVisible(false);
    const mouseEnterHandler = () => setIsVisible(true);

    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest("a, button, [data-interactive='true'], input, textarea");
      setIsHovered(!!interactiveEl);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mousemove", checkInteractive);
    document.addEventListener("mouseleave", mouseLeaveHandler);
    document.addEventListener("mouseenter", mouseEnterHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mousemove", checkInteractive);
      document.removeEventListener("mouseleave", mouseLeaveHandler);
      document.removeEventListener("mouseenter", mouseEnterHandler);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.15 } }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 2.8 : 1,
          backgroundColor: isHovered ? "#FF6A2B" : "#FF6A2B",
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="w-3 h-3 rounded-full shadow-[0_0_12px_rgba(255,106,43,0.6)]"
      />
    </motion.div>
  );
}
