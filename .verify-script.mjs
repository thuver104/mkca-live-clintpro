import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3000";
const outDir = "C:\\Users\\thuve\\Desktop\\Work\\Senzura\\MKCA\\mkca-offi\\.verify-shots";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(`[console] ${msg.text()}`);
});
page.on("pageerror", (err) => consoleErrors.push(`[pageerror] ${err.message}`));

const report = [];

async function shot(name) {
  await page.screenshot({ path: `${outDir}\\${name}.png`, fullPage: false });
}

// --- Home page ---
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Sharpen");
await shot("01-home");
report.push("Home page loaded, hero visible");

// Academy status message resolves past "Loading..."
await page.waitForFunction(() => !document.body.innerText.includes("Loading..."), { timeout: 5000 }).catch(() => report.push("WARN: AcademyStatus still shows Loading..."));

// Click an events gallery image to open the lightbox
const galleryImg = page.locator("#events img").first();
await galleryImg.click();
await page.waitForSelector('button[aria-label="Close Modal"]', { timeout: 5000 });
await shot("02-home-image-modal");
report.push("Home image lightbox opened on gallery click");
await page.click('button[aria-label="Close Modal"]');

// Mobile menu (resize to mobile viewport)
await page.setViewportSize({ width: 390, height: 844 });
await page.click('button[aria-label="Toggle menu"]');
await page.waitForTimeout(600);
await shot("03-home-mobile-menu");
const mobileMenuVisible = await page.locator("text=Blog & News, text=Blog").first().isVisible().catch(() => false);
report.push(`Mobile menu opened (visible check: ${mobileMenuVisible})`);
await page.setViewportSize({ width: 1280, height: 900 });

// --- Tournaments page ---
await page.goto(`${BASE}/tournaments`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Match Starts In");
await page.waitForTimeout(1500);
const countdownText = await page.locator("text=Match Starts In").locator("..").locator("..").innerText();
report.push(`Tournaments countdown block text snippet: ${countdownText.slice(0, 200).replace(/\n/g, " | ")}`);
await shot("04-tournaments");

// --- Rated Players page ---
await page.goto(`${BASE}/rated-players`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Dishanthan V.");
await shot("05-rated-players");
report.push("Rated players page loaded, player cards visible");

// --- Blog page ---
await page.goto(`${BASE}/blog`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Magical Knight");
await shot("06-blog");

// Tab switcher: click English Details tab
await page.click('text=English Details');
await page.waitForTimeout(300);
const englishVisible = await page.locator("text=A grand provincial-level chess tournament").isVisible().catch(() => false);
report.push(`Blog tab switcher: English tab content visible = ${englishVisible}`);
await shot("07-blog-english-tab");

// More Photos toggle + media modal
await page.click('text=More Photos');
await page.waitForTimeout(300);
const galleryVisible = await page.locator("text=Event Gallery").isVisible().catch(() => false);
report.push(`Blog "More Photos" gallery toggle visible = ${galleryVisible}`);
await shot("08-blog-gallery-open");

if (galleryVisible) {
  await page.locator('img[alt="Gallery"]').first().click();
  await page.waitForTimeout(400);
  const modalVisible = await page.locator('img[alt="Modal Media"]').isVisible().catch(() => false);
  report.push(`Blog media modal (image) opened = ${modalVisible}`);
  await shot("09-blog-media-modal");
}

await browser.close();

report.push(`Console/page errors captured: ${consoleErrors.length}`);
fs.writeFileSync(
  `${outDir}\\report.txt`,
  report.join("\n") + "\n\n--- ERRORS ---\n" + consoleErrors.join("\n")
);
console.log(report.join("\n"));
console.log("\n--- ERRORS ---");
console.log(consoleErrors.join("\n") || "(none)");
