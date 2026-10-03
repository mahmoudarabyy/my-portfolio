import "server-only";
import { translateItems } from "./localization.mjs";
import { resumeIcons } from "./resume-icons";
import { cache } from "react";
import { resumeDefaults } from "./resume-defaults";

const getAllResumeContent = cache(async () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId && !dataset) return resumeDefaults;
  if (
    !/^[a-z0-9]+$/.test(projectId || "") ||
    !/^[a-z0-9_-]+$/.test(dataset || "")
  )
    throw new Error("Invalid Sanity configuration");
  const query =
    '*[_type == "resumeContent" && _id == "resume-content"][0]{englishReady, experiences[]{en, _key, role, company, period, text, "iconUrl": icon.asset->url}, highlights[]{en, _key, title, text}}';
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?${new URLSearchParams({ query, perspective: "published" })}`,
    {
      next: { revalidate: 60, tags: ["resume-content"] },
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!response.ok)
    throw new Error(`Unable to load resume (${response.status})`);
  const { result } = await response.json();
  // Defaults apply only before the first publication; cleared lists stay empty.
  return result
    ? {
        englishReady: result.englishReady,
        experiences: result.experiences || [],
        highlights: result.highlights || [],
      }
    : resumeDefaults;
});

export const getResumeContent = cache(async (lang = "ar") => {
  const data = await getAllResumeContent();
  if (lang !== "en") return data;
  if (!data.englishReady) return { experiences: [], highlights: [] };
  return {
    experiences: translateItems(
      data.experiences.map((item) => ({
        ...item,
        iconUrl: item.iconUrl || resumeIcons[item.company?.trim()],
      })),
      ["role", "company", "period", "text"],
    ).filter((x) => x.role && x.company && x.period),
    highlights: translateItems(data.highlights, ["title", "text"]).filter(
      (x) => x.title && x.text,
    ),
  };
});
