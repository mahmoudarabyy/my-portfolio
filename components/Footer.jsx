import { socials } from "../lib/social-links";
import { ui } from "../lib/ui";
import { localePath } from "../lib/localization.mjs";
import Link from "next/link";
import SiteImage from "./site-image";
import { whatsappUrl } from "../lib/site";

export default function Footer({ lang = "ar" }) {
  const t = (text) => ui(lang, text);
  return (
    <>
      <footer className="site-footer" id="contact">
        <div className="footer-container">
          <div className="footer-main-grid">
            <div className="footer-brand-col">
              <Link
                href={localePath("/", lang)}
                className="footer-logo-link"
                aria-label={t("محمود عربي")}
              >
                <SiteImage
                  src="/Logo.png"
                  alt={t("عربي")}
                  className="footer-logo-img"
                />
              </Link>
              <p className="footer-bio">
                {t(
                  "مصمم UX/UI بخبرة أكثر من 4 سنوات في تصميم المنتجات والتجارب الرقمية، من المواقع الإلكترونية وتطبيقات الموبايل إلى لوحات التحكم والأنظمة الرقمية.",
                )}
              </p>
              <div className="footer-status-pill">
                <span className="status-pulse-dot"></span>
                <span>{t("متاح للمشاريع الجديدة والاستشارات")}</span>
              </div>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{t("التنقل")}</h4>
              <ul className="footer-nav-list">
                <li>
                  <Link
                    href={localePath("/", lang)}
                    className="footer-nav-link"
                  >
                    {t("الرئيسية")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath("/projects", lang)}
                    className="footer-nav-link"
                  >
                    {t("جميع المشاريع")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath("/#about", lang)}
                    className="footer-nav-link"
                  >
                    {t("عن محمود")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath("/#services", lang)}
                    className="footer-nav-link"
                  >
                    {t("الخدمات والتخصصات")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath("/#articles", lang)}
                    className="footer-nav-link"
                  >
                    {t("كتاباتي")}
                  </Link>
                </li>
                <li>
                  <a
                    href="https://arabyux.tabbio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-nav-link"
                  >
                    {t("السيرة الذاتية (CV)")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{t("تواصل معي")}</h4>
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
                    <span>{t("واتساب (WhatsApp)")}</span>
                  </a>
                </li>
              </ul>
              <div
                className="footer-socials"
                role="group"
                aria-label={t("حساباتي على السوشيال ميديا")}
              >
                {socials.map(({ name, icon, href }) => (
                  <a
                    key={icon}
                    className="footer-social"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                  >
                    <span
                      className="footer-social-icon"
                      style={{
                        "--social-icon":
                          "url('/social-icons/" + icon + ".svg')",
                      }}
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <p className="footer-copyright">
              {t("© 2026 جميع الحقوق محفوظة لـ ")}
              <strong>{t("محمود عربي")}</strong>
              {"."}
            </p>
            <p className="footer-note">
              {t("صُمم وبُني بعناية فائقة وشغف بتصميم المنتجات الرقمية.")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
