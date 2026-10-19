import type { ReactNode } from "react";

/** Transición sutil entre páginas: se vuelve a montar en cada navegación. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
