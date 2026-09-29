import ArticleCard from "../../../components/article-card";
import { getArticles } from "../../../lib/articles";
export const metadata = { title: "جميع كتاباتي", alternates: { canonical: "/articles" } };
export const revalidate = 60;
export default async function ArticlesPage() {
  const articles = await getArticles();
  return <main id="main-content" className="writing-shell">
    <header className="writing-header"><h1>كتاباتي</h1><p>أفكار وتجارب عن تصميم المنتجات الرقمية وتجربة المستخدم، من فهم المشكلة إلى تفاصيل الواجهة.</p></header>
    {articles.length ? <div className="articles-grid">{articles.map(a => <ArticleCard key={a.id} article={a} />)}</div> : <p className="writing-empty">كتابات جديدة قريبًا.</p>}
  </main>;
}
