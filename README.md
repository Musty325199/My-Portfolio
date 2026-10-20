# Mustapha Lawal (Musty) — Developer Portfolio

A high-performance, editorial dark developer portfolio engineered with an "engineering notebook meets luxury magazine" aesthetic. Built strictly to the design specification and addendum.

- **Positioning:** *"I build real-time products that hold up in production."*
- **Stack:** Next.js 15 (App Router, static-first) + TypeScript strict + Tailwind CSS v4 + Motion + GSAP ScrollTrigger + Lenis.
- **Audience:** Hiring managers and engineers skimming on an iPhone, reading deeper on desktop.

---

## Key Features & Implementations

1. **iPhone-First Architecture:**
   - Strict `100svh`/`100dvh` usage (no iOS Safari dynamic toolbar jumps).
   - Zero horizontal overflow across 390px, 768px, and 1440px viewports.
   - Tap targets 44px+ throughout.
2. **Editorial Dark Aesthetic:**
   - Background: `#0E0D0B` (warm near-black).
   - Text: `#F2EEE6` (paper white) and `#A39E92` (muted sand).
   - Accent: `#FF6A2B` (signal amber/orange), applied with restraint.
   - Hairline 1px borders (`rgba(242, 238, 230, 0.12)`) replacing boxed card containers.
3. **Motion System:**
   - 3 durations (180ms, 420ms, 900ms), 2 easings (`power3.out`, `expo.inOut`), 60ms stagger.
   - Respects `prefers-reduced-motion` and testable via `?reduce=1` URL query parameter.
   - Lenis smooth scroll synchronized directly to GSAP's Ticker.
4. **Complete SEO Suite:**
   - Single semantic H1: "Mustapha Lawal" with role in the same hero block.
   - Dynamic 1200x630 Open Graph card via `next/og` (`/opengraph-image`).
   - Per-project dedicated URLs (`/work/tessel`, `/work/stockflow`, `/work/nook`, `/work/hostvale`) with individual metadata and dynamic OG images.
   - Consolidated JSON-LD structured data (`Person`, `WebSite`, `ProfilePage`, `SoftwareApplication`).
   - Automatically generated `/sitemap.xml` and `/robots.txt` (disallowing `/api/*`).
   - Web App Manifest (`/manifest.webmanifest`) and `apple-touch-icon.png`.
5. **Tessel Centerpiece Case Study:**
   - Sticky pinned desktop chapter presentation with mobile-safe fallback via `matchMedia`.
   - SVG Architecture diagram with animated packet dots and line-drawing on scroll.
   - Optimised video conversion: `demo.gif` converted to WebM (134 KB) and MP4 (300 KB) with lazy-loading and poster fallback.
6. **Free AI Assistant ("Ask Musty's portfolio"):**
   - Free Google Gemini REST integration with model fallback (`gemini-2.0-flash-lite` → `gemini-2.0-flash`).
   - Strict grounding: only answers from `src/data/content.ts` (under 80 words, no hallucinations, refuses prompt extraction).
   - Rate limiting: 8 requests / 10 minutes per IP with input sanitization.
   - Offline-capable: 5 precomputed suggestion chips operate with zero API calls.
