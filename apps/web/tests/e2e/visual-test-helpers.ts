import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const screenshotTimeout = 15_000;

export async function settleMotionForVisualCapture(page: Page): Promise<void> {
  await page.addInitScript(() => {
    document.documentElement.dataset.motion = "settled";
  });
}

export async function expectOrvauxeFonts(page: Page): Promise<void> {
  await page.evaluate(async () => document.fonts.ready);

  const fontState = await page.evaluate(() => {
    const bodyStyles = getComputedStyle(document.body);
    const displayElement = document.querySelector<HTMLElement>(".orvauxe-heading");

    return {
      displayFamily: displayElement ? getComputedStyle(displayElement).fontFamily : "",
      displayToken: bodyStyles.getPropertyValue("--orvauxe-font-display").trim(),
      displayVariable: bodyStyles.getPropertyValue("--font-orvauxe-display").trim(),
      interfaceFamily: bodyStyles.fontFamily,
      interfaceToken: bodyStyles.getPropertyValue("--orvauxe-font-interface").trim(),
      interfaceVariable: bodyStyles.getPropertyValue("--font-orvauxe-interface").trim(),
      status: document.fonts.status,
    };
  });

  expect(fontState.status).toBe("loaded");
  expect(fontState.displayVariable).not.toBe("");
  expect(fontState.interfaceVariable).not.toBe("");
  expect(fontState.displayFamily).toBe(fontState.displayToken);
  expect(fontState.interfaceFamily).toBe(fontState.interfaceToken);
}

export const visualScreenshotOptions = {
  animations: "disabled",
  caret: "hide",
  maxDiffPixelRatio: 0.02,
  threshold: 0.25,
  timeout: screenshotTimeout,
} as const;
