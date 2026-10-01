import { getProjects } from "../lib/projects";
import { getArticles } from "../lib/articles";
import { siteUrl } from "../lib/site";
export const revalidate = 60;
export default async function sitemap() {
  const projects = await getProjects();
  const articles = await getArticles();
  return [
    "/",
    "/projects",
    "/articles",
    "/resume",
    ...articles.map((article) => `/articles/${article.id}`),
    ...projects.map((project) => `/projects/${project.id}`),
  ].map((path) => ({
    url: siteUrl + path,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
