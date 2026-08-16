import type {
  HomeCampaignAction,
  HomeCampaignPanel,
  HomeCampaignState,
  PreparedHomeCampaignMedia,
} from "../model/home-campaign";
import type { HomeCta, HomeMedia, HomePageData } from "../model/home-page";
import { HomeCampaignClient } from "./HomeCampaign.client";

interface HomeCampaignProps {
  page: HomePageData;
}

interface TemporaryCampaignMedia {
  alt: string;
  objectPosition: string;
  src: string;
}

const temporaryCampaignMedia = {
  atelier: {
    alt: "Ivory and black tailoring textiles with a metal measure and glass.",
    objectPosition: "48% 50%",
    src: "/media/home-campaign-atelier-temporary.webp",
  },
  brand: {
    alt: "Black tailoring, ivory silk and brushed metal material study.",
    objectPosition: "48% 50%",
    src: "/media/home-campaign-orvauxe-temporary.webp",
  },
  nocturne: {
    alt: "Black leather, brushed metal and smoked glass material study.",
    objectPosition: "53% 50%",
    src: "/media/home-campaign-nocturne-temporary.webp",
  },
} as const satisfies Record<string, TemporaryCampaignMedia>;

const campaignPanels = [
  {
    description: "Curated storefront systems.",
    href: "/editions",
    id: "editions",
    index: "01",
    label: "Editions",
    previewStateId: "nocturne",
  },
  {
    description: "Bespoke commerce.",
    href: "/atelier",
    id: "atelier",
    index: "02",
    label: "Atelier",
    previewStateId: "atelier",
  },
  {
    description: "Edition 001.",
    href: "/editions",
    id: "nocturne",
    index: "03",
    label: "Nocturne",
    previewStateId: "nocturne",
  },
  {
    description: "Chengdu · Worldwide.",
    href: "/studio",
    id: "studio",
    index: "04",
    label: "Studio",
    previewStateId: "brand",
  },
] as const satisfies readonly HomeCampaignPanel[];

function prepareCampaignMedia(
  media: HomeMedia | null,
  temporary: TemporaryCampaignMedia,
): PreparedHomeCampaignMedia {
  return media
    ? {
        alt: media.alt,
        objectPosition: media.objectPosition,
        src: media.src,
        temporary: false,
      }
    : {
        ...temporary,
        temporary: true,
      };
}

function prepareAction(cta: HomeCta, arrow: HomeCampaignAction["arrow"]): HomeCampaignAction {
  return {
    arrow,
    href: cta.href,
    label: cta.label,
    trackedStartProject: cta.analyticsId === "startProject",
  };
}

export function HomeCampaign({ page }: HomeCampaignProps) {
  const nocturneContext =
    page.editions.featured.statusLabel === "Concept Edition"
      ? "Concept Edition / ORVAUXE Original"
      : page.editions.featured.statusLabel;
  const states = [
    {
      actions: [
        prepareAction(page.hero.primaryCta, "project"),
        prepareAction(page.hero.secondaryCta, "forward"),
      ],
      context: [page.studio.descriptor, page.studio.origin],
      copy: page.hero.copy,
      eyebrow: "ORVAUXE",
      id: "brand",
      media: prepareCampaignMedia(page.heroMedia, temporaryCampaignMedia.brand),
      title: page.hero.heading,
    },
    {
      actions: [
        {
          arrow: "forward",
          href: "/editions",
          label: "Explore Editions",
          trackedStartProject: false,
        },
      ],
      context: [nocturneContext],
      copy: page.editions.featured.copy,
      eyebrow: page.editions.featured.numberLabel,
      id: "nocturne",
      media: prepareCampaignMedia(page.editions.featured.media, temporaryCampaignMedia.nocturne),
      title: page.editions.featured.name,
    },
    {
      actions: [prepareAction(page.atelier.cta, "forward")],
      context: ["Bespoke commerce", page.atelier.price],
      copy: page.atelier.introduction,
      eyebrow: "Atelier",
      id: "atelier",
      media: prepareCampaignMedia(page.atelier.media, temporaryCampaignMedia.atelier),
      title: page.atelier.heading,
    },
  ] as const satisfies readonly HomeCampaignState[];

  return <HomeCampaignClient panels={campaignPanels} states={states} />;
}
