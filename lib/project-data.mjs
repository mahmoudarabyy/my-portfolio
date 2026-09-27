export const projectCategories = [
  { id: "all", label: "الكل" },
  { id: "mobile", label: "تطبيقات الجوال" },
  { id: "web", label: "منصات الويب & SaaS" },
  { id: "gov", label: "الجهات الحكومية" },
  { id: "dashboard", label: "لوحات التحكم & Dashboards" },
];

export function normalizeProjects(projects) {
  if (!Array.isArray(projects)) throw new Error("Expected a projects array.");
  const ids = new Set();
  return projects
    .map((project, index) => {
      const id = project.id || project.slug?.current;
      if (!id || !/^[a-zA-Z0-9_-]+$/.test(id) || ids.has(id)) {
        throw new Error("Project slugs must be unique URL-safe identifiers.");
      }
      ids.add(id);
      const categories = Array.isArray(project.categories)
        ? project.categories
        : (project.categoryKey || "").split(/\s+/).filter(Boolean);
      return {
        ...project,
        id,
        categories,
        mainTitle:
          project.mainTitle || project.cardTitle || project.title || id,
        cardTitle:
          project.cardTitle || project.mainTitle || project.title || id,
        summary: project.summary || project.cardDescription || "",
        coverImage:
          project.coverImage || project.cardImage || "/project-placeholder.svg",
        cardImage:
          project.cardImage || project.coverImage || "/project-placeholder.svg",
        gallery: (project.gallery || []).filter(Boolean),
        sortOrder: Number.isFinite(project.sortOrder)
          ? project.sortOrder
          : index,
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));
}

export function filterProjects(projects, category) {
  return category === "all"
    ? projects
    : projects.filter((p) => p.categories.includes(category));
}
export function groupProjects(projects, size = 3) {
  if (!Number.isInteger(size) || size < 1) throw new Error("Invalid row size.");
  return Array.from({ length: Math.ceil(projects.length / size) }, (_, i) =>
    projects.slice(i * size, (i + 1) * size),
  );
}
export function getFeaturedProjects(projects) {
  return projects
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? a.sortOrder) - (b.featuredOrder ?? b.sortOrder),
    );
}
export function toProjectCard(project) {
  const {
    id,
    cardTitle,
    cardDescription,
    categories,
    cardImage,
    icon,
    cardLayout,
    year,
  } = project;
  return {
    id,
    cardTitle,
    cardDescription,
    categories,
    cardImage,
    icon,
    cardLayout,
    year,
  };
}
