import { atelierPage } from "./documents/atelier-page";
import { edition } from "./documents/edition";
import { homePage } from "./documents/home-page";
import { legalPage } from "./documents/legal-page";
import { siteSettings } from "./documents/site-settings";
import { studioPage } from "./documents/studio-page";
import { cta } from "./objects/cta";
import { imageWithAlt } from "./objects/image-with-alt";
import { seo } from "./objects/seo";

export const schemaTypes = [
  siteSettings,
  homePage,
  atelierPage,
  studioPage,
  edition,
  legalPage,
  seo,
  cta,
  imageWithAlt,
];
