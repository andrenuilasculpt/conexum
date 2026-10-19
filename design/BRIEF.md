# PROMPT MAESTRO — CONEXUM | Website corporativo B2B

Actúa como director creativo digital senior, diseñador de producto y arquitecto frontend. Diseña y construye el prototipo navegable de **CONEXUM**, empresa B2B de ingeniería de infraestructuras tecnológicas y telecomunicaciones, orientada a medianas y grandes organizaciones, responsables de IT, CTO, integradores y MSPs en España. Quiero un resultado de gama alta, sobrio, inequívocamente corporativo, con calidad visual comparable a una consultora global de ingeniería de redes. **No hagas una landing genérica basada en una plantilla.** Toma decisiones de diseño y ejecuta el proyecto completo sin pedirme más información.

## 01 — Contexto y posicionamiento

CONEXUM diseña, optimiza, opera y respalda infraestructuras de red de misión crítica. Su especialidad comercial es la **ingeniería lógica y el soporte remoto especializado sobre ecosistemas Cisco** (redes corporativas, routing y switching, SD-WAN, Meraki, seguridad, NOC, arquitectura y proyectos), incluida la colaboración B2B / marca blanca con MSPs e integradores. El material de referencia indica ingeniería L2/L3, monitorización 24/7, diseño HLD/LLD, auditorías Health Check y operación remota. El sitio debe transmitir confianza técnica, rigor, resiliencia, gobernanza y capacidad de respuesta.

Público: CIO / CTO / CISO, directores de infraestructura, compras TI corporativas y partners MSP. **Nada de estética de agencia de marketing ni promesas de consumo.** Mensajes en español de España; conservar términos técnicos internacionales cuando corresponda. No inventar clientes, alianzas formales verificadas con Cisco, certificaciones personales no acreditadas, cifras de disponibilidad, SLAs contractuales, testimonios, oficinas ni proyectos realizados. Pueden mostrarse tecnologías compatibles (Cisco, Meraki, ThousandEyes, Splunk) en texto, sin insinuar ser partner oficial ni usar marcas gráficas de terceros.

## 02 — Identidad visual

Estética: enterprise technology / infrastructure intelligence / digital precision. Paleta: fondo navy muy oscuro `#081827`, azul profundo `#10283D`, blanco `#F6FAFD`, azul acero `#3977C8`, teal `#18B89C`; grises técnicos `#92A7B8`. Uso disciplinado de teal para estados y llamadas de atención. Tipografía estilo Inter / Manrope / Satoshi (o alternativas open-source). Escalas grandes, jerarquía contundente, grillas amplias, mucho aire, bordes finos, glass sobrio; nada de neón excesivo, cyberpunk, 3D barato ni tarjetas idénticas una tras otra.

**LOGOTIPO**: dibujar exclusivamente un lockup temporal de texto `CONEXUM` acompañado de un isotipo abstracto simple, señalizado en el proyecto como `LOGO PLACEHOLDER · REEMPLAZAR`. Crear componente reutilizable `BrandLogo` con `logoSrc` reemplazable más adelante desde la carpeta pública; no incrustar una marca improvisada en todas las páginas. No usar el logo imperfecto de las fichas como identidad definitiva.

## 03 — Arquitectura del sitio

Menú sticky: **Home / About / Servicios / Contacto**, botón destacado `Hablemos de su infraestructura`. Navegación funcional, scroll animado discreto y rutas o secciones accesibles con anclas reales. Footer integral con menú, resumen y correo provisional **info@conexum.one** (editable por configuración; no afirmar que el buzón esté operativo). Se debe poder publicar como demo en GitHub + Vercel.

### HOME (alto impacto)
- Hero tipo editorial corporativo: eyebrow `INFRAESTRUCTURA · NETWORK ENGINEERING · OPERACIONES`; headline sugerido: **«La infraestructura invisible que hace posible todo lo demás.»**; apoyo: «Ingeniería especializada para redes empresariales, entornos críticos y operaciones que no pueden detenerse.»
- CTAs `Explorar servicios` y `Conocer Conexum`. Elemento visual principal: **topología de red dinámica en movimiento**, construida con SVG o Canvas ligero: nodos, enlaces, paquetes recorriendo rutas, pulsos de telemetría; interacción del ratón en escritorio, versión optimizada y no intrusiva en móvil. No usar un vídeo pesado de stock.
- Franja de capacidades en 4 columnas: `Network Engineering`, `NOC & Monitoring`, `Security & Zero Trust`, `Cloud Networking`.
- Sección narrativa «De la arquitectura a la operación»: cadena visual en 4 etapas: Diseñar → Implementar → Operar → Optimizar.
- Bloque «Especialización que se integra con su equipo» con dos itinerarios: `Empresas y áreas de IT` / `Partners, MSPs e integradores`.
- Destacado `Cisco Network Health Check`: diagnóstico técnico inicial de riesgo, resiliencia y configuración, sujeto a alcance y validación comercial. No afirmar que sea gratuito si no se aprueba la promoción.
- Cierre CTA con alto contraste.

