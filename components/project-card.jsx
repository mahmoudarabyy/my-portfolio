import Link from "next/link";
import SiteImage from "./site-image";
import ProjectIcon from "./project-icon";
import Reveal from "./reveal";

export default function ProjectCard({ project, slot = 1, featured = false }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={`program-card ${project.cardLayout === "tall" ? "card-tall" : featured ? "card-desktop" : "card-wide"} card-slot-${slot}`}
    >
      <Reveal className="program-preview-wrapper" delay={(slot - 1) * 80}>
        <SiteImage
          src={project.cardImage}
          alt={project.cardTitle}
          className="project-card-image"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </Reveal>
      <div className="program-info">
        <ProjectIcon project={project} />
        <div className="program-title-row">
          <h3 className="program-title">{project.cardTitle}</h3>
          {project.year && (
            <span className="project-year" dir="ltr">
              {project.year}
            </span>
          )}
        </div>
        <p className="program-description">{project.cardDescription}</p>
      </div>
    </Link>
  );
}
