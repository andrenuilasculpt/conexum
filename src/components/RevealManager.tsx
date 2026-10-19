"use client";

/**
 * Activa la aparición suave de los elementos `.reveal` al entrar en pantalla (una sola vez).
 * - Lo que ya está visible al cargar se marca de inmediato (sin parpadeo).
 * - Sin JavaScript, sin IntersectionObserver o con prefers-reduced-motion no se oculta nada.
 * - Se vuelve a escanear en cada cambio de ruta.
 */
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const scan = () => {
      const viewport = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".reveal:not([data-revealed])").forEach((el) => {
        if (el.getBoundingClientRect().top < viewport) el.setAttribute("data-revealed", "");
        else io.observe(el);
      });
    };

    scan();
    document.documentElement.setAttribute("data-reveal", "on");
    const raf = requestAnimationFrame(scan);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
