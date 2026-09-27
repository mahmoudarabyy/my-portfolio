"use client";
import { useEffect, useState } from "react";
const parts = [
  ["أصمّم", "purple-highlight"],
  [" تجارب رقمية تجمع", ""],
  ["بين البساطة، الوظيفة، ", ""],
  ["والتأثير.", "green-highlight"],
];
const length = parts.reduce((sum, [text]) => sum + text.length, 0);
export default function HeroTitle() {
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
  }, []);
  let offset = 0;
  return (
    <h1
      className="hero-title"
      aria-label="أصمّم تجارب رقمية تجمع بين البساطة، الوظيفة، والتأثير."
    >
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
    </h1>
  );
}