7. **$0 Infrastructure & Security:**
   - 100% static-prerendered pages with dynamic API routes.
   - HTTP Security headers (`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
   - Resend contact route with honeypot bot defense and graceful `mailto:` fallback.

---

## How to Run Locally

### 1. Prerequisites
- Node.js 18.18+ or 20+ (tested on Node v22)
- npm 9+

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your environment keys:
```env
NEXT_PUBLIC_SITE_URL=https://musty-portfolio.vercel.app
GEMINI_API_KEY=your_gemini_api_key_here
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Test
```bash
npm run build
npm start
```

### 6. Run Viewport & Accessibility Verification
To run the automated Playwright viewport suite across 390px, 768px, and 1440px:
```bash
node scripts/viewport-test.mjs
```

---

## How to Deploy to Vercel (Free Tier)

This portfolio is tailored specifically for Vercel's free tier with zero recurring costs ($0/month).

### Option A: Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete developer portfolio with full SEO"
   git remote add origin https://github.com/Musty325199/portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **Add New...** > **Project** and select your repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SITE_URL`: `https://musty-portfolio.vercel.app` (or your custom domain)
   - `GEMINI_API_KEY`: *(Free)* Get one from [aistudio.google.com](https://aistudio.google.com/app/apikey)
   - `RESEND_API_KEY`: *(Optional)* From [resend.com](https://resend.com)
5. Click **Deploy**. Vercel will build the static pages and deploy edge route handlers in under 60 seconds.

---

## Google Setup (Post-Deployment Steps)

Follow these exact steps immediately after deploying your site to Vercel:

### 1. Verify Site Ownership in Google Search Console
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Choose **URL prefix** and enter your live URL:
   ```
   https://musty-portfolio.vercel.app
   ```
3. Choose the **HTML tag** verification method. Copy the verification meta tag value.
4. Add the verification code to `src/app/layout.tsx` under `metadata.verification.google` or deploy via DNS if using a custom domain.

### 2. Submit Your XML Sitemap
1. In Google Search Console, go to **Index** > **Sitemaps** on the left sidebar.
2. Enter the sitemap path:
   ```
   sitemap.xml
   ```
   Full URL: `https://musty-portfolio.vercel.app/sitemap.xml`
3. Click **Submit**. Google will read the home page and all project URLs:
   - `https://musty-portfolio.vercel.app/`
   - `https://musty-portfolio.vercel.app/work/tessel`
   - `https://musty-portfolio.vercel.app/work/stockflow`
   - `https://musty-portfolio.vercel.app/work/nook`
   - `https://musty-portfolio.vercel.app/work/hostvale`

### 3. Verify Robots.txt
Open `https://musty-portfolio.vercel.app/robots.txt` in your browser. Verify it displays:
```txt
User-Agent: *
Allow: /
Disallow: /api/*

Sitemap: https://musty-portfolio.vercel.app/sitemap.xml
```

### 4. Test Rich Results (Structured Data Validation)
1. Open the [Google Rich Results Test](https://search.google.com/test/rich-results).
2. Enter `https://musty-portfolio.vercel.app`.
3. Confirm that the following schemas are recognized without errors:
   - **Person** (`Mustapha Lawal`)
   - **ProfilePage**
   - **WebSite**
   - **SoftwareApplication** (`Tessel`, `StockFlow`, `NOOK`, `Hostvale`)

### 5. Request Immediate Indexing
1. In the top URL Inspection bar in Search Console, paste:
   ```
   https://musty-portfolio.vercel.app
   ```
2. Click **Test Live URL**, then click **Request Indexing**.
3. Repeat for your flagship case study:
   ```
   https://musty-portfolio.vercel.app/work/tessel
   ```

---

## Checklist of Remaining TODOs

All content and links are centralized in [src/data/content.ts](file:///c:/Projects/My_Portfolio/src/data/content.ts).

### 1. Links & Project Status
- [x] **LinkedIn Profile:** Configured to `https://www.linkedin.com/in/mustapha-lawal-74b62523b`.
- [ ] **Hostvale Live URL:** When Hostvale goes live, update `TODO_LINKS.HOSTVALE_URL` in [src/data/content.ts](file:///c:/Projects/My_Portfolio/src/data/content.ts).
- [ ] **StockFlow Production Stack:** Confirm full tech stack with owner and update the tags in [src/data/content.ts](file:///c:/Projects/My_Portfolio/src/data/content.ts).

### 2. Screenshots to Capture & Replace
All images below currently have clean 16:10 dark blueprint placeholder files in place. Capture real full-resolution screenshots from the live apps and replace these exact filenames (keeping aspect ratio 16:10, e.g., 1280x800 or 1920x1200):

- [ ] **StockFlow:**
  - `public/assets/stockflow/screen-1.jpg` — Main overview: product catalogue, stock levels, and POS quick-action panel (capture from [stockflowhq.com](https://stockflowhq.com)).
  - `public/assets/stockflow/screen-2.jpg` — Pay-later credit sales ledger: customer debt tracking, payment installments, and balances.
  - `public/assets/stockflow/screen-3.jpg` — POS checkout flow: item barcode/name search and instant receipt creation.
- [ ] **NOOK Lagos:**
  - `public/assets/nook/screen-1.jpg` — Public guide: curated stays, neighborhood filter, and experience booking (capture from [nook-lagos.vercel.app](https://nook-lagos.vercel.app)).
  - `public/assets/nook/screen-2.jpg` — Admin dashboard: reservation workflow, availability calendar, and notification logs.
- [ ] **Hostvale:**
  - `public/assets/hostvale/screen-1.jpg` — Operations portal: caution fee logs, guest identity validation, and check-in rosters.
  - `public/assets/hostvale/screen-2.jpg` — Host mini-website storefront: direct booking portal and apartment photo gallery.
