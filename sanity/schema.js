import { defineField, defineType } from "sanity";

const textField = (name, title, group = "story", required = false) =>
  defineField({
    name,
    title,
    type: "text",
    rows: 3,
    group,
    ...(required ? { validation: (rule) => rule.required() } : {}),
  });
const mediaAccept =
  "image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml,video/mp4,video/webm";
const imageField = (name, title, required = false, description = "") => [
  defineField({ name, title, type: "image", group: "images", hidden: true }),
  defineField({
    name: `${name}Media`,
    title: title.replaceAll("صورة", "وسائط").replaceAll("الصورة", "الوسائط"),
    type: "file",
    group: "images",
    options: { accept: mediaAccept },
    description: `${description} يقبل صورة أو GIF أو فيديو MP4/WebM. الملف الجديد يستبدل الوسائط الحالية؛ ترك الخانة فارغة يحتفظ بالملف القديم إن وجد.`,
    ...(required
      ? {
          validation: (rule) =>
            rule.custom((value, context) =>
              value?.asset || context.document?.[name]?.asset
                ? true
                : "ارفع صورة أو فيديو للمشروع",
            ),
        }
      : {}),
  }),
];

export const projectSchema = defineType({
  name: "project",
  title: "المشاريع",
  type: "document",
  groups: [
    { name: "general", title: "بيانات المشروع", default: true },
    { name: "story", title: "دراسة الحالة" },
    { name: "images", title: "الصور" },
  ],
  initialValue: {
    year: String(new Date().getFullYear()),
    sortOrder: 0,
    featured: false,
    cardLayout: "wide",
  },
  fields: [
    defineField({
      name: "mainTitle",
      title: "اسم المشروع في صفحة التفاصيل",
      description: "عنوان واحد، مثل: إعادة تصميم موقع Apply SEO.",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "رابط المشروع",
      type: "slug",
      group: "general",
      description:
        "اسم فريد بالحروف الإنجليزية والأرقام والشرطات، مثل maas-store. تجنب تغييره بعد مشاركة الرابط.",
      options: { maxLength: 80 },
      validation: (rule) =>
        rule
          .required()
          .custom(
            (value) =>
              !value?.current ||
              /^[a-zA-Z0-9_-]+$/.test(value.current) ||
              "استخدم الحروف الإنجليزية والأرقام والشرطات فقط",
          ),
    }),
    defineField({
      name: "cardTitle",
      title: "اسم مختصر للكارت (اختياري)",
      type: "string",
      group: "general",
    }),
    textField("cardDescription", "وصف الكارت", "general", true),
    defineField({
      name: "categories",
      title: "التصنيفات",
      type: "array",
      group: "general",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "تطبيقات الجوال", value: "mobile" },
          { title: "منصات الويب", value: "web" },
          { title: "الجهات الحكومية", value: "gov" },
          { title: "لوحات التحكم", value: "dashboard" },
        ],
      },
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "year",
      title: "سنة المشروع",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "sortOrder",
      title: "الترتيب (الأصغر يظهر أولًا)",
      type: "number",
      group: "general",
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "featured",
      title: "يظهر في الصفحة الرئيسية",
      type: "boolean",
      group: "general",
    }),
    defineField({
      name: "featuredOrder",
      title: "ترتيبه في الرئيسية",
      type: "number",
      group: "general",
      hidden: ({ document }) => !document?.featured,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "cardLayout",
      title: "شكل كارت المشروع",
      type: "string",
      group: "general",
      options: {
        list: [
          { title: "عريض", value: "wide" },
          { title: "طولي", value: "tall" },
        ],
        layout: "radio",
      },
    }),
    ...[
      ["client", "العميل"],
      ["role", "الدور والمسؤولية"],
      ["timeline", "مدة العمل"],
      ["field", "المجال"],
    ].map(([name, title]) =>
      defineField({ name, title, type: "string", group: "story" }),
    ),
    textField("summary", "عن المشروع", "story", true),
    textField("researchLead", "الحل — كيف تعاملت مع المشروع"),
    textField("researchExtra", "الحل — نص اقرأ المزيد"),
    textField("problemLead", "التحدي — المشكلة التي يعالجها المشروع"),
    textField("problemExtra", "تفاصيل إضافية عن المشكلة"),
    textField("solutionLead", "الحل المقترح"),
    textField("solutionExtra", "تفاصيل إضافية عن الحل"),
    {
      ...textField("caseHeadline", "عنوان مقدمة دراسة الحالة"),
      hidden: true,
      readOnly: true,
    },
    textField("requirements", "متطلبات التجربة"),
    textField("workingModel", "طريقة العمل"),
    {
      ...textField("productTitle", "عنوان قسم المنتج"),
      hidden: true,
      readOnly: true,
    },
    {
      ...textField("productBody", "وصف قسم المنتج"),
      hidden: true,
      readOnly: true,
    },
    {
      ...textField("websiteTitle", "عنوان قسم الواجهات"),
      hidden: true,
      readOnly: true,
    },
    {
      ...textField("websiteBody", "وصف قسم الواجهات"),
      hidden: true,
      readOnly: true,
    },
    textField("resultTitle", "عنوان النتيجة"),
    textField("resultBody", "وصف النتيجة"),
    ...[
      ["websiteUrl", "رابط الموقع"],
      ["appStoreUrl", "رابط التحميل من App Store — متجر أبل"],
      ["googlePlayUrl", "رابط التحميل من Google Play — متجر جوجل"],
    ].map(([name, title]) =>
      defineField({
        name,
        title: `${title} (اختياري)`,
        type: "url",
        group: "general",
        description: "يظهر كزر تحت اسم المشروع. اتركه فارغًا لإخفاء الزر.",
        validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
      }),
    ),
    defineField({
      name: "awards",
      title: "الجوائز (اختياري)",
      type: "array",
      group: "story",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "اسم الجائزة",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "التفاصيل",
              type: "text",
            }),
          ],
        },
      ],
    }),
    ...imageField("icon", "أيقونة المشروع (مربعة، اختياري)"),
    ...imageField("cardImage", "صورة الكارت", true),
    ...imageField(
      "coverImage",
      "غلاف دراسة الحالة",
      false,
      "الغلاف يقبل صورة ثابتة أو متحركة أو فيديو يعمل تلقائيًا بدون صوت ويتكرر.",
    ),
    defineField({
      name: "coverVideo",
      title: "فيديو الغلاف السابق",
      type: "file",
      hidden: true,
      group: "images",
    }),
    ...imageField(
      "aboutImg",
      "الصورة بعد عن المشروع",
      false,
      "تظهر مباشرة بعد النبذة، بنفس نسبة أبعاد الصورة الأصلية.",
    ),
    ...imageField(
      "researchImg",
      "الصورة داخل شرح الحل",
      false,
      "تظهر بعد نص كيف تعاملت مع المشروع وقبل متطلبات التجربة.",
    ),
    ...imageField("problemImg", "الصورة بعد التحدي"),
    ...imageField(
      "researchSecondImg",
      "الصورة الثانية للحل",
      false,
      "تظهر بجانب الصورة داخل شرح الحل. إذا تركتها فارغة، تُختار صورة أخرى من صور المشروع تلقائيًا.",
    ),
    ...imageField(
      "solutionImg",
      "الصورة بعد خارطة الطريق",
      false,
      "وسائط واحدة تظهر بعد خارطة الطريق وقبل نتيجة المشروع.",
    ),
    ...imageField(
      "resultImg",
      "الصورة تحت نتيجة المشروع",
      false,
      "تظهر بعد نص النتيجة وقبل تواصل معي. عند تركها فارغة يظهر غلاف المشروع مكانها.",
    ),
    defineField({
      name: "gallery",
      title: "اكتشف جميع الشاشات — الألبوم (صور وفيديو وGIF)",
      description: "يظهر بعد قسم تواصل معي. اسحب العناصر لتغيير ترتيبها. تُضاف صور أقسام المشروع الأخرى إلى الألبوم تلقائيًا دون تكرار.",
      type: "array",
      group: "images",
      of: [
        { type: "image", title: "صورة أو GIF", options: { hotspot: true } },
        {
          type: "file",
          title: "صورة أو فيديو أو GIF",
          options: { accept: mediaAccept },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "ترتيب العرض",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "mainTitle", subtitle: "year", media: "cardImage" },
  },
});
