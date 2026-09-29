"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteImage from "./site-image";
import ThemeToggle from "./theme-toggle";
import { contactEmail, whatsappUrl } from "../lib/site";

const InterfaceContext = createContext(null);
const navItems = [
  ["/", "الرئيسية"],
  ["/projects", "جميع المشاريع"],
  ["/#about", "عن محمود"],
  ["/#services", "الخدمات"],
  ["/#articles", "كتاباتي"],
  ["/#contact", "تواصل معي"],
];

export function ConsultationButton({
  children = "اطلب استشارة",
  className = "btn-consultation",
}) {
  const { open } = useContext(InterfaceContext);
  return (
    <button
      type="button"
      className={className}
      onClick={() => open("consultation")}
    >
      {children}
    </button>
  );
}

function Header() {
  const { open } = useContext(InterfaceContext);
  const pathname = usePathname();
  return (
    <div className="site-wrapper">
      <header
        className={`site-header portfolio-header ${pathname.startsWith("/projects/") ? "case-site-header" : ""}`}
      >
        <div className="header-container">
          <div className="portfolio-header-logo">
            <Link href="/" className="logo-link" aria-label="الرئيسية">
              <SiteImage
                src="/Logo.png"
                alt="عربي"
                className="logo-img"
                sizes="80px"
              />
            </Link>
          </div>
          <nav className="portfolio-header-nav" aria-label="التنقل الرئيسي">
            {navItems.slice(1, 5).map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={href === pathname ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="portfolio-header-actions">
            <a
              href={whatsappUrl}
              className="btn-consultation"
              target="_blank"
              rel="noopener noreferrer"
            >
              تواصل معي
            </a>
            <ThemeToggle compact />
            <button
              type="button"
              className="menu-toggle-btn portfolio-mobile-menu"
              aria-label="فتح القائمة الرئيسية"
              aria-haspopup="dialog"
              onClick={() => open("menu")}
            >
              <SiteImage
                src="/Menu Icon.svg"
                alt=""
                className="menu-icon-img"
                sizes="28px"
              />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

function ConsultationForm() {
  const [prepared, setPrepared] = useState(false);
  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    if (!name || !contact) return;
    const body = `الاسم: ${name}\nوسيلة التواصل: ${contact}\nنوع المشروع: ${data.get("projectType")}\n\n${data.get("details") || ""}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent("طلب استشارة — " + name)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return (
    <>
      <div className="modal-header">
        <div className="modal-badge">لنبدأ رحلة تصميم استثنائية</div>
        <h2 className="modal-title" id="dialog-title">
          اطلب استشارة مجانية
        </h2>
        <p className="modal-subtitle">
          شاركني تفاصيل فكرتك. عند المتابعة سيفتح برنامج البريد لديك لإرسال
          الطلب.
        </p>
      </div>
      <form className="consultation-form" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="clientName">الاسم الكريم</label>
          <input
            id="clientName"
            name="name"
            autoComplete="name"
            placeholder="مثال: أحمد محمد"
            required
            maxLength={100}
            pattern=".*\S.*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientContact">
            البريد الإلكتروني أو رقم التواصل
          </label>
          <input
            id="clientContact"
            name="contact"
            placeholder="name@example.com أو +20..."
            required
            maxLength={160}
            pattern=".*\S.*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectType">نوع المشروع</label>
          <select
            id="projectType"
            name="projectType"
            defaultValue="موقع إلكتروني"
          >
            <option>موقع إلكتروني</option>
            <option>تطبيق جوال</option>
            <option>لوحة تحكم</option>
            <option>هوية بصرية</option>
            <option>استشارة أخرى</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="projectDetails">تفاصيل المشروع</label>
          <textarea
            id="projectDetails"
            name="details"
            rows={3}
            maxLength={1500}
            placeholder="اشرح باختصار فكرة المشروع..."
          />
        </div>
        <button type="submit" className="submit-btn">
          <span>متابعة عبر البريد</span>
          <SiteImage
            src="/arrow big.svg"
            alt=""
            className="btn-arrow-img"
            sizes="22px"
          />
        </button>
        {prepared && (
          <p role="status" className="form-note">
            أكمل الإرسال من برنامج البريد. لو لم يفتح، تواصل على{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        )}
      </form>
    </>
  );
}

export function InterfaceProvider({ children }) {
  const pathname = usePathname();
  const [active, setActive] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const previousPathRef = useRef(pathname);
  const historyNavigationRef = useRef(false);
  useEffect(() => {
    const onPopState = () => {
      historyNavigationRef.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    const changed = previousPathRef.current !== pathname;
    previousPathRef.current = pathname;
    const fromHistory = historyNavigationRef.current;
    historyNavigationRef.current = false;
    if (
      !changed ||
      fromHistory ||
      window.location.hash ||
      !pathname.startsWith("/projects")
    )
      return;
    // Start new project visits above the fixed header; preserve Back/Forward restoration.
    const frame = requestAnimationFrame(() =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
    );
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  const open = useCallback(
    (name) => {
      if (!active) triggerRef.current = document.activeElement;
      setActive(name);
    },
    [active],
  );
  const close = useCallback(() => {
    setActive(null);
    requestAnimationFrame(() => {
      if (triggerRef.current?.isConnected)
        triggerRef.current.focus({ preventScroll: true });
    });
  }, []);
  useEffect(() => {
    setActive(null);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      [
        ...dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]',
        ),
      ].filter((el) => el.getClientRects().length);
    const frame = requestAnimationFrame(() =>
      (
        dialogRef.current.querySelector("input") ||
        focusable()[0] ||
        dialogRef.current
      ).focus(),
    );
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key !== "Tab") return;
      const elements = focusable(),
        first = elements[0],
        last = elements.at(-1);
      if (!first) {
        event.preventDefault();
        dialogRef.current.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === dialogRef.current)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close]);
  const pageClass = pathname.startsWith("/projects/")
    ? "case-study-body"
    : pathname === "/projects"
      ? "projects-page-body"
      : "home-page-body";
  return (
    <InterfaceContext.Provider value={{ open, close }}>
      <div className={pageClass}>
        <div id="site-content" inert={active ? true : undefined}>
          <a href="#main-content" className="skip-link">
            انتقل إلى المحتوى
          </a>
          <Header />
          {children}
        </div>
        {active && (
          <div
            className={
              active === "menu"
                ? "menu-overlay active"
                : "modal-backdrop active"
            }
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              className={
                active === "menu" ? "menu-fullscreen-content" : "modal-card"
              }
            >
              {active === "menu" ? (
                <>
                  <div className="menu-top-bar">
                    <Link href="/" className="menu-logo-link" onClick={close}>
                      <SiteImage
                        src="/Logo.png"
                        alt="محمود عربي"
                        className="menu-logo-img"
                        sizes="80px"
                      />
                    </Link>
                    <div className="menu-actions">
                      <ThemeToggle />
                      <button
                        type="button"
                        className="menu-close-btn"
                        onClick={close}
                        aria-label="إغلاق القائمة"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <h2 id="dialog-title" className="sr-only">
                    القائمة الرئيسية
                  </h2>
                  <nav className="fullscreen-nav">
                    <ul className="fullscreen-nav-list">
                      {navItems.map(([url, label], index) => (
                        <li key={url} className="fullscreen-nav-item">
                          <Link
                            href={url}
                            onClick={close}
                            className={`fullscreen-nav-link ${url === pathname ? "active" : ""}`}
                            aria-current={url === pathname ? "page" : undefined}
                            data-text={label}
                          >
                            <span className="nav-num">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="nav-label">{label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="menu-cta-section">
                    <a
                      href={whatsappUrl}
                      className="btn-menu-consultation"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                    >
                      تواصل معي
                      <SiteImage
                        src="/arrow big.svg"
                        alt=""
                        className="btn-arrow-img"
                        sizes="22px"
                      />
                    </a>
                  </div>
                  <div className="menu-bottom-bar">
                    <div className="menu-social-links">
                      <a
                        href={`mailto:${contactEmail}`}
                        className="menu-social-item"
                      >
                        Email
                      </a>
                      <a
                        href="https://arabyux.tabbio.com/"
                        className="menu-social-item"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        روابط التواصل
                      </a>
                    </div>
                    <p className="menu-copyright">
                      © 2026 محمود عربي. جميع الحقوق محفوظة.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={close}
                    aria-label="إغلاق النافذة"
                  >
                    ×
                  </button>
                  <ConsultationForm />
                </>
              )}
            </div>
          </div>
        )}
        <aside className="floating-quick-actions" aria-label="أدوات سريعة">
          <button
            type="button"
            className={`btn-floating-action btn-scroll-top ${showTop ? "visible" : ""}`}
            aria-label="العودة لأعلى الصفحة"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </aside>
      </div>
    </InterfaceContext.Provider>
  );
}

export function ServicesGrid({ children }) {
  const [highlight, setHighlight] = useState(0);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    const update = () => {
      clearInterval(timer);
      if (motion.matches) {
        setHighlight(0);
        return;
      }
      setHighlight(1);
      timer = setInterval(() => {
        if (!document.hidden) setHighlight((value) => (value % 4) + 1);
      }, 900);
    };
    update();
    motion.addEventListener("change", update);
    return () => {
      clearInterval(timer);
      motion.removeEventListener("change", update);
    };
  }, []);
  return (
    <div className="services-grid" data-highlight={highlight}>
      {children}
    </div>
  );
}

export function ServiceCard({ children, className, ...props }) {
  return (
    <article {...props} className={className}>
      {children}
    </article>
  );
}
