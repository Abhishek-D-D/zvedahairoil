"use client";

/**
 * hooks/useScrollProgress.ts
 *
 * Tracks scroll progress (0 → 1) within a section or the entire page.
 * Updates via requestAnimationFrame — no layout thrashing.
 *
 * @example — section progress
 * const [sectionRef, progress] = useScrollProgress();
 * <section ref={sectionRef}>
 *   <div style={{ scaleX: progress }} />
 * </section>
 *
 * @example — page progress
 * const [, progress] = useScrollProgress(); // pass null containerRef
 */

import { useRef, useState, useEffect, type RefObject } from "react";

type UseScrollProgressReturn = [RefObject<HTMLDivElement | null>, number];

export function useScrollProgress(): UseScrollProgressReturn {
  const ref = useRef<HTMLDivElement>(null!);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    function update() {
      const el = ref.current;
      if (!el) {
        setProgress(0);
        return;
      }

      const { top, height } = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // 0 when top of section hits bottom of viewport
      // 1 when bottom of section hits top of viewport
      const raw = (viewHeight - top) / (viewHeight + height);
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    function onScroll() {
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return [ref, progress];
}
