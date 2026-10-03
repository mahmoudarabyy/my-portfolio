import "server-only";
import { localizeProject } from "./localization.mjs";
import { cache } from "react";
import { normalizeProjects } from "./project-data.mjs";
import { localProjects } from "./local-projects.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const isSanityConfigured = Boolean(projectId && dataset);
const query = `*[_type == "project" && defined(slug.current)] | order(sortOrder asc) {
  englishReady, en{..., "gallery": gallery[].asset->url, "icon": iconMedia.asset->url, "cardImage": cardImageMedia.asset->url, "coverImage": coverImageMedia.asset->url, "aboutImg": aboutImgMedia.asset->url, "researchImg": researchImgMedia.asset->url, "researchSecondImg": researchSecondImgMedia.asset->url, "problemImg": problemImgMedia.asset->url, "solutionImg": solutionImgMedia.asset->url, "requirementsImg": requirementsImgMedia.asset->url, "resultImg": resultImgMedia.asset->url}, "id": slug.current, mainTitle, cardTitle, title, category, categories, year,
  featured, featuredOrder, sortOrder, cardLayout, cardDescription, summary,
  client, role, timeline, field, researchLead, researchExtra, problemLead,
  problemExtra, solutionLead, solutionExtra,
  caseHeadline, requirements, requirementsExtra, workingModel, productTitle, productBody, websiteTitle, websiteBody, resultTitle, resultBody, websiteUrl, appStoreUrl, googlePlayUrl, awards[]{title, description, en},
  "icon": coalesce(iconMedia.asset->url, icon.asset->url),
  "cardImage": coalesce(cardImageMedia.asset->url, cardImage.asset->url), "coverImage": coalesce(coverImageMedia.asset->url, coverVideo.asset->url, coverImage.asset->url),
  "aboutImg": coalesce(aboutImgMedia.asset->url, aboutImg.asset->url), "researchImg": coalesce(researchImgMedia.asset->url, researchImg.asset->url),
  "researchSecondImg": coalesce(researchSecondImgMedia.asset->url, researchSecondImg.asset->url),
  "problemImg": coalesce(problemImgMedia.asset->url, problemImg.asset->url), "solutionImg": coalesce(solutionImgMedia.asset->url, solutionImg.asset->url),
  "resultImg": coalesce(resultImgMedia.asset->url, resultImg.asset->url),
  "requirementsImg": coalesce(requirementsImgMedia.asset->url, requirementsImg.asset->url),
  "gallery": gallery[].asset->url
}`;

const getAllProjects = cache(async () => {
  if (!projectId && !dataset) return localProjects;
  if (
    !projectId ||
    !dataset ||
    !/^[a-z0-9]+$/.test(projectId) ||
    !/^[a-z0-9_-]+$/.test(dataset)
  ) {
    throw new Error("Set a valid Sanity project ID and dataset together.");
  }
  const params = new URLSearchParams({ query, perspective: "published" });
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?${params}`,
    {
      next: { revalidate: 60, tags: ["projects"] },
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!response.ok)
    throw new Error(`Unable to load published projects (${response.status}).`);
  const data = await response.json();
  // An empty CMS is intentional: never resurrect deleted/unpublished local projects.
  return normalizeProjects(data.result);
});
export const getProjects = cache(async (lang = "ar") => {
  const projects = await getAllProjects();
  return lang === "en"
    ? projects.map(localizeProject).filter(Boolean)
    : projects;
});
export const getProject = cache(async (slug, lang = "ar") =>
  (await getProjects(lang)).find((project) => project.id === slug),
);
