import "server-only";

import { cache } from "react";

import { getClientEnv } from "@/config/env.client";
import { getServerEnv } from "@/config/env.server";
import type { HomePageQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import type { HomePageData } from "../model/home-page";
import { homePageFallback } from "./home-page.fallback";
import { homePageQuery } from "./home-page.query";
import { mapHomePage } from "./map-home-page";

export async function loadHomePage(): Promise<HomePageData> {
  const serverEnv = getServerEnv();
  const clientEnv = getClientEnv();
  const sanityIsConfigured = Boolean(
    clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID && clientEnv.NEXT_PUBLIC_SANITY_DATASET,
  );

  if (serverEnv.ORVAUXE_E2E_MODE === "stub" || !sanityIsConfigured) {
    return homePageFallback;
  }

  const page = await sanityFetch<HomePageQueryResult>({
    query: homePageQuery,
    tags: ["home-page", "editions"],
  });
  const mappedPage = mapHomePage(page);

  if (!mappedPage) {
    throw new CMSReadError("The published Home page is missing or incomplete.");
  }

  return mappedPage;
}

export const getHomePage = cache(loadHomePage);
