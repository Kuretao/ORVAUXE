export const EXPECTED_SANITY_TARGET = Object.freeze({
  projectId: "avdwmukn",
  dataset: "production",
});

export const DOCUMENT_IDS = Object.freeze({
  homePage: "homePage",
  atelierPage: "atelierPage",
  studioPage: "studioPage",
  nocturne: "edition-001-nocturne",
});

export const SEED_MEDIA = Object.freeze([
  {
    key: "nocturneHero",
    filename: "home-campaign-nocturne-temporary.webp",
    sourceUrl: new URL(
      "../../web/public/media/home-campaign-nocturne-temporary.webp",
      import.meta.url,
    ),
  },
  {
    key: "nocturneProduct",
    filename: "nocturne-product-study-temporary.webp",
    sourceUrl: new URL(
      "../../web/public/media/editions/nocturne/nocturne-product-study-temporary.webp",
      import.meta.url,
    ),
  },
  {
    key: "nocturneDetail",
    filename: "nocturne-detail-study-temporary.webp",
    sourceUrl: new URL(
      "../../web/public/media/editions/nocturne/nocturne-detail-study-temporary.webp",
      import.meta.url,
    ),
  },
  ...[
    ["nocturneHome", "nocturne-home-desktop.webp"],
    ["nocturneCollection", "nocturne-collection-desktop.webp"],
    ["nocturneProductView", "nocturne-product-desktop.webp"],
    ["nocturneCart", "nocturne-cart-desktop.webp"],
    ["nocturneEditorial", "nocturne-editorial-desktop.webp"],
    ["nocturneMobile", "nocturne-product-mobile.webp"],
  ].map(([key, filename]) => ({
    key,
    filename,
    sourceUrl: new URL(
      `../../web/public/media/editions/nocturne/proof/${filename}`,
      import.meta.url,
    ),
  })),
  {
    key: "atelierShare",
    filename: "home-campaign-atelier-temporary.webp",
    sourceUrl: new URL(
      "../../web/public/media/home-campaign-atelier-temporary.webp",
      import.meta.url,
    ),
  },
  {
    key: "studioShare",
    filename: "studio-architecture-study-temporary.webp",
    sourceUrl: new URL(
      "../../web/public/media/studio/studio-architecture-study-temporary.webp",
      import.meta.url,
    ),
  },
]);

const imageDetails = Object.freeze({
  nocturneHero: {
    alt: "Dark sculptural fabric study for the Nocturne campaign.",
    credit: "ORVAUXE original concept imagery",
  },
  nocturneProduct: {
    alt: "Black tailored garment presented in the Nocturne product system.",
    credit: "ORVAUXE original concept imagery",
  },
  nocturneDetail: {
    alt: "Close material study from the Nocturne product world.",
    credit: "ORVAUXE original concept imagery",
  },
  nocturneHome: {
    alt: "Nocturne Shopify storefront home view with a dark leather carry object and campaign-led merchandising.",
    caption: "Home / desktop storefront proof",
    credit: "ORVAUXE Nocturne Storefront v1",
  },
  nocturneCollection: {
    alt: "Nocturne collection view with filtering, sorting and a four-column product grid.",
    caption: "Collection / desktop storefront proof",
    credit: "ORVAUXE Nocturne Storefront v1",
  },
  nocturneProductView: {
    alt: "Nocturne product detail view with product media, options, quantity and purchase controls.",
    caption: "Product / desktop storefront proof",
    credit: "ORVAUXE Nocturne Storefront v1",
  },
  nocturneCart: {
    alt: "Nocturne cart view with an empty-bag state and selected-object recommendations.",
    caption: "Cart / desktop storefront proof",
    credit: "ORVAUXE Nocturne Storefront v1",
  },
  nocturneEditorial: {
    alt: "Nocturne editorial journal view connecting material narrative with commerce.",
    caption: "Editorial / desktop storefront proof",
    credit: "ORVAUXE Nocturne Storefront v1",
  },
  nocturneMobile: {
    alt: "Nocturne product media gallery presented on a mobile viewport.",
    caption: "Product / mobile storefront proof",
    credit: "ORVAUXE Nocturne Storefront v1",
  },
  atelierShare: {
    alt: "Ivory tailoring material and black structural forms arranged as an atelier study.",
    credit: "ORVAUXE original concept imagery",
  },
  studioShare: {
    alt: "Contemporary concrete and glass architecture reflected after rain.",
    credit: "ORVAUXE original concept imagery",
  },
});

const cta = (label, destination, analyticsId) => ({
  _type: "cta",
  label,
  destinationKind: "internalPath",
  destination,
  ...(analyticsId ? { analyticsId } : {}),
});

