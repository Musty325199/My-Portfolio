import { chromium } from "playwright";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("public/assets");

async function waitPageReady(page) {
  await page.waitForLoadState("networkidle");
  // Wait for fonts to be loaded
  await page.evaluate(() => document.fonts.ready);
  // Dismiss any common cookie banners or overlays if found
  await page.evaluate(() => {
    const selectors = [
      'button[aria-label*="cookie" i]',
      'button[class*="cookie" i]',
      '#cookie-banner button',
      '.cookie-consent button',
    ];
    for (const s of selectors) {
      const el = document.querySelector(s);
      if (el) el.click();
    }
  });
  // Extra pause for any CSS animations/image decodes to settle
  await page.waitForTimeout(1500);
}

async function captureAndSave(page, destPath, options = {}) {
  const { scrollY = 0 } = options;

  if (scrollY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(800);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
  }

  // Capture viewport screenshot at 1440x900
  const pngBuffer = await page.screenshot({
    type: "png",
    fullPage: false, // captures the exact 1440x900 viewport
  });

  // Convert to JPG quality 82 and ensure under 300KB
  let quality = 82;
  let jpgBuffer = await sharp(pngBuffer)
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  while (jpgBuffer.length > 300 * 1024 && quality > 65) {
    quality -= 3;
    jpgBuffer = await sharp(pngBuffer)
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
  }

  const finalDir = path.dirname(destPath);
  if (!fs.existsSync(finalDir)) {
    fs.mkdirSync(finalDir, { recursive: true });
  }

  fs.writeFileSync(destPath, jpgBuffer);
  const stats = fs.statSync(destPath);
  console.log(`Saved: ${destPath} (${Math.round(stats.size / 1024)} KB, quality ${quality})`);

  // Verify not blank
  const metadata = await sharp(jpgBuffer).metadata();
  console.log(`Verified metadata: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);
}

async function run() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  console.log("=== 1. CAPTURING NOOK ===");
  // NOOK screen-1: Home page (top of page)
  console.log("Capturing NOOK Home...");
  await page.goto("https://nook-lagos.vercel.app", { waitUntil: "networkidle" });
  await waitPageReady(page);
  await captureAndSave(page, path.join(OUT_DIR, "nook/screen-1.jpg"), { scrollY: 0 });

  // NOOK screen-2: Stay detail page with photo gallery visible
  console.log("Capturing NOOK Stay detail gallery...");
  await page.goto("https://nook-lagos.vercel.app/stays/half-light", { waitUntil: "networkidle" });
  await waitPageReady(page);
  // On half-light, the gallery starts below the hero title (scroll ~450px so the multi-photo grid is beautifully visible)
  await captureAndSave(page, path.join(OUT_DIR, "nook/screen-2.jpg"), { scrollY: 480 });

  console.log("\n=== 2. CAPTURING STOCKFLOW ===");
  // StockFlow screen-1: Landing page (top of page)
  console.log("Capturing StockFlow Landing...");
  await page.goto("https://stockflowhq.com", { waitUntil: "networkidle" });
  await waitPageReady(page);
  await captureAndSave(page, path.join(OUT_DIR, "stockflow/screen-1.jpg"), { scrollY: 0 });

  // StockFlow screen-2: Features & How it Works section
  console.log("Capturing StockFlow Features...");
  // Section 1 & 2 start around ~600px scroll
  await captureAndSave(page, path.join(OUT_DIR, "stockflow/screen-2.jpg"), { scrollY: 620 });

  // StockFlow screen-3: Pricing page
  console.log("Capturing StockFlow Pricing...");
  await page.goto("https://stockflowhq.com/pricing", { waitUntil: "networkidle" });
  await waitPageReady(page);
  await captureAndSave(page, path.join(OUT_DIR, "stockflow/screen-3.jpg"), { scrollY: 0 });

  console.log("\n=== 3. CHECKING HOSTVALE ===");
  try {
    const res = await page.goto("https://hostvale.app", { timeout: 10000 });
    console.log("Hostvale status:", res.status());
    // if reachable, capture:
    await waitPageReady(page);
    await captureAndSave(page, path.join(OUT_DIR, "hostvale/screen-1.jpg"), { scrollY: 0 });
  } catch (e) {
    console.log("Hostvale unreachable (as expected for private pilot):", e.message);
  }

  await browser.close();
  console.log("\n=== ALL CAPTURES COMPLETE ===");
}

run().catch((err) => {
  console.error("Capture process error:", err);
  process.exit(1);
});
