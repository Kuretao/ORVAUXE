import { describe, expect, it, vi } from "vitest";

import {
  DOCUMENT_IDS,
  EXPECTED_SANITY_TARGET,
  assertExpectedTarget,
  buildSeedDocuments,
  createDryRunAssetReferences,
  createSeedPlan,
  redactSensitiveText,
  runSeed,
} from "./production-content.mjs";

function createMemoryClient() {
  const documents = new Map();
  const createOrReplace = vi.fn((document) => {
    documents.set(document._id, structuredClone(document));
    return transaction;
  });
  const commit = vi.fn(async () => ({ transactionId: "test" }));
  const transaction = { createOrReplace, commit };

  return {
    client: { transaction: vi.fn(() => transaction) },
    createOrReplace,
    documents,
  };
}

const verifiedResult = {
  documents: [
    {
      _id: DOCUMENT_IDS.nocturne,
      _type: "edition",
      status: "draft",
      startingPrice: "From $2,490",
    },
    {
      _id: DOCUMENT_IDS.homePage,
      _type: "homePage",
      heroHeading: "Commerce for the distinctive.",
      atelierPrice: "Projects from $6,000",
    },
    {
      _id: DOCUMENT_IDS.atelierPage,
      _type: "atelierPage",
      heroHeading: "Commerce, built around the brand.",
    },
    {
      _id: DOCUMENT_IDS.studioPage,
      _type: "studioPage",
      trustContent: "Selected experience includes fiscal receipt support.",
    },
  ],
  counts: { homePage: 1, atelierPage: 1, studioPage: 1, nocturne: 1 },
};

describe("production content seed", () => {
  it("uses deterministic singleton and Edition IDs", () => {
    expect(DOCUMENT_IDS).toEqual({
      homePage: "homePage",
      atelierPage: "atelierPage",
      studioPage: "studioPage",
      nocturne: "edition-001-nocturne",
    });
    expect(createSeedPlan().documents.map(({ id }) => id)).toEqual([
      DOCUMENT_IDS.nocturne,
      DOCUMENT_IDS.homePage,
      DOCUMENT_IDS.atelierPage,
      DOCUMENT_IDS.studioPage,
    ]);
  });

  it("builds identical createOrReplace content repeatedly", () => {
    const references = createDryRunAssetReferences();
    expect(buildSeedDocuments(references)).toEqual(buildSeedDocuments(references));
  });

  it("preserves Nocturne Concept Edition status and approved price", () => {
    const nocturne = buildSeedDocuments(createDryRunAssetReferences()).find(
      ({ _id }) => _id === DOCUMENT_IDS.nocturne,
    );
    expect(nocturne).toMatchObject({
      _type: "edition",
      status: "draft",
      startingPrice: "From $2,490",
    });
  });

  it("rejects the wrong project or dataset", () => {
    expect(() =>
      assertExpectedTarget({ ...EXPECTED_SANITY_TARGET, projectId: "wrong-project" }),
    ).toThrow("unexpected Sanity project ID");
    expect(() =>
      assertExpectedTarget({ ...EXPECTED_SANITY_TARGET, dataset: "wrong-dataset" }),
    ).toThrow("unexpected Sanity dataset");
  });

  it("never calls mutation or asset adapters during a dry run", async () => {
    const mutationClient = { transaction: vi.fn() };
    const resolveAssetReferences = vi.fn();
    const verify = vi.fn();

    const result = await runSeed({
      dryRun: true,
      target: EXPECTED_SANITY_TARGET,
      mutationClient,
      resolveAssetReferences,
      verify,
    });

    expect(result.mode).toBe("dry-run");
    expect(mutationClient.transaction).not.toHaveBeenCalled();
    expect(resolveAssetReferences).not.toHaveBeenCalled();
    expect(verify).not.toHaveBeenCalled();
  });

  it("remains idempotent when executed repeatedly", async () => {
    const { client, documents } = createMemoryClient();
    const references = createDryRunAssetReferences();
    const options = {
      dryRun: false,
      target: EXPECTED_SANITY_TARGET,
      mutationClient: client,
      resolveAssetReferences: vi.fn(async () => references),
      verify: vi.fn(async () => verifiedResult),
    };

    await runSeed(options);
    await runSeed(options);

    expect(documents.size).toBe(4);
    expect(documents.get(DOCUMENT_IDS.nocturne)).toMatchObject({
      status: "draft",
      startingPrice: "From $2,490",
    });
  });

  it("redacts local tokens from surfaced errors", () => {
    const token = "temporary-editor-token";
    const output = redactSensitiveText(`Request rejected for ${token}`, [token]);

    expect(output).toBe("Request rejected for [REDACTED]");
    expect(output).not.toContain(token);
  });
});
