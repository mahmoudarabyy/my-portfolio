import { siteContentDefaults } from "../lib/site-content-defaults.mjs";
const labels = {
  heroTitle: "العنوان الرئيسي",
  heroDescription: "وصف المقدمة",
  aboutLead: "نبذة عني",
  aboutBody: "تفاصيل عني",
  aboutClosing: "ختام النبذة",
  servicesIntro: "وصف الخدمات",
  service1Title: "عنوان الخدمة ١",
  service1Body: "وصف الخدمة ١",
  service2Title: "عنوان الخدمة ٢",
  service2Body: "وصف الخدمة ٢",
  service3Title: "عنوان الخدمة ٣",
  service3Body: "وصف الخدمة ٣",
  service4Title: "عنوان الخدمة ٤",
  service4Body: "وصف الخدمة ٤",
};
export const siteContentSchema = {
  name: "siteContent",
  type: "document",
  title: "نصوص الصفحة الرئيسية",
  groups: [
    { name: "ar", title: "العربية", default: true },
    { name: "en", title: "English" },
  ],
  initialValue: siteContentDefaults,
  fields: ["ar", "en"].map((lang) => ({
    name: lang,
    title: lang === "ar" ? "العربية" : "English",
    type: "object",
    group: lang,
    fields: Object.keys(labels).map((name) => ({
      name,
      title: labels[name],
      type: name.endsWith("Title") ? "string" : "text",
      rows: 3,
    })),
  })),
  preview: { prepare: () => ({ title: "نصوص الصفحة الرئيسية" }) },
};
