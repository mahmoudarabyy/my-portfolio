import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectSchema } from "./schema";
import { articleSchema } from "./article";

export default defineConfig({
  name: "portfolio",
  title: "إدارة مشاريع محمود عربي",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  plugins: [structureTool()],
  schema: { types: [projectSchema, articleSchema] },
});
