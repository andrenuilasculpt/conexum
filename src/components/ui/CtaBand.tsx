import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { ButtonLink, Eyebrow, TextLink } from "./Primitives";

/** Bloque de cierre de alto contraste. "light" sobre blanco de marca, "dark" sobre navy. */
export function CtaBand({
  id,
  tone = "light",
  eyebrow,
  title,
  text,
  cta,
  secondary,
}: {
  id: string;
  tone?: "light" | "dark";
  eyebrow?: string;
  title: string;
  text: string;
  cta: { href: string; label: string };
  /** Sin valor: enlace al correo de contacto. */
  secondary?: { href: string; label: string };
}) {
  const light = tone === "light";
  return (
    <section aria-labelledby={id} className={cn(light ? "bg-ink text-navy" : "border-t border-grey/15 bg-navy text-ink")}>
      <div className="container-x grid grid-fit-440 items-end gap-x-[72px] gap-y-10 py-[clamp(5rem,10vw,8rem)]">
        <div className="flex flex-col gap-5">
          {eyebrow && (
            <Eyebrow dot tone={light ? "light" : "dark"}>
              {eyebrow}
            </Eyebrow>
          )}
          <h2 id={id} className="text-closing font-semibold text-balance">
            {title}
          </h2>
        </div>
        <div className="flex flex-col gap-7">
          <p className={cn("max-w-[500px] text-lg leading-relaxed", light ? "text-graphite" : "text-muted")}>{text}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <ButtonLink href={cta.href} variant={light ? "dark" : "primary"} arrow>
              {cta.label}
            </ButtonLink>
            {secondary ? (
              light ? (
                <TextLink href={secondary.href} tone="light">
                  {secondary.label}
                </TextLink>
              ) : (
                <ButtonLink href={secondary.href} variant="ghost">
                  {secondary.label}
                </ButtonLink>
              )
            ) : (
              <TextLink href={`mailto:${siteConfig.contactEmail}`} tone={light ? "light" : "dark"}>
                {siteConfig.contactEmail}
              </TextLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
