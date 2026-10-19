/** Líneas de servicio y método de trabajo (página Servicios). */

export type DiagramKind = "redes" | "sdwan" | "noc" | "seguridad" | "arquitectura" | "partners";

export type Service = {
  id: DiagramKind;
  number: string;
  shortTitle: string;
  title: string;
  description: string;
  scope: string[];
  /** Beneficio para el negocio, en lenguaje de dirección. */
  benefit: string;
  tags: string;
  note?: string;
  badge?: string;
  diagramLabel: string;
  diagramCaption: string;
};

export const servicesHero = {
  eyebrow: "SERVICIOS",
  title: "Ingeniería de red,",
  titleMuted: "del diseño a la operación diaria.",
  lead: "Seis líneas de servicio sobre redes corporativas, entornos distribuidos y ecosistemas Cisco, para organizaciones y partners que necesitan rigor técnico y continuidad.",
};

export const serviceCta = { href: "/contacto", label: "Solicitar una conversación técnica" };

/** CTA de cada servicio: abre Contacto con el tipo de servicio preseleccionado. */
export const serviceConsultLabel = "Consultar este servicio";
export const serviceConsultHref = (id: DiagramKind) => `/contacto?servicio=${id}#formulario`;

export const services: Service[] = [
  {
    id: "redes",
    number: "01",
    shortTitle: "Redes corporativas",
    title: "Ingeniería de redes corporativas",
    description:
      "Diseñamos, desplegamos y optimizamos redes de campus, centro de datos y WAN con arquitecturas estables, escalables y fáciles de operar.",
    scope: [
      "Routing dinámico BGP y OSPF",
      "Switching de campus y centro de datos",
      "Rediseño y optimización de redes existentes",
      "Alta disponibilidad sin puntos únicos de fallo",
    ],
    benefit: "Una red más estable y predecible, preparada para crecer sin rediseños de urgencia.",
    tags: "CISCO CATALYST · CISCO NEXUS · BGP · OSPF · VLAN / VRF",
    diagramLabel: "Esquema jerárquico: dos nodos de core, dos de distribución y cuatro de acceso, con una ruta activa resaltada.",
    diagramCaption: "ESQUEMA · CORE / DISTRIBUCIÓN / ACCESO",
  },
  {
    id: "sdwan",
    number: "02",
    shortTitle: "SD-WAN y Cloud",
    title: "SD-WAN y Cloud Networking",
    description:
      "Conectamos sedes, centros de datos y nubes con redes distribuidas gestionadas por política, visibles y coherentes en todas las ubicaciones.",
    scope: [
      "Diseño e implantación de SD-WAN",
      "Redes Cisco Meraki multi-sede",
      "Conectividad híbrida con nube pública",
      "Migración desde WAN tradicional",
    ],
    benefit: "Sedes conectadas con criterios homogéneos de seguridad, rendimiento y gestión centralizada.",
    tags: "CISCO SD-WAN · CISCO MERAKI · MULTI-SEDE · NUBE HÍBRIDA",
    diagramLabel: "Esquema SD-WAN: cuatro sedes conectadas a un hub, con túneles overlay hacia la nube y el centro de datos.",
    diagramCaption: "ESQUEMA · OVERLAY SD-WAN MULTI-SEDE",
  },
  {
    id: "noc",
    number: "03",
    shortTitle: "NOC y monitorización",
    title: "NOC y monitorización",
    description:
      "Visibilidad operativa continua sobre su red para detectar degradaciones a tiempo y gestionar cada incidencia con contexto técnico.",
    scope: [
      "Monitorización y gestión de alertas",
      "Gestión de incidencias L2/L3",
      "Control y respaldo de configuraciones",
      "Mantenimiento programado en ventanas acordadas",
    ],
    benefit: "Detección temprana de degradaciones y respuesta con contexto técnico antes de que afecten al negocio.",
    note: "La cobertura horaria, incluida la operación 24/7, se define según el alcance contractual acordado en cada caso.",
    tags: "THOUSANDEYES · SPLUNK · TELEMETRÍA · ALERTAS",
    diagramLabel: "Esquema NOC: una consola de operación supervisa seis nodos de red y recoge su telemetría.",
    diagramCaption: "ESQUEMA · SUPERVISIÓN Y TELEMETRÍA",
  },
  {
    id: "seguridad",
    number: "04",
    shortTitle: "Seguridad y Zero Trust",
    title: "Ciberseguridad y Zero Trust",
    description:
      "Aplicamos el principio de confianza cero a la red: cada acceso se identifica, se autoriza y se limita a lo estrictamente necesario.",
    scope: [
      "Políticas de acceso y segmentación",
      "Firewalls y VPN de sede y de usuario",
      "Control de acceso a red con Cisco ISE",
      "Hardening de dispositivos y configuración",
    ],
    benefit: "Menor superficie de exposición y políticas de acceso coherentes, auditables y mantenibles.",
    tags: "CISCO ISE · NGFW · VPN · 802.1X · SEGMENTACIÓN",
    diagramLabel:
      "Esquema Zero Trust: usuarios, dispositivos e IoT pasan por un motor de políticas; el acceso a aplicaciones y datos se permite y el acceso a OT se bloquea.",
    diagramCaption: "ESQUEMA · ACCESO BASADO EN IDENTIDAD Y POLÍTICA",
  },
  {
    id: "arquitectura",
    number: "05",
    shortTitle: "Arquitectura",
    title: "Arquitectura y transformación tecnológica",
    description:
      "Acompañamos sus decisiones de infraestructura con consultoría técnica, diseño documentado y migraciones planificadas paso a paso.",
    scope: [
      "Consultoría y hoja de ruta de red",
      "Diseño de alto y bajo nivel (HLD / LLD)",
      "Migraciones y renovación tecnológica",
      "Auditorías de red y Cisco Network Health Check",
    ],
    benefit: "Decisiones de inversión basadas en un diagnóstico técnico objetivo y una hoja de ruta documentada.",
    tags: "HLD · LLD · MIGRACIÓN · HEALTH CHECK",
    diagramLabel:
      "Esquema de transformación: una topología actual desordenada evoluciona hacia una arquitectura objetivo jerárquica y documentada.",
    diagramCaption: "ESQUEMA · DE LA RED ACTUAL A LA ARQUITECTURA OBJETIVO",
  },
  {
    id: "partners",
    number: "06",
    shortTitle: "Para partners",
    title: "Servicios B2B para integradores y MSPs",
    description:
      "Capacidad de ingeniería para MSPs e integradores que necesitan escalar su servicio técnico sin perder la relación con su cliente.",
    scope: [
      "Ingeniería remota L2/L3 bajo demanda",
      "Escalado técnico especializado",
      "Servicio en marca blanca",
      "Asistencia técnica por proyecto",
    ],
    benefit: "Más capacidad de ingeniería para su oferta, sin ampliar plantilla ni perder la relación con su cliente.",
    tags: "BACK-TO-BACK · MARCA BLANCA · L2/L3",
    badge: "MSP · INTEGRADORES",
    note: "Servicio remoto. Las intervenciones físicas (smart hands) las aporta el partner o el cliente.",
    diagramLabel:
      "Esquema de escalado: el cliente final contacta con el partner en primer nivel; el partner escala a CONEXUM la ingeniería de segundo y tercer nivel y recibe la resolución.",
    diagramCaption: "ESQUEMA · MODELO BACK-TO-BACK EN MARCA BLANCA",
  },
];

