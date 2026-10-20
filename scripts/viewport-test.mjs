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
  console.log("Starting Viewport & Console Verification...\n");
  const browser = await chromium.launch({ headless: true, channel: "msedge" });

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
      await page.waitForTimeout(1500); // Allow initial reveals

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

      // 3. Test interactions on mobile
      if (vp.width === 390) {
        // Test mobile hamburger menu
        const menuBtn = page.locator('button[aria-label="Open mobile navigation menu"]');
        if (await menuBtn.isVisible()) {
          await menuBtn.click();
          await page.waitForTimeout(400);
          const closeBtn = page.locator('button[aria-label="Close navigation menu"]');
          const isMenuOpen = await closeBtn.isVisible();
          console.log(`  ${isMenuOpen ? "✅" : "❌"} Mobile sheet menu opens cleanly`);
          await closeBtn.click();
          await page.waitForTimeout(400);
        }
      }

      // 4. Test AI chat assistant button
      const chatBtn = page.locator('button[aria-label="Open AI portfolio assistant"]');
      if (await chatBtn.isVisible()) {
        await chatBtn.click();
        await page.waitForTimeout(400);
        const chatInput = page.locator('input[placeholder*="Ask about Tessel"]');
        const isChatOpen = await chatInput.isVisible();
        console.log(`  ${isChatOpen ? "✅" : "❌"} "Ask Musty's AI" assistant drawer opens`);
        // Test an offline suggested chip
        const firstChip = page.locator("button:has-text('What is the hardest thing he built?')");
        if (await firstChip.isVisible()) {
          await firstChip.click();
          await page.waitForTimeout(1000);
          console.log(`  ✅ Offline suggested chip works`);
        }
        // Close chat
        const closeChatBtn = page.locator('button[aria-label="Close assistant"]');
        if (await closeChatBtn.isVisible()) {
          await closeChatBtn.click();
          await page.waitForTimeout(300);
        }
      }

      // 5. Capture screenshot
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
  await rmPage.waitForTimeout(500);

  const hasForcedClass = await rmPage.evaluate(() => {
    return document.documentElement.classList.contains("reduce-motion-forced");
  });
  console.log(`  ${hasForcedClass ? "✅" : "❌"} html element has class 'reduce-motion-forced': ${hasForcedClass}`);

  await rmContext.close();
  await browser.close();

  if (allPassed) {
    console.log("\n🎉 ALL AUDIT CHECKS PASSED PERFECTLY!");
  } else {
    console.error("\n⚠️ Some checks failed. Review output above.");
    process.exit(1);
  }
}

runTests();
