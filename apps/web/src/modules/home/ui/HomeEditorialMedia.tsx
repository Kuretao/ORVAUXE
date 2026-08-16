import { Container } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";
import { HomeMediaFigure } from "./HomeMediaFigure";

interface HomeEditorialMediaProps {
  media: HomePageData["editorialMedia"];
}

export function HomeEditorialMedia({ media }: HomeEditorialMediaProps) {
  return (
    <Container className={styles.editorialInterlude} variant="full-bleed">
      <HomeMediaFigure media={media} variant="editorial" />
    </Container>
  );
}
