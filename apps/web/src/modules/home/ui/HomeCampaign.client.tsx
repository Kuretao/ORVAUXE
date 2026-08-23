"use client";

import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";
import Image from "next/image";
import { useEffect, useState } from "react";

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
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

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
  const [interactionKind, setInteractionKind] = useState<"preview" | "selected">("selected");
  const [mediaTransition, setMediaTransition] = useState<{
    incoming: HomeCampaignState;
    outgoing: HomeCampaignState | null;
  }>({ incoming: states[0], outgoing: null });
  const selectedState = states[selectedIndex] ?? states[0];
  const previewPanel = previewPanelId
    ? panels.find((panel) => panel.id === previewPanelId)
    : undefined;
  const activeState = previewPanel
    ? (states.find((state) => state.id === previewPanel.previewStateId) ?? selectedState)
    : selectedState;
  const activeIndex = states.findIndex((state) => state.id === activeState.id);
  const activePanelId = previewPanelId ?? canonicalPanelByState[selectedState.id];
  const transitionKind = hasInteracted ? interactionKind : "initial";

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const settleReducedMotion = () => {
      if (!mediaQuery.matches) return;
      setMediaTransition((current) =>
        current.outgoing ? { ...current, outgoing: null } : current,
      );
    };

    settleReducedMotion();
    mediaQuery.addEventListener("change", settleReducedMotion);
    return () => mediaQuery.removeEventListener("change", settleReducedMotion);
  }, []);

  function transitionMedia(nextState: HomeCampaignState) {
    setMediaTransition((current) =>
      current.incoming.id === nextState.id
        ? current
        : {
            incoming: nextState,
            outgoing:
              typeof window.matchMedia === "function" &&
              window.matchMedia(reducedMotionQuery).matches
                ? null
                : current.incoming,
          },
    );
  }

  function selectState(nextIndex: number) {
    const normalizedIndex = (nextIndex + states.length) % states.length;
    const nextState = states[normalizedIndex] ?? states[0];
    setPreviewPanelId(null);
    setSelectedIndex(normalizedIndex);
    setHasInteracted(true);
    setInteractionKind("selected");
    transitionMedia(nextState);
  }

  function beginPanelPreview(panelId: HomeCampaignPanelId, pointerType: string) {
    if (pointerType !== "mouse") return;
    const panel = panels.find((candidate) => candidate.id === panelId);
    const nextState = states.find((state) => state.id === panel?.previewStateId);
    if (!nextState) return;

    setPreviewPanelId(panelId);
    setHasInteracted(true);
    setInteractionKind("preview");
    transitionMedia(nextState);
  }

  function endPanelPreview() {
    setPreviewPanelId(null);
    setInteractionKind("preview");
    transitionMedia(selectedState);
  }

  return (
    <section
      aria-labelledby="home-campaign-heading"
      className={styles.campaign}
      data-campaign-state={activeState.id}
      data-theme="dark"
    >
      <div className={styles.campaignStage}>
        <div className={styles.campaignMediaStack} data-transition-kind={transitionKind}>
          {mediaTransition.outgoing ? (
            <div
              aria-hidden="true"
              className={`${styles.campaignMedia} ${styles.campaignMediaOutgoing}`}
              data-campaign-media="outgoing"
              key={`outgoing-${mediaTransition.outgoing.id}`}
              onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget) return;
                const outgoingId = mediaTransition.outgoing?.id;
                setMediaTransition((current) =>
                  current.outgoing?.id === outgoingId ? { ...current, outgoing: null } : current,
                );
              }}
            >
              <Image
                alt=""
                fill
                loading="lazy"
                sizes="100vw"
                src={mediaTransition.outgoing.media.src}
                style={{ objectPosition: mediaTransition.outgoing.media.objectPosition }}
              />
            </div>
          ) : null}
          <div
            className={`${styles.campaignMedia} ${styles.campaignMediaIncoming}`}
            data-asset-status={activeState.media.temporary ? "temporary" : "production"}
            data-campaign-media="incoming"
            key={`incoming-${mediaTransition.incoming.id}`}
          >
            <Image
              alt={mediaTransition.incoming.media.alt}
              fetchPriority={!hasInteracted && activeIndex === 0 ? "high" : "auto"}
              fill
              loading={!hasInteracted && activeIndex === 0 ? "eager" : "lazy"}
              sizes="100vw"
              src={mediaTransition.incoming.media.src}
              style={{ objectPosition: mediaTransition.incoming.media.objectPosition }}
            />
          </div>
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

          <Grid
            className={styles.campaignContent}
            data-transition-kind={transitionKind}
            key={`content-${activeState.id}`}
          >
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

      <nav
        aria-label="Homepage destinations"
        className={styles.campaignRail}
        data-intro={hasInteracted ? "settled" : "enter"}
      >
        <ol className={styles.campaignPanelList}>
          {panels.map((panel) => (
            <li className={styles.campaignPanelItem} key={panel.id}>
              <Link
                className={styles.campaignPanelLink}
                data-previewed={activePanelId === panel.id ? "true" : "false"}
                href={panel.href}
                onPointerEnter={(event) => beginPanelPreview(panel.id, event.pointerType)}
                onPointerLeave={endPanelPreview}
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
