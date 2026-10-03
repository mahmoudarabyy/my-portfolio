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
  title: "إدارة مشاريع محمود عربي",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  tools: [
    {
      name: "import-english",
      title: "ترجمة المحتوى الحالي",
      component: ImportEnglish,
    },
    {
      name: "import-content",
      title: "استيراد محتوى الموقع",
      component: ImportContent,
    },
  ],
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("إدارة المحتوى")
          .items([
            S.listItem()
              .id("site-content")
              .title("نصوص الصفحة الرئيسية")
              .child(
                S.document()
                  .schemaType("siteContent")
                  .documentId("site-content"),
              ),
            ...S.documentTypeListItems().filter(
              (item) =>
                !["resumeContent", "siteContent"].includes(item.getId()),
            ),
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
      ].map(localizedSchema),
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
