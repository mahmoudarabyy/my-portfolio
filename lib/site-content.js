import "server-only";
import { cache } from "react";
import { siteContentDefaults } from "./site-content-defaults.mjs";
const getContent = cache(async () => {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!id && !dataset) return null;
  if (!/^[a-z0-9]+$/.test(id || "") || !/^[a-z0-9_-]+$/.test(dataset || ""))
    throw new Error("Invalid Sanity configuration");
  const query = '*[_id == "site-content"][0]{ar,en}';
  const response = await fetch(
    "https://" +
      id +
      ".api.sanity.io/v2025-02-19/data/query/" +
      dataset +
      "?" +
      new URLSearchParams({ query, perspective: "published" }),
    {
      next: { revalidate: 60, tags: ["site-content"] },
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!response.ok) throw new Error("Unable to load site content");
  return (await response.json()).result;
});
export async function getSiteContent(lang = "ar") {
  const doc = await getContent();
  return {
    ...siteContentDefaults[lang],
    ...Object.fromEntries(
      Object.entries(doc?.[lang] || {}).filter(
        ([, v]) => typeof v === "string" && v.trim(),
      ),
    ),
  };
}
