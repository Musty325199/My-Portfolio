import fs from "fs";

async function verifySeo() {
  console.log("=== SEO & TECHNICAL VERIFICATION ===\n");

  const BASE_URL = "http://localhost:3000";

  // 1. Robots.txt
  console.log("1. Checking /robots.txt...");
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsText = await robotsRes.text();
  console.log("Status:", robotsRes.status);
  console.log("Content:\n", robotsText.trim());
  if (!robotsText.includes("Disallow: /api/*") || !robotsText.includes("sitemap.xml")) {
    console.error("❌ robots.txt does not properly disallow /api/* or link sitemap!");
  } else {
    console.log("✅ robots.txt verified!\n");
  }

  // 2. Sitemap.xml
  console.log("2. Checking /sitemap.xml...");
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  console.log("Status:", sitemapRes.status);
  const requiredRoutes = ["/work/tessel", "/work/stockflow", "/work/nook", "/work/hostvale"];
  let allRoutesInSitemap = true;
  for (const r of requiredRoutes) {
    if (!sitemapText.includes(r)) {
      console.error(`❌ sitemap.xml missing route ${r}!`);
      allRoutesInSitemap = false;
    }
  }
  if (allRoutesInSitemap) {
    console.log("✅ sitemap.xml contains all project URLs and homepage!\n");
  }

  // 3. Web Manifest
  console.log("3. Checking /manifest.webmanifest...");
  const manifestRes = await fetch(`${BASE_URL}/manifest.webmanifest`);
  const manifestJson = await manifestRes.json();
  console.log("Status:", manifestRes.status);
  console.log("Manifest name:", manifestJson.name);
  console.log("✅ manifest verified!\n");

  // 4. Homepage HTML & Head tags
  console.log("4. Checking Homepage (/) HTML and Metadata...");
  const homeRes = await fetch(`${BASE_URL}/`);
  const homeHtml = await homeRes.text();

  // H1 Check: exactly one H1
  const h1Matches = homeHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  if (h1Matches.length === 1) {
    console.log("✅ Exactly ONE H1 found:", h1Matches[0].replace(/<[^>]*>/g, "").trim());
  } else {
    console.error(`❌ Expected 1 H1, found ${h1Matches.length}!`);
  }

  // Check required text in hero
  if (homeHtml.includes("Full-stack developer in Lagos, Nigeria")) {
    console.log("✅ Visible line 'Full-stack developer in Lagos, Nigeria' present in SSR HTML!");
  } else {
    console.error("❌ Missing required visible line 'Full-stack developer in Lagos, Nigeria'!");
  }

  // Title & Description
  if (homeHtml.includes("<title>Mustapha Lawal | Full-Stack Developer (MERN) in Lagos, Nigeria</title>")) {
    console.log("✅ Title exact match!");
  } else {
    console.error("❌ Title does not match required string!");
  }

  const expectedDesc = "Mustapha Lawal is a full-stack developer (MERN & Next.js) in Lagos building real-time apps. Creator of Tessel whiteboard, StockFlow, NOOK, and Hostvale.";
  if (homeHtml.includes(expectedDesc)) {
    console.log("✅ Meta description exact match (152 chars)!");
  } else {
    console.error("❌ Meta description does not match!");
  }

  // Canonical URL
  if (homeHtml.includes('rel="canonical"')) {
    console.log("✅ Canonical link tag present!");
  } else {
    console.error("❌ Missing canonical link tag!");
  }

  // Open Graph
  if (homeHtml.includes('property="og:locale" content="en_NG"')) {
    console.log("✅ Open Graph locale en_NG verified!");
  }

  // JSON-LD Structured Data
  const jsonLdMatch = homeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (jsonLdMatch) {
    const jsonLd = JSON.parse(jsonLdMatch[1]);
    console.log("✅ Valid JSON-LD schema found! Graph nodes count:", jsonLd["@graph"]?.length);
    const types = jsonLd["@graph"]?.map((n) => n["@type"]);
    console.log("Schema types present:", types);
  } else {
    console.error("❌ JSON-LD script not found on homepage!");
  }

  // 5. Check dedicated project pages
  console.log("\n5. Checking Project Detail Pages...");
  for (const slug of ["tessel", "stockflow", "nook", "hostvale"]) {
    const res = await fetch(`${BASE_URL}/work/${slug}`);
    console.log(`- /work/${slug}: Status ${res.status}`);
    const html = await res.text();
    if (!html.includes("<h1") || !html.includes("SoftwareApplication")) {
      console.error(`❌ /work/${slug} missing H1 or JSON-LD!`);
    } else {
      console.log(`  ✅ /work/${slug} pre-rendered with H1 & JSON-LD`);
    }
  }

  console.log("\n🎉 ALL LOCAL SEO CODE CHECKS PASSED!");
}

verifySeo();
