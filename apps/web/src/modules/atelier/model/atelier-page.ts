export interface AtelierPage {
  readonly contentSource: "fallback" | "sanity";
  readonly heroHeading: string;
  readonly heroCopy: string;
  readonly serviceExplanation: string;
  readonly capabilities: readonly string[];
  readonly processSteps: readonly { title: string; description: string }[];
  readonly commercialCopy: string;
  readonly cta: { label: string; href: "/start-a-project" };
  readonly seo: {
    readonly metaTitle: string;
    readonly metaDescription: string;
    readonly shareImageUrl: string | null;
    readonly noIndex: boolean;
  };
}

export const atelierPageFallback = {
  contentSource: "fallback",
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
  processSteps: [
    { title: "Direction", description: "Define the brand, commercial and visual brief." },
    { title: "Architecture", description: "Shape the content, product and purchase system." },
    { title: "Design", description: "Create the visual language and responsive experience." },
    { title: "Build", description: "Implement the approved system on the right foundation." },
    { title: "QA", description: "Test content, commerce, accessibility and responsive behavior." },
    { title: "Launch", description: "Prepare the storefront and operating team for handoff." },
  ],
  commercialCopy:
    "Bespoke commerce engagements start from $6,000. Scope is defined around the brief; delivery timing follows approved requirements and Ready to Build inputs.",
  cta: { label: "Build with the Atelier", href: "/start-a-project" },
  seo: {
    metaTitle: "Atelier — Bespoke Commerce Design & Development | ORVAUXE",
    metaDescription:
      "ORVAUXE Atelier creates bespoke Shopify and commerce systems with custom art direction, UX, product logic and integrations.",
    shareImageUrl: "/media/home-campaign-atelier-temporary.webp",
    noIndex: false,
  },
} as const satisfies AtelierPage;
