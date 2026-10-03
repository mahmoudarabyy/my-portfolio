"use client";
import { usePathname } from "next/navigation";
import { languageTarget } from "../lib/localization.mjs";
export default function LanguageSwitch({ lang, available = [] }) {
  const path = usePathname();
  return (
    <a
      className="language-switch"
      href={languageTarget(path, available)}
      hrefLang={lang === "en" ? "ar" : "en"}
      lang={lang === "en" ? "ar" : "en"}
      aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
      title={lang === "en" ? "العربية" : "English"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        style={{ flexShrink: 0 }}
      >
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </svg>
    </a>
  );
}
