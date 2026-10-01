import "server-only";
import { cache } from "react";
import { resumeDefaults } from "./resume-defaults";

export const getResumeContent = cache(async () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId && !dataset) return resumeDefaults;
  if (!/^[a-z0-9]+$/.test(projectId || "") || !/^[a-z0-9_-]+$/.test(dataset || ""))
    throw new Error("Invalid Sanity configuration");
  const query = '*[_type == "resumeContent" && _id == "resume-content"][0]{experiences[]{_key, role, company, period, text, "iconUrl": icon.asset->url}, highlights[]{_key, title, text}}';
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?${new URLSearchParams({ query, perspective: "published" })}`,
    { next: { revalidate: 60, tags: ["resume-content"] }, signal: AbortSignal.timeout(10000) },
  );
  if (!response.ok) throw new Error(`Unable to load resume (${response.status})`);
  const { result } = await response.json();
  // Defaults apply only before the first publication; cleared lists stay empty.
  return result ? { experiences: result.experiences || [], highlights: result.highlights || [] } : resumeDefaults;
});
