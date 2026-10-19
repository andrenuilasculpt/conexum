"use client";

/**
 * NetworkTopologyHero
 * Hero de Home con una topología de red dinámica en SVG:
 * - Paquetes recorriendo rutas (SMIL animateMotion) y túneles SD-WAN (CSS).
 * - Pulsos de telemetría en nodos clave.
 * - Escritorio: el cursor actúa como sonda e inspecciona el nodo más cercano (throttle con requestAnimationFrame).
 * - Animaciones en pausa fuera del viewport (IntersectionObserver) y desactivadas con prefers-reduced-motion.
 * - Móvil (< 64rem): la topología pasa bajo el texto; bajo 48rem se ocultan paquetes y túneles.
 */

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { homeHero } from "@/content/home";
import { cn } from "@/lib/cn";
import { ButtonLink, Eyebrow } from "./ui/Primitives";

type NodeKind = "core" | "core2" | "dc" | "cloud" | "fw" | "noc" | "hub" | "site" | "edge";

type TopoNode = {
  id: string;
  x: number;
  y: number;
  kind: NodeKind;
  lx: number;
  ly: number;
  description: string;
};

const NODES: TopoNode[] = [
  { id: "CLOUD-A", x: 800, y: 110, kind: "cloud", lx: 816, ly: 104, description: "Nube pública · Conectividad híbrida" },
  { id: "CLOUD-B", x: 930, y: 250, kind: "cloud", lx: 868, ly: 226, description: "Nube pública · Región secundaria" },
  { id: "CORE-01", x: 600, y: 300, kind: "core", lx: 618, ly: 292, description: "Core · Routing BGP / OSPF" },
  { id: "CORE-02", x: 740, y: 360, kind: "core2", lx: 760, ly: 352, description: "Core · Redundancia" },
  { id: "FW-01", x: 470, y: 210, kind: "fw", lx: 488, ly: 206, description: "Seguridad · Firewall y VPN" },
  { id: "DC-A", x: 880, y: 470, kind: "dc", lx: 902, ly: 474, description: "Centro de datos · Nexus" },
  { id: "DC-B", x: 760, y: 610, kind: "dc", lx: 782, ly: 614, description: "Centro de datos · Respaldo" },
  { id: "NOC", x: 580, y: 520, kind: "noc", lx: 596, ly: 548, description: "Telemetría y alertas" },
  { id: "HUB SD-WAN", x: 410, y: 420, kind: "hub", lx: 426, ly: 446, description: "Agregación de sedes" },
  { id: "SEDE-01", x: 250, y: 300, kind: "site", lx: 196, ly: 288, description: "Sede remota · Meraki" },
  { id: "SEDE-02", x: 210, y: 520, kind: "site", lx: 150, ly: 540, description: "Sede remota · Meraki" },
  { id: "SEDE-03", x: 330, y: 640, kind: "site", lx: 276, ly: 666, description: "Sede remota · SD-WAN" },
  { id: "SEDE-04", x: 510, y: 680, kind: "site", lx: 526, ly: 700, description: "Sede remota · SD-WAN" },
  { id: "EDGE", x: 330, y: 150, kind: "edge", lx: 300, ly: 134, description: "Perímetro · Internet" },
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

const LINKS: [string, string][] = [
  ["EDGE", "FW-01"],
  ["FW-01", "CORE-01"],
  ["CORE-01", "CORE-02"],
  ["CORE-01", "CLOUD-A"],
  ["CORE-02", "CLOUD-B"],
  ["CLOUD-A", "CLOUD-B"],
  ["CORE-02", "DC-A"],
  ["DC-A", "DC-B"],
  ["CORE-01", "NOC"],
  ["CORE-02", "NOC"],
  ["NOC", "DC-B"],
  ["HUB SD-WAN", "CORE-01"],
  ["HUB SD-WAN", "SEDE-01"],
  ["HUB SD-WAN", "SEDE-02"],
  ["HUB SD-WAN", "SEDE-03"],
  ["HUB SD-WAN", "SEDE-04"],
  ["SEDE-01", "EDGE"],
  ["FW-01", "HUB SD-WAN"],
  ["SEDE-04", "DC-B"],
];

const TUNNELS = ["M210 520 Q 420 250 800 110", "M330 640 Q 700 540 930 250", "M250 300 Q 520 120 800 110"];

const PACKETS = [
  { path: "M210 520 L410 420 L600 300 L800 110", dur: "6.5s", begin: "0s", r: 3.2, fill: "#18B89C" },
  { path: "M330 150 L470 210 L600 300 L740 360 L880 470", dur: "7.5s", begin: "-2s", r: 3, fill: "#F6FAFD" },
  { path: "M760 610 L580 520 L600 300 L410 420 L330 640", dur: "8s", begin: "-4s", r: 3.2, fill: "#18B89C" },
  { path: "M930 250 L740 360 L580 520 L760 610", dur: "7s", begin: "-1s", r: 3, fill: "#6E9FE0" },
  { path: "M250 300 L410 420 L600 300 L740 360 L930 250", dur: "9s", begin: "-5s", r: 3, fill: "#F6FAFD" },
  { path: "M510 680 L410 420 L470 210 L330 150", dur: "5.5s", begin: "-3s", r: 2.6, fill: "#18B89C" },
];

const PULSES = [
  { cx: 600, cy: 300, r: 14, stroke: "#18B89C", delay: "0s" },
  { cx: 580, cy: 520, r: 12, stroke: "#18B89C", delay: "1.1s" },
  { cx: 410, cy: 420, r: 12, stroke: "#3977C8", delay: "2.2s" },
];

type Probe = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  n2x: number;
  n2y: number;
  lx: number;
  ly: number;
  lw: number;
  label: string;
};

