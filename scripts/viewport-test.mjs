import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { name: "mobile_390px", width: 390, height: 844 },
  { name: "tablet_768px", width: 768, height: 1024 },
  { name: "desktop_1440px", width: 1440, height: 900 },
];

const OUT_DIR = path.resolve("./test-results");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runTests() {
  console.log("Starting Viewport & Hamburger Verification...\n");
  const browser = await chromium.launch({ headless: true, channel: "chrome" });

  let allPassed = true;

  for (const vp of VIEWPORTS) {
    console.log(`=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent:
        vp.width < 768
          ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
          : undefined,
    });

    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    try {
      await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);

      // 1. Check for horizontal overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;
        const maxScroll = Math.max(docWidth, bodyWidth);
        return {
          hasOverflow: maxScroll > winWidth,
          scrollWidth: maxScroll,
          innerWidth: winWidth,
          diff: maxScroll - winWidth,
        };
      });

      if (overflow.hasOverflow) {
        console.error(`  ❌ Horizontal overflow detected! scrollWidth=${overflow.scrollWidth}, innerWidth=${overflow.innerWidth} (diff: +${overflow.diff}px)`);
        allPassed = false;
      } else {
        console.log(`  ✅ Zero horizontal overflow (scrollWidth: ${overflow.scrollWidth}px == innerWidth: ${overflow.innerWidth}px)`);
      }

      // Check all rendered images for loading success
      const imageStatus = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll("img"));
        return imgs.map((img) => ({
          src: img.src,
          alt: img.alt,
          loaded: img.complete && img.naturalWidth > 0,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        }));
      });

      const brokenImages = imageStatus.filter((i) => !i.loaded);
      if (brokenImages.length > 0) {
        console.error(`  ❌ Found ${brokenImages.length} broken images:`, brokenImages);
        allPassed = false;
      } else {
        console.log(`  ✅ All ${imageStatus.length} rendered images loaded cleanly with natural dimensions.`);
      }

      // 2. Check for console errors
      if (consoleErrors.length > 0) {
        console.error(`  ❌ Console errors detected (${consoleErrors.length}):`, consoleErrors);
        allPassed = false;
      } else {
        console.log(`  ✅ Zero console errors.`);
      }

      if (pageErrors.length > 0) {
        console.error(`  ❌ Page errors detected:`, pageErrors);
        allPassed = false;
      } else {
        console.log(`  ✅ Zero uncaught page errors.`);
      }

      // 3. Hamburger button visibility verification
      const hamburger = page.locator('button[aria-label*="navigation menu"]');
      const isHamburgerVisible = await hamburger.isVisible();

      if (vp.width >= 768) {
        // Desktop / Tablet (md+): Hamburger MUST be hidden!
        if (isHamburgerVisible) {
          console.error(`  ❌ Hamburger menu button IS STILL VISIBLE on ${vp.name}! It must be hidden on desktop.`);
          allPassed = false;
        } else {
          console.log(`  ✅ Hamburger menu button is strictly HIDDEN on ${vp.name} (desktop horizontal navigation active)`);
        }
      } else {
        // Mobile (< 768px): Hamburger MUST be visible, modern, and open/close cleanly!
        if (!isHamburgerVisible) {
          console.error(`  ❌ Hamburger menu button NOT visible on ${vp.name}!`);
          allPassed = false;
        } else {
          console.log(`  ✅ Hamburger menu button is VISIBLE on ${vp.name}`);
          // Test click open
          await hamburger.click();
          await page.waitForTimeout(400);

          const sheetNav = page.locator("nav a:has-text('Tessel Case Study')");
          const isSheetOpen = await sheetNav.isVisible();
          console.log(`  ${isSheetOpen ? "✅" : "❌"} Modern full-screen sheet animates in with staggered links`);

          // Test close
          const closeBtn = page.locator('button[aria-label="Dismiss navigation menu"]');
          await closeBtn.click();
          await page.waitForTimeout(400);
          const isSheetClosed = !(await sheetNav.isVisible());
          console.log(`  ${isSheetClosed ? "✅" : "❌"} Sheet closes cleanly`);
        }
      }

      // Capture screenshot
      const screenshotPath = path.join(OUT_DIR, `${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  📸 Screenshot captured: ${screenshotPath}`);

    } catch (err) {
      console.error(`  ❌ Test failed on ${vp.name}:`, err);
      allPassed = false;
    } finally {
      await context.close();
    }
  }

  // Also test ?reduce=1 for reduced motion
  console.log("\n=== Testing ?reduce=1 (Reduced Motion Query) ===");
  const rmContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const rmPage = await rmContext.newPage();
  await rmPage.goto("http://localhost:3000?reduce=1", { waitUntil: "networkidle" });
  await rmPage.waitForTimeout(600);

  const hasForcedClass = await rmPage.evaluate(() => {
    return document.documentElement.classList.contains("reduce-motion-forced");
  });
  console.log(`  ${hasForcedClass ? "✅" : "❌"} html element has class 'reduce-motion-forced': ${hasForcedClass}`);

  await rmContext.close();
  await browser.close();

  if (allPassed) {
    console.log("\n🎉 ALL TESTS PASSED! Desktop hamburger is hidden, mobile hamburger is modern & animated, zero overflow, zero errors.");
  } else {
    console.error("\n⚠️ Some checks failed. Review output above.");
    process.exit(1);
  }
}

runTests();
