/**
 * CONTENT FILE - Single source of truth for all copy, links, projects, and stack data.
 * Adheres strictly to the portfolio brief. No invented metrics, clients, or testimonials.
 */

// CLEARLY MARKED TODOS AS REQUESTED BY THE SPEC
export const TODO_LINKS = {
  // TODO: Confirm StockFlow exact production stack with owner
  STOCKFLOW_STACK_CONFIRMATION: "[TODO: Confirm full production stack with owner]",
} as const;

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  webmSrc?: string;
  poster?: string;
  alt: string;
  aspectRatio: "16/10" | "16/9" | "9/19.5" | "4/3";
  caption?: string;
}

export interface CaseStudyChapter {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  technicalDetails?: string[];
  media: ProjectMedia;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  oneLiner: string;
  whatIBuilt: string;
  hardestPart: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: "Live" | "In development";
  isFlagship?: boolean;
  previewImage: string;
  chapters?: CaseStudyChapter[];
  keyFacts?: string[];
  screenshots?: {
    src: string;
    caption: string;
    aspectRatio: string;
  }[];
}

export interface StackItem {
  name: string;
  category: "core" | "extended" | "delivery";
  usedIn: string[];
  evidence: string;
}

export const PORTFOLIO_CONTENT = {
  identity: {
    fullName: "Mustapha Lawal",
    shortName: "Musty",
    role: "Full-Stack Developer",
    location: "Lagos, Nigeria",
    timezone: "Africa/Lagos", // WAT (UTC+1)
    status: "Open to work",
    positioning: "I build real-time products that hold up in production.",
    subline: "Full-stack developer in Lagos. Collaborative software, booking platforms, inventory systems.",
    availability: "Available for freelance and remote roles.",
    editorialNote: "MERN at the core, plus Next.js and Postgres when the product needs them.",
  },

  links: {
    github: "https://github.com/Musty325199",
    email: "mustyflowcrm@gmail.com",
    whatsapp: "https://wa.me/2349065323916",
    linkedin: "https://www.linkedin.com/in/mustapha-lawal-74b62523b",
  },

  navigation: [
    { label: "Work", href: "#work" },
    { label: "Tessel", href: "#tessel" },
    { label: "Stack", href: "#stack" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  projects: [
    {
      id: "tessel",
      number: "01",
      title: "Tessel",
      tagline: "A live multiplayer whiteboard.",
      category: "Real-time Collaboration",
      oneLiner: "Real-time collaborative canvas with peer-to-peer sync, offline persistence, and AI-driven board organization.",
      whatIBuilt: "Engineered full stack: custom WebSocket sync server powered by Yjs CRDTs, React canvas engine, offline-first IndexedDB persistence, structured Gemini AI canvas organizer, and automated Playwright E2E suites.",
      hardestPart: "Guaranteeing conflict-free distributed document convergence during sudden network drops while keeping gesture rendering smooth on mobile viewports.",
      stack: [
        "React 18",
        "TypeScript",
        "Vite",
        "Express",
        "WebSocket",
        "Yjs",
        "MongoDB",
        "Gemini API",
        "Resend",
        "Cloudinary",
        "Playwright",
        "GitHub Actions",
      ],
      liveUrl: "https://musty325199.github.io/tessel/",
      githubUrl: "https://github.com/Musty325199/tessel",
      status: "Live",
      isFlagship: true,
      previewImage: "/assets/tessel/dashboard-dark.jpg",
      keyFacts: [
        "Real-time sync",
        "Offline-first",
        "Installable PWA",
        "AI-assisted",
      ],
      chapters: [
        {
          id: "problem",
          number: "01",
          title: "Problem",
          headline: "Real-time collaboration without dropped state.",
          description: "Teams need to think together on one canvas without lag and without losing work when the connection drops. Distributed participants require immediate visual feedback while concurrent operations reconcile seamlessly in the background.",
          technicalDetails: [
            "Network drops in high-latency geographies discard state on naive HTTP pipelines.",
            "Visual canvas manipulation requires zero rendering stutter on low-power devices.",
          ],
          media: {
            type: "image",
            src: "/assets/tessel/landing.jpg",
            alt: "Tessel landing page showing canvas tools and collaborative workspace",
            aspectRatio: "16/10",
            caption: "Tessel canvas interface and initial landing state",
          },
        },
        {
          id: "sync",
          number: "02",
          title: "Real-time sync",
          headline: "Conflict-free replication with Yjs CRDTs.",
          description: "Yjs CRDTs run over a custom WebSocket sync server, ensuring edits from many people merge deterministically without central lock contention. Awareness states broadcast live cursors, selection bounding boxes, and peer presence across active peers.",
          technicalDetails: [
            "WebSocket sync engine broadcasting delta updates via binary Yjs encoding.",
            "Awareness protocol for multi-user presence, remote cursor tracking, and collaborative selection.",
          ],
          media: {
            type: "image",
            src: "/assets/tessel/board.jpg",
            alt: "Live collaborative whiteboard with multiple active cursors and shapes",
            aspectRatio: "16/10",
            caption: "Multi-user live canvas with concurrent editing and real-time cursor awareness",
          },
        },
        {
          id: "offline",
          number: "03",
          title: "Offline-first",
          headline: "Local persistence that catches up on reconnect.",
          description: "y-indexeddb caches full board state directly in the browser's IndexedDB, keeping boards fully usable without an internet connection. When connectivity returns, local deltas automatically sync and merge with remote updates.",
          technicalDetails: [
            "Local-first document lifecycle via y-indexeddb provider.",
            "Automatic bidirectional synchronization on browser online events.",
            "Fully responsive canvas touch controls tailored for mobile screens.",
          ],
          media: {
            type: "image",
            src: "/assets/tessel/phone.jpg",
            alt: "Tessel running on iPhone mobile browser viewport",
            aspectRatio: "9/19.5",
            caption: "Mobile viewport execution: responsive canvas interaction and offline continuity",
          },
        },
        {
          id: "ai",
          number: "04",
          title: "AI-assisted",
          headline: "Board organization powered by structured Gemini output.",
          description: "The 'Organise' tool cleans and structures messy whiteboard clusters using Google Gemini with structured JSON schema outputs. It executes a fast model first with graceful fallback tiers, exponential timeouts, and strict rate-limit protection.",
          technicalDetails: [
            "Algorithmic spatial cluster parsing fed to Gemini structured response schema.",
            "Fallback escalation on 429/timeout errors to ensure continuous user flow.",
          ],
          media: {
            type: "video",
            src: "/assets/tessel/demo.mp4",
            webmSrc: "/assets/tessel/demo.webm",
            poster: "/assets/tessel/demo-poster.jpg",
            alt: "Muted product demo showcasing canvas manipulation and real-time features",
            aspectRatio: "16/10",
            caption: "Live interactive demo: board manipulation, object grouping, and sync speed",
          },
        },
        {
          id: "security",
          number: "05",
          title: "Security & Auth",
          headline: "Hardened tokens, signed assets, and zero trust.",
          description: "JWT access tokens paired with rotating refresh tokens secure user sessions. Password recovery uses hashed, single-use, time-limited reset links. Cloudinary file uploads are signed server-side, and API routes enforce strict rate limiting.",
          technicalDetails: [
            "Stateless JWT access tokens with rotating refresh tokens stored in HTTP-only cookies.",
            "Single-use scrypt-hashed password recovery tokens with automatic expiry.",
            "Server-signed upload signatures preventing untrusted Cloudinary asset injections.",
          ],
          media: {
            type: "image",
            src: "/assets/tessel/comments.jpg",
            alt: "Collaborative comments and contextual board interaction",
            aspectRatio: "16/10",
            caption: "Threaded contextual comments and fine-grained board permissions",
          },
        },
        {
          id: "shipping",
          number: "06",
          title: "Shipping & CI",
          headline: "Monorepo architecture with mobile-tested CI pipelines.",
          description: "TypeScript monorepo housing web client, WebSocket server, and shared schemas. GitHub Actions CI runs unit tests, type checks, build pipelines, and Playwright end-to-end tests across desktop and iPhone 390px viewports before automated deployment.",
          technicalDetails: [
            "Automated dual-viewport Playwright matrix (Desktop Chrome + iPhone 390px Safari).",
            "Auto-deployment: Web client to GitHub Pages, sync API to Render, storage to MongoDB Atlas.",
            "Installable Progressive Web App (PWA) with service worker caching.",
          ],
          media: {
            type: "image",
            src: "/assets/tessel/dashboard-dark.jpg",
            alt: "Tessel dark-themed workspace dashboard displaying user boards",
            aspectRatio: "16/10",
            caption: "Production dark dashboard: board management, permissions, and PWA integration",
          },
        },
      ],
    },
    {
      id: "stockflow",
      number: "02",
      title: "StockFlow",
      tagline: "Inventory and sales management for small businesses.",
      category: "Commercial SaaS",
      oneLiner: "Stock tracking, customer management, pay-later credit sales tracking, and POS-style checkout built for real shop owners.",
      whatIBuilt: "Built the entire platform end-to-end: comprehensive product catalogue, low-stock threshold alerting, customer debt ledger, POS transaction stream, and real-time sales summaries.",
      hardestPart: "Designing the pay-later credit sales reconciliation model so merchants can accurately track installment payments, balance settlements, and customer purchase histories without accounting drift.",
      stack: [
        "MongoDB",
        "Express",
        "React",
        "Node.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      liveUrl: "https://stockflowhq.com",
      status: "Live",
      isFlagship: false,
      previewImage: "/assets/stockflow/screen-1.jpg",
      screenshots: [
        {
          src: "/assets/stockflow/screen-1.jpg",
          caption: "StockFlow overview: small business inventory management and sales dashboard",
          aspectRatio: "16/10",
        },
        {
          src: "/assets/stockflow/screen-2.jpg",
          caption: "Feature breakdown: real-time stock levels, daily sales tracking, and customer insights",
          aspectRatio: "16/10",
        },
        {
          src: "/assets/stockflow/screen-3.jpg",
          caption: "Pricing tiers: transparent structure with 14-day free trial and Pro plan",
          aspectRatio: "16/10",
        },
      ],
    },
    {
      id: "nook",
      number: "03",
      title: "NOOK",
      tagline: "A curated guide to stays and experiences in Lagos.",
      category: "Hospitality & Experiences",
      oneLiner: "A curated directory of luxury stays and experiences across Lagos, paired with an administrative operating suite.",
      whatIBuilt: "Full architecture on Next.js 16 App Router: server action workflows, Prisma 7 database schemas, Supabase Postgres data tier, Cloudinary media CDN, Resend customer notifications, and custom admin management.",
      hardestPart: "Implementing idempotent enquiry submissions to eliminate duplicate bookings on double-taps, paired with honeypot spam protection and scrypt-hashed admin auth with HMAC-signed session envelopes.",
      stack: [
        "Next.js 16",
        "Prisma 7",
        "Supabase Postgres",
        "Server Actions",
        "Cloudinary",
        "Resend",
        "Tailwind CSS",
      ],
      liveUrl: "https://nook-lagos.vercel.app",
      status: "Live",
      isFlagship: false,
      previewImage: "/assets/nook/screen-1.jpg",
      screenshots: [
        {
          src: "/assets/nook/screen-1.jpg",
          caption: "NOOK visitor discovery: curated collection of design-forward Lagos stays",
          aspectRatio: "16/10",
        },
        {
          src: "/assets/nook/screen-2.jpg",
          caption: "Stay detail showcase: immersive architectural photo gallery and reservation enquiry flow",
          aspectRatio: "16/10",
        },
      ],
    },
    {
      id: "hostvale",
      number: "04",
      title: "Hostvale",
      tagline: "Operations app for shortlet hosts across Nigeria.",
      category: "Property Management",
      oneLiner: "Operations app for shortlet hosts across Nigeria: bookings, caution fees, guests, and a per-host mini website with apartment photos.",
      whatIBuilt: "Architecting end-to-end host management platform on Next.js and Supabase: caution fee escrow tracking, guest verification pipelines, dynamic multi-tenant host mini-websites, and booking calendar sync.",
      hardestPart: "Handling edge-case caution fee deduction and refund state machines while generating lightning-fast SSR public host storefronts on custom subpaths.",
      stack: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      liveUrl: "https://hostvale.app/ops",
      status: "Live",
      isFlagship: false,
      previewImage: "/assets/hostvale/screen-1.jpg",
      screenshots: [
        {
          src: "/assets/hostvale/screen-1.jpg",
          caption: "Hostvale operations dashboard: occupancy metrics, active reservations, and guest balances",
          aspectRatio: "16/10",
        },
        {
          src: "/assets/hostvale/screen-2.jpg",
          caption: "Bookings management portal: multi-property schedules, payment status, and guest check-in tracking",
          aspectRatio: "16/10",
        },
      ],
    },
  ] as Project[],

  // Honest stack representation grouped by daily usage vs extensions
  stackGroups: [
    {
      title: "Core (daily)",
      description: "My daily production foundation. Built around the MERN paradigm with strict TypeScript.",
      items: [
        { name: "MongoDB", usedIn: "Tessel, StockFlow", note: "Document store, flexible schemas, Atlas clusters" },
        { name: "Express", usedIn: "Tessel, StockFlow", note: "REST APIs, WebSocket attachment, middleware" },
        { name: "React", usedIn: "Tessel, StockFlow", note: "Component architectures, custom hooks, canvas rendering" },
        { name: "Node.js", usedIn: "Tessel, StockFlow", note: "Event-driven runtime, sync servers, background tasks" },
        { name: "TypeScript", usedIn: "Tessel, NOOK, Hostvale, StockFlow", note: "Strict typing across client, server, and shared packages" },
      ],
    },
    {
      title: "Also ships with",
      description: "Relational data modeling, modern SSR architectures, and rapid UI engineering.",
      items: [
        { name: "Next.js", usedIn: "NOOK, Hostvale, Portfolio", note: "App Router, Server Actions, per-page SEO, Route Handlers" },
        { name: "PostgreSQL / Supabase", usedIn: "NOOK, Hostvale", note: "Relational tables, Row-Level Security, database migrations" },
        { name: "Prisma", usedIn: "NOOK", note: "Type-safe database ORM and automated schema migrations" },
        { name: "Tailwind CSS", usedIn: "All projects", note: "Utility-first design tokens, zero runtime style cost" },
        { name: "Vite", usedIn: "Tessel", note: "Fast client bundling, PWA plugin support, HMR" },
      ],
    },
    {
      title: "Real-time & delivery",
      description: "Collaborative CRDT sync, end-to-end verification, and modern deployment pipelines.",
      items: [
        { name: "WebSockets", usedIn: "Tessel", note: "Bidirectional state streaming and awareness protocols" },
        { name: "Yjs (CRDT)", usedIn: "Tessel", note: "Conflict-free replicated data types for multiplayer canvas" },
        { name: "Playwright", usedIn: "Tessel, Testing", note: "Automated E2E testing on desktop and 390px iPhone viewports" },
        { name: "GitHub Actions", usedIn: "Tessel, All projects", note: "CI test matrices, type-checks, and auto-deploy jobs" },
        { name: "Docker", usedIn: "Production tooling", note: "Reproducible container environments" },
        { name: "Vercel", usedIn: "NOOK, Hostvale, Portfolio", note: "Global edge deployment and serverless execution" },
        { name: "Render", usedIn: "Tessel", note: "Long-running WebSocket sync service hosting" },
      ],
    },
  ],

  // Engineering depth: concrete, no buzzwords, drawn from case studies
  engineeringPillars: [
    {
      title: "Real-time & sync",
      summary: "CRDT-driven collaborative states via Yjs and custom WebSockets that guarantee eventual consistency without central lock contention.",
      project: "Tessel",
    },
    {
      title: "Auth & security",
      summary: "Scrypt and JWT auth architectures with rotating refresh tokens, HMAC-signed session envelopes, and zero-trust honeypot spam defenses.",
      project: "Tessel & NOOK",
    },
    {
      title: "Testing & CI",
      summary: "Automated Playwright end-to-end suites validated on both 390px iPhone and desktop viewports, with strict type-checking gates before deploy.",
      project: "Tessel",
    },
    {
      title: "Performance & $0 infra",
      summary: "Monorepos and static-first architectures paired with edge delivery (Vercel, Render, Supabase, Cloudinary) running on $0 recurring overhead.",
      project: "NOOK & Tessel",
    },
  ],

  about: {
    bio: [
      "I am a Lagos-based full-stack developer who builds products that hold up in production. I engineer software with a phone-first mindset because the majority of real users interact with the web through mobile viewports first.",
      "My core lies in the MERN stack—MongoDB, Express, React, and Node.js—reinforced with Next.js and PostgreSQL when structured relational guarantees are needed.",
      "I ship products end-to-end: from initial database schema and API design to automated CI testing pipelines and production edge deployment.",
    ],
    currently: [
      { label: "Building", value: "Real-time collaborative canvas tooling & shortlet booking engines" },
      { label: "Learning", value: "Advanced local-first CRDT topology & distributed sync protocols" },
      { label: "Open to", value: "Remote full-stack roles, contract engineering & freelance builds" },
    ],
  },

  // Free Gemini AI assistant configuration and grounding
  aiAssistant: {
    name: "Ask Musty's portfolio",
    badge: "AI assistant, answers from this site only",
    emptyGreeting: "Ask anything about Musty's work, tech stack, or availability. Responses are grounded strictly in this site.",
    suggestedQuestions: [
      {
        chip: "What is the hardest thing he built?",
        question: "What is the hardest thing Musty built?",
        precomputedAnswer: "The hardest technical challenge was Tessel's real-time sync: guaranteeing conflict-free document convergence during network drops with Yjs CRDTs over WebSockets, while keeping gesture rendering smooth on mobile viewports. On NOOK, it was idempotent booking enquiries and HMAC-signed admin auth.",
      },
      {
        chip: "Does he know Postgres & Supabase?",
        question: "Does Mustapha know PostgreSQL and Supabase?",
        precomputedAnswer: "Yes. While MERN (MongoDB, Express, React, Node) is his core daily stack, he ships with PostgreSQL, Supabase, and Prisma when relational guarantees are required—as seen in NOOK (Lagos hospitality directory with Prisma 7 + Supabase) and Hostvale (shortlet operations app).",
      },
      {
        chip: "Is he open to freelance or remote work?",
        question: "Is Musty open to remote full-time roles or freelance contracts?",
        precomputedAnswer: "Yes. Mustapha is based in Lagos, Nigeria (WAT / UTC+1) and is actively open to remote full-stack roles, contract engineering, and freelance projects. You can reach him at mustyflowcrm@gmail.com or via WhatsApp at +234 906 532 3916.",
      },
      {
        chip: "How does Tessel handle offline work?",
        question: "How does Tessel work when offline?",
        precomputedAnswer: "Tessel uses y-indexeddb to persist board CRDT states locally in browser IndexedDB. Users can continue manipulating shapes and notes offline. Once connectivity returns, local deltas automatically merge with remote changes via the WebSocket sync server without conflicts.",
      },
      {
        chip: "What testing and CI does he use?",
        question: "What are Musty's testing and CI practices?",
        precomputedAnswer: "Musty uses Playwright for automated end-to-end testing, configured to run across both desktop and 390px iPhone mobile viewports. His GitHub Actions CI pipelines enforce strict TypeScript type-checking, unit tests, and build verification before deploying.",
      },
    ],
  },
} as const;
