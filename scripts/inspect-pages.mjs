import { chromium } from "playwright";

async function explore() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log("=== EXPLORING NOOK ===");
  await page.goto("https://nook-lagos.vercel.app", { waitUntil: "networkidle" });
  const nookLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a[href]")).map((a) => ({
      text: a.innerText.trim(),
      href: a.href,
    }));
  });
  console.log("NOOK links found:", nookLinks);

  console.log("\n=== EXPLORING STOCKFLOW ===");
  await page.goto("https://stockflowhq.com", { waitUntil: "networkidle" });
  const stockflowLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a[href]")).map((a) => ({
      text: a.innerText.trim(),
      href: a.href,
    }));
  });
  console.log("StockFlow links found:", stockflowLinks);

  await browser.close();
}

explore().catch(console.error);
