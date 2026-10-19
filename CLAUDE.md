# CLAUDE.md · CONEXUM web

Instrucciones para Claude Code. Léelas completas antes de tocar el código.

## Qué es

Demo comercial, visual y funcional, del website corporativo B2B de **CONEXUM**: ingeniería de infraestructuras de red y telecomunicaciones (especialidad en ecosistemas Cisco, soporte remoto L2/L3, NOC, SD-WAN, Zero Trust y colaboración en marca blanca con MSPs e integradores). Público: CIO, CTO, CISO, dirección de infraestructura, compras TI y partners MSP en España.

- Stack: **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.
- Despliegue objetivo: **GitHub + Vercel**.
- Brief original completo: `design/BRIEF.md`. Diseño de referencia: `design/` (ver más abajo).

## Estado al recibir el repositorio

**Hecho**

- Rutas `/`, `/about`, `/servicios`, `/contacto` y página 404.
- Componentes del brief: `BrandLogo`, `SiteHeader`, `NetworkTopologyHero`, `ServiceCard`, `ContactForm`, `SiteFooter` (más piezas de apoyo en `src/components/ui`).
- `/api/contact` como estructura lista para conectar (valida y responde 501 mientras no haya proveedor).
- SEO básico: metadata por página, Open Graph con imagen placeholder, `sitemap.xml`, `robots.txt` (la demo no se indexa por defecto), headings semánticos.
- Accesibilidad: foco visible, skip link, menú con `aria-expanded`, pestañas ARIA con flechas, formulario con `label`, `aria-invalid` y errores asociados, contraste AA.

**Verificado fuera de Next.js** (el entorno donde se generó no tenía acceso al registro npm)

- Las páginas se renderizaron con React 19.2 y Tailwind 4.3 compilado, en Chromium a 1440 px y 390 px: sin desbordamiento horizontal ni errores de consola.
- 25 comprobaciones de interacción superadas: menú móvil (abrir, cerrar con Escape), navegación activa, pestañas (clic y flechas), sonda de la topología con el cursor, pausa de animaciones fuera de pantalla, `prefers-reduced-motion`, validación del formulario, foco en el primer error, confirmación demo y reinicio.

- Comprobación de tipos en modo estricto (con `noUnusedLocals`) usando declaraciones simplificadas de React y Next: sin errores. Falta la comprobación con los tipos reales.

**Sin verificar todavía**: `npm install`, `npm run typecheck`, `npm run build`. Es lo primero que hay que hacer.

## Primeros pasos (en este orden)

1. `npm install` y commitear el `package-lock.json` generado.
2. `npm run typecheck` y corregir cualquier error de tipos sin cambiar el comportamiento.
3. `npm run build`. Si Next ajusta `tsconfig.json` automáticamente, aceptar el cambio.
4. `npm run dev` y revisar las cuatro rutas a 1440 px y 390 px comparándolas con `design/screenshots/`.
5. `git init`, primer commit, repositorio en GitHub e importación en Vercel. No hay variables obligatorias (ver `.env.example`).

## Comandos

```bash
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run typecheck  # tsc --noEmit
```

## Estructura

```
src/
  app/
    layout.tsx            fuentes (next/font), metadata global, header, footer, RevealManager
    globals.css           tokens Tailwind v4 (@theme), utilidades propias y CSS de piezas animadas
    page.tsx              Home
    about/page.tsx
    servicios/page.tsx
    contacto/page.tsx
    api/contact/route.ts  estructura del envío (pendiente de proveedor)
    sitemap.ts · robots.ts · not-found.tsx · icon.svg
  components/
    BrandLogo.tsx         logotipo desde public/brand (PLACEHOLDER)
    SiteHeader.tsx        sticky, cristal sobrio, hamburguesa < 1024 px
    SiteFooter.tsx
    NetworkTopologyHero.tsx  hero con topología SVG animada e interactiva
    CollaborationTabs.tsx    itinerarios Empresas / Partners
    ServiceCard.tsx + diagrams/ServiceDiagram.tsx (6 mini diagramas originales)
    ArchitectureDiagram.tsx  arquitectura lógica por capas (About)
    ContactForm.tsx
    RevealManager.tsx     aparición al hacer scroll (una vez)
    ui/                   Primitives (Eyebrow, SectionHeading, ButtonLink, TextLink, CheckList, Badge), Icons, FlowDiagram, CtaBand
  config/site.ts          configuración central: correo, logo, OG, navegación, modo del formulario, avisos
  content/*.ts            todos los textos por página
  lib/contact.ts          modelo y validación del formulario (cliente y servidor)
public/
  brand/conexum-logo.svg  LOGO PLACEHOLDER · REEMPLAZAR
  og/conexum-og.png       OG PLACEHOLDER · REEMPLAZAR (1200 × 630)
design/                   brief, archivos del lienzo de Claude Design y capturas de referencia
```

