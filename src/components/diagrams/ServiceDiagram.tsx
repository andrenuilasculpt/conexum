/**
 * Mini diagramas de red originales para cada línea de servicio.
 * viewBox común 360 × 220. Colores de marca fijos (el fondo siempre es oscuro).
 */
import type { ReactNode } from "react";
import type { DiagramKind } from "@/content/services";

const C = {
  node: "#0D2338",
  steel: "#3977C8",
  steelLight: "#6E9FE0",
  teal: "#18B89C",
  grey: "#92A7B8",
  mist: "#D5E1EB",
  ink: "#F6FAFD",
};

function Labels({ children, anchor, fill = C.grey }: { children: ReactNode; anchor?: "middle"; fill?: string }) {
  return (
    <g className="font-mono" fill={fill} fontSize={10} letterSpacing=".08em" textAnchor={anchor}>
      {children}
    </g>
  );
}

function Redes() {
  return (
    <>
      <g fill="none" stroke={C.steel} strokeOpacity={0.6} strokeWidth={1.2}>
        <path d="M150 50H210" />
        <path d="M150 50L100 122M150 50L260 122M210 50L100 122M210 50L260 122M100 122H260" />
        <path d="M100 122L50 184M100 122L130 184M260 122L230 184M260 122L310 184" />
      </g>
      <path className="flow-dash" d="M50 184L100 122L150 50L210 50L260 122L310 184" fill="none" stroke={C.teal} strokeWidth={1.4} />
      <circle className="pulse-ring" cx={150} cy={50} r={12} fill="none" stroke={C.teal} strokeWidth={1} />
      <rect x={140} y={40} width={20} height={20} rx={4} fill={C.node} stroke={C.steelLight} strokeWidth={1.4} />
      <rect x={200} y={40} width={20} height={20} rx={4} fill={C.node} stroke={C.steelLight} strokeWidth={1.4} />
      <circle cx={100} cy={122} r={8} fill={C.node} stroke={C.steelLight} strokeWidth={1.4} />
      <circle cx={260} cy={122} r={8} fill={C.node} stroke={C.steelLight} strokeWidth={1.4} />
      {[50, 130, 230, 310].map((x) => (
        <circle key={x} cx={x} cy={184} r={5.5} fill={C.node} stroke={C.grey} strokeWidth={1.3} />
      ))}
      <Labels anchor="middle">
        <text x={180} y={24}>CORE · BGP / OSPF</text>
        <text x={180} y={110}>DISTRIBUCIÓN</text>
        <text x={180} y={212}>ACCESO</text>
      </Labels>
    </>
  );
}

function Sdwan() {
  return (
    <>
      <g fill="none" stroke={C.steel} strokeOpacity={0.55} strokeWidth={1.2}>
        <path d="M58 58L180 118M58 170L180 118M302 58L180 118M302 170L180 118" />
      </g>
      <g fill="none" stroke={C.teal} strokeWidth={1.2}>
        <path className="flow-dash" d="M180 104V44" />
        <path className="flow-dash" d="M180 132V180" />
        <path className="flow-dash" d="M58 58Q180 -4 302 58" strokeOpacity={0.55} />
        <path className="flow-dash" d="M58 170Q180 232 302 170" strokeOpacity={0.55} />
      </g>
      <circle cx={180} cy={30} r={14} fill={C.node} stroke={C.grey} strokeWidth={1.2} strokeDasharray="3 3" />
      <circle className="pulse-ring" cx={180} cy={118} r={13} fill="none" stroke={C.teal} strokeWidth={1} />
      <circle cx={180} cy={118} r={13} fill={C.node} stroke={C.teal} strokeWidth={1.5} />
      <circle cx={180} cy={118} r={4} fill={C.teal} />
      <rect x={166} y={180} width={28} height={22} rx={3} fill={C.node} stroke={C.steelLight} strokeWidth={1.3} />
      <path d="M171 187h18M171 191h18M171 195h18" stroke={C.steelLight} strokeWidth={1} />
      {[
        [50, 50],
        [50, 162],
        [294, 50],
        [294, 162],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={16} height={16} rx={3} fill={C.node} stroke={C.steelLight} strokeWidth={1.3} />
      ))}
      <Labels>
        <text x={24} y={90}>SEDE A</text>
        <text x={24} y={150}>SEDE C</text>
        <text x={290} y={90}>SEDE B</text>
        <text x={290} y={150}>SEDE D</text>
        <text x={202} y={34}>CLOUD</text>
        <text x={202} y={122}>HUB</text>
        <text x={202} y={196}>DC</text>
      </Labels>
    </>
  );
}

