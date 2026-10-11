export const siteName = "محمود عربي";
export const siteDescription =
  "محمود عربي - مصمم UX/UI بخبرة أكثر من 4 سنوات، أساعد في تحويل الأفكار إلى مواقع وتطبيقات ومنتجات رقمية واضحة، سهلة الاستخدام، ومصممة بعناية.";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.arabyux.com"
).replace(/\/$/, "");
export const contactEmail = "arabyux@gmail.com";
export const whatsappUrl = "https://wa.me/201044552433";

export function socialMetadata(lang = "ar") {
  const english = lang === "en";
  const title = english
    ? "Mahmoud Araby | UX/UI & Product Designer"
    : "محمود عربي | مصمم تجارب وواجهات المستخدم";
  const description = english
    ? "UX/UI designer with over 4 years of experience designing websites, mobile apps, dashboards, and digital products."
    : siteDescription;
  const image = {
    url: `/social/hero-${lang}-v2.jpg`,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: title,
  };
  return {
    openGraph: {
      type: "website",
      locale: english ? "en_US" : "ar_EG",
      siteName: english ? "Mahmoud Araby" : siteName,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
