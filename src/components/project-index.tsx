"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { PORTFOLIO_CONTENT, Project } from "@/data/content";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { isReducedMotion } from "@/lib/motion";

export function ProjectIndex() {
  const [activeHoverProject, setActiveHoverProject] = useState<Project | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>("tessel");

  // Cursor following preview for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isReducedMotion()) return;
    mouseX.set(e.clientX + 24);
    mouseY.set(e.clientY - 120);
  };

  const toggleMobileExpand = (id: string) => {
    setExpandedMobileId(expandedMobileId === id ? null : id);
  };

  return (
    <section id="work" className="py-20 md:py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/[0.12] pb-6 mb-8">
        <div>
          <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-widest block mb-2">
            02 / Selected Work
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-tight">
            Index of Production Builds
          </h2>
        </div>
        <p className="font-mono text-xs text-[#A39E92] max-w-xs">
          <span className="hidden sm:inline">Hover rows for live preview. Click to inspect architecture and case studies.</span>
          <span className="sm:hidden">Tap a project to preview.</span>
        </p>
      </div>

      {/* Floating Desktop Preview Card following cursor */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-30 hidden lg:block"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <AnimatePresence>
          {activeHoverProject && !isReducedMotion() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-80 h-52 rounded-sm overflow-hidden border border-white/20 bg-[#141311] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-1.5"
            >
              <div className="relative w-full h-full overflow-hidden rounded-xs">
                <Image
                  src={activeHoverProject.previewImage}
                  alt={activeHoverProject.title}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="font-mono text-[10px] text-[#F2EEE6] uppercase tracking-wider bg-black/60 px-1.5 py-0.5 rounded-xs">
                    {activeHoverProject.category}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Project Rows */}
      <div className="divide-y divide-white/[0.12]" onMouseMove={handleMouseMove}>
        {PORTFOLIO_CONTENT.projects.map((project) => {
          const isExpanded = expandedMobileId === project.id;
          const projectUrl = `/work/${project.id}`;

          return (
            <div
              key={project.id}
              onMouseEnter={() => setActiveHoverProject(project)}
              onMouseLeave={() => setActiveHoverProject(null)}
              className="group py-8 sm:py-10 transition-colors hover:bg-white/[0.015]"
            >
              {/* Row Header & Main Flex */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Number + Title */}
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-sm sm:text-base text-[#6B665C] group-hover:text-[#FF6A2B] transition-colors">
                    {project.number}
                  </span>
                  <Link
                    href={projectUrl}
                    className="group-hover:translate-x-3 transition-transform duration-200 inline-flex items-baseline gap-3"
                  >
                    <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2EEE6] group-hover:text-[#FF6A2B] transition-colors">
                      {project.title}
                    </h3>
                    {project.isFlagship && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6A2B] border border-[#FF6A2B]/40 px-2 py-0.5 rounded-sm">
                        Flagship
                      </span>
                    )}
                  </Link>
                </div>

                {/* Right / Center on desktop: Summary & Stack */}
                <div className="lg:max-w-xl flex flex-col gap-3">
                  <p className="font-sans text-sm sm:text-base text-[#A39E92] leading-relaxed">
                    {project.oneLiner}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#6B665C]">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/[0.08] px-2 py-0.5 rounded-xs group-hover:border-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="text-[#FF6A2B]">+{project.stack.length - 5} more</span>
                    )}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex items-center justify-between lg:justify-end gap-4 pt-2 lg:pt-0">
                  <Link
                    href={projectUrl}
                    className="font-mono text-xs uppercase tracking-wider text-[#F2EEE6] hover:text-[#FF6A2B] flex items-center gap-1 group-hover:underline"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FF6A2B]" />
                  </Link>

                  {/* Mobile expansion toggle button */}
                  <button
                    onClick={() => toggleMobileExpand(project.id)}
                    aria-label={`Toggle details for ${project.title}`}
                    className="lg:hidden text-[#A39E92] hover:text-[#F2EEE6] p-2"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#FF6A2B]" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Mobile in-place expansion drawer */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden lg:hidden pt-6 mt-6 border-t border-white/[0.08]"
                  >
                    <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden mb-5 border border-white/10">
                      <Image
                        src={project.previewImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <div className="space-y-4 font-sans text-sm text-[#A39E92]">
                      <div>
                        <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block mb-1">
                          What I Built
                        </span>
                        <p>{project.whatIBuilt}</p>
                      </div>

                      <div>
                        <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block mb-1">
                          The Hardest Part
                        </span>
                        <p>{project.hardestPart}</p>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-3">
                        <Link
                          href={`/work/${project.id}`}
                          className="px-4 py-2 bg-[#F2EEE6] text-[#0E0D0B] hover:bg-[#FF6A2B] font-mono text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-colors"
                        >
                          <span>Read Full Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                        {project.liveUrl && project.liveUrl.startsWith("http") && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-white/20 text-[#F2EEE6] hover:text-[#FF6A2B] font-mono text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5"
                          >
                            <span>Live Site</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
