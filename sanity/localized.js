import { projectTextFields, articleTextFields } from "../lib/localization.mjs";
const fieldsFor = {
  project: projectTextFields,
  article: articleTextFields,
  faq: ["question", "answer"],
  testimonial: ["name", "role", "quote"],
  resumeContent: [],
};
const requiredFor = {
  project: ["mainTitle", "cardDescription", "summary"],
  article: ["title", "category"],
  faq: ["question", "answer"],
  testimonial: ["name", "quote"],
  resumeContent: [],
};
const nestedFor = {
  awards: ["title", "description"],
  sections: ["title", "text", "extraText", "mediaAlt"],
  experiences: ["role", "company", "period", "text"],
  highlights: ["title", "text"],
};
const groups = [
  { name: "ar", title: "العربية", default: true },
  { name: "en", title: "English" },
  { name: "shared", title: "مشترك — الوسائط والإعدادات" },
];
function englishField(field) {
  const { group, validation, hidden, readOnly, initialValue, ...rest } = field;
  return {
    ...rest,
    description: "English translation — " + (field.description || field.title),
    validation: undefined,
  };
}
export function localizedSchema(schema) {
  const names = fieldsFor[schema.name] || [];
  const english = schema.fields
    .filter((f) => names.includes(f.name) && !f.hidden)
    .map(englishField);
  if (schema.name === "project")
    for (const field of schema.fields.filter((f) => f.name.endsWith("Media")))
      english.push({
        ...englishField(field),
        description:
          "بديل إنجليزي اختياري. اتركه فارغًا لاستخدام نفس وسائط العربي.",
      });
  if (schema.name === "project")
    english.push({
      ...englishField(schema.fields.find((f) => f.name === "gallery")),
      description:
        "ألبوم إنجليزي اختياري. اتركه فارغًا لاستخدام الألبوم المشترك.",
    });
  if (schema.name === "article")
    english.push({
      ...englishField(schema.fields.find((f) => f.name === "cover")),
      description: "غلاف إنجليزي اختياري. الافتراضي هو الغلاف المشترك.",
    });
  const fields = schema.fields.map((field) => {
    if (nestedFor[field.name])
      return {
        ...field,
        group: ["ar", "en"],
        description:
          (field.description || "") +
          " افتح كل عنصر لتجد تبويبي العربية وEnglish، والوسائط مشتركة.",
        of: field.of.map((obj) => ({
          ...obj,
          groups,
          fields: [
            ...obj.fields.map((f) => ({
              ...f,
              group: nestedFor[field.name].includes(f.name) ? "ar" : "shared",
            })),
            {
              name: "en",
              title: "English",
              type: "object",
              group: "en",
              fields: [
                ...obj.fields
                  .filter((f) => nestedFor[field.name].includes(f.name))
                  .map(englishField),
                ...(field.name === "sections"
                  ? [
                      {
                        ...englishField(
                          obj.fields.find((f) => f.name === "media"),
                        ),
                        description:
                          "وسائط إنجليزية اختيارية. اتركها فارغة لاستخدام الوسائط المشتركة.",
                      },
                    ]
                  : []),
              ],
            },
          ],
        })),
      };
    return { ...field, group: names.includes(field.name) ? "ar" : "shared" };
  });
  const ready = {
    name: "englishReady",
    title: "جاهز للنشر بالإنجليزية",
    type: "boolean",
    group: "en",
    initialValue: false,
    description:
      "فعّل بعد مراجعة الترجمة ثم اضغط Publish. لا تظهر النسخة الإنجليزية قبل التفعيل. تغيير العربي لا يترجم الإنجليزي تلقائيًا.",
    validation: (r) =>
      r.custom((value, ctx) => {
        if (!value) return true;
        const doc = ctx.document;
        if (requiredFor[schema.name].some((k) => !doc.en?.[k]?.trim()))
          return "أكمل النصوص الإنجليزية الأساسية أولًا.";
        for (const [list, keys] of Object.entries({
          sections: ["title", "text"],
          experiences: ["role", "company", "period"],
          highlights: ["title", "text"],
          awards: ["title"],
        }))
          if (
            doc[list]?.some((item) => keys.some((k) => !item.en?.[k]?.trim()))
          )
            return "أكمل الترجمة داخل جميع عناصر " + list;
        if (
          schema.name === "article" &&
          !doc.sections?.length &&
          !doc.en?.body?.trim()
        )
          return "أضف نص المقال الإنجليزي أو ترجم الأقسام.";
        return true;
      }),
  };
  return {
    ...schema,
    groups,
    fields: [
      ...fields,
      ...(english.length
        ? [
            {
              name: "en",
              title: "النصوص الإنجليزية",
              type: "object",
              group: "en",
              fields: english,
            },
          ]
        : []),
      ready,
    ],
  };
}
