"use client";

import { useEffect, useRef } from "react";

// Progressive enhancement: content remains visible without JS or animation support.
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...props
}) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      !node ||
      !node.animate ||
      !window.IntersectionObserver ||
      motion.matches
    )
      return;
    let animation;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (motion.matches) return;
        animation = node.animate(
          [
            { opacity: 0, transform: "translateY(24px)", filter: "blur(4px)" },
            { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
          ],
          {
            duration: 650,
            delay: Math.min(delay, 180),
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "backwards",
          },
        );
      },
      { threshold: 0, rootMargin: "0px 0px -32px 0px" },
    );
    observer.observe(node);
    const stop = () => {
      if (motion.matches) {
        animation?.cancel();
        observer.disconnect();
      }
    };
    motion.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animation?.cancel();
      motion.removeEventListener("change", stop);
    };
  }, [delay]);
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...props}>
      {children}
    </Tag>
  );
}
