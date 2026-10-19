import type { FlowNode } from "@/content/home";
import { cn } from "@/lib/cn";
import { BidirectionalArrow, ForwardArrow } from "./Icons";

/**
 * Diagrama de colaboración construido con HTML (responsive):
 * fila en escritorio, columna bajo 48rem (los conectores giran 90°).
 */
export function FlowDiagram({
  nodes,
  bidirectional,
  ariaLabel,
  tone = "dark",
  size = "md",
  className,
}: {
  nodes: FlowNode[];
  /** Un valor por conector (nodes.length - 1). true = doble sentido. */
  bidirectional: boolean[];
  ariaLabel: string;
  tone?: "dark" | "light";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div role="img" aria-label={ariaLabel} className={cn("flow-row", className)}>
      {nodes.map((node, i) => (
        <FlowPiece key={node.label} node={node} tone={tone} size={size} connector={i < nodes.length - 1 ? bidirectional[i] : null} />
      ))}
    </div>
  );
}

function FlowPiece({
  node,
  tone,
  size,
  connector,
}: {
  node: FlowNode;
  tone: "dark" | "light";
  size: "md" | "lg";
  connector: boolean | null;
}) {
  const dark = tone === "dark";
  const nodeClass = cn(
    "flow-node flex flex-col",
    size === "md" ? "gap-1.5 rounded-md px-4 py-3.5" : "gap-2 rounded-lg px-[22px] pb-6 pt-[22px]",
    dark && !node.highlight && "border border-grey/30",
    dark && node.highlight && "border border-teal bg-teal/[0.07]",
    !dark && !node.highlight && "border border-navy/20 bg-white",
    !dark && node.highlight && "border border-navy bg-navy text-ink",
  );
  const labelClass = cn(
    "font-mono tracking-[0.14em]",
    size === "md" ? "text-[10.5px]" : "text-[11px]",
    node.highlight ? "text-teal" : dark ? "text-grey" : "text-graphite",
  );
  const textClass = cn(
    size === "md" ? "text-[13px]" : "text-[15px] leading-normal",
    node.highlight ? (dark ? "text-muted" : "text-soft") : dark ? "text-muted" : "text-graphite",
  );
  return (
    <>
      <div className={nodeClass}>
        <span className={labelClass}>{node.label}</span>
        <span className={cn("font-semibold", size === "md" ? "text-[15px]" : "text-xl tracking-[-0.01em]")}>{node.title}</span>
        <span className={textClass}>{node.text}</span>
      </div>
      {connector !== null && (
        <div aria-hidden="true" className={cn("flow-conn", dark ? "text-steel-light" : "text-steel-dark")}>
          {connector ? <BidirectionalArrow /> : <ForwardArrow />}
        </div>
      )}
    </>
  );
}
