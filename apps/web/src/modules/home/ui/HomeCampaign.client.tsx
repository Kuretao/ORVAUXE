"use client";

import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";
import Image from "next/image";
import { useState } from "react";

import type {
  HomeCampaignPanelId,
  HomeCampaignState,
  HomeCampaignStateId,
  PreparedHomeCampaign,
} from "../model/home-campaign";
import styles from "./Home.module.css";
import { TrackedHomeLink } from "./TrackedHomeLink.client";

const canonicalPanelByState = {
  atelier: "atelier",
  brand: "studio",
  nocturne: "nocturne",
} as const satisfies Record<HomeCampaignStateId, HomeCampaignPanelId>;

function CampaignAction({ action }: { action: HomeCampaignState["actions"][number] }) {
  const props = {
    className: styles.editorialAction,
    "data-arrow": action.arrow,
    href: action.href,
    variant: "navigation" as const,
  };

  return action.trackedStartProject ? (
    <TrackedHomeLink {...props} placement="hero">
      {action.label}
    </TrackedHomeLink>
  ) : (
    <Link {...props}>{action.label}</Link>
  );
}

export function HomeCampaignClient({ panels, states }: PreparedHomeCampaign) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewPanelId, setPreviewPanelId] = useState<HomeCampaignPanelId | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const selectedState = states[selectedIndex] ?? states[0];
  const previewPanel = previewPanelId
    ? panels.find((panel) => panel.id === previewPanelId)
    : undefined;
  const activeState = previewPanel
    ? (states.find((state) => state.id === previewPanel.previewStateId) ?? selectedState)
    : selectedState;
  const activeIndex = states.findIndex((state) => state.id === activeState.id);
  const activePanelId = previewPanelId ?? canonicalPanelByState[selectedState.id];

  function selectState(nextIndex: number) {
    const normalizedIndex = (nextIndex + states.length) % states.length;
    setPreviewPanelId(null);
    setSelectedIndex(normalizedIndex);
    setHasInteracted(true);
  }

  function beginPanelPreview(panelId: HomeCampaignPanelId, pointerType: string) {
    if (pointerType !== "mouse") return;
    setPreviewPanelId(panelId);
    setHasInteracted(true);
  }

  return (
    <section
      aria-labelledby="home-campaign-heading"
      className={styles.campaign}
      data-campaign-state={activeState.id}
      data-theme="dark"
    >
      <div className={styles.campaignStage}>
        <div
          className={styles.campaignMedia}
          data-asset-status={activeState.media.temporary ? "temporary" : "production"}
          data-transition={hasInteracted ? "active" : "initial"}
          key={activeState.id}
        >
          <Image
            alt={activeState.media.alt}
            fetchPriority={!hasInteracted && activeIndex === 0 ? "high" : "auto"}
            fill
            loading={!hasInteracted && activeIndex === 0 ? "eager" : "lazy"}
            sizes="100vw"
            src={activeState.media.src}
            style={{ objectPosition: activeState.media.objectPosition }}
          />
        </div>
        <div aria-hidden="true" className={styles.campaignScrim} />

        <Container className={styles.campaignFrame}>
          <div className={styles.campaignTopline}>
            <Text as="span" variant="label">
              {activeState.eyebrow}
            </Text>
            <Text as="span" variant="label">
              {String(activeIndex + 1).padStart(2, "0")} / {String(states.length).padStart(2, "0")}
            </Text>
          </div>

          <Grid className={styles.campaignContent} key={`content-${activeState.id}`}>
            <div className={styles.campaignTitleBlock}>
              <Heading
                className={styles.campaignHeading}
                id="home-campaign-heading"
                level={1}
                variant="display-lg"
              >
                {activeState.title}
              </Heading>
              <div className={styles.campaignContext}>
                {activeState.context.map((item) => (
                  <Text as="span" key={item} variant="caption">
                    {item}
                  </Text>
                ))}
              </div>
            </div>

            <div className={styles.campaignCommercial}>
              <Text className={styles.campaignCopy} variant="body-lg">
                {activeState.copy}
              </Text>
              <div className={styles.campaignActions}>
                {activeState.actions.map((action) => (
                  <CampaignAction action={action} key={`${action.href}-${action.label}`} />
                ))}
              </div>
            </div>
          </Grid>

          <div className={styles.campaignControls}>
            <button
              aria-label="Previous campaign state"
              className={styles.campaignControl}
              onClick={() => selectState(selectedIndex - 1)}
              type="button"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              aria-label="Next campaign state"
              className={styles.campaignControl}
              onClick={() => selectState(selectedIndex + 1)}
              type="button"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </Container>
      </div>

      <nav aria-label="Homepage destinations" className={styles.campaignRail}>
        <ol className={styles.campaignPanelList}>
          {panels.map((panel) => (
            <li className={styles.campaignPanelItem} key={panel.id}>
              <Link
                className={styles.campaignPanelLink}
                data-previewed={activePanelId === panel.id ? "true" : "false"}
                href={panel.href}
                onPointerEnter={(event) => beginPanelPreview(panel.id, event.pointerType)}
                onPointerLeave={() => setPreviewPanelId(null)}
                variant="quiet"
              >
                <Text as="span" className={styles.campaignPanelIndex} variant="caption">
                  {panel.index}
                </Text>
                <Text as="span" className={styles.campaignPanelLabel} variant="label">
                  {panel.label}
                </Text>
                <Text as="span" className={styles.campaignPanelDescription} variant="body-sm">
                  {panel.description}
                </Text>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <p aria-atomic="true" aria-live="polite" className={styles.visuallyHidden}>
        {String(selectedIndex + 1).padStart(2, "0")} / {String(states.length).padStart(2, "0")} ·{" "}
        {selectedState.title}
      </p>
    </section>
  );
}
