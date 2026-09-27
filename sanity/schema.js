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
const imageField = (name, title, required = false) =>
  defineField({
    name,
    title,
    type: "image",
    group: "images",
    options: { hotspot: true },
    ...(required ? { validation: (rule) => rule.required() } : {}),
  });

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
      title: "اسم المشروع",
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
      options: { source: "mainTitle", maxLength: 80 },
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
    textField("researchLead", "البحث والاستكشاف"),
    textField("researchExtra", "تفاصيل إضافية عن البحث"),
    textField("problemLead", "المشكلة والتحديات"),
    textField("problemExtra", "تفاصيل إضافية عن المشكلة"),
    textField("solutionLead", "الحل المقترح"),
    textField("solutionExtra", "تفاصيل إضافية عن الحل"),
    textField("caseHeadline", "عنوان مقدمة دراسة الحالة"),
    textField("requirements", "متطلبات التجربة"),
    textField("workingModel", "طريقة العمل"),
    textField("productTitle", "عنوان قسم المنتج"),
    textField("productBody", "وصف قسم المنتج"),
    textField("websiteTitle", "عنوان قسم الواجهات"),
    textField("websiteBody", "وصف قسم الواجهات"),
    textField("resultTitle", "عنوان النتيجة"),
    textField("resultBody", "وصف النتيجة"),
    defineField({
      name: "websiteUrl",
      title: "رابط الموقع (اختياري)",
      type: "url",
      group: "story",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
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
    imageField("icon", "أيقونة المشروع (مربعة، اختياري)"),
    imageField("cardImage", "صورة الكارت", true),
    imageField("coverImage", "صورة غلاف دراسة الحالة", true),
    imageField("aboutImg", "صورة عن المشروع"),
    imageField("researchImg", "صورة البحث"),
    imageField("problemImg", "صورة المشكلة"),
    imageField("solutionImg", "صورة الحل"),
    defineField({
      name: "gallery",
      title: "معرض الصور (يمكن تغيير ترتيبها)",
      type: "array",
      group: "images",
      of: [{ type: "image", options: { hotspot: true } }],
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
