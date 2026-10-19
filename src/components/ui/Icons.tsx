/** Iconos SVG originales (trazo). Decorativos: aria-hidden por defecto. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" {...props}>
      <path d="M4 9.5l3.2 3L14 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M3 6h14M3 10h14M3 14h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BidirectionalArrow(props: IconProps) {
  return (
    <svg width="30" height="12" viewBox="0 0 30 12" fill="none" aria-hidden="true" {...props}>
      <path d="M1 6h28M5 2L1 6l4 4M25 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ForwardArrow(props: IconProps) {
  return (
    <svg width="30" height="12" viewBox="0 0 30 12" fill="none" aria-hidden="true" {...props}>
      <path d="M1 6h28M25 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Iconos de capacidades (32 px) */
const capabilityStroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;

export function NetworkIcon(props: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" {...capabilityStroke} {...props}>
      <rect x="12" y="3" width="8" height="8" rx="1.5" />
      <circle cx="6" cy="26" r="3" />
      <circle cx="16" cy="26" r="3" />
      <circle cx="26" cy="26" r="3" />
      <path d="M16 11v12M16 16H6v7M16 16h10v7" />
    </svg>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" {...capabilityStroke} {...props}>
      <rect x="3" y="5" width="26" height="18" rx="2" />
      <path d="M7 15h4l2-5 3 9 2-4h7" />
      <path d="M11 27h10" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" {...capabilityStroke} {...props}>
      <path d="M16 3l10 4v8c0 6.5-4.3 11.3-10 13-5.7-1.7-10-6.5-10-13V7z" />
      <circle cx="16" cy="14" r="3" />
      <path d="M16 17v5" />
    </svg>
  );
}

export function CloudIcon(props: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" {...capabilityStroke} {...props}>
      <path d="M9 17a5 5 0 0 1 .8-9.9A7 7 0 0 1 23 8.5 4.3 4.3 0 0 1 24 17z" />
      <circle cx="8" cy="27" r="2.5" />
      <circle cx="24" cy="27" r="2.5" />
      <path d="M16 17v6M8 24.5V23h16v1.5" />
    </svg>
  );
}

export const capabilityIcons = {
  network: NetworkIcon,
  monitor: MonitorIcon,
  shield: ShieldIcon,
  cloud: CloudIcon,
};

export type CapabilityIconKey = keyof typeof capabilityIcons;
