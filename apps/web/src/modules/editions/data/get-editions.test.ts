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

import { createEditionRecord } from "./__fixtures__/edition-record";
import { nocturneEditionFallback } from "./edition.fallback";
import { loadEdition } from "./get-edition";
import { getEditionSlugs, loadEditions } from "./get-editions";

const sanityFetch = sanityMocks.sanityFetch;

function configureSanity() {
  vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "configured");
  vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
}

function configureE2eStub() {
  vi.stubEnv("ORVAUXE_E2E_MODE", "stub");
  vi.stubEnv("NODE_ENV", "test");
}

describe("Edition loaders", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    sanityFetch.mockReset();
  });

  it("uses Nocturne as the deterministic public fallback when Sanity is unconfigured", async () => {
    await expect(loadEditions()).resolves.toEqual([nocturneEditionFallback]);
    await expect(loadEdition("nocturne")).resolves.toBe(nocturneEditionFallback);
    await expect(loadEdition("unknown")).resolves.toBeNull();
    await expect(getEditionSlugs()).resolves.toEqual(["nocturne"]);
    expect(sanityFetch).not.toHaveBeenCalled();
  });

  it("keeps Nocturne on the E2E index and the legacy direct fixture route available", async () => {
    configureE2eStub();

    await expect(loadEditions()).resolves.toEqual([nocturneEditionFallback]);
    await expect(loadEdition("nocturne")).resolves.toBe(nocturneEditionFallback);
    await expect(loadEdition("e2e-edition")).resolves.toMatchObject({ slug: "e2e-edition" });
    await expect(getEditionSlugs()).resolves.toEqual(["nocturne"]);
    expect(sanityFetch).not.toHaveBeenCalled();
  });

  it("maps the configured published Nocturne record", async () => {
    configureSanity();
    sanityFetch.mockResolvedValueOnce(createEditionRecord());

    await expect(loadEdition("nocturne")).resolves.toMatchObject({
      slug: "nocturne",
      statusLabel: "Concept Edition",
      seo: { noIndex: false },
    });
  });

  it("excludes noindex Editions from configured sitemap slugs", async () => {
    configureSanity();
    const privateEdition = createEditionRecord({
      id: "edition-002-private",
      name: "Private Edition",
      slug: "private-edition",
      editionNumber: 2,
      category: "Design study",
      cta: {
        label: "Start a Project",
        destinationKind: "internalPath",
        destination: "/start-a-project?edition=private-edition",
      },
      seo: {
        metaTitle: "Private Edition | ORVAUXE",
        metaDescription: "A non-indexable Edition fixture.",
        shareImage: null,
        noIndex: true,
      },
    });
    sanityFetch.mockResolvedValueOnce([createEditionRecord(), privateEdition]);

    await expect(getEditionSlugs()).resolves.toEqual(["nocturne"]);
  });

  it("fails explicitly when configured Nocturne content is missing or incomplete", async () => {
    configureSanity();
    sanityFetch.mockResolvedValueOnce(null).mockResolvedValueOnce([]);

    await expect(loadEdition("nocturne")).rejects.toThrow(
      "The published Nocturne Edition is missing or incomplete.",
    );
    await expect(loadEditions()).rejects.toThrow(
      "The published Nocturne Edition is missing or incomplete.",
    );
  });

  it("does not silently replace configured CMS read failures with fallback content", async () => {
    configureSanity();
    const failure = new CMSReadError("Sanity content could not be read.");
    sanityFetch.mockRejectedValue(failure);

    await expect(loadEdition("nocturne")).rejects.toBe(failure);
    await expect(loadEditions()).rejects.toBe(failure);
  });

  it("keeps an unknown generic Edition as a normal not-found result", async () => {
    configureSanity();
    sanityFetch.mockResolvedValue(null);

    await expect(loadEdition("unknown")).resolves.toBeNull();
  });
});