const seo = (metaTitle, metaDescription, shareImage, noIndex = false) => ({
  _type: "seo",
  metaTitle,
  metaDescription,
  ...(shareImage ? { shareImage } : {}),
  noIndex,
});

const portableText = (text) => [
  {
    _key: "paragraph-1",
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: "span-1",
        _type: "span",
        marks: [],
        text,
      },
    ],
  },
];

function image(assetReference, key) {
  const details = imageDetails[key];
  if (!assetReference || !details) {
    throw new Error(`Missing approved media reference: ${key}`);
  }

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: assetReference },
    },
    decorative: false,
    alt: details.alt,
    ...(details.caption ? { caption: details.caption } : {}),
    credit: details.credit,
  };
}

function processSteps(values, prefix) {
  return values.map(([title, description], index) => ({
    _key: `${prefix}-${index + 1}`,
    _type: "processStep",
    title,
    description,
  }));
}

export function assertExpectedTarget(target) {
  if (target.projectId !== EXPECTED_SANITY_TARGET.projectId) {
    throw new Error("Refusing seed: unexpected Sanity project ID.");
  }

  if (target.dataset !== EXPECTED_SANITY_TARGET.dataset) {
    throw new Error("Refusing seed: unexpected Sanity dataset.");
  }
}

export function createDryRunAssetReferences() {
  return Object.fromEntries(SEED_MEDIA.map(({ key }) => [key, `dry-run-${key}`]));
}

