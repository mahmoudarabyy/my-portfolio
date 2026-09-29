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
      {article.sections?.length ? (
        <div className="writing-sections">
          {article.sections.map((section) => (
            <section className="writing-section" key={section._key}>
              <div className="writing-section-copy">
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.extraText?.trim() && (
                  <details className="writing-read-more">
                    <summary><span className="writing-more-label">اقرأ المزيد</span><span className="writing-less-label">عرض أقل</span></summary>
                    <p>{section.extraText}</p>
                  </details>
                )}
              </div>
              {section.media && <SiteImage src={section.media} alt={section.mediaAlt || section.title} className="writing-section-media" sizes="(max-width: 1120px) 100vw, 1120px" />}
            </section>
          ))}
        </div>
      ) : <div className="writing-body">{(article.body || "").split(/\n\s*\n/).filter(Boolean).map((p,i) => <p key={i}>{p}</p>)}</div>}
      {/^https?:\/\//i.test(article.buttonUrl || "") && (
        <div className="writing-action">
          <a href={article.buttonUrl} className="writing-action-button" target="_blank" rel="noopener noreferrer">
            {article.buttonLabel?.trim() || "فتح الرابط"}
            <span className="study-arrow-icon" aria-hidden="true" />
          </a>
        </div>
      )}
    </article>
    <Link href="/articles" className="btn-view-all">جميع كتاباتي</Link>
  </main>;
}