const PROBE_RADIUS = 230;
/** Zona aproximada (en coordenadas del viewBox) que cubre la leyenda en escritorio. */
const LEGEND_ZONE = { x: 600, y: 480 };

function TopoNodeShape({ node }: { node: TopoNode }) {
  const { x, y } = node;
  switch (node.kind) {
    case "core":
    case "core2":
      return (
        <g>
          <rect x={x - 11} y={y - 11} width={22} height={22} rx={4} fill="#0D2338" stroke="#6E9FE0" strokeWidth={1.5} />
          <rect x={x - 4} y={y - 4} width={8} height={8} rx={1.5} fill={node.kind === "core" ? "#18B89C" : "#6E9FE0"} />
        </g>
      );
    case "dc":
      return (
        <g>
          <rect x={x - 14} y={y - 12} width={28} height={24} rx={3} fill="#0D2338" stroke="#6E9FE0" strokeWidth={1.3} />
          <path d={`M${x - 9} ${y - 4}h18M${x - 9} ${y}h18M${x - 9} ${y + 4}h18`} stroke="#6E9FE0" strokeWidth={1} />
        </g>
      );
    case "cloud":
      return <circle cx={x} cy={y} r={10} fill="#0D2338" stroke="#92A7B8" strokeWidth={1.2} strokeDasharray="3 3" />;
    case "fw":
      return (
        <path
          d={`M${x} ${y - 12} L${x + 12} ${y} L${x} ${y + 12} L${x - 12} ${y} Z`}
          fill="#0D2338"
          stroke="#18B89C"
          strokeWidth={1.4}
        />
      );
    case "noc":
    case "hub": {
      const color = node.kind === "noc" ? "#18B89C" : "#6E9FE0";
      return (
        <g>
          <circle cx={x} cy={y} r={9} fill="#0D2338" stroke={color} strokeWidth={1.5} />
          <circle cx={x} cy={y} r={3} fill={color} />
        </g>
      );
    }
    default:
      return (
        <circle cx={x} cy={y} r={node.kind === "edge" ? 6 : 5.5} fill="#0D2338" stroke="#92A7B8" strokeWidth={1.3} />
      );
  }
}

