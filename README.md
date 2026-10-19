# CONEXUM · Website corporativo B2B (demo comercial)

Website de CONEXUM, ingeniería de redes empresariales, NOC, Zero Trust y soporte remoto especializado sobre ecosistemas Cisco. Next.js + TypeScript + Tailwind CSS, preparado para GitHub y Vercel.

> Demo comercial: el formulario no envía datos y el logotipo, la imagen social y el correo `info@conexum.one` son provisionales.

## Puesta en marcha

Requisitos: Node.js 20.9 o superior.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

## Publicar en Vercel

1. Subir el repositorio a GitHub.
2. En Vercel: **Add New → Project**, importar el repositorio y desplegar (no hace falta configurar nada).
3. Cuando haya dominio, definir `NEXT_PUBLIC_SITE_URL`. Para permitir la indexación en producción, `NEXT_PUBLIC_INDEXABLE=true`.

## Dónde cambiar cada cosa

| Qué | Dónde |
| --- | --- |
| Correo, navegación, avisos, modo del formulario | `src/config/site.ts` |
| Textos de cada página | `src/content/` |
| Logotipo (placeholder) | `public/brand/conexum-logo.svg` |
| Favicon (placeholder) | `src/app/icon.svg` |
| Imagen para redes sociales (placeholder) | `public/og/conexum-og.png` |
| Colores y tipografía | `src/app/globals.css` (`@theme`) |
| Envío del formulario | `src/app/api/contact/route.ts` |

Más detalle técnico y reglas de contenido en [`CLAUDE.md`](./CLAUDE.md).
