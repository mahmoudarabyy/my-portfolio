"use client";

import { useState } from "react";
import SiteImage from "./site-image";

export default function CaseGallery({ images, title, lang = "ar" }) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;
  const pageCount = Math.ceil(images.length / 2);
  const page = index % pageCount;
  const firstImage = page * 2;
  const visibleImages = images.slice(firstImage, firstImage + 2);
  const move = (direction) =>
    setIndex(
      (value) => ((value % pageCount) + direction + pageCount) % pageCount,
    );
  return (
    <section
      className="study-slider"
      role="region"
      aria-roledescription={lang === "en" ? "carousel" : "عارض صور"}
      aria-label={lang === "en" ? `${title} gallery` : `معرض ${title}`}
      onKeyDown={(event) => {
        if (pageCount < 2) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(lang === "en" ? -1 : 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(lang === "en" ? 1 : -1);
        }
      }}
    >
      <div
        className="study-slide-pair"
        role="group"
        aria-roledescription={lang === "en" ? "slide" : "شريحة"}
        aria-label={
          lang === "en"
            ? `Group ${page + 1} of ${pageCount}`
            : `المجموعة ${page + 1} من ${pageCount}`
        }
      >
        {visibleImages.map((src, offset) => (
          <figure className="study-slide" key={`${src}-${firstImage + offset}`}>
            <SiteImage
              src={src}
              alt={`${title} — ${lang === "en" ? "Screen" : "شاشة"} ${firstImage + offset + 1}`}
              sizes="(max-width: 1200px) 50vw, 588px"
            />
          </figure>
        ))}
      </div>
      {pageCount > 1 && (
        <div className="study-slider-controls">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={lang === "en" ? "Previous group" : "المجموعة السابقة"}
          >
            {lang === "en" ? "←" : "→"}
          </button>
          <div className="study-slider-dots">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={
                  lang === "en"
                    ? `Show group ${i + 1}`
                    : `عرض المجموعة ${i + 1}`
                }
                aria-current={page === i ? "true" : undefined}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <span
            className="study-slide-count"
            dir="ltr"
            aria-live="polite"
            aria-atomic="true"
          >
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={lang === "en" ? "Next group" : "المجموعة التالية"}
          >
            {lang === "en" ? "→" : "←"}
          </button>
        </div>
      )}
    </section>
  );
}
