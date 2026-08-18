import React, { useEffect, useRef } from "react";

/**
 * Site-wide premium backdrop: layered aurora gradient blobs + noise grain.
 * Rendered once in _app so every page shares the same dimensional backdrop.
 * Blob drift only animates when the user has not opted into reduced motion.
 */
export const Aurora = () => {
  const backdropRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !backdropRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const blobs = backdropRef.current.querySelectorAll(".blob");
    blobs.forEach((blob, i) => {
      blob.classList.add("animate-blob");
      blob.style.animationDelay = `${i * -6}s`;
      blob.style.animationDuration = `${18 + i * 4}s`;
    });
  }, []);

  return (
    <>
      <div ref={backdropRef} className="aurora-backdrop" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
};

export default Aurora;
