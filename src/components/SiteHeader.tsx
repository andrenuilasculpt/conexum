"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "./BrandLogo";
import { ButtonLink } from "./ui/Primitives";
import { CloseIcon, MenuIcon } from "./ui/Icons";

const navLinkClass =
  "relative inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors hover:text-ink aria-[current=page]:text-ink " +
  "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-teal after:transition-transform after:duration-300 " +
  "hover:after:scale-x-100 aria-[current=page]:after:scale-x-100";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="glass sticky top-0 z-50 border-b border-grey/15">
      <div className="container-x flex h-[76px] items-center justify-between gap-6">
        <BrandLogo eager />

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <ButtonLink href={siteConfig.primaryCta.href} size="sm">
              {siteConfig.primaryCta.label}
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded border border-ink/25 text-ink lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-movil" className="absolute inset-x-0 top-full border-b border-grey/20 bg-navy lg:hidden">
          <div className="container-x pb-7 pt-2">
            <nav aria-label="Menú móvil" className="flex flex-col">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-[58px] items-center border-b border-grey/15 text-[22px] font-semibold tracking-[-0.01em] text-ink hover:text-teal aria-[current=page]:text-teal"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3.5 pt-6">
              <ButtonLink href={siteConfig.primaryCta.href} onClick={close} className="w-full">
                {siteConfig.primaryCta.label}
              </ButtonLink>
              <p className="font-mono text-xs tracking-[0.04em] text-grey">
                {siteConfig.contactEmail}
                {siteConfig.contactEmailIsProvisional && " · correo provisional"}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
