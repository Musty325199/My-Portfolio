"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_CONTENT } from "@/data/content";
import { getLagosTime } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";

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

          {/* Desktop Navigation Links */}
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

          {/* Right indicator: Lagos Time */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-[#A39E92] border-l border-white/10 pl-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] pulse-dot" />
            <span>LAGOS {lagosTime || "WAT"}</span>
          </div>

          {/* Mobile Menu Hamburger Button (Min 44px tap target) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="md:hidden text-[#F2EEE6] hover:text-[#FF6A2B] p-2 -mr-2 flex items-center justify-center"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Sheet Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0E0D0B] flex flex-col justify-between p-6 sm:p-10 md:hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <span className="font-serif text-xl tracking-tight text-[#F2EEE6]">
                Mustapha Lawal
              </span>
              <button
                onClick={closeMobile}
                aria-label="Close navigation menu"
                className="text-[#F2EEE6] hover:text-[#FF6A2B] p-2 -mr-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col gap-6 my-auto py-6">
              {[
                { label: "Selected Work", href: "#work", num: "01" },
                { label: "Tessel Case Study", href: "#tessel", num: "02" },
                { label: "Engineering Stack", href: "#stack", num: "03" },
                { label: "How I Work", href: "#process", num: "04" },
                { label: "About Musty", href: "#about", num: "05" },
                { label: "Get In Touch", href: "#contact", num: "06" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="group flex items-baseline justify-between py-2 border-b border-white/[0.06]"
                >
                  <span className="font-serif text-3xl text-[#F2EEE6] group-hover:text-[#FF6A2B] transition-colors">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-[#A39E92]">
                    /{item.num}
                  </span>
                </a>
              ))}
            </nav>

            {/* Footer inside mobile menu */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3 font-mono text-xs text-[#A39E92]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6A2B] pulse-dot" />
                <span>Open to work · Lagos, WAT {lagosTime}</span>
              </div>
              <div className="flex items-center gap-4 text-[#F2EEE6]">
                <a
                  href={`mailto:${PORTFOLIO_CONTENT.links.email}`}
                  className="hover:text-[#FF6A2B]"
                >
                  Email
                </a>
                <span>·</span>
                <a
                  href={PORTFOLIO_CONTENT.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6A2B]"
                >
                  WhatsApp
                </a>
                <span>·</span>
                <a
                  href={PORTFOLIO_CONTENT.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6A2B]"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