function Noc() {
  const trace = "M22 192H120l6-12 8 22 6-16 5 6H338";
  return (
    <>
      <g fill="none" stroke={C.steel} strokeOpacity={0.5} strokeWidth={1.1}>
        <path d="M112 100L196 52M112 100L258 52M112 100L320 52M112 100L196 132M112 100L258 132M112 100L320 132" />
      </g>
      <rect x={22} y={66} width={90} height={68} rx={5} fill={C.node} stroke={C.teal} strokeWidth={1.4} />
      <path d="M34 84h44M34 96h62M34 108h30" stroke={C.steelLight} strokeWidth={1.2} strokeLinecap="round" />
      <circle className="animate-blink" cx={98} cy={80} r={3.5} fill={C.teal} />
      <circle className="pulse-ring" cx={258} cy={52} r={9} fill="none" stroke={C.teal} strokeWidth={1} />
      <circle className="pulse-ring" cx={320} cy={132} r={9} fill="none" stroke={C.teal} strokeWidth={1} style={{ animationDelay: "1.6s" }} />
      <g fill={C.node} strokeWidth={1.3}>
        <circle cx={196} cy={52} r={8} stroke={C.steelLight} />
        <circle cx={258} cy={52} r={8} stroke={C.teal} />
        <circle cx={320} cy={52} r={8} stroke={C.steelLight} />
        <circle cx={196} cy={132} r={8} stroke={C.steelLight} />
        <circle cx={258} cy={132} r={8} stroke={C.steelLight} />
        <circle cx={320} cy={132} r={8} stroke={C.teal} />
      </g>
      <path d={trace} fill="none" stroke={C.teal} strokeWidth={1.3} strokeLinejoin="round" />
      <circle className="topo-packet" r={3} fill={C.ink}>
        <animateMotion dur="5s" repeatCount="indefinite" path={trace} />
      </circle>
      <Labels>
        <text x={22} y={56}>NOC</text>
        <text x={186} y={28}>NODOS SUPERVISADOS</text>
        <text x={22} y={172}>TELEMETRÍA</text>
      </Labels>
    </>
  );
}

function Seguridad() {
  return (
    <>
      <g fill="none" stroke={C.steel} strokeOpacity={0.55} strokeWidth={1.2}>
        <path d="M48 54L146 100M48 110H146M48 166L146 120" />
      </g>
      <path className="flow-dash" d="M214 100L304 54" fill="none" stroke={C.teal} strokeWidth={1.3} />
      <path className="flow-dash" d="M214 110H304" fill="none" stroke={C.teal} strokeWidth={1.3} />
      <path d="M214 120L304 166" fill="none" stroke={C.grey} strokeOpacity={0.5} strokeWidth={1.2} strokeDasharray="2 5" />
      <path d="M253 137l10 10M263 137l-10 10" stroke={C.grey} strokeWidth={1.5} strokeLinecap="round" />
      <rect x={146} y={78} width={68} height={64} rx={6} fill={C.node} stroke={C.teal} strokeWidth={1.4} />
      <path d="M180 92l12 5v8c0 7-5 11-12 13-7-2-12-6-12-13v-8z" fill="none" stroke={C.teal} strokeWidth={1.2} />
      <g fill={C.node} stroke={C.steelLight} strokeWidth={1.3}>
        <circle cx={40} cy={54} r={8} />
        <circle cx={40} cy={110} r={8} />
        <circle cx={40} cy={166} r={8} />
        <rect x={304} y={45} width={18} height={18} rx={3} />
        <rect x={304} y={101} width={18} height={18} rx={3} />
        <rect x={304} y={157} width={18} height={18} rx={3} stroke={C.grey} />
      </g>
      <Labels>
        <text x={18} y={34}>USUARIO</text>
        <text x={18} y={90}>DISPOSITIVO</text>
        <text x={18} y={196}>IoT</text>
        <text x={300} y={34}>APPS</text>
        <text x={292} y={90}>DATOS</text>
        <text x={304} y={196}>OT</text>
        <text x={180} y={160} textAnchor="middle">
          POLÍTICA · ISE
        </text>
      </Labels>
    </>
  );
}

