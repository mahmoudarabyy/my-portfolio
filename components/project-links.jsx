export default function ProjectLinks({ project }) {
  const links = [
    { href: project.websiteUrl, label: "زيارة الموقع" },
    { href: project.appStoreUrl, label: "متجر أبل", icon: "apple" },
    { href: project.googlePlayUrl, label: "متجر جوجل", icon: "google" },
  ].filter(({ href }) => {
    try {
      return ["https:", "http:"].includes(new URL(href).protocol);
    } catch {
      return false;
    }
  });
  if (!links.length) return null;
  return (
    <nav className="study-project-links" aria-label="روابط المشروع">
      {links.map(({ href, label, icon }) => (
        <a
          className="study-project-button"
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icon && (
            <span className="study-store-icon" aria-hidden="true">
              <img
                className="store-icon-dark"
                src={`/store-icons/${icon}-black.svg`}
                alt=""
                width="20"
                height="20"
              />
              <img
                className="store-icon-light"
                src={`/store-icons/${icon}-white.svg`}
                alt=""
                width="20"
                height="20"
              />
            </span>
          )}
          <span>{label}</span>
          {!icon && <span className="study-arrow-icon" aria-hidden="true" />}
        </a>
      ))}
    </nav>
  );
}
