import { getProjects } from "../../../lib/projects";
import { toProjectCard } from "../../../lib/project-data.mjs";
import ProjectBrowser from "../../../components/project-browser";
export const revalidate = 60;
export const metadata = {
  title: "جميع مشاريعي",
  description:
    "أعمال محمود عربي في تصميم تجربة وواجهة المستخدم، التطبيقات والمنصات الرقمية.",
  alternates: { canonical: "/projects" },
};
export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <main id="main-content">
      <ProjectBrowser projects={projects.map(toProjectCard)} />
    </main>
  );
}
