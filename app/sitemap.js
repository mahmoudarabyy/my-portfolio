import { getProjects } from "../lib/projects";
import { siteUrl } from "../lib/site";
export const revalidate = 60;
export default async function sitemap() {
  const projects = await getProjects();
  return [
    "/",
    "/projects",
    ...projects.map((project) => `/projects/${project.id}`),
  ].map((path) => ({
    url: siteUrl + path,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
