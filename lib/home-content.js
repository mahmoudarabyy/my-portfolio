import "server-only";
import { cache } from "react";

import { faqs, testimonials } from "./home-defaults";

export const getHomeContent = cache(async () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId && !dataset) return { faqs, testimonials };
  if (
    !/^[a-z0-9]+$/.test(projectId || "") ||
    !/^[a-z0-9_-]+$/.test(dataset || "")
  )
    throw new Error("Invalid Sanity configuration");
  const query =
    '{"imported": defined(*[_id == "portfolio-content-import-v1"][0]._id), "faqs": *[_type == "faq"] | order(order asc, _createdAt asc) {_id, question, answer}, "testimonials": *[_type == "testimonial"] | order(order asc, _createdAt asc) {_id, name, role, quote, rating, sample}}';
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?${new URLSearchParams({ query, perspective: "published" })}`,
    {
      next: { revalidate: 60, tags: ["home-content"] },
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!response.ok)
    throw new Error(`Unable to load home content (${response.status})`);
  const { result } = await response.json();
  return {
    faqs: result.imported || result.faqs.length ? result.faqs : faqs,
    testimonials: result.imported || result.testimonials.length
      ? result.testimonials
      : testimonials,
  };
});
