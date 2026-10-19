import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui/Primitives";
import { siteConfig } from "@/config/site";
import { contactAside, contactHero } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contacto · Solicite una conversación técnica",
  description:
    "Hablemos del siguiente reto de su infraestructura. Cuéntenos qué necesita su organización y le propondremos una primera conversación técnica.",
  alternates: { canonical: "/contacto" },
  openGraph: { title: "Contacto | CONEXUM", description: "Hablemos del siguiente reto de su infraestructura.", url: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="contacto-titulo" className="dot-grid border-b border-grey/15 bg-navy">
        <div className="container-x flex flex-col gap-7 pb-[clamp(3rem,6vw,5rem)] pt-[clamp(4rem,9vw,8rem)]">
          <Eyebrow dot blink className="animate-rise">
            {contactHero.eyebrow}
          </Eyebrow>
          <h1 id="contacto-titulo" className="max-w-[1000px] animate-rise text-title font-semibold text-balance [animation-delay:.1s]">
            {contactHero.title} <span className="text-grey">{contactHero.titleMuted}</span>
          </h1>
          <p className="max-w-[600px] animate-rise text-lead text-soft [animation-delay:.22s]">{contactHero.lead}</p>
        </div>
      </section>

      {/* Formulario + información */}
      <section id="formulario" aria-label="Formulario de contacto" className="bg-navy pb-[clamp(5rem,10vw,8rem)] pt-[clamp(3.5rem,7vw,6rem)]">
        <div className="container-x flex flex-wrap items-start gap-x-14 gap-y-10">
          <div className="min-w-0 flex-[999_1_560px] rounded-[10px] border border-grey/20 bg-panel p-[clamp(1.375rem,3.4vw,2.75rem)]">
            <ContactForm />
          </div>

          <aside aria-label="Información de contacto" className="flex min-w-0 flex-[1_1_320px] flex-col gap-5">
            <div className="flex flex-col gap-3 rounded-[10px] border border-grey/20 p-[26px]">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] tracking-[0.16em] text-grey">CORREO</p>
                {siteConfig.contactEmailIsProvisional && (
                  <span className="rounded-[3px] border border-grey/40 px-2 py-1 font-mono text-[10.5px] tracking-[0.12em] text-grey">
                    PROVISIONAL
                  </span>
                )}
              </div>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-[22px] font-semibold tracking-[-0.01em] text-ink [overflow-wrap:anywhere]"
              >
                {siteConfig.contactEmail}
              </a>
              <p className="text-[13px] leading-normal text-grey">{contactAside.emailNote}</p>
            </div>

            <div className="flex flex-col gap-[18px] rounded-[10px] border border-grey/20 p-[26px]">
              <p className="font-mono text-[11px] tracking-[0.16em] text-grey">{contactAside.nextStepsTitle}</p>
              <ol className="flex flex-col gap-4">
                {contactAside.nextSteps.map((step, i) => (
                  <li key={step} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3">
                    <span className="pt-0.5 font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[15px] leading-normal text-mist">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-2.5 rounded-[10px] border border-teal/35 bg-teal/5 p-[26px]">
              <p className="font-mono text-[11px] tracking-[0.16em] text-teal">{contactAside.partnerTitle}</p>
              <p className="text-[15px] leading-relaxed text-mist">{contactAside.partnerText}</p>
            </div>

            <p className="px-1 text-[13px] leading-relaxed text-grey">{contactAside.coverage}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
