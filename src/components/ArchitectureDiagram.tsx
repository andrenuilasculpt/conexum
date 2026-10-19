/**
 * Arquitectura lógica de referencia (About).
 * HTML responsive: capas apiladas con seguridad y observabilidad transversales.
 * En móvil las bandas laterales pasan a horizontal (ver .arch-* en globals.css).
 */
import { architectureSection } from "@/content/about";
import { cn } from "@/lib/cn";

export function ArchitectureDiagram() {
  const a = architectureSection;
  return (
    <figure aria-labelledby="arquitectura-caption" className="reveal m-0 rounded-[10px] border border-grey/20 bg-panel p-[clamp(0.875rem,2.4vw,1.75rem)]">
      <div className="arch-grid">
        <div className="arch-side arch-side--flip border border-teal/50 bg-teal/[0.06] text-teal">{a.security}</div>
        <div className="relative flex flex-col gap-3.5">
          <span aria-hidden="true" className="arch-spine" />
          <span aria-hidden="true" className="arch-signal" />
          {a.layers.map((layer) => (
            <div
              key={layer.code}
              className={cn(
                "arch-layer relative rounded-md border bg-layer px-5 py-[18px] transition-colors hover:border-teal/60",
                layer.highlight ? "border-teal/45" : "border-grey/20",
              )}
            >
              <div className="flex flex-col gap-1">
                <span className={cn("font-mono text-[11px] tracking-[0.14em]", layer.highlight ? "text-teal" : "text-grey")}>
                  {layer.code}
                </span>
                <span className="text-lg font-semibold">{layer.name}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li key={item} className="rounded-[3px] border border-steel-light/35 bg-panel px-3 py-[7px] text-[13px] text-mist">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="arch-side border border-steel-light/50 bg-steel/[0.07] text-steel-light">{a.observability}</div>
      </div>
      <figcaption id="arquitectura-caption" className="mt-[18px] font-mono text-[11px] leading-relaxed tracking-[0.12em] text-grey">
        {a.caption}
      </figcaption>
    </figure>
  );
}
