import Link from "next/link";
import HomeHero from "../../components/HomeHero";
import HomeSections from "../../components/HomeSections";
import ProjectCard from "../../components/project-card";
import Reveal from "../../components/reveal";
import { getProjects } from "../../lib/projects";
import { getFeaturedProjects } from "../../lib/project-data.mjs";

export const revalidate = 60;
export const metadata = { alternates: { canonical: "/" } };
export default async function HomePage() {
  const featured = getFeaturedProjects(await getProjects());
  return (
    <main id="main-content">
      <HomeHero />
      <section className="programs-section" id="projects">
        <div className="programs-container-border">
          <Reveal className="programs-header">
            <h2 className="programs-title">اهم مشاريعي</h2>
            <p className="programs-subtitle">
              مجموعة مختارة من المشاريع وتجارب المنتجات الرقمية التي عملت عليها.
            </p>
          </Reveal>
          <div className="programs-grid">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
          <div className="programs-footer">
            <Link href="/projects" className="btn-view-all">
              عرض جميع المشاريع
            </Link>
          </div>
        </div>
      </section>
      <HomeSections />
    </main>
  );
}
