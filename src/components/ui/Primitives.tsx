import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRightIcon, CheckIcon } from "./Icons";

type Tone = "dark" | "light";

/* ---------------------------------------------------------------- Eyebrow */
export function Eyebrow({
  children,
  dot = false,
  blink = false,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  dot?: boolean;
  blink?: boolean;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-label uppercase",
        tone === "dark" ? "text-grey" : "text-graphite",
        className,
      )}
    >
      {dot && <span aria-hidden="true" className={cn("size-[7px] flex-none rounded-full bg-teal", blink && "animate-blink")} />}
      {children}
    </p>
  );
}

/* ---------------------------------------------------------------- Badge */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-[3px] border border-teal/55 px-[9px] py-[5px] font-mono text-[11px] tracking-[0.14em] text-teal",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- SectionHeading */
export function SectionHeading({
  index,
  title,
  intro,
  id,
  tone = "dark",
  className,
}: {
  index: string;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("mb-[clamp(3rem,6vw,5rem)] grid grid-fit-420 items-end gap-x-16 gap-y-6", className)}>
      <div className="reveal">
        <Eyebrow tone={tone} className="mb-5">
          {index}
        </Eyebrow>
        <h2 id={id} className="text-section font-semibold text-balance">
          {title}
        </h2>
      </div>
      {intro && (
        <p className={cn("reveal max-w-[520px] text-lg leading-relaxed", tone === "dark" ? "text-muted" : "text-graphite")}>
          {intro}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- Botones */
const buttonVariants = {
  primary: "border-teal bg-teal text-navy hover:border-teal-bright hover:bg-teal-bright hover:text-navy",
  ghost: "border-ink/30 bg-transparent text-ink hover:border-ink hover:bg-ink/5 hover:text-ink",
  dark: "border-navy bg-navy text-ink hover:border-deep hover:bg-deep hover:text-ink",
} as const;

const buttonSizes = {
  md: "min-h-12 px-[22px] text-[15px]",
  sm: "min-h-11 px-[18px] text-sm",
} as const;

export const buttonBase =
  "group inline-flex items-center justify-center gap-2.5 rounded border font-semibold leading-tight transition-colors";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className={cn(buttonBase, buttonSizes[size], buttonVariants[variant], className)}>
      {children}
      {arrow && <ArrowRightIcon className="flex-none transition-transform group-hover:translate-x-[3px]" />}
    </Link>
  );
}

export function buttonClass(variant: keyof typeof buttonVariants, className?: string, size: keyof typeof buttonSizes = "md") {
  return cn(buttonBase, buttonSizes[size], buttonVariants[variant], className);
}

/* ---------------------------------------------------------------- TextLink */
export function TextLink({
  href,
  children,
  tone = "dark",
  arrow = false,
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  arrow?: boolean;
  className?: string;
}) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http");
  const classes = cn(
    "group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold",
    tone === "dark" ? "text-ink hover:text-teal" : "text-navy hover:text-teal-dark",
    className,
  );
  const inner = (
    <>
      <span
        className={cn(
          "border-b pb-[3px] transition-colors",
          tone === "dark" ? "border-teal/55 group-hover:border-teal" : "border-navy/35 group-hover:border-teal-dark",
        )}
      >
        {children}
      </span>
      {arrow && <ArrowRightIcon className="transition-transform group-hover:translate-x-[3px]" />}
    </>
  );
  return isExternal ? (
    <a href={href} className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/* ---------------------------------------------------------------- CheckList */
export function CheckList({
  items,
  className,
  columns = true,
}: {
  items: readonly string[];
  className?: string;
  columns?: boolean;
}) {
  return (
    <ul className={cn("grid gap-x-6 gap-y-3 text-[15px] text-mist", columns && "grid-fit-220", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <CheckIcon className="mt-0.5 flex-none text-teal" />
          {item}
        </li>
      ))}
    </ul>
  );
}
