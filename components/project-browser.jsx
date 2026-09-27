"use client";
import { useState } from "react";
import ProjectCard from "./project-card";
import Reveal from "./reveal";
import {
  projectCategories,
  filterProjects,
  groupProjects,
} from "../lib/project-data.mjs";

export default function ProjectBrowser({ projects }) {
  const [category, setCategory] = useState("all");
  const visibleProjects = filterProjects(projects, category);
  return (
    <>
      <Reveal as="section" className="projects-hero-section">
        <h1 className="projects-hero-title">جميع مشاريعي</h1>
        <p className="projects-hero-subtitle">
          استعراض شامل لكافة المشاريع، التطبيقات، والمنظومات الرقمية التي قمت
          بدراستها وتصميم تجربة وواجهة استخدامها بأعلى المعايير.
        </p>
        <div className="projects-filter-wrapper">
          <div
            className="projects-filter-bar"
            role="group"
            aria-label="تصفية المشاريع"
          >
            {projectCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`filter-btn ${category === item.id ? "active" : ""}`}
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status">
          عدد المشاريع المعروضة: {visibleProjects.length}
        </p>
      </Reveal>
      <div className="all-projects-wrapper" id="projectsContainer">
        {groupProjects(visibleProjects).map((row, index) => (
          <div
            key={row.map((p) => p.id).join("-")}
            className={`projects-row projects-row-${index % 2 ? "inverted" : "standard"} ${row.length < 3 ? "projects-row-partial" : ""}`}
          >
            {row.map((project, slot) => (
              <ProjectCard key={project.id} project={project} slot={slot + 1} />
            ))}
          </div>
        ))}
        {!visibleProjects.length && (
          <p className="empty-state">
            لا توجد مشاريع منشورة في هذا التصنيف حاليًا.
          </p>
        )}
      </div>
    </>
  );
}
