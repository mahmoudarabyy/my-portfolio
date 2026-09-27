export const siteName = "محمود عربي";
export const siteDescription =
  "محمود عربي - مصمم UX/UI بخبرة أكثر من 4 سنوات، أساعد في تحويل الأفكار إلى مواقع وتطبيقات ومنتجات رقمية واضحة، سهلة الاستخدام، ومصممة بعناية.";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
export const contactEmail = "arabyux@gmail.com";
