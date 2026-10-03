"use client";
import { useEffect, useState } from "react";
const arabicParts = [
  ["أصمّم", "purple-highlight"],
  [" تجارب رقمية تجمع", ""],
  ["بين البساطة، الوظيفة، ", ""],
  ["والتأثير.", "green-highlight"],
];

export default function HeroTitle({ lang = "ar", title }) {
  const parts =
    lang === "ar" &&
    (!title ||
      title === "أصمّم تجارب رقمية تجمع بين البساطة، الوظيفة، والتأثير.")
      ? arabicParts
      : lang === "en" &&
          (!title ||
            title ===
              "I design digital experiences with simplicity, purpose, and impact.")
        ? [
            ["I design", "purple-highlight"],
            [" digital experiences", ""],
            [" with simplicity, purpose, and ", ""],
            ["impact.", "green-highlight"],
          ]
        : [
            [
              title ||
                (lang === "en"
                  ? "I design digital experiences with simplicity, purpose, and impact."
                  : "أصمّم تجارب رقمية تجمع بين البساطة، الوظيفة، والتأثير."),
              "",
            ],
          ];
  const length = parts.reduce((sum, [text]) => sum + text.length, 0);
  const [count, setCount] = useState(length);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer;
    let current = 0;
    setCount(0);
    const tick = () => {
      current += 1;
      setCount(current);
      if (current < length) timer = setTimeout(tick, 30);
    };
    timer = setTimeout(tick, 250);
    return () => clearTimeout(timer);
  }, [length, title, lang]);
  let offset = 0;
  return (
    <h1
      className="hero-title"
      aria-label={parts.map(([text]) => text).join(" ")}
    >
      <span className="hero-title-space" aria-hidden="true">
        {parts.map(([text, className], index) => (
          <span key={index}>
            {index === 2 && <br className="title-break" />}
            <span className={className}>{text}</span>
          </span>
        ))}
        <span className="typing-cursor finished" />
      </span>
      <span className="hero-title-animated" aria-hidden="true">
        {parts.map(([text, className], index) => {
          const visible = text.slice(0, Math.max(0, count - offset));
          offset += text.length;
          return (
            <span key={index} aria-hidden="true">
              {index === 2 && <br className="title-break" />}
              <span className={className}>{visible}</span>
            </span>
          );
        })}
        <span
          aria-hidden="true"
          className={`typing-cursor ${count === length ? "finished" : ""}`}
        />
      </span>
    </h1>
  );
}
