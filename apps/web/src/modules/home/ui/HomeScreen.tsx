import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";
import { HomeAtelier } from "./HomeAtelier";
import { HomeCampaign } from "./HomeCampaign";
import { HomeEditions } from "./HomeEditions";
import { HomeNocturneShowcase } from "./HomeNocturneShowcase";
import { HomeProcess } from "./HomeProcess";
import { HomeProjectCta } from "./HomeProjectCta";
import { HomeStatement } from "./HomeStatement";
import { HomeStudioSignal } from "./HomeStudioSignal";
import { HomeStorefrontSystem } from "./HomeStorefrontSystem";
import { HomeWhatWeBuild } from "./HomeWhatWeBuild";

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
      <HomeCampaign page={page} />
      <HomeStatement statement={page.statement} />
      <HomeWhatWeBuild content={page.whatWeBuild} edition={page.editions.featured} />
      <HomeEditions editions={page.editions} />
      <HomeNocturneShowcase edition={page.editions.featured} indexHref={page.editions.indexHref} />
      <HomeStorefrontSystem edition={page.editions.featured} />
      <HomeAtelier atelier={page.atelier} />
      <HomeProcess process={page.process} />
      <HomeStudioSignal studio={page.studio} />
      <HomeProjectCta content={page.finalCta} />
    </main>
  );
}
