import { getProjects } from "../lib/projects";
import Link from "next/link";
import SiteImage from "./site-image";
import { whatsappUrl } from "../lib/site";

export default async function Footer() {
  let projects = [];
  try {
    projects = await getProjects();
  } catch {
    /* Keep navigation available while the page shows its load error. */
  }
  return (
    <>
      <footer className="site-footer" id="contact">
        <div className="footer-container">
          <div className="footer-main-grid">
            <div className="footer-brand-col">
              <Link
                href="/"
                className="footer-logo-link"
                aria-label="محمود عربي"
              >
                <SiteImage
                  src="/Logo.png"
                  alt="عربي"
                  className="footer-logo-img"
                />
              </Link>
              <p className="footer-bio">
                {
                  "\n            محمود عربي — مصمم تجربة وواجهة مستخدم (UX/UI Lead) بخبرة تمتد لأكثر من 8 سنوات في بناء الأنظمة الرقمية المتقنة، تطبيقات الهاتف، ومنصات SaaS الحكومية والخاصة.\n          "
                }
              </p>
              <div className="footer-status-pill">
                <span className="status-pulse-dot"></span>
                <span>{"متاح للمشاريع الجديدة والاستشارات"}</span>
              </div>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{"التنقل"}</h4>
              <ul className="footer-nav-list">
                <li>
                  <Link href="/" className="footer-nav-link">
                    {"الرئيسية"}
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="footer-nav-link">
                    {"جميع المشاريع"}
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="footer-nav-link">
                    {"عن محمود"}
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="footer-nav-link">
                    {"الخدمات والتخصصات"}
                  </Link>
                </li>
                <li>
                  <Link href="/#articles" className="footer-nav-link">
                    {"كتاباتي"}
                  </Link>
                </li>
                <li>
                  <a
                    href="https://arabyux.tabbio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-nav-link"
                  >
                    {"السيرة الذاتية (CV)"}
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{"أبرز المشاريع"}</h4>
              <ul className="footer-nav-list">
                {projects.slice(0, 6).map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/projects/${project.id}`}
                      className="footer-nav-link"
                    >
                      {project.cardTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{"تواصل معي"}</h4>
              <ul className="footer-nav-list">
                <li>
                  <a
                    href="mailto:arabyux@gmail.com"
                    className="footer-contact-link"
                  >
                    <svg
                      className="footer-link-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>{"arabyux@gmail.com"}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-link"
                  >
                    <svg
                      className="footer-link-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>{"واتساب (WhatsApp)"}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-link"
                  >
                    <svg
                      className="footer-link-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span>{"LinkedIn"}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-link"
                  >
                    <svg
                      className="footer-link-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8h6a3 3 0 0 1 3 3 3 3 0 0 1-3 3H3V8z"></path>
                      <path d="M3 14h7a3 3 0 0 1 3 3 3 3 0 0 1-3 3H3V14z"></path>
                      <path d="M15 13a4 4 0 1 0 7.8 1.5H15"></path>
                      <line x1="16" y1="9" x2="21" y2="9"></line>
                    </svg>
                    <span>{"Behance"}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-link"
                  >
                    <svg
                      className="footer-link-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                    </svg>
                    <span>{"Dribbble"}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <p className="footer-copyright">
              {"© 2026 جميع الحقوق محفوظة لـ "}
              <strong>{"محمود عربي"}</strong>
              {"."}
            </p>
            <p className="footer-note">
              {"صُمم وبُني بعناية فائقة وشغف بتصميم المنتجات الرقمية."}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
