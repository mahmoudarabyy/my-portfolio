import { ui } from "../../../../lib/ui";
import { localePath } from "../../../../lib/localization.mjs";
import { notFound } from "next/navigation";
import DetailClose from "../../../../components/detail-close";
import Link from "next/link";
import SiteImage from "../../../../components/site-image";
import { getArticles, articleDate } from "../../../../lib/articles";
export const revalidate = 60;
export async function generateMetadata({ params, lang = "ar" }) {
  const { slug } = await params;
  const article = (await getArticles(lang)).find((a) => a.id === slug);
  if (!article) notFound();
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: localePath(`/articles/${slug}`, lang),
      languages: {
        ar: `/articles/${slug}`,
        ...(article.englishReady ? { en: `/en/articles/${slug}` } : {}),
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      ...(article.cover && !/\.(mp4|webm)(?:[?#]|$)/i.test(article.cover)
        ? { images: [{ url: article.cover, alt: article.title }] }
        : {}),
    },
  };
}
export default async function ArticlePage({ params, lang = "ar" }) {
  const t = (text) => ui(lang, text);
  const { slug } = await params;
  const article = (await getArticles(lang)).find((a) => a.id === slug);
  if (!article) notFound();
  return (
    <main id="main-content" className="writing-shell">
      <DetailClose
        href={localePath("/articles", lang)}
        label={t("إغلاق المقال والعودة إلى جميع كتاباتي")}
      />
      <article>
        <header className="writing-header">
          {article.sample && <p>{t("محتوى تجريبي لمعاينة التصميم")}</p>}
          <h1>{article.title}</h1>
          <dl className="writing-meta">
            <div>
              <dt>{t("المجال")}</dt>
              <dd>{article.category}</dd>
            </div>
            <div>
              <dt>{t("التاريخ")}</dt>
              <dd>
                <time dateTime={article.date}>
                  {articleDate(article.date, lang)}
                </time>
              </dd>
            </div>
          </dl>
          {article.excerpt && <p>{article.excerpt}</p>}
        </header>
        {article.cover && (
          <SiteImage
            src={article.cover}
            alt={article.title}
            className="writing-cover"
            sizes="(max-width: 1120px) 100vw, 1120px"
            preload
          />
        )}
        {article.sections?.length ? (
          <div className="writing-sections">
            {article.sections.map((section) => (
              <section className="writing-section" key={section._key}>
                <div className="writing-section-copy">
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                  {section.extraText?.trim() && (
                    <details className="writing-read-more">
                      <summary>
                        <span className="writing-more-label">
                          {t("اقرأ المزيد")}
                        </span>
                        <span className="writing-less-label">
                          {t("عرض أقل")}
                        </span>
                      </summary>
                      <p>{section.extraText}</p>
                    </details>
                  )}
                </div>
                {section.media && (
                  <SiteImage
                    src={section.media}
                    alt={section.mediaAlt || section.title}
                    className="writing-section-media"
                    sizes="(max-width: 1120px) 100vw, 1120px"
                  />
                )}
              </section>
            ))}
          </div>
        ) : (
          <div className="writing-body">
            {(article.body || "")
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
        )}
        {/^https?:\/\//i.test(article.buttonUrl || "") && (
          <div className="writing-action">
            <a
              href={article.buttonUrl}
              className="writing-action-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.buttonLabel?.trim() || t("فتح الرابط")}
              <span className="study-arrow-icon" aria-hidden="true" />
            </a>
          </div>
        )}
      </article>
      <Link href={localePath("/articles", lang)} className="btn-view-all">
        {t("جميع كتاباتي")}
      </Link>
    </main>
  );
}
