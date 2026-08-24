import { createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";

import { createClient } from "@sanity/client";

import {
  DOCUMENT_IDS,
  SEED_MEDIA,
  assertExpectedTarget,
  assertRemoteVerification,
  redactSensitiveText,
  runSeed,
} from "./production-content.mjs";

const apiVersion = "2026-08-24";
const mode = process.argv[2];
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
const seedToken = process.env.SANITY_SEED_TOKEN;
const apiToken = process.env.SANITY_API_TOKEN;
const secrets = [seedToken, apiToken];

function write(message) {
  process.stdout.write(`${message}\n`);
}

function requireValue(value, name) {
  if (!value) {
    throw new Error(`Missing required local environment variable: ${name}`);
  }
  return value;
}

function createSanityClient(token) {
  return createClient({
    projectId: requireValue(projectId, "SANITY_STUDIO_PROJECT_ID"),
    dataset: requireValue(dataset, "SANITY_STUDIO_DATASET"),
    apiVersion,
    token,
    useCdn: false,
    perspective: "published",
  });
}

async function queryVerification(client) {
  return client.fetch(
    `{
      "documents": *[_id in $ids] {
        _id,
        _type,
        heroHeading,
        atelierPrice,
        trustContent,
        name,
        status,
        startingPrice
      },
      "counts": {
        "homePage": count(*[_type == "homePage"]),
        "atelierPage": count(*[_type == "atelierPage"]),
        "studioPage": count(*[_type == "studioPage"]),
        "nocturne": count(*[
          _type == "edition" &&
          slug.current == "nocturne" &&
          editionNumber == 1
        ])
      }
    }`,
    { ids: Object.values(DOCUMENT_IDS) },
  );
}

async function resolveAssetReferences(client) {
  const references = {};
  for (const asset of SEED_MEDIA) {
    write(`Asset upload/reuse: ${asset.key}`);
    const uploaded = await client.assets.upload(
      "image",
      createReadStream(fileURLToPath(asset.sourceUrl)),
      { filename: asset.filename },
    );
    references[asset.key] = uploaded._id;
  }
  return references;
}

function printDryRun(plan) {
  write(`Dry run target: ${plan.target.projectId}/${plan.target.dataset}`);
  for (const asset of plan.assets) {
    write(`PLAN asset ${asset.operation}: ${asset.key} (${asset.ownership})`);
  }
  for (const document of plan.documents) {
    write(
      `PLAN ${document.operation}: ${document.id} [${document.type}] fields=${document.fields.join(",")}`,
    );
  }
  for (const skipped of plan.skipped) {
    write(`SKIP ${skipped.type}: ${skipped.reason}`);
  }
  write("Dry run complete: no remote mutations performed.");
}

async function main() {
  const target = {
    projectId: requireValue(projectId, "SANITY_STUDIO_PROJECT_ID"),
    dataset: requireValue(dataset, "SANITY_STUDIO_DATASET"),
  };
  assertExpectedTarget(target);

  if (mode === "--dry-run") {
    const result = await runSeed({ dryRun: true, target });
    printDryRun(result.plan);
    return;
  }

  if (mode === "--verify") {
    const readClient = createSanityClient(requireValue(apiToken, "SANITY_API_TOKEN"));
    const verification = await queryVerification(readClient);
    assertRemoteVerification(verification);
    write("Remote verification: PASS");
    return;
  }

  if (mode !== "--execute") {
    throw new Error("Use --dry-run, --execute, or --verify.");
  }

  const mutationClient = createSanityClient(requireValue(seedToken, "SANITY_SEED_TOKEN"));
  const readClient = createSanityClient(requireValue(apiToken, "SANITY_API_TOKEN"));
  const result = await runSeed({
    dryRun: false,
    target,
    mutationClient,
    resolveAssetReferences: () => resolveAssetReferences(mutationClient),
    verify: () => queryVerification(readClient),
  });

  for (const document of result.documents) {
    write(`MUTATED createOrReplace: ${document._id} [${document._type}]`);
  }
  write("Production seed: PASS");
  write("Remote verification: PASS");
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown seed failure.";
  process.stderr.write(`Seed failed: ${redactSensitiveText(message, secrets)}\n`);
  process.exitCode = 1;
});
