/** Textos de la página Home. Español de España, trato de usted, sin cifras inventadas. */
import type { CapabilityIconKey } from "@/components/ui/Icons";

export const homeHero = {
  eyebrow: "INFRAESTRUCTURA · NETWORK ENGINEERING · OPERACIONES",
  title: "La infraestructura invisible",
  titleMuted: "que hace posible todo lo demás.",
  lead: "Ingeniería especializada para redes empresariales, entornos críticos y operaciones que no pueden detenerse.",
  primaryCta: { href: "/servicios", label: "Explorar servicios" },
  secondaryCta: { href: "/about", label: "Conocer Conexum" },
  legendTitle: "VISTA CONCEPTUAL DE RED",
  legend: ["Enlaces de red", "Túneles SD-WAN", "Tráfico en tránsito", "Puntos de telemetría"],
  legendNote: "Representación ilustrativa. Pase el cursor sobre la red para inspeccionar los nodos.",
  ariaLabel:
    "Topología de red ilustrativa: núcleo, centros de datos, nube, NOC, firewall y sedes remotas conectados, con tráfico recorriendo las rutas.",
};

export const capabilities: {
  number: string;
  title: string;
  text: string;
  tags: string;
  icon: CapabilityIconKey;
}[] = [
  {
    number: "01",
    title: "Network Engineering",
    text: "Diseño, routing y switching para campus, centro de datos y WAN, con criterios de resiliencia y crecimiento.",
    tags: "BGP · OSPF · CATALYST · NEXUS",
    icon: "network",
  },
  {
    number: "02",
    title: "NOC & Monitoring",
    text: "Visibilidad operativa, gestión de alertas e incidencias L2/L3 y soporte especializado sobre la red en producción.",
    tags: "OBSERVABILIDAD · L2/L3",
    icon: "monitor",
  },
  {
    number: "03",
    title: "Security & Zero Trust",
    text: "Segmentación, control de acceso, firewalls y VPN con políticas coherentes, auditables y mantenibles.",
    tags: "ISE · FIREWALL · VPN",
    icon: "shield",
  },
  {
    number: "04",
    title: "Cloud Networking",
    text: "Conectividad híbrida y multi-sede entre centros de datos, nube pública y sedes remotas.",
    tags: "SD-WAN · MERAKI · MULTI-CLOUD",
    icon: "cloud",
  },
];

export const capabilitiesSection = {
  index: "01 / CAPACIDADES",
  title: "Las disciplinas que sostienen una red empresarial.",
  intro:
    "Cubrimos el ciclo técnico completo con el mismo rigor en el diseño que en la operación diaria, sobre campus, centro de datos, WAN y nube.",
};

export const lifecycleSection = {
  index: "02 / CICLO DE VIDA",
  title: "De la arquitectura a la operación.",
  intro:
    "Un mismo equipo técnico acompaña su red en todo su ciclo de vida, con documentación y criterios compartidos entre fases. Sin pérdidas de contexto entre quien diseña y quien opera.",
};

export const lifecycle: { phase: string; title: string; text: string; tags: string; operate?: boolean }[] = [
  {
    phase: "FASE 01",
    title: "Diseñar",
    text: "Arquitectura alineada con el negocio, la seguridad y el crecimiento previsto, documentada en HLD y LLD.",
    tags: "HLD · LLD · REQUISITOS",
  },
  {
    phase: "FASE 02",
    title: "Implementar",
    text: "Despliegues y migraciones con planes de cambio, ventanas definidas y vuelta atrás documentada.",
    tags: "PLAN DE CAMBIO · ROLLBACK",
  },
  {
    phase: "FASE 03",
    title: "Operar",
    text: "Monitorización continua, gestión de incidencias L2/L3 y mantenimiento programado sobre la red en producción.",
    tags: "NOC · L2/L3 · OBSERVABILIDAD",
    operate: true,
  },
  {
    phase: "FASE 04",
    title: "Optimizar",
    text: "Revisión periódica de rendimiento, configuración y riesgo para mejorar la red de forma continua.",
    tags: "HEALTH CHECK · MEJORA CONTINUA",
  },
];

export type FlowNode = { label: string; title: string; text: string; highlight?: boolean };

export type CollaborationTrack = {
  id: "empresas" | "partners";
  tabTitle: string;
  tabText: string;
  audience: string;
  title: string;
  text: string;
  points: string[];
  flow: FlowNode[];
  flowBidirectional: boolean[];
  flowAria: string;
  link: { href: string; label: string };
  secondaryLink: { href: string; label: string };
};

export const collaborationSection = {
  index: "03 / MODELOS DE COLABORACIÓN",
  title: "Especialización que se integra con su equipo.",
  intro: "Dos formas de trabajar con CONEXUM y un mismo estándar de ingeniería, documentación y confidencialidad.",
};

