"use client";

import { useEffect, useState } from "react";
import { THEME_KEY } from "../lib/theme.mjs";

export default function ThemeToggle({ compact = false }) {
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
      aria-label="الوضع الداكن"
      onClick={toggle}
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        {theme === "dark" ? (
          <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </>
        )}
      </svg>
      {!compact && <span>{theme === "dark" ? "داكن" : "فاتح"}</span>}
      {!compact && (
        <span className="theme-switch-track" aria-hidden="true">
          <span />
        </span>
      )}
    </button>
  );
}
