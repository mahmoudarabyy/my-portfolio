import seed from "../data/projects.json" with { type: "json" };
import { normalizeProjects } from "./project-data.mjs";
export const localProjects = normalizeProjects(seed.projects);
