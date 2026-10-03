import { getSiteContent } from "../../lib/site-content";
import { ui } from "../../lib/ui";
import { localePath } from "../../lib/localization.mjs";
import Link from "next/link";
import HomeHero from "../../components/HomeHero";
import HomeSections from "../../components/HomeSections";
import ProjectCard from "../../components/project-card";
import Reveal from "../../components/reveal";
import { getProjects } from "../../lib/projects";
import { getFeaturedProjects } from "../../lib/project-data.mjs";

export const revalidate = 60;
export const metadata = {
  alternates: { canonical: "/", languages: { ar: "/", en: "/en" } },
};
export default async function HomePage({ lang = "ar" }) {
  const t = (text) => ui(lang, text);
  const [content, projects] = await Promise.all([
    getSiteContent(lang),
    getProjects(lang),
  ]);
  const featured = getFeaturedProjects(projects);
  return (
    <main id="main-content">
      <HomeHero lang={lang} content={content} />
      <section className="programs-section" id="projects">
        <div className="programs-container-border">
          <Reveal className="programs-header">
            <h2 className="programs-title">{t("اهم مشاريعي")}</h2>
            <p className="programs-subtitle">
              {t(
                "مجموعة مختارة من المشاريع وتجارب المنتجات الرقمية التي عملت عليها.",
              )}
            </p>
          </Reveal>
          <div className="programs-grid">
            {featured.map((project) => (
              <ProjectCard
                lang={lang}
                key={project.id}
                project={project}
                featured
              />
            ))}
          </div>
          {!featured.length && lang === "en" && (
            <p className="writing-empty">
              Case studies in English are coming soon.
            </p>
          )}
          <div className="programs-footer">
            <Link href={localePath("/projects", lang)} className="btn-view-all">
              {t("عرض جميع المشاريع")}
            </Link>
          </div>
        </div>
      </section>
      <HomeSections lang={lang} content={content} />
    </main>
  );
}
