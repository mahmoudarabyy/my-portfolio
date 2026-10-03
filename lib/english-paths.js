import { cache } from "react";
import { getProjects } from "./projects";
import { getArticles } from "./articles";
export const getEnglishPaths = cache(async () => {
  const [projects, articles] = await Promise.all([
    getProjects("en"),
    getArticles("en"),
  ]);
  return [
    ...projects.map((p) => "/en/projects/" + p.id),
    ...articles.map((a) => "/en/articles/" + a.id),
  ];
});
