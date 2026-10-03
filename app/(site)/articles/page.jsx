import { ui } from "../../../lib/ui";
import ArticleCard from "../../../components/article-card";
import { getArticles } from "../../../lib/articles";
export const metadata = {
  title: "جميع كتاباتي",
  alternates: {
    canonical: "/articles",
    languages: { ar: "/articles", en: "/en/articles" },
  },
};
export const revalidate = 60;
export default async function ArticlesPage({ lang = "ar" }) {
  const t = (text) => ui(lang, text);
  const articles = await getArticles(lang);
  return (
    <main id="main-content" className="writing-shell">
      <header className="writing-header">
        <h1>{t("كتاباتي")}</h1>
        <p>
          {t(
            "أفكار وتجارب عن تصميم المنتجات الرقمية وتجربة المستخدم، من فهم المشكلة إلى تفاصيل الواجهة.",
          )}
        </p>
      </header>
      {articles.length ? (
        <div className="articles-grid">
          {articles.map((a) => (
            <ArticleCard lang={lang} key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <p className="writing-empty">{t("كتابات جديدة قريبًا.")}</p>
      )}
    </main>
  );
}
