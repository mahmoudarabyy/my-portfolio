import { improveStudioSchema } from "./studio-ux.mjs";
import { siteContentSchema } from "./site-content";
import { localizedSchema } from "./localized";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectSchema } from "./schema";
import { articleSchema } from "./article";
import { faqSchema, testimonialSchema } from "./home-content";
import { resumeSchema } from "./resume";
import ImportContent from "./import-content";
import ImportEnglish from "./import-english";

export default defineConfig({
  name: "portfolio",
  title: "إدارة موقعي",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  tools: (previous) => [
    ...previous,
    {
      name: "import-english",
      title: "أدوات الإعداد — الترجمة",
      component: ImportEnglish,
    },
    {
      name: "import-content",
      title: "أدوات الإعداد — الاستيراد",
      component: ImportContent,
    },
  ],
  plugins: [
    structureTool({
      title: "المحتوى",
      structure: (S) =>
        S.list()
          .title("محتوى الموقع")
          .items([
            S.listItem()
              .id("site-content")
              .title("نصوص الصفحة الرئيسية")
              .child(
                S.document()
                  .schemaType("siteContent")
                  .documentId("site-content"),
              ),
            S.divider(),
            S.documentTypeListItem("project").title("المشاريع ودراسات الحالة"),
            S.documentTypeListItem("article").title("كتاباتي — المقالات"),
            S.divider(),
            S.documentTypeListItem("faq").title("الأسئلة الشائعة"),
            S.documentTypeListItem("testimonial").title("آراء العملاء"),
            S.listItem()
              .id("resume-content")
              .title("سيرتي الذاتية")
              .child(
                S.document()
                  .schemaType("resumeContent")
                  .documentId("resume-content")
                  .title("سيرتي الذاتية"),
              ),
          ]),
    }),
  ],
  schema: {
    types: [
      siteContentSchema,
      ...[
        projectSchema,
        articleSchema,
        faqSchema,
        testimonialSchema,
        resumeSchema,
      ].map((schema) => improveStudioSchema(localizedSchema(schema))),
    ],
    templates: (templates) =>
      templates.filter(
        (template) =>
          !["resumeContent", "siteContent"].includes(template.schemaType),
      ),
  },
  document: {
    actions: (actions, context) =>
      ["resumeContent", "siteContent"].includes(context.schemaType)
        ? actions.filter(
            (action) =>
              !["duplicate", "delete", "unpublish"].includes(action.action),
          )
        : actions,
  },
});
