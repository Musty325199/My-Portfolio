"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function TesselArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef1 = useRef<SVGPathElement>(null);
  const pathRef2 = useRef<SVGPathElement>(null);
  const pathRef3 = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const paths = [pathRef1.current, pathRef2.current, pathRef3.current].filter(Boolean);

      paths.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-12 p-6 sm:p-8 rounded-lg border border-white/[0.12] bg-[#141311] overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 mb-6 border-b border-white/[0.08] pb-4">
        <div>
          <span className="font-mono text-xs text-[#FF6A2B] uppercase tracking-wider block">
            Topology / Architecture
          </span>
          <h4 className="font-serif text-xl sm:text-2xl text-[#F2EEE6] tracking-tight">
            Real-time Distributed Sync Lifecycle
          </h4>
        </div>
        <span className="font-mono text-[11px] text-[#A39E92]">
          Zero Lock Contention · Eventual Consistency
        </span>
      </div>

      {/* SVG Flow Diagram */}
      <div className="relative w-full overflow-x-auto py-4">
        <svg
          viewBox="0 0 900 240"
          className="w-full min-w-[700px] h-auto text-xs font-mono select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A39E92" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FF6A2B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#A39E92" stopOpacity="0.3" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Line 1: Clients <-> Yjs CRDT */}
          <path
            ref={pathRef1}
            d="M 190 120 L 290 120"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Connection Line 2: Yjs CRDT <-> Sync Server */}
          <path
            ref={pathRef2}
            d="M 440 120 L 530 120"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Connection Line 3: Sync Server <-> MongoDB Atlas */}
          <path
            ref={pathRef3}
            d="M 680 120 L 750 120"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Travelling Packet Dot 1 */}
          <circle r="4" fill="#FF6A2B" filter="url(#glow)">
            <animateMotion
              path="M 190 120 L 290 120"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Travelling Packet Dot 2 */}
          <circle r="4" fill="#FF6A2B" filter="url(#glow)">
            <animateMotion
              path="M 440 120 L 530 120"
              dur="2.4s"
              begin="0.6s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Travelling Packet Dot 3 */}
          <circle r="4" fill="#FF6A2B" filter="url(#glow)">
            <animateMotion
              path="M 680 120 L 750 120"
              dur="2.4s"
              begin="1.2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* NODE 1: Clients */}
          <g transform="translate(30, 70)">
            <rect
              width="160"
              height="100"
              rx="6"
              fill="#0E0D0B"
              stroke="rgba(242, 238, 230, 0.2)"
              strokeWidth="1"
            />
            <rect width="160" height="26" rx="6" fill="#1C1B17" />
            <circle cx="14" cy="13" r="3.5" fill="#FF6A2B" />
            <text x="26" y="17" fill="#F2EEE6" fontSize="10" fontWeight="bold">
              CLIENT NODES
            </text>
            <text x="14" y="48" fill="#F2EEE6" fontSize="11" fontWeight="500">
              Browser / Mobile PWA
            </text>
            <text x="14" y="66" fill="#A39E92" fontSize="9">
              React 18 · Vite · Canvas
            </text>
            <text x="14" y="82" fill="#6B665C" fontSize="9">
              y-indexeddb local cache
            </text>
          </g>

          {/* NODE 2: Yjs CRDT */}
          <g transform="translate(290, 70)">
            <rect
              width="150"
              height="100"
              rx="6"
              fill="#0E0D0B"
              stroke="#FF6A2B"
              strokeWidth="1.5"
            />
            <rect width="150" height="26" rx="6" fill="#241914" />
            <circle cx="14" cy="13" r="3.5" fill="#FF6A2B" />
            <text x="26" y="17" fill="#FF6A2B" fontSize="10" fontWeight="bold">
              YJS CRDT ENGINE
            </text>
            <text x="14" y="48" fill="#F2EEE6" fontSize="11" fontWeight="500">
              Binary Document
            </text>
            <text x="14" y="66" fill="#A39E92" fontSize="9">
              State Vector Deltas
            </text>
            <text x="14" y="82" fill="#6B665C" fontSize="9">
              Awareness & Cursors
            </text>
          </g>

          {/* NODE 3: Sync Server */}
          <g transform="translate(530, 70)">
            <rect
              width="150"
              height="100"
              rx="6"
              fill="#0E0D0B"
              stroke="rgba(242, 238, 230, 0.2)"
              strokeWidth="1"
            />
            <rect width="150" height="26" rx="6" fill="#1C1B17" />
            <circle cx="14" cy="13" r="3.5" fill="#FF6A2B" />
            <text x="26" y="17" fill="#F2EEE6" fontSize="10" fontWeight="bold">
              SYNC SERVER
            </text>
            <text x="14" y="48" fill="#F2EEE6" fontSize="11" fontWeight="500">
              WebSocket Daemon
            </text>
            <text x="14" y="66" fill="#A39E92" fontSize="9">
              Node.js · Express
            </text>
            <text x="14" y="82" fill="#6B665C" fontSize="9">
              Render Edge Cluster
            </text>
          </g>

          {/* NODE 4: MongoDB Atlas */}
          <g transform="translate(750, 70)">
            <rect
              width="130"
              height="100"
              rx="6"
              fill="#0E0D0B"
              stroke="rgba(242, 238, 230, 0.2)"
              strokeWidth="1"
            />
            <rect width="130" height="26" rx="6" fill="#1C1B17" />
            <circle cx="14" cy="13" r="3.5" fill="#10B981" />
            <text x="26" y="17" fill="#F2EEE6" fontSize="10" fontWeight="bold">
              STORAGE
            </text>
            <text x="14" y="48" fill="#F2EEE6" fontSize="11" fontWeight="500">
              MongoDB Atlas
            </text>
            <text x="14" y="66" fill="#A39E92" fontSize="9">
              Binary Document Store
            </text>
            <text x="14" y="82" fill="#6B665C" fontSize="9">
              Debounced Snapshots
            </text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08] font-mono text-xs text-[#A39E92]">
        <div>
          <span className="text-[#FF6A2B]">01 / Local-First Delta</span>
          <p className="mt-1 text-[#6B665C]">Changes apply instantly to user canvas before socket dispatch.</p>
        </div>
        <div>
          <span className="text-[#FF6A2B]">02 / CRDT Convergence</span>
          <p className="mt-1 text-[#6B665C]">Yjs binary encoding merges concurrent edits deterministically.</p>
        </div>
        <div>
          <span className="text-[#FF6A2B]">03 / Storage Persistence</span>
          <p className="mt-1 text-[#6B665C]">Server batches binary updates into MongoDB Atlas document snapshots.</p>
        </div>
      </div>
    </div>
  );
}
