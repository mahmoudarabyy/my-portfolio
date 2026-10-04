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
    { name: "images", title: "الصور والفيديو" },
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
      title: "نطاق المشروع",
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
      ["role", "الخدمات"],
      ["timeline", "مدة المشروع"],
      ["field", "المجال"],
    ].map(([name, title]) =>
      defineField({ name, title, type: "string", group: "story" }),
    ),
    textField("summary", "عن المشروع", "story", true),
    {
      ...textField("problemLead", "التحدي — المشكلة التي يعالجها المشروع"),
      description: "النص الظاهر في قسم التحدي، بعد عن المشروع.",
    },
    {
      ...textField("problemExtra", "التحدي — اقرأ المزيد"),
      description: "تكملة نص التحدي. يظهر زر اقرأ المزيد عند إضافة نص هنا فقط.",
    },
    {
      ...textField("researchLead", "الحل — كيف تعاملت مع المشروع"),
      description:
        "النص الظاهر في قسم الحل، بعد التحدي وقبل الصورتين المتجاورتين.",
    },
    {
      ...textField("researchExtra", "الحل — اقرأ المزيد"),
      description:
        "تكملة نص الحل. يظهر زر اقرأ المزيد عند إضافة نص هنا. في المشاريع القديمة قد يُستخدم أيضًا كبديل لنص ما الذي احتاجته التجربة؟ إذا كان فارغًا.",
    },
    {
      ...textField("solutionLead", "الحل — النص السابق (للمشاريع القديمة)"),
      description:
        "حقل قديم يُعرض عند ترك النص الأساسي للحل فارغًا. للمشروع الجديد استخدم الحل — كيف تعاملت مع المشروع.",
      hidden: ({ document }) => !document?.solutionLead,
    },
    {
      ...textField(
        "solutionExtra",
        "نتيجة المشروع — النص السابق (للمشاريع القديمة)",
      ),
      description:
        "حقل قديم يُستخدم عند ترك نتيجة المشروع — النص فارغًا. ليس نص اقرأ المزيد للحل.",
      hidden: ({ document }) => !document?.solutionExtra,
    },
    {
      ...textField("caseHeadline", "عنوان مقدمة دراسة الحالة"),
      hidden: true,
      readOnly: true,
    },
    textField("requirements", "ما الذي احتاجته التجربة؟"),
    {
      ...textField(
        "requirementsExtra",
        "ما الذي احتاجته التجربة؟ — اقرأ المزيد",
      ),
      description:
        "تكملة نص هذا القسم. يظهر زر اقرأ المزيد عند إضافة نص هنا فقط.",
    },
    {
      ...textField("workingModel", "طريقة العمل"),
      description:
        "يظهر بعد ما الذي احتاجته التجربة؟ وقبل خارطة الطريق. لا يوجد زر اقرأ المزيد لهذا القسم. خارطة الطريق التالية تعرض خطوات ثابتة في الموقع.",
    },
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
    textField("resultTitle", "نتيجة المشروع — العنوان"),
    textField("resultBody", "نتيجة المشروع — النص"),
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
      "عن المشروع — الصورة الأولى",
      false,
      "تظهر تحت نص القسم حسب ترتيب خانات الوسائط. كل الخانات الجديدة اختيارية.",
    ),
    ...imageField(
      "aboutSecondImg",
      "عن المشروع — الصورة الثانية",
      false,
      "تظهر بجانب الصورة الأولى بنفس المقاس.",
    ),
    ...imageField(
      "problemImg",
      "التحدي — الصورة",
      false,
      "تظهر تحت نص القسم حسب ترتيب خانات الوسائط. كل الخانات الجديدة اختيارية.",
    ),
    ...imageField(
      "researchImg",
      "الحل — الصورة الأولى",
      false,
      "تظهر تحت نص القسم حسب ترتيب خانات الوسائط. كل الخانات الجديدة اختيارية.",
    ),
    ...imageField(
      "researchSecondImg",
      "الحل — الصورة الثانية",
      false,
      "تظهر بجانب الصورة الأولى بنفس المقاس.",
    ),
    ...imageField(
      "solutionFullImg",
      "الحل — الصورة الثالثة (بعرض كامل)",
      false,
      "تظهر مباشرة تحت الصورتين المتجاورتين بعرض المحتوى الكامل.",
    ),
    ...imageField(
      "requirementsImg",
      "ما الذي احتاجته التجربة؟ — الصورة",
      false,
      "تظهر تحت نص القسم حسب ترتيب خانات الوسائط. كل الخانات الجديدة اختيارية.",
    ),
    ...imageField(
      "workingImg",
      "طريقة العمل — الصورة الأولى",
      false,
      "تظهر تحت نص القسم حسب ترتيب خانات الوسائط. كل الخانات الجديدة اختيارية.",
    ),
    ...imageField(
      "workingSecondImg",
      "طريقة العمل — الصورة الثانية",
      false,
      "تظهر بجانب الصورة الأولى بنفس المقاس.",
    ),
    ...imageField(
      "solutionImg",
      "خارطة الطريق — الصورة",
      false,
      "تظهر تحت نص القسم حسب ترتيب خانات الوسائط. كل الخانات الجديدة اختيارية.",
    ),
    ...imageField(
      "resultImg",
      "نتيجة المشروع — الصورة الأولى",
      false,
      "تظهر تحت نص القسم حسب ترتيب خانات الوسائط. كل الخانات الجديدة اختيارية.",
    ),
    ...imageField(
      "resultSecondImg",
      "نتيجة المشروع — الصورة الثانية",
      false,
      "تظهر بجانب الصورة الأولى بنفس المقاس.",
    ),
    ...imageField(
      "resultFullImg",
      "نتيجة المشروع — الصورة الثالثة (بعرض كامل)",
      false,
      "تظهر مباشرة تحت الصورتين المتجاورتين بعرض المحتوى الكامل.",
    ),
    defineField({
      name: "gallery",
      title: "اكتشف جميع الشاشات — الألبوم (صور وفيديو وGIF)",
      description:
        "يظهر بعد قسم تواصل معي، صورة واحدة في كل تقليبة على الموبايل والديسكتوب. كل نقطة أسفل الألبوم تعرض صورة واحدة. اسحب العناصر لتغيير ترتيبها. تُضاف صور أقسام المشروع الأخرى إلى الألبوم تلقائيًا دون تكرار.",
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
