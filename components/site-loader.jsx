"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const SiteReadyContext = createContext(true);
export const useSiteReady = () => useContext(SiteReadyContext);

export default function SiteLoader({ children, lang = "ar" }) {
  const [ready, setReady] = useState(false);
  const content = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let timeout;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    content.current.inert = true;
    const unlock = () => {
      root.style.overflow = previousOverflow;
      if (content.current) content.current.inert = false;
    };
    const prepare = async () => {
      const fonts = document.fonts?.ready ?? Promise.resolve();
      // Only wait for the first visible screen, never off-screen lazy media.
      const images = Array.from(content.current.querySelectorAll("img"))
        .filter((image) => {
          const box = image.getBoundingClientRect();
          return (
            box.width > 0 &&
            box.height > 0 &&
            box.top < innerHeight &&
            box.bottom > 0
          );
        })
        .map((image) => image.decode().catch(() => {}));
      await Promise.race([
        Promise.allSettled([fonts, ...images]),
        new Promise((resolve) => {
          timeout = setTimeout(resolve, 4500);
        }),
      ]);
      if (cancelled) return;
      clearTimeout(timeout);
      unlock();
      setReady(true);
    };
    prepare();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      unlock();
    };
  }, []);

  return (
    <SiteReadyContext.Provider value={ready}>
      <div
        className={"site-loader" + (ready ? " is-ready" : "")}
        role="status"
        aria-live="polite"
        aria-hidden={ready || undefined}
      >
        <svg
          className="site-loader-logo"
          viewBox="0 0 38 57"
          aria-hidden="true"
        >
          <path fill="#F24E1E" d="M9.5 0H19V19H9.5a9.5 9.5 0 0 1 0-19Z" />
          <path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19Z" />
          <path fill="#A259FF" d="M9.5 19H19v19H9.5a9.5 9.5 0 0 1 0-19Z" />
          <circle fill="#1ABCFE" cx="28.5" cy="28.5" r="9.5" />
          <path fill="#0ACF83" d="M9.5 38H19v9.5A9.5 9.5 0 1 1 9.5 38Z" />
        </svg>
        <span className="site-loader-track" aria-hidden="true">
          <span />
        </span>
        <span className="site-loader-label">
          {lang === "en" ? "Getting things ready…" : "بنجهّز لك التجربة…"}
        </span>
      </div>
      <noscript>
        <style>{".site-loader{display:none!important}"}</style>
      </noscript>
      <div ref={content} className="site-loader-content" aria-busy={!ready}>
        {children}
      </div>
    </SiteReadyContext.Provider>
  );
}
