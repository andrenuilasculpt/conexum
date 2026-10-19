import { CollaborationTabs } from "@/components/CollaborationTabs";
import { NetworkTopologyHero } from "@/components/NetworkTopologyHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { capabilityIcons, CheckIcon } from "@/components/ui/Icons";
import { Badge, ButtonLink, Eyebrow, SectionHeading, TextLink } from "@/components/ui/Primitives";
import { siteConfig } from "@/config/site";
import { capabilities, capabilitiesSection, healthCheck, homeClosing, lifecycle, lifecycleSection } from "@/content/home";
import { cn } from "@/lib/cn";

export default function HomePage() {
  return (
    <>
      <NetworkTopologyHero />

      {/* Ecosistemas: solo texto, sin logotipos ni insinuar partnership */}
      <section aria-label="Ecosistemas tecnológicos" className="border-b border-grey/15 bg-navy">
        <div className="container-x flex flex-wrap items-center gap-x-10 gap-y-3.5 py-7">
          <p className="font-mono text-xs tracking-[0.14em] text-grey">EXPERIENCIA TÉCNICA SOBRE</p>
          <ul className="flex flex-wrap gap-x-[30px] gap-y-2.5 text-[15px] font-semibold text-mist">
            {siteConfig.technologies.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capacidades */}
      <section id="capacidades" aria-labelledby="capacidades-titulo" className="section-y bg-navy">
        <div className="container-x">
          <SectionHeading id="capacidades-titulo" {...capabilitiesSection} />
          <ul className="grid grid-fit-250 gap-x-8 gap-y-12">
            {capabilities.map((c) => {
              const Icon = capabilityIcons[c.icon];
              return (
                <li
                  key={c.title}
                  className="reveal flex flex-col gap-[18px] border-t border-grey/25 pt-7 hover:border-teal"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="text-steel-light" />
                    <span className="font-mono text-xs text-grey">{c.number}</span>
                  </div>
                  <h3 className="text-[22px] font-semibold tracking-[-0.015em]">{c.title}</h3>
                  <p className="text-[15.5px] leading-relaxed text-muted">{c.text}</p>
                  <p className="mt-auto font-mono text-xs tracking-[0.05em] text-steel-light">{c.tags}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* De la arquitectura a la operación */}
      <section aria-labelledby="ciclo-titulo" className="section-y bg-ink text-navy">
        <div className="container-x">
          <SectionHeading id="ciclo-titulo" tone="light" {...lifecycleSection} />
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-x-0 top-[11px] hidden h-px bg-navy/15 xl:block">
              <span className="lifecycle-traveller absolute -top-[3.5px] left-0 size-2 rounded-full bg-teal" />
            </div>
            <ol className="relative grid grid-fit-230 gap-x-8 gap-y-12">
              {lifecycle.map((stage) => (
                <li key={stage.title} className="reveal flex flex-col gap-4">
                  <div className="flex items-center gap-3.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-[23px] items-center justify-center rounded-full border-[1.5px] bg-ink",
                        stage.operate ? "border-teal-dark" : "border-steel-dark",
                      )}
                    >
                      <span className={cn("size-[7px] rounded-full", stage.operate ? "bg-teal" : "bg-steel-dark")} />
                    </span>
                    <span className="relative bg-ink pr-3 font-mono text-xs tracking-[0.14em] text-graphite">{stage.phase}</span>
                  </div>
                  <h3 className="text-[clamp(1.625rem,2.4vw,2rem)] font-semibold tracking-[-0.025em]">{stage.title}</h3>
                  <p className="text-base leading-relaxed text-graphite">{stage.text}</p>
                  <p
                    className={cn(
                      "mt-auto border-t border-navy/10 pt-3.5 font-mono text-xs tracking-[0.06em]",
                      stage.operate ? "text-teal-dark" : "text-steel-dark",
                    )}
                  >
                    {stage.tags}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CollaborationTabs />

      {/* Cisco Network Health Check */}
      <section id="health-check" aria-labelledby="health-check-titulo" className="section-y border-y border-grey/15 bg-deep">
        <div className="container-x grid grid-fit-440 items-center gap-x-[72px] gap-y-14">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <Eyebrow>{healthCheck.index}</Eyebrow>
              <Badge>{healthCheck.badge}</Badge>
            </div>
            <h2 id="health-check-titulo" className="text-[clamp(2.125rem,4.6vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
              {healthCheck.title}
            </h2>
            <p className="max-w-[540px] text-lg leading-relaxed text-soft">{healthCheck.text}</p>
            <ul className="flex flex-col gap-3 text-base text-mist">
              {healthCheck.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckIcon className="mt-[3px] flex-none text-teal" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="max-w-[520px] text-[13px] leading-relaxed text-grey">{healthCheck.note}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <ButtonLink href={healthCheck.cta.href} arrow>
                {healthCheck.cta.label}
              </ButtonLink>
              <TextLink href={healthCheck.secondary.href}>{healthCheck.secondary.label}</TextLink>
            </div>
          </div>

          <div className="reveal overflow-hidden rounded-lg border border-grey/25 bg-panel">
            <div className="flex items-center justify-between gap-3 border-b border-grey/15 px-6 py-[18px]">
              <p className="font-mono text-[11px] tracking-[0.14em] text-grey">{healthCheck.reportTitle}</p>
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2 rounded-[2px] bg-steel" />
                <span className="size-2 rounded-[2px] bg-teal" />
                <span className="size-2 rounded-[2px] border border-grey" />
              </span>
            </div>
            <ol>
              {healthCheck.report.map((item, i) => {
                const last = i === healthCheck.report.length - 1;
                return (
                  <li
                    key={item.title}
                    className={cn("grid grid-cols-[44px_minmax(0,1fr)] gap-3 px-6 py-[18px]", !last && "border-b border-grey/10")}
                  >
                    <span className={cn("pt-[3px] font-mono text-xs", last ? "text-teal" : "text-steel-light")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-base font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-normal text-muted">{item.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand id="cierre-home" tone="light" {...homeClosing} />
    </>
  );
}
