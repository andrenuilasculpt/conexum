/**
 * BrandLogo · LOGO PLACEHOLDER · REEMPLAZAR
 *
 * Lockup temporal (isotipo abstracto + texto CONEXUM) servido desde
 * public/brand/conexum-logo.svg. Para usar el logotipo definitivo basta con
 * sustituir ese archivo (mismo nombre) o cambiar `logoSrc` en src/config/site.ts.
 * No dibujar la marca a mano en otras partes del sitio: usar siempre este componente.
 */
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  logoSrc?: string;
  width?: number;
  height?: number;
  href?: string;
  className?: string;
  eager?: boolean;
};

export function BrandLogo({
  logoSrc = siteConfig.logoSrc,
  width = siteConfig.logoWidth,
  height = siteConfig.logoHeight,
  href = "/",
  className,
  eager = false,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      aria-label="CONEXUM, ir a la página de inicio"
      className={cn("inline-flex min-h-11 items-center", className)}
      data-placeholder="LOGO PLACEHOLDER · REEMPLAZAR"
    >
      <Image src={logoSrc} alt="CONEXUM" width={width} height={height} loading={eager ? "eager" : "lazy"} unoptimized />
    </Link>
  );
}
