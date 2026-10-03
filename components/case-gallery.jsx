"use client";

import { useState } from "react";
import SiteImage from "./site-image";

export default function CaseGallery({ images, title }) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;
  const pageCount = Math.ceil(images.length / 2);
  const page = index % pageCount;
  const firstImage = page * 2;
  const visibleImages = images.slice(firstImage, firstImage + 2);
  const move = (direction) =>
    setIndex((value) => (value % pageCount + direction + pageCount) % pageCount);
  return (
    <section
      className="study-slider"
      role="region"
      aria-roledescription="عارض صور"
      aria-label={`معرض ${title}`}
      onKeyDown={(event) => {
        if (pageCount < 2) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      <div className="study-slide-pair" role="group" aria-roledescription="شريحة" aria-label={`المجموعة ${page + 1} من ${pageCount}`}>
        {visibleImages.map((src, offset) => (
          <figure className="study-slide" key={`${src}-${firstImage + offset}`}>
            <SiteImage
              src={src}
              alt={`${title} — شاشة ${firstImage + offset + 1}`}
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
            aria-label="المجموعة السابقة"
          >
            →
          </button>
          <div className="study-slider-dots">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`عرض المجموعة ${i + 1}`}
                aria-current={page === i ? "true" : undefined}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <span
            className="study-slide-count" dir="ltr"
            aria-live="polite"
            aria-atomic="true"
          >
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="المجموعة التالية"
          >
            ←
          </button>
        </div>
      )}
    </section>
  );
}
