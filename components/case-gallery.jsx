"use client";

import { useState } from "react";
import SiteImage from "./site-image";

export default function CaseGallery({ images, title }) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;
  const move = (direction) =>
    setIndex((value) => (value + direction + images.length) % images.length);
  return (
    <section
      className="study-slider"
      role="region"
      aria-roledescription="عارض صور"
      aria-label={`معرض ${title}`}
      onKeyDown={(event) => {
        if (images.length < 2) return;
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
      <figure
        className="study-slide"
        role="group"
        aria-roledescription="شريحة"
        aria-label={`${index + 1} من ${images.length}`}
      >
        <SiteImage
          src={images[index]}
          alt={`${title} — شاشة ${index + 1}`}
          sizes="(max-width: 1200px) 100vw, 1120px"
        />
      </figure>
      {images.length > 1 && (
        <div className="study-slider-controls">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="الصورة السابقة"
          >
            →
          </button>
          <div className="study-slider-dots">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                aria-label={`عرض الصورة ${i + 1}`}
                aria-current={index === i ? "true" : undefined}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <span
            className="study-slide-count" dir="ltr"
            aria-live="polite"
            aria-atomic="true"
          >
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="الصورة التالية"
          >
            ←
          </button>
        </div>
      )}
    </section>
  );
}
