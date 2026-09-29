import { notFound } from "next/navigation";
import Link from "next/link";
import SiteImage from "../../../../components/site-image";
import { getArticles, articleDate } from "../../../../lib/articles";
export const revalidate = 60;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = (await getArticles()).find(a => a.id === slug);
  if (!article) notFound();
  return { title: article.title, description: article.excerpt, alternates: { canonical: `/articles/${slug}` }, openGraph: { title: article.title, description: article.excerpt, type: "article", ...(article.cover && !/\.(mp4|webm)(?:[?#]|$)/i.test(article.cover) ? { images: [{ url: article.cover, alt: article.title }] } : {}) } };
}
export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = (await getArticles()).find(a => a.id === slug);
  if (!article) notFound();
  return <main id="main-content" className="writing-shell">
    <article>
      <header className="writing-header">
        {article.sample && <p>محتوى تجريبي لمعاينة التصميم</p>}
        <h1>{article.title}</h1>
        <dl className="writing-meta"><div><dt>المجال</dt><dd>{article.category}</dd></div><div><dt>التاريخ</dt><dd><time dateTime={article.date}>{articleDate(article.date)}</time></dd></div></dl>
        {article.excerpt && <p>{article.excerpt}</p>}
      </header>
      {article.cover && <SiteImage src={article.cover} alt={article.title} className="writing-cover" sizes="(max-width: 1120px) 100vw, 1120px" preload />}
      <div className="writing-body">{(article.body || "").split(/\n\s*\n/).filter(Boolean).map((p,i) => <p key={i}>{p}</p>)}</div>
    </article>
    <Link href="/articles" className="btn-view-all">جميع كتاباتي</Link>
  </main>;
}
