import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const sanityMocks = vi.hoisted(() => ({
  CMSReadError: class CMSReadError extends Error {
    readonly code = "CMS_READ_FAILED";
  },
  sanityFetch: vi.fn(),
}));

vi.mock("@/infrastructure/sanity/client.server", () => sanityMocks);

import { CMSReadError } from "@/infrastructure/sanity/client.server";

import { loadHomePage } from "./get-home-page";

const sanityFetch = sanityMocks.sanityFetch;

describe("getHomePage", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    sanityFetch.mockReset();
  });

  it("uses the deterministic fallback when public Sanity configuration is unavailable", async () => {
    await expect(loadHomePage()).resolves.toMatchObject({ contentSource: "fallback" });
    expect(sanityFetch).not.toHaveBeenCalled();
  });

  it("uses the deterministic fallback in guarded E2E stub mode", async () => {
    vi.stubEnv("ORVAUXE_E2E_MODE", "stub");
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "configured");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

    await expect(loadHomePage()).resolves.toMatchObject({ contentSource: "fallback" });
    expect(sanityFetch).not.toHaveBeenCalled();
  });

  it("fails safely instead of substituting fallback copy for an incomplete CMS singleton", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "configured");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
    sanityFetch.mockResolvedValue(null);

    await expect(loadHomePage()).rejects.toBeInstanceOf(CMSReadError);
  });

  it("propagates CMS read failures when Sanity is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "configured");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
    const failure = new CMSReadError("Sanity content could not be read.");
    sanityFetch.mockRejectedValue(failure);

    await expect(loadHomePage()).rejects.toBe(failure);
  });
});