export const methodSection = {
  eyebrow: "NUESTRO MODELO DE TRABAJO",
  title: "Cinco fases. Ninguna improvisación.",
  intro:
    "El mismo método se aplica a un diagnóstico puntual, a una migración compleja o a un servicio recurrente, con el alcance ajustado a cada caso.",
  steps: [
    { title: "Descubrimiento", text: "Entendemos su negocio, su red actual, sus prioridades y las restricciones del proyecto." },
    { title: "Evaluación", text: "Analizamos configuración, riesgos y capacidad para fijar un punto de partida objetivo." },
    { title: "Arquitectura", text: "Definimos la solución en HLD y LLD, con plan de implantación, pruebas y vuelta atrás." },
    { title: "Ejecución", text: "Implantamos en ventanas acordadas, con validación posterior y documentación de cada cambio." },
    { title: "Mejora continua", text: "Revisamos resultados y operación para ajustar, optimizar y planificar la siguiente fase." },
  ],
};

export const servicesClosing = {
  eyebrow: "SIGUIENTE PASO",
  title: "Cada red tiene su contexto. Empecemos por el suyo.",
  text: "Cuéntenos qué necesita resolver y en qué tecnologías se apoya su red. Prepararemos una primera conversación técnica a partir de ahí.",
  cta: serviceCta,
};
