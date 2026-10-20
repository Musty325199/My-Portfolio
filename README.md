# Mustapha Lawal — Developer Portfolio

> Personal portfolio and engineering showcase built with an "engineering notebook meets luxury magazine" aesthetic.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](LICENSE)

---

## Overview

A high-performance portfolio engineered for real-time systems, editorial typography, and mobile-first responsiveness. Designed around a warm near-black aesthetic (`#0E0D0B`), paper white typography (`#F2EEE6`), and restrained signal amber accents (`#FF6A2B`).

- **Live URL:** [musty-dev.vercel.app](https://musty-dev.vercel.app)
- **Positioning:** *"I build real-time products that hold up in production."*
- **Role:** Full-Stack Developer (MERN / Next.js) based in Lagos, Nigeria.

---

## Architecture & Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, Static Generation)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4 + Custom Design Tokens
- **Animations:** Motion + GSAP ScrollTrigger + Lenis smooth scroll
- **AI Integration:** Google Gemini API with fallback endpoints and strict factual grounding
- **SEO & Metadata:**
  - Automated dynamic 1200x630 OpenGraph generation via `next/og`
  - Automated XML sitemap & robots.txt with disallow guards
  - Schema.org JSON-LD structured data (`Person`, `WebSite`, `ProfilePage`, `SoftwareApplication`)
  - Semantic HTML with accessible landmarks and single H1 hierarchy
- **Performance:**
  - Lighthouse SEO: **100/100**
  - Lighthouse Performance: **97/100**
  - Lighthouse Accessibility: **96/100**
  - Lighthouse Best Practices: **100/100**

---

## Featured Work

1. **Tessel:** Real-time collaborative canvas with WebSocket sync powered by Yjs CRDTs, offline-first IndexedDB persistence, and Gemini AI canvas organization.
2. **StockFlow:** Retail operating system and POS engine with offline sales queuing, optimistic updates, and barcode scanning.
3. **NOOK Lagos:** Hospitality booking engine and guide for short-term stays, featuring idempotent booking workflows and real-time host calendars.
4. **Hostvale:** Multi-property hospitality operations platform handling caution fee workflows and unified calendar sync.

---

## Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm 9+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Musty325199/My-Portfolio.git
   cd My-Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

---

## License

MIT © [Mustapha Lawal](https://github.com/Musty325199)
