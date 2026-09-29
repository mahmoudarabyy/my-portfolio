import "server-only";
import { cache } from "react";
import { sampleArticles } from "./sample-articles";

export const getArticles = cache(async () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId && !dataset) return sampleArticles;
  if (
    !/^[a-z0-9]+$/.test(projectId || "") ||
    !/^[a-z0-9_-]+$/.test(dataset || "")
  )
    throw new Error("Invalid Sanity configuration");
  const query =
    '*[_type == "article" && defined(slug.current)] | order(date desc) {"id": slug.current, title, date, category, excerpt, body, "cover": cover.asset->url}';
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
  const articles = result.filter((a) => /^[a-zA-Z0-9_-]+$/.test(a.id));
  return articles.length ? articles : sampleArticles;
});

export function articleDate(value) {
  return value
    ? new Intl.DateTimeFormat("ar-EG", {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(new Date(value))
    : "";
}
