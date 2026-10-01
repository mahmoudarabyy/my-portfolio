import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectSchema } from "./schema";
import { articleSchema } from "./article";
import { faqSchema, testimonialSchema } from "./home-content";
import { resumeSchema } from "./resume";

export default defineConfig({
  name: "portfolio",
  title: "إدارة مشاريع محمود عربي",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  plugins: [structureTool({
    structure: (S) => S.list().title("إدارة المحتوى").items([
      ...S.documentTypeListItems().filter(item => item.getId() !== "resumeContent"),
      S.listItem().id("resume-content").title("سيرتي الذاتية").child(
        S.document().schemaType("resumeContent").documentId("resume-content").title("سيرتي الذاتية"),
      ),
    ]),
  })],
  schema: {
    types: [projectSchema, articleSchema, faqSchema, testimonialSchema, resumeSchema],
    templates: templates => templates.filter(template => template.schemaType !== "resumeContent"),
  },
  document: {
    actions: (actions, context) => context.schemaType === "resumeContent"
      ? actions.filter(action => !["duplicate", "delete", "unpublish"].includes(action.action))
      : actions,
  },
});