export const collaborationTracks: CollaborationTrack[] = [
  {
    id: "empresas",
    tabTitle: "Para empresas",
    tabText: "Ingeniería, consultoría y soporte avanzado para su equipo de IT",
    audience: "CIO · CTO · DIRECCIÓN DE INFRAESTRUCTURA",
    title: "Capacidad experta, sin ampliar plantilla.",
    text: "Reforzamos a su equipo interno con ingeniería especializada para proyectos, operación y escalados complejos, respetando su gobierno, sus prioridades y sus procesos.",
    points: [
      "Ingeniería L2/L3 por proyecto o recurrente",
      "Diseño y revisión de arquitectura",
      "Operación remota y soporte documentado",
      "Transferencia de conocimiento a su equipo",
    ],
    flow: [
      { label: "SU ORGANIZACIÓN", title: "Equipo de IT", text: "Gobierno y prioridades" },
      { label: "CONEXUM", title: "Ingeniería L2/L3", text: "Diseño · Operación · Escalado", highlight: true },
      { label: "SU RED", title: "Campus · WAN · DC", text: "Y conectividad cloud" },
    ],
    flowBidirectional: [true, false],
    flowAria: "Esquema: su equipo de IT trabaja con CONEXUM, que aporta ingeniería sobre su red.",
    link: { href: "/servicios#redes", label: "Ver servicios para empresas" },
    secondaryLink: { href: "/contacto?servicio=redes#formulario", label: "Solicitar una conversación técnica" },
  },
  {
    id: "partners",
    tabTitle: "Para integradores y MSPs",
    tabText: "Soporte remoto especializado, escalado técnico y marca blanca",
    audience: "MSP · INTEGRADORES · PARTNERS TECNOLÓGICOS",
    title: "Su marca, nuestra ingeniería.",
    text: "Sumamos capacidad técnica a su oferta, bajo su identidad y con soporte back-to-back, para que pueda asumir más proyectos manteniendo la relación con su cliente.",
    points: [
      "Servicio en marca blanca",
      "Escalado L2/L3 en ecosistemas Cisco",
      "Ventanas de mantenimiento coordinadas",
      "Smart hands aportado por su equipo local",
    ],
    flow: [
      { label: "CLIENTE FINAL", title: "Su cliente", text: "Servicio bajo su marca" },
      { label: "PARTNER", title: "Relación y L1", text: "Incluye smart hands" },
      { label: "CONEXUM", title: "Ingeniería L2/L3", text: "Remota, back-to-back", highlight: true },
    ],
    flowBidirectional: [true, true],
    flowAria: "Esquema: el cliente final se relaciona con el partner, que escala la ingeniería a CONEXUM.",
    link: { href: "/servicios#partners", label: "Ver servicios para partners" },
    secondaryLink: { href: "/contacto?servicio=partners#formulario", label: "Proponer una colaboración" },
  },
];

export const healthCheck = {
  index: "04 / SERVICIO DESTACADO",
  badge: "DIAGNÓSTICO INICIAL",
  title: "Cisco Network Health Check",
  text: "Un diagnóstico técnico inicial del riesgo, la resiliencia y la configuración de su red Cisco, para decidir con información fiable antes de invertir o de cambiar.",
  points: [
    "Revisión de configuración frente a buenas prácticas",
    "Análisis de resiliencia y puntos únicos de fallo",
    "Evaluación de seguridad y control de acceso",
    "Hallazgos priorizados y recomendaciones accionables",
  ],
  /* No afirmar que es gratuito mientras no se apruebe la promoción. */
  note: "El alcance, la duración y las condiciones del diagnóstico se definen tras una validación técnica y comercial.",
  cta: { href: "/contacto?servicio=arquitectura#formulario", label: "Solicitar información" },
  secondary: { href: "/servicios#arquitectura", label: "Arquitectura y transformación" },
  reportTitle: "ESTRUCTURA ORIENTATIVA DEL INFORME",
  report: [
    { title: "Resumen ejecutivo", text: "Estado general y prioridades, en lenguaje de dirección." },
    { title: "Inventario y contexto", text: "Equipamiento, versiones y topología lógica analizada." },
    { title: "Configuración y buenas prácticas", text: "Desviaciones respecto a las recomendaciones del fabricante." },
    { title: "Resiliencia", text: "Redundancias, convergencia y puntos únicos de fallo." },
    { title: "Seguridad y acceso", text: "Exposición, políticas y control de acceso a la red." },
    { title: "Hallazgos y hoja de ruta", text: "Riesgo, impacto y recomendación, priorizados por acción." },
  ],
};

export const homeClosing = {
  eyebrow: "SIGUIENTE PASO",
  title: "La continuidad de su negocio comienza con una infraestructura sólida.",
  text: "Una primera conversación técnica para entender su entorno, sus prioridades y dónde podemos aportar valor a su equipo.",
  cta: { href: "/contacto", label: "Solicitar una conversación técnica" },
};
