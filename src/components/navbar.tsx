"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_CONTENT } from "@/data/content";
import { getLagosTime } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const MENU_ITEMS = [
  { label: "Selected Work", href: "#work", num: "01", tag: "Projects" },
  { label: "Tessel Case Study", href: "#tessel", num: "02", tag: "Flagship" },
  { label: "Engineering Stack", href: "#stack", num: "03", tag: "MERN + Postgres" },
  { label: "How I Work", href: "#process", num: "04", tag: "Engineering Depth" },
  { label: "About Musty", href: "#about", num: "05", tag: "Background" },
  { label: "Get In Touch", href: "#contact", num: "06", tag: "Availability" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lagosTime, setLagosTime] = useState("");

  useEffect(() => {
    setLagosTime(getLagosTime());
    const clockInterval = setInterval(() => {
      setLagosTime(getLagosTime());
    }, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearInterval(clockInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobile = () => setMobileMenuOpen((prev) => !prev);
  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0E0D0B]/85 backdrop-blur-md border-b border-white/[0.08] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="#"
            className="group flex items-center gap-3 text-lg font-serif tracking-tight text-[#F2EEE6] hover:text-[#FF6A2B] transition-colors"
          >
            <span className="font-mono text-xs text-[#FF6A2B] font-bold tracking-widest border border-[#FF6A2B]/40 px-2 py-0.5 rounded-sm">
              ML
            </span>
            <span className="hidden sm:inline font-sans text-xs uppercase tracking-widest text-[#A39E92] group-hover:text-[#F2EEE6] transition-colors">
              Mustapha Lawal
            </span>
          </Link>

          {/* Desktop Navigation Links (Strictly Visible on md+ screens) */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-[#A39E92]">
            <a
              href="#work"
              className="hover:text-[#F2EEE6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#FF6A2B] after:transition-all"
            >
              Work
            </a>
            <a
              href="#tessel"
              className="hover:text-[#F2EEE6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#FF6A2B] after:transition-all"
            >
              Tessel
            </a>
            <a
              href="#stack"
              className="hover:text-[#F2EEE6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#FF6A2B] after:transition-all"
            >
              Stack
            </a>
            <a
              href="#process"
              className="hover:text-[#F2EEE6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#FF6A2B] after:transition-all"
            >
              Process
            </a>
            <a
              href="#about"
              className="hover:text-[#F2EEE6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#FF6A2B] after:transition-all"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-[#FF6A2B] hover:text-[#FF854A] font-medium py-1 transition-colors flex items-center gap-1"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Desktop Right Indicator: Lagos WAT Time */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-[#A39E92] border-l border-white/10 pl-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] pulse-dot" />
            <span>LAGOS {lagosTime || "WAT"}</span>
          </div>

          {/* Modern Animated Hamburger Trigger (Strictly Hidden on Desktop: md:!hidden) */}
          <button
            onClick={toggleMobile}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="md:!hidden group relative flex items-center gap-2.5 px-3 py-2 rounded-full border border-white/15 hover:border-[#FF6A2B]/60 bg-[#161512]/90 backdrop-blur-md text-[#F2EEE6] transition-all cursor-pointer min-h-[44px] min-w-[44px]"
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#A39E92] group-hover:text-[#F2EEE6] transition-colors">
              {mobileMenuOpen ? "Close" : "Menu"}
            </span>

            {/* Custom 2-bar morphing architectural icon */}
            <div className="relative w-5 h-3.5 flex flex-col justify-between items-end">
              <span
                className={`h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen
                    ? "w-5 bg-[#FF6A2B] translate-y-[6px] rotate-45"
                    : "w-5 bg-[#F2EEE6] group-hover:bg-[#FF6A2B]"
                }`}
              />
              <span
                className={`h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen
                    ? "w-5 bg-[#FF6A2B] -translate-y-[6px] -rotate-45"
                    : "w-3 bg-[#FF6A2B] group-hover:w-5"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Modern Full-Screen Mobile Sheet Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0E0D0B] flex flex-col justify-between p-6 sm:p-10 md:!hidden overflow-y-auto"
          >
            {/* Sheet Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <Link
                href="#"
                onClick={closeMobile}
                className="group flex items-center gap-3 text-lg font-serif tracking-tight text-[#F2EEE6]"
              >
                <span className="font-mono text-xs text-[#FF6A2B] font-bold tracking-widest border border-[#FF6A2B]/40 px-2 py-0.5 rounded-sm">
                  ML
                </span>
                <span className="font-serif text-xl text-[#F2EEE6]">
                  Mustapha Lawal
                </span>
              </Link>

              {/* Close Button matching the top pill */}
              <button
                onClick={closeMobile}
                aria-label="Dismiss navigation menu"
                className="group flex items-center gap-2.5 px-3 py-2 rounded-full border border-white/15 hover:border-[#FF6A2B]/60 bg-[#161512] text-[#F2EEE6] transition-all cursor-pointer min-h-[44px] min-w-[44px]"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#FF6A2B]">
                  Close
                </span>
                <div className="relative w-5 h-3.5 flex flex-col justify-center items-center">
                  <span className="w-4 h-[1.5px] bg-[#FF6A2B] rotate-45 translate-y-[0.5px]" />
                  <span className="w-4 h-[1.5px] bg-[#FF6A2B] -rotate-45 -translate-y-[1px]" />
                </div>
              </button>
            </div>

            {/* Staggered Navigation Items */}
            <nav className="flex flex-col gap-3 my-auto py-8">
              {MENU_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index + 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={closeMobile}
                    className="group flex items-baseline justify-between py-3 border-b border-white/[0.06] transition-transform duration-200 hover:translate-x-2"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#FF6A2B]">
                        {item.num}
                      </span>
                      <span className="font-serif text-3xl sm:text-4xl text-[#F2EEE6] group-hover:text-[#FF6A2B] group-hover:italic transition-colors">
                        {item.label}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-[#6B665C] group-hover:text-[#A39E92] uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Sheet Footer */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#A39E92]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6A2B] pulse-dot" />
                <span>Open to work · Lagos, WAT {lagosTime}</span>
              </div>

              <div className="flex items-center gap-4 text-[#F2EEE6]">
                <a
                  href={`mailto:${PORTFOLIO_CONTENT.links.email}`}
                  className="hover:text-[#FF6A2B] py-1 transition-colors"
                >
                  Email
                </a>
                <span className="text-[#6B665C]">·</span>
                <a
                  href={PORTFOLIO_CONTENT.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6A2B] py-1 transition-colors"
                >
                  WhatsApp
                </a>
                <span className="text-[#6B665C]">·</span>
                <a
                  href={PORTFOLIO_CONTENT.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6A2B] py-1 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
