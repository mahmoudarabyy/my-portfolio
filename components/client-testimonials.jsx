"use client";
import { ui } from "../lib/ui";
import { useState } from "react";
import Reveal from "./reveal";

export default function ClientTestimonials({ testimonials, lang = "ar" }) {
  const t = (text) => ui(lang, text);
  const [page, setPage] = useState(0);
  if (!testimonials.length) return null;
  const pages =
    testimonials.length <= 3
      ? testimonials.length
      : Math.ceil(testimonials.length / 2);
  const currentPage = Math.min(page, pages - 1);
  const start = testimonials.length <= 3 ? currentPage : currentPage * 2;
  const items =
    testimonials.length <= 3
      ? [
          testimonials[start],
          ...(testimonials.length > 1
            ? [testimonials[(start + 1) % testimonials.length]]
            : []),
        ]
      : testimonials.slice(start, start + 2);
  return (
    <Reveal as="section" className="client-voices" id="testimonials">
      <div className="feedback-container">
        <header className="client-voices-heading">
          <p>{t("آراء عملائي")}</p>
          <h2>{t("كلمات من القلب")}</h2>
        </header>
        <div
          className="client-voices-grid"
          aria-live="polite"
          aria-atomic="true"
        >
          {items.map((item) => {
            const rating =
              Number.isInteger(item.rating) &&
              item.rating >= 1 &&
              item.rating <= 5
                ? item.rating
                : item.sample
                  ? 5
                  : null;
            return (
              <figure className="client-voice" key={item._id}>
                {rating ? (
                  <div
                    className="client-voice-stars"
                    role="img"
                    aria-label={
                      lang === "en"
                        ? `Rated ${rating} out of 5`
                        : `التقييم ${rating} من 5`
                    }
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <svg
                        key={index}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className={index < rating ? "" : "star-empty"}
                      >
                        <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z" />
                      </svg>
                    ))}
                  </div>
                ) : (
                  <div className="client-voice-stars" aria-hidden="true" />
                )}
                <blockquote>«{item.quote}»</blockquote>
                <figcaption>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </figcaption>
              </figure>
            );
          })}
          {testimonials.length > 1 && items.length === 1 && (
            <div
              className="client-voice client-voice-placeholder"
              aria-hidden="true"
            />
          )}
        </div>
        {pages > 1 && (
          <div
            className="voices-pagination"
            role="group"
            aria-label={t("تغيير آراء العملاء")}
          >
            {Array.from({ length: pages }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={
                  lang === "en"
                    ? `Show review group ${index + 1}`
                    : `عرض مجموعة الآراء ${index + 1}`
                }
                aria-pressed={currentPage === index}
                onClick={() => setPage(index)}
              >
                <span />
              </button>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
