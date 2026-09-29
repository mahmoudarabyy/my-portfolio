import { defineField, defineType } from "sanity";

const order = defineField({
  name: "order",
  title: "ترتيب الظهور",
  type: "number",
  initialValue: 0,
});
export const faqSchema = defineType({
  name: "faq",
  title: "الأسئلة الشائعة",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "السؤال",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "الإجابة",
      type: "text",
      validation: (r) => r.required(),
    }),
    order,
  ],
  preview: { select: { title: "question" } },
});
export const testimonialSchema = defineType({
  name: "testimonial",
  title: "آراء العملاء",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "اسم العميل",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "المسمى أو اسم الشركة",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "رأي العميل",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rating",
      title: "التقييم من 5 — اختياري",
      type: "number",
      validation: (r) => r.integer().min(1).max(5),
    }),
    defineField({
      name: "sample",
      title: "نموذج تجريبي",
      type: "boolean",
      initialValue: true,
      description: "ألغِ التفعيل فقط عند إضافة رأي حقيقي بإذن صاحبه.",
    }),
    order,
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});
