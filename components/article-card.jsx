import Link from "next/link";
import SiteImage from "./site-image";
import { articleDate } from "../lib/articles";

export default function ArticleCard({ article, lang = "ar" }) {
  return (
    <article className="article-card">
      <Link
        href={`${lang === "en" ? "/en" : ""}/articles/${article.id}`}
        className="article-card-link"
      >
        <div className="article-cover-wrap">
          <SiteImage
            src={article.cover || "/project-placeholder.svg"}
            alt={article.title}
            className="article-cover-img"
          />
        </div>
        <div className="article-body">
          <span className="article-category">{article.category}</span>
          <h3 className="article-heading">{article.title}</h3>
          <time className="article-date" dateTime={article.date}>
            {articleDate(article.date, lang)}
          </time>
        </div>
      </Link>
    </article>
  );
}
