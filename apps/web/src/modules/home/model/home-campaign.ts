export type HomeCampaignStateId = "brand" | "nocturne" | "atelier";
export type HomeCampaignPanelId = "editions" | "atelier" | "nocturne" | "studio";

export interface PreparedHomeCampaignMedia {
  readonly alt: string;
  readonly objectPosition: string;
  readonly src: string;
  readonly temporary: boolean;
}

export interface HomeCampaignAction {
  readonly arrow: "forward" | "project";
  readonly href: string;
  readonly label: string;
  readonly trackedStartProject: boolean;
}

export interface HomeCampaignState {
  readonly actions: readonly HomeCampaignAction[];
  readonly context: readonly string[];
  readonly copy: string;
  readonly eyebrow: string;
  readonly id: HomeCampaignStateId;
  readonly media: PreparedHomeCampaignMedia;
  readonly title: string;
}

export interface HomeCampaignPanel {
  readonly description: string;
  readonly href: string;
  readonly id: HomeCampaignPanelId;
  readonly index: string;
  readonly label: string;
  readonly previewStateId: HomeCampaignStateId;
}

export interface PreparedHomeCampaign {
  readonly panels: readonly [
    HomeCampaignPanel,
    HomeCampaignPanel,
    HomeCampaignPanel,
    HomeCampaignPanel,
  ];
  readonly states: readonly [HomeCampaignState, HomeCampaignState, HomeCampaignState];
}
