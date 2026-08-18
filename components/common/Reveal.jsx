import React, { useEffect, useRef } from "react";

/**
 * Scroll-triggered reveal wrapper.
 * Usage:
 *   <Reveal className="stagger-1" variant="up|left|right|zoom">...</Reveal>
 * Respects prefers-reduced-motion (reveal becomes static via CSS override).
 */
export const Reveal = ({
  children,
  className = "",
  variant = "up",
  as: Tag = "div",
  delay = 0,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      if (el) el.classList.add("reveal-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base =
    variant === "left"
      ? "reveal reveal-left"
      : variant === "right"
      ? "reveal reveal-right"
      : variant === "zoom"
      ? "reveal reveal-zoom"
      : "reveal";

  return (
    <Tag ref={ref} className={`${base} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
};

export default Reveal;
