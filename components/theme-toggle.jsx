"use client";

import { useEffect, useState } from "react";
import { ui } from "../lib/ui";
import { THEME_KEY } from "../lib/theme.mjs";

export default function ThemeToggle({ compact = false, lang = "ar" }) {
  const t = (text) => ui(lang, text);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
    function sync(event) {
      if (event.key !== THEME_KEY && event.key !== null) return;
      const next = event.newValue === "light" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    }
    window.addEventListener("storage", sync);
    const syncLocal = () =>
      setTheme(
        document.documentElement.dataset.theme === "light" ? "light" : "dark",
      );
    window.addEventListener("portfolio-theme-change", syncLocal);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("portfolio-theme-change", syncLocal);
    };
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    window.dispatchEvent(new Event("portfolio-theme-change"));
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* Works without storage access. */
    }
  }

  return (
    <button
      type="button"
      className={`theme-toggle${compact ? " theme-toggle-compact" : ""}`}
      role="switch"
      aria-checked={theme === "dark"}
      aria-label={t("الوضع الداكن")}
      onClick={toggle}
    >
      <span
        className={`theme-mode-icon theme-mode-icon-${theme === "dark" ? "moon" : "sun"}`}
        aria-hidden="true"
      />
      {!compact && <span>{theme === "dark" ? t("داكن") : t("فاتح")}</span>}
      {!compact && (
        <span className="theme-switch-track" aria-hidden="true">
          <span />
        </span>
      )}
    </button>
  );
}
