import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.ORVAUXE_REVIEW_BASE_URL ?? "http://127.0.0.1:3000";
const artifactRoot = process.env.ORVAUXE_REVIEW_OUTPUT
  ? path.resolve(process.env.ORVAUXE_REVIEW_OUTPUT)
  : path.resolve(process.cwd(), "../../output/playwright/final-motion");
const recordingDirectory = path.join(artifactRoot, "recordings");
const screenshotDirectory = path.join(artifactRoot, "screenshots");

await mkdir(recordingDirectory, { recursive: true });
await mkdir(screenshotDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function scrollWalkthrough(page, steps, pause, behavior = "smooth") {
  const maximumScroll = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );

  for (let step = 1; step <= steps; step += 1) {
    await page.evaluate(({ behavior, top }) => window.scrollTo({ behavior, top }), {
      behavior,
      top: Math.round((maximumScroll * step) / steps),
    });
    await page.waitForTimeout(pause);
  }
}

async function capture({ name, pathname, viewport, reducedMotion = "no-preference", review }) {
  const context = await browser.newContext({
    colorScheme: "light",
    hasTouch: viewport.width < 600,
    recordVideo: { dir: recordingDirectory, size: viewport },
    reducedMotion,
    viewport,
  });
  const page = await context.newPage();
  const video = page.video();

  await page.goto(new URL(pathname, baseUrl).toString(), { waitUntil: "networkidle" });
  await page.waitForTimeout(reducedMotion === "reduce" ? 150 : 1_000);
  await page.screenshot({
    animations: "disabled",
    path: path.join(screenshotDirectory, `${name}.png`),
  });
  await review(page);
  await page.waitForTimeout(500);
  await page.close();
  await context.close();

  if (!video) throw new Error(`Video was not created for ${name}.`);
  await video.saveAs(path.join(recordingDirectory, `${name}.webm`));
  await video.delete();
}

const desktop = { height: 900, width: 1440 };
const mobile = { height: 812, width: 375 };

try {
  await capture({
    name: "home-desktop-1440",
    pathname: "/",
    review: async (page) => {
      const next = page.getByRole("button", { name: "Next campaign state" });
      await next.click();
      await page.waitForTimeout(800);
      await page.getByRole("link", { name: /Atelier.*Bespoke commerce/ }).hover();
      await page.waitForTimeout(500);
      await page.mouse.move(1400, 880);
      await page.waitForTimeout(500);
      await scrollWalkthrough(page, 12, 650);
    },
    viewport: desktop,
  });

  await capture({
    name: "home-mobile-375",
    pathname: "/",
    review: async (page) => {
      await page.getByRole("button", { name: "Next campaign state" }).tap();
      await page.waitForTimeout(700);
      await page.getByRole("button", { name: "Open navigation" }).tap();
      await page.waitForTimeout(450);
      await page.getByRole("button", { name: "Close navigation" }).last().tap();
      await page.waitForTimeout(350);
      await scrollWalkthrough(page, 10, 500);
    },
    viewport: mobile,
  });

  for (const pageReview of [
    { name: "nocturne-desktop-1440", pathname: "/editions/nocturne", steps: 8 },
    { name: "atelier-desktop-1440", pathname: "/atelier", steps: 6 },
    { name: "studio-desktop-1440", pathname: "/studio", steps: 6 },
  ]) {
    await capture({
      ...pageReview,
      review: (page) => scrollWalkthrough(page, pageReview.steps, 650),
      viewport: desktop,
    });
  }

  await capture({
    name: "start-project-1440",
    pathname: "/start-a-project",
    review: async (page) => {
      const verification = page.getByRole("button", { name: "Verify & continue" });
      await verification.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await verification.click();
      await page.waitForTimeout(800);
    },
    viewport: desktop,
  });

  await capture({
    name: "home-reduced-motion-1440",
    pathname: "/",
    reducedMotion: "reduce",
    review: async (page) => {
      await page.getByRole("button", { name: "Next campaign state" }).click();
      await page.waitForTimeout(300);
      await scrollWalkthrough(page, 8, 400, "instant");
    },
    viewport: desktop,
  });
} finally {
  await browser.close();
}

console.warn(`Motion review artifacts: ${artifactRoot}`);
