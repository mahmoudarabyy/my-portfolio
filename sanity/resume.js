import { defineField, defineType } from "sanity";
import { resumeDefaults } from "../lib/resume-defaults";

export const resumeSchema = defineType({
  name: "resumeContent",
  title: "سيرتي الذاتية",
  type: "document",
  initialValue: () => structuredClone(resumeDefaults),
  fields: [
    defineField({
      name: "experiences", title: "الخبرات العملية", type: "array",
      description: "أضف أو عدّل الخبرات، واسحب العناصر لتغيير ترتيب ظهورها. يمكنك حذف جميع العناصر لإفراغ القسم.",
      of: [{ type: "object", name: "resumeExperience", title: "خبرة عملية", fields: [
        defineField({ name: "role", title: "المسمى الوظيفي", type: "string", validation: r => r.required() }),
        defineField({ name: "company", title: "الشركة أو الجهة", type: "string", validation: r => r.required() }),
        defineField({ name: "icon", title: "أيقونة الشركة — اختياري", type: "image", description: "أيقونات الشركات الست الحالية تظهر تلقائيًا حسب اسم الشركة. ارفع صورة هنا لتغيير الأيقونة أو إضافة شركة جديدة." }),
        defineField({ name: "period", title: "الفترة", type: "string", description: "مثال: مايو ٢٠٢٥ — حتى الآن", validation: r => r.required() }),
        defineField({ name: "text", title: "تفاصيل الخبرة — اختياري", type: "text", rows: 4 }),
      ], preview: { select: { title: "company", subtitle: "role" } } }],
    }),
    defineField({
      name: "highlights", title: "أبرز الأعمال والإنجازات", type: "array",
      description: "ترتيب العناصر هنا هو ترتيبها في صفحة السيرة الذاتية.",
      of: [{ type: "object", name: "resumeHighlight", title: "عمل أو إنجاز", fields: [
        defineField({ name: "title", title: "العنوان", type: "string", validation: r => r.required() }),
        defineField({ name: "text", title: "التفاصيل", type: "text", rows: 4, validation: r => r.required() }),
      ], preview: { select: { title: "title", subtitle: "text" } } }],
    }),
  ],
  preview: { prepare: () => ({ title: "سيرتي الذاتية", subtitle: "الخبرات العملية وأبرز الأعمال والإنجازات" }) },
});