Los textos viven en `src/content/` y la configuración en `src/config/site.ts`. No escribas copy directamente en los componentes.

## Reglas de contenido (no negociables)

- No inventar clientes, casos de éxito, testimonios, cifras de disponibilidad, KPIs, SLAs contractuales, certificaciones personales, oficinas ni proyectos realizados.
- No afirmar ni insinuar partnership oficial con Cisco. Cisco, Meraki, ThousandEyes y Splunk solo aparecen **en texto**, nunca con logotipos de terceros, y el footer mantiene el aviso de marcas.
- **Cisco Network Health Check**: no decir que es gratuito. Siempre "alcance y condiciones sujetos a validación técnica y comercial".
- El servicio es **remoto**: smart hands, sustitución de equipos y cableado los aporta el partner o el cliente. No escribir lo contrario.
- `info@conexum.one` es **provisional**: no afirmar que el buzón está operativo. Se cambia en `siteConfig.contactEmail`.
- Formulario en modo demo: no simular envíos reales. Tras validar ofrece abrir el cliente de correo (mailto) con la solicitud redactada. Los CTA de servicio enlazan a `/contacto?servicio=<id>#formulario` y preseleccionan el tipo.
- Formulario en modo demo (texto): El texto de confirmación exigido es «Solicitud preparada (demo). La integración de envío está pendiente».
- Español de España, trato de usted, términos técnicos internacionales cuando corresponda (routing, switching, SD-WAN, Zero Trust...). Tono sobrio y técnico, nada de lenguaje de agencia ni promesas de consumo.
- Sin rayas largas (—) en los textos del sitio: usar punto medio (·), dos puntos o comas.
- Sin lorem ipsum. Si falta un dato real, placeholder visible entre corchetes: `[DATO PENDIENTE]`.
- Teléfonos y direcciones: omitidos hasta tener datos aprobados.

## Sistema visual

Tokens en `src/app/globals.css` (`@theme`). La paleta por defecto de Tailwind está **desactivada** (`--color-*: initial`): usa solo estos nombres.

| Token | Hex | Uso |
| --- | --- | --- |
| `navy` | #081827 | fondo principal |
| `abyss` | #061420 | pie y fondo de página |
| `deep` | #10283D | secciones destacadas |
| `panel` / `node` / `layer` | #0B2033 / #0D2338 / #0F263B | paneles, nodos y capas de diagramas |
| `ink` | #F6FAFD | texto principal y fondos claros |
| `steel` | #3977C8 | enlaces de red y diagramas (no para texto pequeño) |
| `steel-light` | #6E9FE0 | texto técnico sobre oscuro |
| `steel-dark` | #2A5FA8 | acero como texto sobre claro |
| `teal` | #18B89C | estados, foco y acción principal (uso disciplinado) |
| `teal-bright` | #3FD0B5 | hover de la acción principal |
| `teal-dark` | #0E7C69 | teal como texto sobre claro |
| `grey` · `muted` · `soft` · `mist` · `haze` · `faint` | #92A7B8 … | texto secundario en escala |
| `graphite` | #4A5F72 | texto secundario sobre claro |
| `danger` | #FF8F80 | errores de validación |

