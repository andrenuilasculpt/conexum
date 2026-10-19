/** Textos de la página About. */
import type { FlowNode } from "./home";

export const aboutHero = {
  eyebrow: "SOBRE CONEXUM",
  title: "La confianza tecnológica se construye",
  titleMuted: "con ingeniería.",
  lead: "CONEXUM se centra en diseñar, optimizar y respaldar entornos de red empresariales complejos, con especial foco en ecosistemas Cisco.",
  facts: [
    { term: "ESPECIALIDAD", value: "Ingeniería lógica y soporte remoto sobre ecosistemas Cisco" },
    { term: "MODELO", value: "Servicio remoto, por proyecto o recurrente" },
    { term: "PARA", value: "Medianas y grandes organizaciones, MSPs e integradores" },
    { term: "ÁMBITO", value: "España" },
  ],
};

export const whoWeAre = {
  index: "01 / QUIÉNES SOMOS",
  statement:
    "Somos un equipo de ingeniería especializado en el diseño, la operación y la mejora de entornos de conectividad empresarial.",
  paragraphs: [
    "Trabajamos sobre redes corporativas, entornos distribuidos y ecosistemas Cisco, desde la arquitectura inicial hasta la operación diaria. Nuestro servicio es remoto y experto: intervenimos donde la red exige conocimiento profundo, con método, trazabilidad y documentación.",
    "Colaboramos con los equipos internos de IT como extensión técnica, y con MSPs e integradores como capacidad de ingeniería de segundo y tercer nivel, bajo su marca cuando así lo requieren.",
  ],
  approachTitle: "ENFOQUE TÉCNICO",
  approach: [
    "Arquitectura de red",
    "Análisis de infraestructura",
    "Diseño lógico",
    "Ingeniería especializada",
    "Soporte técnico remoto",
    "Monitorización y visibilidad operativa",
    "Mejora continua de la infraestructura",
    "Colaboración con equipos tecnológicos",
  ],
};

export const architectureSection = {
  index: "02 / CÓMO PENSAMOS LA RED",
  title: "Una visión lógica de extremo a extremo.",
  intro:
    "Abordamos cada red como un sistema: capas con responsabilidades claras, seguridad y observabilidad transversales, y decisiones documentadas en cada nivel.",
  security: "SEGURIDAD · ZERO TRUST",
  observability: "OBSERVABILIDAD · NOC",
  caption: "ARQUITECTURA LÓGICA DE REFERENCIA · ESQUEMA CONCEPTUAL",
  layers: [
    { code: "CAPA 05", name: "Nube", items: ["Nube pública", "SaaS", "Interconexión cloud"] },
    { code: "CAPA 04", name: "WAN y SD-WAN", items: ["Overlay SD-WAN", "Internet / MPLS", "Sedes remotas"] },
    { code: "CAPA 03", name: "Core", items: ["Routing BGP / OSPF", "Alta disponibilidad", "Centro de datos"], highlight: true },
    { code: "CAPA 02", name: "Distribución", items: ["Segmentación VRF / VLAN", "Políticas", "Agregación"] },
    { code: "CAPA 01", name: "Acceso", items: ["Campus cableado", "Wi-Fi corporativo", "IoT / OT"] },
  ] as { code: string; name: string; items: string[]; highlight?: boolean }[],
};

export const valuesSection = {
  index: "03 / VALORES",
  title: "Cinco principios en cada intervención.",
  intro: "No son declaraciones de intenciones: son criterios que aplicamos al diseñar, al cambiar y al operar una red.",
  values: [
    { title: "Precisión", text: "Decisiones de ingeniería basadas en análisis técnico y procesos disciplinados. Cada cambio se documenta y se puede verificar." },
    { title: "Continuidad", text: "Infraestructura pensada para sostener operaciones exigentes. Planificamos cada intervención para que el negocio siga funcionando." },
    { title: "Prevención", text: "Identificación temprana de riesgos, debilidades y retos operativos, antes de que se conviertan en incidencias." },
    { title: "Transparencia", text: "Procesos claros, recomendaciones documentadas y una comunicación profesional sobre el estado de la red y sus decisiones." },
    { title: "Especialización", text: "Conocimiento focalizado en tecnologías de red empresariales complejas, tratado con estricta confidencialidad." },
  ],
};

export const operatingModel = {
  index: "04 / METODOLOGÍA",
  title: "Un proceso de ingeniería, de la primera pregunta a la mejora continua.",
  intro: "Una forma de trabajar pensada para entornos donde cada cambio cuenta y cada decisión debe poder explicarse.",
  items: [
    { title: "Descubrimiento técnico", text: "Entendemos el negocio, el entorno actual, las prioridades y las restricciones antes de proponer nada." },
    { title: "Evaluación de la infraestructura", text: "Analizamos configuración, capacidad, resiliencia y riesgo para fijar un punto de partida objetivo." },
    { title: "Diseño HLD y LLD", text: "Diseño de alto y bajo nivel como base de cada proyecto y como referencia para la operación." },
    { title: "Planificación de la implantación", text: "Ventanas acordadas, plan de cambio, pruebas, vuelta atrás prevista y validación posterior." },
    { title: "Soporte técnico", text: "Diagnóstico y resolución de incidencias L2/L3 con un modelo de escalado definido y documentado." },
    { title: "Mejora continua", text: "Revisión periódica de rendimiento y riesgo, y transferencia de conocimiento a su equipo." },
  ],
};

export const partnersSection = {
  index: "05 / PARTNERS",
  title: "Una extensión técnica de su equipo, bajo su marca.",
  intro: "Para MSPs e integradores que necesitan ampliar su capacidad de ingeniería sin perder la relación ni el control de su cliente.",
  flow: [
    { label: "CLIENTE FINAL", title: "Organización usuaria", text: "Recibe el servicio bajo la marca y el contrato del partner." },
    {
      label: "PARTNER · MSP · INTEGRADOR",
      title: "Relación y presencia local",
      text: "Mantiene la interlocución, el primer nivel y las intervenciones físicas (smart hands).",
    },
    {
      label: "CONEXUM",
      title: "Ingeniería remota L2/L3",
      text: "Diseño, escalado técnico y ventanas de mantenimiento, en marca blanca si se requiere.",
      highlight: true,
    },
  ] as FlowNode[],
  flowAria:
    "Esquema de colaboración: el cliente final recibe el servicio del partner, que mantiene la relación y la presencia local; CONEXUM aporta la ingeniería remota de segundo y tercer nivel.",
  points: [
    { title: "Marca blanca", text: "Trabajamos con su identidad, sus herramientas y sus procesos frente al cliente final." },
    { title: "Soporte back-to-back", text: "Su equipo conserva la relación; nosotros aportamos la ingeniería de segundo y tercer nivel." },
    {
      title: "Complementariedad local",
      /* CONEXUM no realiza intervenciones físicas: el servicio es remoto. */
      text: "CONEXUM opera en remoto. La sustitución de equipos, el cableado y cualquier intervención física corresponden al partner o al cliente.",
    },
  ],
};

export const aboutClosing = {
  title: "Conozcamos su entorno antes de proponer nada.",
  text: "Cuéntenos cómo es su red, qué le preocupa y con qué equipo cuenta. A partir de ahí, hablamos de ingeniería.",
  cta: { href: "/contacto", label: "Hablemos de su infraestructura" },
  secondary: { href: "/servicios", label: "Ver servicios" },
};