export function buildSeedDocuments(assetReferences) {
  const hero = image(assetReferences.nocturneHero, "nocturneHero");
  const storefrontViews = [
    ["home", "nocturneHome"],
    ["collection", "nocturneCollection"],
    ["product", "nocturneProductView"],
    ["cart", "nocturneCart"],
    ["editorial", "nocturneEditorial"],
    ["mobile", "nocturneMobile"],
  ].map(([kind, mediaKey]) => ({
    _key: `storefront-${kind}`,
    _type: "storefrontView",
    kind,
    media: image(assetReferences[mediaKey], mediaKey),
  }));

  const nocturne = {
    _id: DOCUMENT_IDS.nocturne,
    _type: "edition",
    name: "Nocturne",
    slug: { _type: "slug", current: "nocturne" },
    editionNumber: 1,
    category: "Fashion / Accessories",
    status: "draft",
    hero,
    intro: portableText(
      "A cinematic Shopify storefront system for fashion and accessories, built around editorial pacing, precise merchandising and premium mobile commerce.",
    ),
    gallery: [
      { _key: "gallery-product", ...image(assetReferences.nocturneProduct, "nocturneProduct") },
      { _key: "gallery-detail", ...image(assetReferences.nocturneDetail, "nocturneDetail") },
    ],
    storefrontViews,
    features: [
      "Native responsive Shopify theme",
      "JSON templates with constrained sections and blocks",
      "Native product and cart flows",
      "Theme Editor-compatible content controls",
      "Baseline accessibility and technical SEO",
      "Responsive images and performance-oriented implementation",
    ],
    designDna: [
      "Cinematic campaign hierarchy",
      "Fashion-editorial pacing",
      "Dark materiality",
      "High typography contrast",
      "Precise product merchandising",
      "Restrained interaction",
      "Structured responsive grid",
      "Premium mobile commerce",
    ],
    systemStays: [
      "Underlying layout logic",
      "Editorial pacing",
      "Hero and campaign hierarchy",
      "Collection merchandising philosophy",
      "Product-page structure",
      "Typography scale relationships",
      "Transition language",
      "Responsive grid and mobile philosophy",
    ],
    brandCanAdapt: [
      "Approved logo",
      "Brand color system",
      "Approved, licensed typography",
      "Photography and product imagery",
      "Supplied copy and brand information",
      "Product and collection data",
      "Selected theme settings",
      "Merchandising and content arrangement within approved boundaries",
    ],
    startingPrice: "From $2,490",
    launchEstimate: "7–10 business days from Ready to Build",
    cta: cta("Start with Nocturne", "/start-a-project?edition=nocturne"),
    seo: seo(
      "Nocturne — Fashion Shopify Edition | ORVAUXE",
      "Explore Nocturne, an ORVAUXE concept Edition for fashion and accessories on Shopify, presented for controlled brand adaptation.",
      hero,
    ),
  };

  const homePage = {
    _id: DOCUMENT_IDS.homePage,
    _type: "homePage",
    heroHeading: "Commerce for the distinctive.",
    heroCopy: "Premium Shopify storefronts for fashion, jewelry and design-led brands.",
    heroPrimaryCta: cta("Start a Project", "/start-a-project", "startProject"),
    heroSecondaryCta: cta("Explore Editions", "/editions"),
    statementHeading: "Built to be desired. Designed to be bought.",
    serviceIntroduction:
      "ORVAUXE treats brand expression and commerce usability as one system—so the storefront feels distinctive and remains clear to use.",
    whatWeBuildHeading: "Commerce shaped around the brand.",
    whatWeBuildIntroduction:
      "ORVAUXE combines art direction, UX and Shopify implementation into one storefront system.",
    whatWeBuildSignals: ["Brand-led UX", "Commerce architecture", "Shopify implementation"],
    editionsHeading: "Editions",
    editionsIntroduction:
      "Curated premium storefront systems, adapted to each brand and prepared for a considered launch.",
    editionsPrice: "Editions from $2,490",
    selectedEditions: [
      {
        _key: "edition-001-nocturne",
        _type: "reference",
        _ref: DOCUMENT_IDS.nocturne,
      },
    ],
    atelierHeading: "Atelier",
    atelierIntroduction:
      "For brands requiring something entirely their own. Semi-custom and bespoke commerce strategy, design and implementation.",
    atelierPrice: "Projects from $6,000",
    atelierCapabilities: [
      "Strategy",
      "Art direction",
      "UX / UI",
      "Commerce implementation",
      "Integrations",
      "Launch",
    ],
    atelierCta: cta("Discover Atelier", "/atelier"),
    processHeading: "From direction to launch.",
    processSteps: processSteps(
      [
        ["Direction", "Define the visual and commercial direction."],
        ["Adaptation", "Adapt the selected system around the brand."],
        ["Build", "Implement the storefront in Shopify."],
        ["Launch", "Prepare the storefront for a considered launch."],
      ],
      "home-process",
    ),
    studioHeading: "ORVAUXE",
    studioDescriptor: "Commerce Atelier",
    studioOrigin: "Chengdu · Worldwide",
    studioBody: "An independent commerce atelier for brands that refuse to look interchangeable.",
    finalCtaEyebrow: "START A PROJECT",
    finalCtaHeading: "Have a brand worth building for?",
    finalCtaBody:
      "Tell us what you are building, where the storefront is today and what the next stage needs to accomplish.",
    closingCta: cta("Start a Project", "/start-a-project", "startProject"),
    seo: seo(
      "ORVAUXE — Premium Commerce for Fashion & Design-Led Brands",
      "ORVAUXE creates premium Shopify storefronts for fashion, jewelry and design-led brands worldwide, combining brand expression with commerce usability.",
    ),
  };

  const atelierPage = {
    _id: DOCUMENT_IDS.atelierPage,
    _type: "atelierPage",
    heroHeading: "Commerce, built around the brand.",
    heroCopy:
      "Atelier is ORVAUXE's bespoke route for brands whose art direction, information architecture or commerce requirements should define the system from the beginning.",
    serviceExplanation:
      "For briefs where the storefront must follow the brand rather than fit an existing Edition. The work can include custom product logic, deeper integrations and headless architecture when the operating case genuinely justifies it.",
    capabilities: [
      "Art direction",
      "Information architecture / UX",
      "Custom templates",
      "Commerce logic",
      "Integrations",
      "Interaction system",
    ],
    processSteps: processSteps(
      [
        ["Direction", "Define the brand, commercial and visual brief."],
        ["Architecture", "Shape the content, product and purchase system."],
        ["Design", "Create the visual language and responsive experience."],
        ["Build", "Implement the approved system on the right foundation."],
        ["QA", "Test content, commerce, accessibility and responsive behavior."],
        ["Launch", "Prepare the storefront and operating team for handoff."],
      ],
      "atelier-process",
    ),
    commercialCopy:
      "Bespoke commerce engagements start from $6,000. Scope is defined around the brief; delivery timing follows approved requirements and Ready to Build inputs.",
    cta: cta("Build with the Atelier", "/start-a-project"),
    seo: seo(
      "Atelier — Bespoke Commerce Design & Development | ORVAUXE",
      "ORVAUXE Atelier creates bespoke Shopify and commerce systems with custom art direction, UX, product logic and integrations.",
      image(assetReferences.atelierShare, "atelierShare"),
    ),
  };

  const studioPage = {
    _id: DOCUMENT_IDS.studioPage,
    _type: "studioPage",
    heroHeading: "Independent commerce atelier for distinctive brands.",
    heroCopy:
      "ORVAUXE works from Chengdu with brands worldwide, bringing art direction, commerce thinking and implementation into one quiet operating system.",
    pointOfView:
      "The storefront should carry the same conviction as the product. Brand expression and purchase clarity are treated as one design problem, not competing layers.",
    origin:
      "Chengdu · Worldwide. A grounded base for independent work, with collaboration structured around the brand, its market and the people who operate the storefront.",
    operatingModel:
      "Editions provide a directed foundation for controlled adaptation. Atelier creates a new system when the brief requires custom architecture, logic or integration depth.",
    trustContent:
      "Selected commerce experience includes custom storefront engineering across Next.js and Laravel, checkout and order flows, payment handling and fiscal receipt support.",
    contactCta: cta("Start a Project", "/start-a-project"),
    seo: seo(
      "Studio — Independent Commerce Atelier | ORVAUXE",
      "Meet ORVAUXE, an independent commerce atelier in Chengdu working worldwide across Editions, bespoke storefronts and commerce engineering.",
      image(assetReferences.studioShare, "studioShare"),
    ),
  };

  return [nocturne, homePage, atelierPage, studioPage];
}

