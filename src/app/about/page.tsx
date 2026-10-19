import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CtaBand } from "@/components/ui/CtaBand";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { aboutClosing, aboutHero, architectureSection, operatingModel, partnersSection, valuesSection, whoWeAre } from "@/content/about";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Sobre CONEXUM · Ingeniería de infraestructuras de red",
  description:
    "CONEXUM es un equipo de ingeniería especializado en diseñar, optimizar y respaldar entornos de red empresariales complejos, con servicio remoto para empresas, MSPs e integradores.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | CONEXUM", description: "La confianza tecnológica se construye con ingeniería.", url: "/about" },
};

function MeshDecoration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 620 520"
      preserveAspectRatio="xMaxYMid meet"
      className="pointer-events-none absolute right-0 top-10 hidden h-[520px] w-[min(46%,620px)] [mask-image:linear-gradient(90deg,transparent_0%,#000_40%)] lg:block"
    >
      <g stroke="#3977C8" strokeOpacity={0.35} strokeWidth={1} fill="none">
        <path d="M120 80L260 40L400 90L540 50M120 80L200 200L340 180L400 90M340 180L480 220L540 50M200 200L150 330L300 320L340 180M300 320L440 360L480 220L590 300M150 330L250 460L420 470L440 360M420 470L570 430L590 300M260 40L340 180M480 220L440 360" />
      </g>
      <path className="flow-dash" d="M120 80L200 200L340 180L480 220L590 300" fill="none" stroke="#18B89C" strokeOpacity={0.6} strokeWidth={1} />
      <g fill="#0D2338" stroke="#6E9FE0" strokeWidth={1.3}>
        {[
          [120, 80, 4],
          [260, 40, 4],
          [400, 90, 5],
          [540, 50, 4],
          [200, 200, 4],
          [340, 180, 6],
          [480, 220, 5],
          [590, 300, 4],
          [150, 330, 4],
          [300, 320, 4],
          [440, 360, 5],
          [250, 460, 4],
          [420, 470, 4],
          [570, 430, 4],
        ].map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <circle className="pulse-ring" cx={340} cy={180} r={10} fill="none" stroke="#18B89C" strokeWidth={1} />
      <circle className="pulse-ring" cx={480} cy={220} r={9} fill="none" stroke="#18B89C" strokeWidth={1} style={{ animationDelay: "1.6s" }} />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="about-titulo" className="relative overflow-hidden border-b border-grey/15 bg-navy">
        <MeshDecoration />
        <div className="container-x relative flex flex-col gap-7 pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(4rem,9vw,8.5rem)]">
          <Eyebrow dot className="animate-rise">
            {aboutHero.eyebrow}
          </Eyebrow>
          <h1 id="about-titulo" className="max-w-[980px] animate-rise text-title font-semibold text-balance [animation-delay:.1s]">
            {aboutHero.title} <span className="text-grey">{aboutHero.titleMuted}</span>
          </h1>
          <p className="max-w-[600px] animate-rise text-lead text-soft [animation-delay:.22s]">{aboutHero.lead}</p>
          <dl className="grid animate-rise grid-fit-230 gap-x-8 gap-y-7 pt-[clamp(1.5rem,4vw,3.5rem)] [animation-delay:.34s]">
            {aboutHero.facts.map((f, i) => (
              <div
                key={f.term}
                className={cn(
                  "flex flex-col gap-2.5 border-t pt-[18px]",
                  i === aboutHero.facts.length - 1 ? "border-teal" : "border-grey/25",
                )}
              >
                <dt className="font-mono text-[11px] tracking-[0.16em] text-grey">{f.term}</dt>
                <dd className="m-0 text-base leading-normal text-haze">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Quiénes somos */}
      <section aria-labelledby="quienes-titulo" className="section-y bg-navy">
        <div className="container-x grid grid-fit-440 items-start gap-x-20 gap-y-10">
          <div className="reveal flex flex-col gap-6">
            <Eyebrow>{whoWeAre.index}</Eyebrow>
            <h2 id="quienes-titulo" className="text-[clamp(1.625rem,2.8vw,2.375rem)] font-medium leading-tight tracking-[-0.025em] text-pretty">
              {whoWeAre.statement}
            </h2>
          </div>
          <div className="reveal flex flex-col gap-5 pt-[clamp(0rem,3vw,2.75rem)] text-[17px] leading-[1.7] text-muted">
            {whoWeAre.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <div className="mt-3 flex flex-col gap-4 border-t border-grey/20 pt-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-grey">{whoWeAre.approachTitle}</p>
              <ul className="grid grid-fit-220 gap-x-6 gap-y-3 text-[15px] leading-snug text-mist">
                {whoWeAre.approach.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[7px] size-1.5 flex-none rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Arquitectura lógica */}
      <section aria-labelledby="arquitectura-titulo" className="bg-navy pb-[clamp(5rem,10vw,8.5rem)]">
        <div className="container-x">
          <div className="border-t border-grey/15 pt-[clamp(4rem,8vw,6.5rem)]">
            <SectionHeading id="arquitectura-titulo" className="mb-[clamp(2.5rem,5vw,4rem)]" {...architectureSection} />
          </div>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Valores */}
      <section aria-labelledby="valores-titulo" className="section-y border-t border-grey/15 bg-deep">
        <div className="container-x">
          <SectionHeading id="valores-titulo" className="mb-[clamp(2.5rem,5vw,4rem)]" {...valuesSection} />
          <ol className="border-t border-grey/20">
            {valuesSection.values.map((v, i) => (
              <li
                key={v.title}
                className="reveal group grid grid-fit-320 items-baseline gap-x-12 gap-y-2.5 border-b border-grey/20 py-[30px]"
              >
                <div className="flex items-baseline gap-5">
                  <span className={cn("font-mono text-xs", i === valuesSection.values.length - 1 ? "text-teal" : "text-steel-light")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold tracking-[-0.03em] transition-colors group-hover:text-teal">
                    {v.title}
                  </h3>
                </div>
                <p className="max-w-[560px] text-[17px] leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Modelo operacional */}
      <section aria-labelledby="modelo-titulo" className="section-y bg-navy">
        <div className="container-x">
          <SectionHeading id="modelo-titulo" className="mb-[clamp(2.5rem,5vw,4rem)]" {...operatingModel} />
          <ul className="grid grid-fit-320 border-l border-t border-grey/20">
            {operatingModel.items.map((item, i) => (
              <li key={item.title} className="reveal flex flex-col gap-3.5 border-b border-r border-grey/20 p-[clamp(1.5rem,3vw,2.25rem)]">
                <span className="font-mono text-[11px] tracking-[0.16em] text-teal">PASO · {String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[21px] font-semibold tracking-[-0.015em]">{item.title}</h3>
                <p className="text-[15.5px] leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" aria-labelledby="partners-titulo" className="section-y bg-ink text-navy">
        <div className="container-x">
          <SectionHeading id="partners-titulo" tone="light" className="mb-[clamp(2.5rem,5vw,4rem)]" {...partnersSection} />
          <FlowDiagram
            nodes={partnersSection.flow}
            bidirectional={[true, true]}
            ariaLabel={partnersSection.flowAria}
            tone="light"
            size="lg"
            className="reveal mb-[clamp(2.5rem,5vw,4rem)]"
          />
          <ul className="grid grid-fit-280 gap-x-10 gap-y-8">
            {partnersSection.points.map((p) => (
              <li key={p.title} className="reveal flex flex-col gap-3 border-t border-navy/15 pt-[22px]">
                <h3 className="text-xl font-semibold tracking-[-0.01em]">{p.title}</h3>
                <p className="text-base leading-relaxed text-graphite">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand id="cierre-about" tone="dark" {...aboutClosing} />
    </>
  );
}