- Tipografía: **Manrope** (titulares y texto) e **IBM Plex Mono** (etiquetas técnicas en mayúsculas), cargadas con `next/font/google`.
- Escala fluida: `text-display`, `text-title`, `text-section`, `text-closing`, `text-module`, `text-lead`, `text-label`.
- Utilidades propias: `container-x` (máx. 1280 px, gutter 20 a 64 px), `section-y`, `grid-fit-N` (rejilla auto-fit con mínimo N px que colapsa a 1 columna), `dot-grid`, `blueprint`, `glass`, `reveal`.
- Botones: radio 4 px, sin pastillas. Bordes finos (1 px, gris al 15 a 25 %). Nada de neón, gradientes llamativos ni tarjetas idénticas en serie.
- Contraste: sobre fondos claros, el acero y el teal como texto usan siempre sus variantes `-dark`.

## Motion y rendimiento

- `NetworkTopologyHero`: SVG con `animateMotion` (paquetes) y CSS (túneles, pulsos). Las animaciones se pausan fuera de pantalla (IntersectionObserver + `pauseAnimations()`) y con `prefers-reduced-motion`. La sonda del cursor usa `requestAnimationFrame` y solo funciona desde 1024 px.
- Bajo 1024 px la topología pasa debajo del texto; bajo 768 px se ocultan paquetes y túneles.
- `RevealManager` añade la aparición al hacer scroll una sola vez. Sin JavaScript o con reduced motion no se oculta nada; lo que ya está en pantalla al cargar no parpadea.
- Hay una regla global que anula animaciones y transiciones con `prefers-reduced-motion: reduce`. Mantenerla.
- No añadir vídeo de stock ni librerías de animación: el diseño no las necesita.

## Componentes clave

| Componente | Notas |
| --- | --- |
| `BrandLogo` | Renderiza `siteConfig.logoSrc`. Para el logo definitivo basta con sustituir `public/brand/conexum-logo.svg` (y `src/app/icon.svg`). No dibujar la marca a mano en otros sitios. |
| `SiteHeader` | Cliente. Enlace activo por `usePathname`, menú móvil con Escape y cierre al pasar a escritorio. |
| `NetworkTopologyHero` | Cliente. Datos de nodos, enlaces, túneles y paquetes al principio del archivo. |
| `ServiceCard` | Recibe un `Service` de `src/content/services.ts`; `reversed` alterna el diagrama desde 1280 px. |
| `ContactForm` | Cliente. Modo `demo` (por defecto) o `api` según `siteConfig.contactFormMode`. Validación compartida en `src/lib/contact.ts`. |
| `SiteFooter` | Menú, servicios, correo provisional, enlaces legales y aviso de marcas. |

## Pendientes

1. Logotipo definitivo: `public/brand/conexum-logo.svg` y `src/app/icon.svg`.
2. Imagen Open Graph definitiva: `public/og/conexum-og.png` (1200 × 630).
3. Textos legales: `/legal` (contenido en `src/content/legal.ts`) es provisional, con [DATO PENDIENTE] en razón social, NIF y domicilio. Sustituir por los textos aprobados; si se añade analítica, banner de cookies.
4. Integración del formulario: completar `deliver()` en `src/app/api/contact/route.ts` (Resend, Formspree u otro, claves solo en servidor), añadir protección anti-spam y límite por IP, y cambiar `contactFormMode` a `"api"`.
5. Dominio: definir `NEXT_PUBLIC_SITE_URL` y, al publicar en producción, `NEXT_PUBLIC_INDEXABLE=true`.
6. Confirmar con CONEXUM: "Monitorización 24/7" (procede del material de referencia) y la lista de tecnologías citadas.
7. Opcional: ESLint (`eslint-config-next`) y tests e2e con Playwright.

## Referencias de diseño (`design/`)

- `BRIEF.md`: prompt maestro original.
- `claude-design/`: fuentes del lienzo de Claude Design (artboards `.dc.html` y `canvas.json`). Son referencia: dependen del runtime de Claude Design y no se ejecutan fuera de él. La implementación de este repo manda sobre ellos.
- `screenshots/`: capturas de esta implementación (escritorio 1440 px y móvil 390 px, más estados del formulario, menú móvil y sonda de la topología). Se tomaron con **Inter como sustituta de Manrope** porque el entorno no podía descargar Google Fonts; con `next/font` se verá Manrope.
