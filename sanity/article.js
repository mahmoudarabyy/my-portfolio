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
      name: "sections",
      title: "أقسام المقال",
      description: "أضف أي عدد من الأقسام واسحبها لتغيير ترتيبها. يظهر كل قسم: عنوان، نص، اقرأ المزيد، ثم الوسائط. عند إضافة أقسام تُعرض بدل تفاصيل المحتوى القديمة.",
      type: "array",
      of: [{
        type: "object",
        name: "articleSection",
        title: "قسم",
        fields: [
          defineField({ name: "title", title: "عنوان القسم", type: "string", validation: r => r.required() }),
          defineField({ name: "text", title: "النص الأساسي", type: "text", rows: 5, validation: r => r.required() }),
          defineField({ name: "extraText", title: "نص اقرأ المزيد — اختياري", type: "text", rows: 6, description: "يظهر زر اقرأ المزيد فقط عند كتابة نص هنا." }),
          defineField({ name: "media", title: "صورة أو فيديو أو GIF — اختياري", type: "file", options: { accept: "image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml,video/mp4,video/webm" } }),
          defineField({ name: "mediaAlt", title: "وصف الوسائط", type: "string", description: "وصف مختصر للصورة لقارئات الشاشة." }),
        ],
        preview: { select: { title: "title", subtitle: "text" } },
      }],
    }),
    defineField({
      name: "body",
      title: "تفاصيل المحتوى القديمة",
      type: "text",
      rows: 20,
      description: "للمقالات القديمة فقط. يظهر عندما لا توجد أقسام، ولن يُحذف عند إضافة أقسام.",
    }),
    defineField({
      name: "buttonUrl",
      title: "رابط الزر في نهاية المقال — اختياري",
      type: "url",
      description: "رابط تحميل ملف أو أي صفحة خارجية. اتركه فارغًا لإخفاء الزر.",
      validation: r => r.uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "buttonLabel",
      title: "نص الزر — اختياري",
      type: "string",
      description: "مثال: تحميل الملف. عند تركه فارغًا يظهر: فتح الرابط.",
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
