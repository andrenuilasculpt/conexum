import type { Metadata } from "next";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { ButtonLink, Eyebrow } from "@/components/ui/Primitives";
import { methodSection, serviceCta, services, servicesClosing, servicesHero } from "@/content/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Servicios de ingeniería de redes, SD-WAN, NOC y ciberseguridad",
  description:
    "Ingeniería de redes corporativas, SD-WAN y Cloud Networking, NOC y monitorización, ciberseguridad y Zero Trust, arquitectura tecnológica y servicios B2B para integradores y MSPs.",
  alternates: { canonical: "/servicios" },
  openGraph: { title: "Servicios | CONEXUM", description: "Ingeniería de red, del diseño a la operación diaria.", url: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="servicios-titulo" className="dot-grid border-b border-grey/15 bg-navy">
        <div className="container-x flex flex-col gap-7 pb-[clamp(3rem,6vw,5rem)] pt-[clamp(4rem,9vw,8.5rem)]">
          <Eyebrow dot className="animate-rise">
            {servicesHero.eyebrow}
          </Eyebrow>
          <h1 id="servicios-titulo" className="max-w-[1000px] animate-rise text-title font-semibold text-balance [animation-delay:.1s]">
            {servicesHero.title} <span className="text-grey">{servicesHero.titleMuted}</span>
          </h1>
          <p className="max-w-[620px] animate-rise text-lead text-soft [animation-delay:.22s]">{servicesHero.lead}</p>
          <nav aria-label="Índice de servicios" className="animate-rise pt-[clamp(1.5rem,4vw,3.5rem)] [animation-delay:.34s]">
            <ul className="grid grid-fit-160 gap-x-6 gap-y-5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex min-h-11 flex-col gap-2 border-t border-grey/25 pt-4 text-[15px] font-semibold leading-snug text-mist transition-colors hover:border-teal hover:text-ink"
                  >
                    <span className="font-mono text-[11px] font-normal tracking-[0.14em] text-grey">{s.number}</span>
                    {s.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Líneas de servicio */}
      <section aria-label="Líneas de servicio" className="bg-navy pb-[clamp(2rem,4vw,3rem)]">
        <div className="container-x">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} reversed={i % 2 === 1} first={i === 0} />
          ))}
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section aria-labelledby="metodo-titulo" className="section-y border-t border-grey/15 bg-deep">
        <div className="container-x grid grid-fit-420 items-start gap-x-20 gap-y-12">
          <div className="reveal flex flex-col gap-6">
            <Eyebrow>{methodSection.eyebrow}</Eyebrow>
            <h2 id="metodo-titulo" className="text-section font-semibold text-balance">
              {methodSection.title}
            </h2>
            <p className="max-w-[460px] text-lg leading-relaxed text-muted">{methodSection.intro}</p>
            <ol aria-label="Fases del modelo de trabajo" className="flex flex-wrap items-center gap-x-2 gap-y-2.5 font-mono text-[11px] tracking-[0.12em] text-mist">
              {methodSection.steps.map((step, i) => (
                <li key={step.title} className="flex items-center gap-2">
                  <span className={cn("rounded-[3px] border px-2 py-1", i === methodSection.steps.length - 1 ? "border-teal/60 text-teal" : "border-grey/30")}>
                    {step.title.toUpperCase()}
                  </span>
                  {i < methodSection.steps.length - 1 && (
                    <span aria-hidden="true" className="text-steel-light">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <ButtonLink href={serviceCta.href} arrow className="mt-2 self-start">
              {serviceCta.label}
            </ButtonLink>
          </div>
          <ol className="flex flex-col">
            {methodSection.steps.map((step, i) => {
              const last = i === methodSection.steps.length - 1;
              return (
                <li key={step.title} className={cn("reveal relative grid grid-cols-[44px_minmax(0,1fr)] gap-5", !last && "pb-9")}>
                  {!last && <span aria-hidden="true" className="absolute bottom-0 left-[21px] top-11 w-px bg-grey/30" />}
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-full border font-mono text-xs",
                      last ? "border-teal bg-teal/10" : "border-steel-light",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2 pt-[9px]">
                    <h3 className="text-[22px] font-semibold tracking-[-0.015em]">{step.title}</h3>
                    <p className="text-base leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <CtaBand id="cierre-servicios" tone="light" {...servicesClosing} />
    </>
  );
}