export function createSeedPlan() {
  const documents = buildSeedDocuments(createDryRunAssetReferences());

  return {
    target: EXPECTED_SANITY_TARGET,
    assets: SEED_MEDIA.map(({ key, filename }) => ({
      key,
      filename,
      operation: "upload-or-reuse",
      ownership: key.startsWith("nocturne")
        ? "Sanity-owned Edition media"
        : "Sanity-owned SEO share media",
    })),
    documents: documents.map((document) => ({
      id: document._id,
      type: document._type,
      operation: "createOrReplace",
      fields: Object.keys(document).filter((field) => !field.startsWith("_")),
    })),
    skipped: [
      {
        type: "siteSettings",
        reason: "Real production contact email is not yet confirmed.",
      },
      {
        type: "legalPage",
        reason: "Legal entity facts and approved legal copy are not yet confirmed.",
      },
    ],
  };
}

export async function runSeed({ dryRun, target, mutationClient, resolveAssetReferences, verify }) {
  assertExpectedTarget(target);

  if (dryRun) {
    return { mode: "dry-run", plan: createSeedPlan() };
  }

  if (!mutationClient || !resolveAssetReferences || !verify) {
    throw new Error("Seed execution requires mutation, asset, and verification adapters.");
  }

  const assetReferences = await resolveAssetReferences();
  const documents = buildSeedDocuments(assetReferences);
  let transaction = mutationClient.transaction();
  for (const document of documents) {
    transaction = transaction.createOrReplace(document);
  }
  await transaction.commit({ visibility: "sync" });

  const verification = await verify();
  assertRemoteVerification(verification);

  return { mode: "execute", documents, verification };
}

export function assertRemoteVerification(verification) {
  const expectedDocuments = [
    [DOCUMENT_IDS.homePage, "homePage"],
    [DOCUMENT_IDS.atelierPage, "atelierPage"],
    [DOCUMENT_IDS.studioPage, "studioPage"],
    [DOCUMENT_IDS.nocturne, "edition"],
  ];

  const documents = new Map(
    (verification.documents ?? []).map((document) => [document._id, document]),
  );
  for (const [id, type] of expectedDocuments) {
    if (documents.get(id)?._type !== type) {
      throw new Error(`Remote verification failed for ${id}.`);
    }
  }

  if (
    verification.counts?.homePage !== 1 ||
    verification.counts?.atelierPage !== 1 ||
    verification.counts?.studioPage !== 1 ||
    verification.counts?.nocturne !== 1
  ) {
    throw new Error("Remote verification found unexpected singleton or Nocturne counts.");
  }

  const nocturne = documents.get(DOCUMENT_IDS.nocturne);
  if (nocturne.status !== "draft" || nocturne.startingPrice !== "From $2,490") {
    throw new Error("Remote Nocturne truth or pricing verification failed.");
  }

  const homePage = documents.get(DOCUMENT_IDS.homePage);
  const atelierPage = documents.get(DOCUMENT_IDS.atelierPage);
  const studioPage = documents.get(DOCUMENT_IDS.studioPage);
  if (
    homePage.heroHeading !== "Commerce for the distinctive." ||
    homePage.atelierPrice !== "Projects from $6,000" ||
    atelierPage.heroHeading !== "Commerce, built around the brand." ||
    !studioPage.trustContent?.includes("fiscal receipt support")
  ) {
    throw new Error("Remote founder-locked content verification failed.");
  }
}

export function redactSensitiveText(value, secrets) {
  return secrets.reduce(
    (safe, secret) => (secret ? safe.replaceAll(secret, "[REDACTED]") : safe),
    String(value),
  );
}
