import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Primitives";
import { siteConfig } from "@/config/site";
import { legalSections, legalHero } from "@/content/legal";

export const metadata: Metadata = {
  title: "Aviso legal, privacidad y cookies",
  description: "Información legal, tratamiento de datos del formulario de contacto y uso de cookies en el sitio web de CONEXUM.",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return (
    <>
      <section aria-labelledby="legal-titulo" className="dot-grid border-b border-grey/15 bg-navy">
        <div className="container-x flex flex-col gap-6 pb-[clamp(3rem,6vw,4.5rem)] pt-[clamp(4rem,9vw,7rem)]">
          <Eyebrow dot className="animate-rise">
            {legalHero.eyebrow}
          </Eyebrow>
          <h1 id="legal-titulo" className="max-w-[900px] animate-rise text-section font-semibold text-balance [animation-delay:.1s]">
            {legalHero.title}
          </h1>
          <p className="max-w-[640px] animate-rise text-lead text-soft [animation-delay:.22s]">{legalHero.lead}</p>
        </div>
      </section>

      <section aria-label="Textos legales" className="bg-navy pb-[clamp(5rem,10vw,8rem)] pt-[clamp(3rem,6vw,5rem)]">
        <div className="container-x flex max-w-[880px] flex-col gap-14">
          {legalSections.map((section) => (
            <article key={section.id} id={section.id} aria-labelledby={`${section.id}-titulo`} className="scroll-mt-28 flex flex-col gap-4">
              <h2 id={`${section.id}-titulo`} className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.02em]">
                {section.title}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 32)} className="text-base leading-[1.7] text-muted">
                  {p.replace("{email}", siteConfig.contactEmail)}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
