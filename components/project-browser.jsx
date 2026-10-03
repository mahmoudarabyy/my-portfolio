"use client";
import { ui } from "../lib/ui";
import { useState } from "react";
import ProjectCard from "./project-card";
import Reveal from "./reveal";
import { projectCategories, filterProjects } from "../lib/project-data.mjs";

export default function ProjectBrowser({ projects, lang = "ar" }) {
  const t = (text) => ui(lang, text);
  const [category, setCategory] = useState("all");
  const [limit, setLimit] = useState(9);
  const filteredProjects = filterProjects(projects, category);
  const visibleProjects = filteredProjects.slice(0, limit);
  return (
    <>
      <Reveal as="section" className="projects-hero-section">
        <h1 className="projects-hero-title">{t("جميع مشاريعي")}</h1>
        <p className="projects-hero-subtitle">
          {lang === "en"
            ? "A selection of websites, apps and digital platforms I have designed."
            : "استعراض شامل لكافة المشاريع، التطبيقات، والمنظومات الرقمية التي قمت بدراستها وتصميم تجربة وواجهة استخدامها بأعلى المعايير."}
        </p>
        <div className="projects-filter-wrapper">
          <div
            className="projects-filter-bar"
            role="group"
            aria-label={t("تصفية المشاريع")}
          >
            {projectCategories
              .filter((item) => item.id !== "gov")
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`filter-btn ${category === item.id ? "active" : ""}`}
                  aria-pressed={category === item.id}
                  onClick={() => {
                    setCategory(item.id);
                    setLimit(9);
                  }}
                >
                  {t(item.label)}
                </button>
              ))}
          </div>
        </div>
        <p className="sr-only" role="status">
          {lang === "en" ? "Projects shown: " : "عدد المشاريع المعروضة: "}
          {visibleProjects.length}
        </p>
      </Reveal>
      <div className="all-projects-wrapper" id="projectsContainer">
        <div className="all-projects-grid" id="all-projects-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              lang={lang}
              key={project.id}
              project={project}
              slot={(index % 3) + 1}
            />
          ))}
        </div>
        {visibleProjects.length < filteredProjects.length && (
          <button
            className="projects-load-more"
            type="button"
            aria-controls="all-projects-grid"
            onClick={() => setLimit((value) => value + 9)}
          >
            {t("عرض المزيد")}
          </button>
        )}
        {!visibleProjects.length && (
          <p className="empty-state">
            {t("لا توجد مشاريع منشورة في هذا التصنيف حاليًا.")}
          </p>
        )}
      </div>
    </>
  );
}
