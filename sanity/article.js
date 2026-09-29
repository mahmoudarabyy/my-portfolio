import { defineField, defineType } from "sanity";

export const articleSchema = defineType({
  name: "article",
  title: "الكتابات",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "عنوان المحتوى",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "الرابط المختصر بالإنجليزية",
      type: "slug",
      options: { maxLength: 80 },
      validation: (r) =>
        r
          .required()
          .custom(
            (v) =>
              !v?.current ||
              /^[a-zA-Z0-9_-]+$/.test(v.current) ||
              "استخدم حروفًا إنجليزية وأرقامًا وشرطات فقط",
          ),
    }),
    defineField({
      name: "date",
      title: "التاريخ",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "المجال",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", title: "وصف مختصر", type: "text", rows: 3 }),
    defineField({
      name: "cover",
      title: "الغلاف — صورة أو فيديو أو GIF",
      type: "file",
      options: {
        accept:
          "image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml,video/mp4,video/webm",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "تفاصيل المحتوى",
      type: "text",
      rows: 20,
      description: "افصل بين الفقرات بسطر فارغ. يُعرض النص بنفس ترتيب فقراته.",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "الأحدث أولًا",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