export function NetworkTopologyHero() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const [paused, setPaused] = useState(false);
  const [probe, setProbe] = useState<Probe | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (visibleRef.current && !reducedRef.current) svg.unpauseAnimations();
      else svg.pauseAnimations();
    };
    reducedRef.current = reduced.matches;
    sync();
    const onReducedChange = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
      sync();
    };
    reduced.addEventListener("change", onReducedChange);

    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      setPaused(!entry.isIntersecting);
      sync();
    });
    io.observe(svg);

    return () => {
      io.disconnect();
      reduced.removeEventListener("change", onReducedChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMove = useCallback((e: MouseEvent<HTMLElement>) => {
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current || reducedRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const svg = svgRef.current;
      if (!svg || !window.matchMedia("(min-width: 64rem)").matches) return;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const pt = svg.createSVGPoint();
      pt.x = pointerRef.current.x;
      pt.y = pointerRef.current.y;
      const q = pt.matrixTransform(ctm.inverse());

      let a: TopoNode | null = null;
      let b: TopoNode | null = null;
      let da = Infinity;
      let db = Infinity;
      for (const n of NODES) {
        const d = Math.hypot(n.x - q.x, n.y - q.y);
        if (d < da) {
          b = a;
          db = da;
          a = n;
          da = d;
        } else if (d < db) {
          b = n;
          db = d;
        }
      }
      if (!a || da > PROBE_RADIUS || q.x < 120) {
        setProbe(null);
        return;
      }
      const label = `${a.id} · ${a.description}`;
      const lw = Math.round(label.length * 6.9 + 22);
      const ly = Math.round(a.y - 40);
      let lx = Math.round(a.x + 20);
      // A la izquierda si se sale del lienzo o invade la zona de la leyenda (abajo a la derecha).
      const hitsLegend = lx + lw > LEGEND_ZONE.x && ly + 26 > LEGEND_ZONE.y;
      if (lx + lw > 992 || hitsLegend) lx = Math.round(a.x - 20 - lw);
      setProbe({
        x: Math.round(q.x),
        y: Math.round(q.y),
        nx: a.x,
        ny: a.y,
        n2x: b ? b.x : a.x,
        n2y: b ? b.y : a.y,
        lx,
        ly,
        lw,
        label,
      });
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    setProbe(null);
  }, []);

  return (
    <section
      aria-labelledby="hero-title"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="dot-grid relative overflow-hidden border-b border-grey/15 bg-navy lg:min-h-[800px]"
    >
      <div className="container-x relative z-[2] pb-[clamp(2.5rem,8vw,8rem)] pt-[clamp(4rem,10vw,9.5rem)]">
        <div className="flex max-w-[800px] flex-col gap-7">
          <Eyebrow dot blink className="animate-rise">
            {homeHero.eyebrow}
          </Eyebrow>
          <h1 id="hero-title" className="animate-rise text-display font-semibold text-balance [animation-delay:.1s]">
            {homeHero.title} <span className="text-grey">{homeHero.titleMuted}</span>
          </h1>
          <p className="max-w-[560px] animate-rise text-lead text-soft [animation-delay:.22s]">{homeHero.lead}</p>
          <div className="flex animate-rise flex-wrap gap-3 pt-2 [animation-delay:.34s]">
            <ButtonLink href={homeHero.primaryCta.href} arrow>
              {homeHero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={homeHero.secondaryCta.href} variant="ghost">
              {homeHero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className={cn("topo-wrap", paused && "is-paused")}>
        <svg
          ref={svgRef}
          viewBox="0 0 1000 760"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={homeHero.ariaLabel}
        >
          <g fill="none" stroke="#3977C8" strokeOpacity={0.42} strokeWidth={1.1}>
            {LINKS.map(([from, to]) => (
              <line key={`${from}-${to}`} x1={byId[from].x} y1={byId[from].y} x2={byId[to].x} y2={byId[to].y} />
            ))}
          </g>

          <g className="topo-heavy" fill="none" stroke="#18B89C" strokeOpacity={0.5} strokeWidth={1}>
            {TUNNELS.map((d) => (
              <path key={d} className="flow-dash" d={d} />
            ))}
          </g>

          {PULSES.map((p) => (
            <circle
              key={`${p.cx}-${p.cy}`}
              className="pulse-ring"
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill="none"
              stroke={p.stroke}
              strokeWidth={1}
              style={{ animationDelay: p.delay }}
            />
          ))}

          <g className="topo-packet topo-heavy">
            {PACKETS.map((p) => (
              <circle key={p.path} r={p.r} fill={p.fill}>
                <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite" path={p.path} />
              </circle>
            ))}
          </g>

          <g>
            {NODES.map((n) => (
              <TopoNodeShape key={n.id} node={n} />
            ))}
          </g>

          <g className="topo-labels font-mono" fill="#92A7B8" fontSize={11} letterSpacing=".06em">
            {NODES.map((n) => (
              <text key={n.id} x={n.lx} y={n.ly}>
                {n.id}
              </text>
            ))}
          </g>

          {probe && (
            <g aria-hidden="true">
              <line x1={probe.x} y1={probe.y} x2={probe.nx} y2={probe.ny} stroke="#18B89C" strokeWidth={1.2} />
              <line
                x1={probe.x}
                y1={probe.y}
                x2={probe.n2x}
                y2={probe.n2y}
                stroke="#18B89C"
                strokeOpacity={0.45}
                strokeWidth={1}
                strokeDasharray="3 5"
              />
              <circle cx={probe.nx} cy={probe.ny} r={18} fill="none" stroke="#18B89C" strokeWidth={1.2} />
              <circle cx={probe.x} cy={probe.y} r={3.5} fill="#18B89C" />
              <rect
                x={probe.lx}
                y={probe.ly}
                width={probe.lw}
                height={26}
                rx={3}
                fill="#081827"
                stroke="#18B89C"
                strokeOpacity={0.7}
              />
              <text x={probe.lx + 11} y={probe.ly + 17} className="font-mono" fill="#F6FAFD" fontSize={11} letterSpacing=".03em">
                {probe.label}
              </text>
            </g>
          )}
        </svg>
      </div>

      <aside
        aria-label="Leyenda de la topología"
        className="absolute bottom-12 right-[clamp(1.25rem,4vw,3.5rem)] z-[3] hidden w-[300px] animate-rise rounded-md border border-grey/25 bg-deep/60 px-5 pb-4 backdrop-blur-md pt-[18px] [animation-delay:.5s] xl:block"
      >
        <p className="border-b border-grey/15 pb-3 font-mono text-[11px] tracking-[0.14em] text-grey">{homeHero.legendTitle}</p>
        <ul className="flex flex-col gap-2.5 pt-3 text-[13px] text-mist">
          <li className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-[22px] flex-none bg-steel" />
            {homeHero.legend[0]}
          </li>
          <li className="flex items-center gap-3">
            <span aria-hidden="true" className="w-[22px] flex-none border-t border-dashed border-teal" />
            {homeHero.legend[1]}
          </li>
          <li className="flex items-center gap-3">
            <span aria-hidden="true" className="flex w-[22px] flex-none justify-center">
              <span className="size-1.5 rounded-full bg-teal" />
            </span>
            {homeHero.legend[2]}
          </li>
          <li className="flex items-center gap-3">
            <span aria-hidden="true" className="flex w-[22px] flex-none justify-center">
              <span className="size-3 rounded-full border border-teal" />
            </span>
            {homeHero.legend[3]}
          </li>
        </ul>
        <p className="mt-3.5 border-t border-grey/15 pt-3 text-xs leading-normal text-grey">{homeHero.legendNote}</p>
      </aside>
    </section>
  );
}