### ABOUT
- Hero con statement de marca: **«La confianza tecnológica se construye con ingeniería.»**
- Quiénes somos: equipo especializado en diseño, operación y mejora de entornos de conectividad empresarial; servicio remoto experto y colaboración técnica con empresas e integradores.
- Valores: precisión, prevención, transparencia, continuidad, confidencialidad.
- Modelo operacional: HLD/LLD, gestión de incidencias L2/L3, observabilidad, cambios planificados, soporte documentado y transferencia de conocimiento.
- Sección partners: posibilidades de marca blanca, soporte back-to-back y complementariedad con equipos locales (`smart hands` aportado por el partner); evitar afirmar que CONEXUM hace sustituciones físicas si el servicio es remoto.
- Gráfico elegante de arquitectura lógica / malla de nodos, totalmente responsive.

### SERVICIOS
Diseñar una experiencia premium de servicios, con 6 módulos claros, visuales y enlaces de detalle/CTA:
1. **Ingeniería de redes corporativas**: routing, switching, BGP, OSPF, Catalyst, Nexus, rediseño y optimización.
2. **SD-WAN y Cloud Networking**: redes distribuidas, Cisco Meraki y conectividad multi-sede.
3. **NOC y monitorización**: visibilidad operativa, alertas, gestión de incidencias, configuraciones y mantenimiento programado.
4. **Ciberseguridad y Zero Trust**: políticas, firewalls, VPN, Cisco ISE, control de acceso, hardening.
5. **Arquitectura y transformación**: consultoría, HLD/LLD, migraciones, auditorías Health Check.
6. **Servicios para partners**: engineering-on-demand, escalado L2/L3, marca blanca y ventanas de mantenimiento.
Usar mini diagramas de red originales, una sección «Cómo trabajamos» (descubrimiento, evaluación, diseño, ejecución, mejora) y un CTA `Solicitar una conversación técnica`.

### CONTACTO
- Hero `Hablemos del siguiente reto de su infraestructura.`
- Formulario DEMO funcional en cliente con campos nombre, empresa, correo, tipo de necesidad, mensaje, consentimiento de privacidad y validación. Mostrar confirmación honesta «Solicitud preparada (demo). La integración de envío está pendiente» si no hay backend real. Estructura lista para conectar posteriormente con Resend / Formspree / API route, sin llaves expuestas.
- Correo provisional `info@conexum.one`, rotulado como configurable; omitir teléfonos y domicilios hasta contar con datos aprobados.

## 04 — Motion / detalle tecnológico
- Animaciones de nodos, rutas y líneas a 30–60fps objetivo sin bloquear el hilo principal, con requestAnimationFrame pausado fuera de viewport y respeto a `prefers-reduced-motion`.
- Aparición de titulares, contadores solo de conceptos (no inventar KPIs), microinteracciones hover y cambios de pestaña.
- En móvil sustituir visualizaciones pesadas por versiones simplificadas; 320–1440+ px sin desbordes.

## 05 — Requisitos de implementación para entregar a Claude Code
- Construir pantallas y componentes realmente navegables, no imágenes estáticas, en React + TypeScript + Tailwind si la plataforma lo permite. Componentes: `BrandLogo`, `SiteHeader`, `NetworkTopologyHero`, `ServiceCard`, `ContactForm`, `SiteFooter`.
- Responsive mobile-first, hamburger funcional, estados de foco visibles, etiquetas, contraste WCAG AA, accesibilidad de teclado y buena legibilidad.
- Imágenes e iconos optimizados; preferir SVGs originales. Buenas prácticas SEO (`title`, `meta description`, OG placeholders, headings semánticos), buen rendimiento.
- Contenido final, sólido y específico en español de España; sin lorem ipsum, sin testimonios ficticios, sin métricas ni certificaciones no comprobadas.
- Preparar estructura para exportación a repositorio y despliegue en Vercel. Centralizar textos, email y assets, y dejar `public/brand/conexum-logo.svg` como PLACEHOLDER fácilmente sustituible.
- Se trata de una **demo comercial visual y funcional**. No simular operaciones de soporte técnico reales ni envíos de formularios como si se hubieran realizado.

## 06 — Criterio de calidad / resultado

Primera impresión: una firma de ingeniería de red global y confiable. Que al verlo un director de IT perciba **especialización, solidez empresarial, claridad comercial y excelencia técnica**. Entregar el diseño íntegro de Home, About, Servicios y Contacto en escritorio y móvil, navegación completa y animaciones implementadas. Procede directamente con una propuesta integral de diseño, sin solicitar confirmaciones intermedias.
