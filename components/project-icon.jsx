import SiteImage from "./site-image";

const symbols = {
  mobile: (
    <>
      <rect x="7" y="3" width="14" height="22" rx="4" />
      <path d="M11 7h6m-4 14h2" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="5" width="22" height="18" rx="4" />
      <path d="M3 11h22M8 8h.01M12 8h.01m-2 7-3 3 3 3m8-6 3 3-3 3" />
    </>
  ),
  gov: (
    <>
      <path d="m3 10 11-6 11 6M5 12h18M7 13v8m7-8v8m7-8v8M4 24h20" />
    </>
  ),
  dashboard: (
    <>
      <rect x="4" y="4" width="20" height="20" rx="4" />
      <path d="M9 19v-4m5 4v-9m5 9v-6" />
    </>
  ),
};
export default function ProjectIcon({ project, large = false }) {
  const category = project.categories?.find((value) => symbols[value]) || "web";
  return (
    <span
      className={`project-icon ${large ? "project-icon-large" : ""} project-icon-${category}`}
      aria-hidden="true"
    >
      {project.icon ? (
        <SiteImage src={project.icon} alt="" sizes={large ? "80px" : "52px"} />
      ) : (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {symbols[category]}
        </svg>
      )}
    </span>
  );
}
