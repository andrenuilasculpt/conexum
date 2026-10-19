/**
 * POST /api/contact
 *
 * Estructura lista para conectar el envío real. Hoy valida y responde 501
 * ("integración pendiente"). El formulario no la usa mientras
 * siteConfig.contactFormMode === "demo".
 *
 * Para activarla:
 * 1. Elegir proveedor (Resend, Formspree u otro) y definir sus variables de
 *    entorno SOLO en el servidor (Vercel → Settings → Environment Variables).
 *    Nunca usar el prefijo NEXT_PUBLIC_ para claves.
 * 2. Implementar el envío en `deliver()` y devolver 200 cuando se confirme.
 * 3. Cambiar contactFormMode a "api" en src/config/site.ts.
 * 4. Recomendable: limitar frecuencia por IP y añadir protección anti-spam.
 */
import { NextResponse } from "next/server";
import { toContactPayload, validateContact, type ContactPayload } from "@/lib/contact";

export const runtime = "nodejs";

async function deliver(payload: ContactPayload): Promise<boolean> {
  // Ejemplo orientativo con Resend (REST, sin SDK). Revisar su documentación antes de activarlo:
  //
  // const key = process.env.RESEND_API_KEY;
  // const to = process.env.CONTACT_TO_EMAIL;
  // if (!key || !to) return false;
  // const res = await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     from: "CONEXUM Web <web@DOMINIO-VERIFICADO>",
  //     to: [to],
  //     reply_to: payload.correo,
  //     subject: `Nueva solicitud · ${payload.empresa}`,
  //     text: [payload.nombre, payload.empresa, payload.correo, payload.tipo, "", payload.mensaje].join("\n"),
  //   }),
  // });
  // return res.ok;
  void payload;
  return false;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo JSON no válido." }, { status: 400 });
  }

  const payload = toContactPayload(body);
  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const delivered = await deliver(payload);
  if (!delivered) {
    return NextResponse.json({ ok: false, error: "Integración de envío pendiente." }, { status: 501 });
  }

  return NextResponse.json({ ok: true });
}
