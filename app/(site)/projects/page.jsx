import { getProjects } from "../../../lib/projects";
import { toProjectCard } from "../../../lib/project-data.mjs";
import ProjectBrowser from "../../../components/project-browser";
export const revalidate = 60;
export const metadata = {
  title: "جميع مشاريعي",
  description:
    "أعمال محمود عربي في تصميم تجربة وواجهة المستخدم، التطبيقات والمنصات الرقمية.",
  alternates: {
    canonical: "/projects",
    languages: { ar: "/projects", en: "/en/projects" },
  },
};
export default async function ProjectsPage({ lang = "ar" }) {
  const projects = await getProjects(lang);
  return (
    <main id="main-content">
      <ProjectBrowser lang={lang} projects={projects.map(toProjectCard)} />
    </main>
  );
}