function Arquitectura() {
  return (
    <>
      <g fill="none" stroke={C.grey} strokeOpacity={0.55} strokeWidth={1.1} strokeDasharray="3 4">
        <path d="M36 70L96 48L70 120L126 96L44 168L112 166L96 48M36 70L126 96M70 120L112 166M44 168L70 120" />
      </g>
      <g fill={C.node} stroke={C.grey} strokeWidth={1.2}>
        {[
          [36, 70],
          [96, 48],
          [70, 120],
          [126, 96],
          [44, 168],
          [112, 166],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={5} />
        ))}
      </g>
      <path className="flow-dash" d="M150 110H206" fill="none" stroke={C.teal} strokeWidth={1.4} />
      <path d="M200 104l8 6-8 6" fill="none" stroke={C.teal} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <g fill="none" stroke={C.steel} strokeOpacity={0.65} strokeWidth={1.2}>
        <path d="M266 60H314M266 60L266 118M266 60L314 118M314 60L266 118M314 60L314 118M266 118L244 172M266 118L290 172M314 118L290 172M314 118L336 172" />
      </g>
      <g fill={C.node} stroke={C.steelLight} strokeWidth={1.3}>
        <rect x={257} y={51} width={18} height={18} rx={3} />
        <rect x={305} y={51} width={18} height={18} rx={3} />
        <circle cx={266} cy={118} r={7} />
        <circle cx={314} cy={118} r={7} />
        <circle cx={244} cy={172} r={5} />
        <circle cx={290} cy={172} r={5} />
        <circle cx={336} cy={172} r={5} />
      </g>
      <Labels>
        <text x={30} y={24}>ACTUAL</text>
        <text x={244} y={24}>OBJETIVO</text>
        <text x={244} y={206} fill={C.teal}>
          HLD · LLD
        </text>
      </Labels>
    </>
  );
}

function Partners() {
  return (
    <>
      <rect x={14} y={62} width={92} height={64} rx={6} fill={C.node} stroke={C.grey} strokeWidth={1.2} />
      <rect x={134} y={62} width={92} height={64} rx={6} fill={C.node} stroke={C.steelLight} strokeWidth={1.3} />
      <rect x={254} y={62} width={92} height={64} rx={6} fill={C.node} stroke={C.teal} strokeWidth={1.5} />
      <path className="flow-dash" d="M106 84H134" fill="none" stroke={C.steelLight} strokeWidth={1.3} />
      <path className="flow-dash" d="M226 84H254" fill="none" stroke={C.teal} strokeWidth={1.3} />
      <path d="M254 106H226M134 106H106" fill="none" stroke={C.grey} strokeOpacity={0.6} strokeWidth={1.1} strokeDasharray="2 4" />
      <path d="M248 80l6 4-6 4M128 80l6 4-6 4" fill="none" stroke={C.teal} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M112 102l-6 4 6 4M232 102l-6 4 6 4" fill="none" stroke={C.grey} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <Labels anchor="middle" fill={C.mist}>
        <text x={60} y={90}>CLIENTE</text>
        <text x={60} y={104}>FINAL</text>
        <text x={180} y={90}>PARTNER</text>
        <text x={180} y={104}>L1</text>
        <text x={300} y={90}>CONEXUM</text>
        <text x={300} y={104}>L2 / L3</text>
      </Labels>
      <Labels anchor="middle">
        <text x={180} y={40}>ESCALADO →</text>
        <text x={180} y={150}>← RESOLUCIÓN</text>
        <text x={60} y={186}>SU MARCA</text>
        <text x={180} y={186} fill={C.steelLight}>
          SMART HANDS
        </text>
        <text x={300} y={186} fill={C.teal}>
          REMOTO
        </text>
      </Labels>
      <path d="M180 160v12M300 160v12M60 160v12" stroke={C.grey} strokeOpacity={0.5} strokeWidth={1} />
    </>
  );
}

const DIAGRAMS: Record<DiagramKind, () => ReactNode> = {
  redes: Redes,
  sdwan: Sdwan,
  noc: Noc,
  seguridad: Seguridad,
  arquitectura: Arquitectura,
  partners: Partners,
};

export function ServiceDiagram({ kind, label }: { kind: DiagramKind; label: string }) {
  const Diagram = DIAGRAMS[kind];
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label={label} className="block h-auto w-full">
      <Diagram />
    </svg>
  );
}
