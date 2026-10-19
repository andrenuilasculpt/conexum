/**
 * ServiceCard
 * Módulo de servicio: número, título, descripción, alcance, tecnologías,
 * beneficio para el negocio, mini diagrama original y CTA que abre Contacto con el servicio preseleccionado. `reversed` coloca el diagrama a la izquierda en escritorio.
 */
import { serviceConsultHref, serviceConsultLabel, type Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { ServiceDiagram } from "./diagrams/ServiceDiagram";
import { Badge, ButtonLink, CheckList, Eyebrow } from "./ui/Primitives";

export function ServiceCard({ service, reversed = false, first = false }: { service: Service; reversed?: boolean; first?: boolean }) {
  const titleId = `servicio-${service.id}-titulo`;
  const isPartner = service.id === "partners";
  return (
    <article
      id={service.id}
      aria-labelledby={titleId}
      className={cn(
        "group grid grid-fit-460 items-center gap-x-[72px] gap-y-10 py-[clamp(3.5rem,6vw,5rem)]",
        !first && "border-t border-grey/15",
      )}
    >
      <div className="reveal flex flex-col gap-[22px]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <Eyebrow>{`${service.number} / 06`}</Eyebrow>
          {service.badge && <Badge>{service.badge}</Badge>}
        </div>
        <h2 id={titleId} className="text-module font-semibold">
          {service.title}
        </h2>
        <p className="max-w-[540px] text-[17px] leading-[1.65] text-muted">{service.description}</p>
        <CheckList items={service.scope} />
        <div className="max-w-[540px] border-l-2 border-teal/70 pl-4">
          <p className="font-mono text-[11px] tracking-[0.14em] text-teal">BENEFICIO PARA EL NEGOCIO</p>
          <p className="mt-1.5 text-[15.5px] leading-relaxed text-mist">{service.benefit}</p>
        </div>
        {service.note ? (
          <p className="max-w-[520px] text-sm leading-relaxed text-grey">{service.note}</p>
        ) : null}
        <p className="font-mono text-xs leading-[1.7] tracking-[0.06em] text-steel-light">{service.tags}</p>
        <ButtonLink href={serviceConsultHref(service.id)} variant="ghost" size="sm" arrow className="self-start">
          {serviceConsultLabel}
        </ButtonLink>
      </div>

      <figure
        className={cn(
          "reveal blueprint m-0 rounded-lg border bg-panel p-[clamp(1rem,2.4vw,1.75rem)]",
          isPartner ? "border-teal/35" : "border-grey/20 group-hover:border-teal/55",
          reversed && "xl:order-first",
        )}
      >
        <ServiceDiagram kind={service.id} label={service.diagramLabel} />
        <figcaption className="mt-3.5 font-mono text-[11px] tracking-[0.12em] text-grey">{service.diagramCaption}</figcaption>
      </figure>
    </article>
  );
}
