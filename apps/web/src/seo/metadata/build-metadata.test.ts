import { describe, expect, it } from "vitest";

import { buildMetadata } from "./build-metadata";

const baseInput = {
  baseUrl: "https://example.test/base/",
  description: "A deterministic metadata description.",
  pathname: "/atelier" as const,
  siteName: "ORVAUXE",
  title: "Atelier",
};

describe("buildMetadata", () => {
  it("builds absolute canonical and social metadata", () => {
    const metadata = buildMetadata({ ...baseInput, image: "/share.jpg" });

    expect(metadata.alternates?.canonical).toBe("https://example.test/atelier");
    expect(metadata.openGraph).toMatchObject({
      description: baseInput.description,
      images: [{ url: "https://example.test/share.jpg" }],
      siteName: "ORVAUXE",
      title: "Atelier",
      url: "https://example.test/atelier",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: ["https://example.test/share.jpg"],
    });
  });

  it("does not force index directives for an indexable page", () => {
    const metadata = buildMetadata(baseInput);

    expect(metadata.robots).toBeUndefined();
  });

  it("sets restrictive robots directives for non-indexable content", () => {
    const metadata = buildMetadata({ ...baseInput, noIndex: true });

    expect(metadata.robots).toMatchObject({
      follow: false,
      index: false,
      googleBot: {
        follow: false,
        index: false,
        noimageindex: true,
      },
    });
  });
});
