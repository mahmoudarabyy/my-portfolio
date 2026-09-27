import "server-only";
import { cache } from "react";
import { normalizeProjects } from "./project-data.mjs";
import { localProjects } from "./local-projects.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const isSanityConfigured = Boolean(projectId && dataset);
const query = `*[_type == "project" && defined(slug.current)] | order(sortOrder asc) {
  "id": slug.current, mainTitle, cardTitle, title, category, categories, year,
  featured, featuredOrder, sortOrder, cardLayout, cardDescription, summary,
  client, role, timeline, field, researchLead, researchExtra, problemLead,
  problemExtra, solutionLead, solutionExtra,
  caseHeadline, requirements, workingModel, productTitle, productBody, websiteTitle, websiteBody, resultTitle, resultBody, websiteUrl, awards[]{title, description},
  "icon": icon.asset->url,
  "cardImage": cardImage.asset->url, "coverImage": coverImage.asset->url,
  "coverVideo": coverVideo.asset->url,
  "aboutImg": aboutImg.asset->url, "researchImg": researchImg.asset->url,
  "researchSecondImg": researchSecondImg.asset->url,
  "problemImg": problemImg.asset->url, "solutionImg": solutionImg.asset->url,
  "gallery": gallery[].asset->url
}`;

export const getProjects = cache(async () => {
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
export const getProject = cache(async (slug) =>
  (await getProjects()).find((project) => project.id === slug),
);
