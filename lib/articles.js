import "server-only";
import { localizeArticle } from "./localization.mjs";
import { cache } from "react";
import { sampleArticles } from "./sample-articles";

const getAllArticles = cache(async () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId && !dataset) return sampleArticles;
  if (
    !/^[a-z0-9]+$/.test(projectId || "") ||
    !/^[a-z0-9_-]+$/.test(dataset || "")
  )
    throw new Error("Invalid Sanity configuration");
  const query =
    '{"imported": defined(*[_id == "portfolio-content-import-v1"][0]._id), "articles": *[_type == "article" && defined(slug.current)] | order(date desc) {englishReady, en{..., "cover":cover.asset->url}, "id": slug.current, title, date, category, excerpt, body, buttonUrl, buttonLabel, "cover": cover.asset->url, sections[]{en{..., "media": media.asset->url}, _key, title, text, extraText, mediaAlt, "media": media.asset->url}}}';
  const params = new URLSearchParams({ query, perspective: "published" });
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?${params}`,
    {
      next: { revalidate: 60, tags: ["articles"] },
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!response.ok)
    throw new Error(`Unable to load articles (${response.status})`);
  const { result } = await response.json();
  const articles = result.articles.filter((a) => /^[a-zA-Z0-9_-]+$/.test(a.id));
  return result.imported || articles.length ? articles : sampleArticles;
});

export const getArticles = cache(async (lang = "ar") => {
  const articles = await getAllArticles();
  return lang === "en"
    ? articles.map(localizeArticle).filter(Boolean)
    : articles;
});

export function articleDate(value, lang = "ar") {
  return value
    ? new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "ar-EG", {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(new Date(value))
    : "";
}
