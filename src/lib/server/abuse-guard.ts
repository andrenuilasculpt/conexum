/**
 * Protección anti-abuso para rutas API (capa de seguridad básica).
 *
 * - sameOrigin(): solo acepta peticiones hechas desde el propio sitio por un navegador
 *   (cabecera Origin del mismo host o Sec-Fetch-Site: same-origin). Frena scripts y bots
 *   que llaman a la API directamente para enviar correos o consumir servicios de pago.
 * - rateLimit(): límite por IP en memoria. Es por instancia (best effort): la garantía entre
 *   instancias la da la regla de rate limit del Firewall de Vercel sobre /api/*.
 * - La IP solo se usa como clave temporal en memoria; no se registra ni se guarda.
 */
type Bucket = { n: number; reset: number };
const buckets = new Map<string, Bucket>();

export function clientIp(req: Request): string {
  const h = req.headers;
  return (h.get('x-real-ip') || h.get('x-forwarded-for') || 'unknown').split(',')[0].trim().slice(0, 64);
}

export function sameOrigin(req: Request): boolean {
  const host = (req.headers.get('x-forwarded-host') || req.headers.get('host') || '').split(',')[0].trim();
  const origin = req.headers.get('origin');
  if (origin) {
    try { return new URL(origin).host === host; } catch { return false; }
  }
  return req.headers.get('sec-fetch-site') === 'same-origin';
}

/** true si la IP superó `limit` peticiones en `windowMs` para esta clave. */
export function rateLimit(req: Request, key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > 2000) for (const [k, b] of buckets) if (b.reset <= now) buckets.delete(k);
  const id = `${key}:${clientIp(req)}`;
  const b = buckets.get(id);
  if (!b || b.reset <= now) { buckets.set(id, { n: 1, reset: now + windowMs }); return false; }
  b.n += 1;
  return b.n > limit;
}

/** Rechaza cuerpos mayores que `maxBytes` según Content-Length (antes de leerlos). */
export function tooLarge(req: Request, maxBytes: number): boolean {
  const len = Number(req.headers.get('content-length') || 0);
  return Number.isFinite(len) && len > maxBytes;
}
