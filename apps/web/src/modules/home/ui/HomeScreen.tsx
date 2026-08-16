import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";
import { HomeAtelier } from "./HomeAtelier";
import { HomeEditorialMedia } from "./HomeEditorialMedia";
import { HomeEditions } from "./HomeEditions";
import { HomeHero } from "./HomeHero";
import { HomeProjectCta } from "./HomeProjectCta";
import { HomeStatement } from "./HomeStatement";
import { HomeStudioSignal } from "./HomeStudioSignal";

export interface HomeScreenProps {
  page: HomePageData;
}

export function HomeScreen({ page }: HomeScreenProps) {
  return (
    <main
      className={styles.home}
      data-content-source={page.contentSource}
      id="main-content"
      tabIndex={-1}
    >
      <HomeHero hero={page.hero} />
      <HomeEditorialMedia media={page.editorialMedia} />
      <HomeStatement statement={page.statement} />
      <HomeEditions editions={page.editions} />
      <HomeAtelier atelier={page.atelier} />
      <HomeStudioSignal studio={page.studio} />
      <HomeProjectCta content={page.finalCta} />
    </main>
  );
}
