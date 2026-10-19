/**
 * Modelo y validación del formulario de contacto.
 * Se comparte entre el cliente (ContactForm) y el servidor (/api/contact).
 */

/** Los valores coinciden con los `id` de src/content/services.ts para poder preseleccionar desde ?servicio=. */
export const NEED_OPTIONS = [
  { value: "redes", label: "Ingeniería de redes" },
  { value: "sdwan", label: "SD-WAN y Cloud Networking" },
  { value: "noc", label: "NOC y monitorización" },
  { value: "seguridad", label: "Ciberseguridad" },
  { value: "arquitectura", label: "Arquitectura y consultoría" },
  { value: "partners", label: "Servicios para integradores y MSPs" },
  { value: "otra", label: "Otro" },
] as const;

export type NeedValue = (typeof NEED_OPTIONS)[number]["value"];

export function isNeedValue(value: string | null | undefined): value is NeedValue {
  return NEED_OPTIONS.some((o) => o.value === value);
}

export type ContactPayload = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  tipo: string;
  mensaje: string;
  privacidad: boolean;
};

export type ContactField = keyof ContactPayload;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Orden de los campos en pantalla: se usa para enfocar el primer error. */
export const CONTACT_FIELD_ORDER: ContactField[] = ["nombre", "empresa", "correo", "telefono", "tipo", "mensaje", "privacidad"];

export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 4000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Opcional: dígitos, espacios, guiones, paréntesis y prefijo internacional. */
const PHONE_PATTERN = /^\+?[\d\s().-]{9,20}$/;

export function needLabel(value: string): string {
  return NEED_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function parseContactForm(fd: FormData): ContactPayload {
  return {
    nombre: String(fd.get("nombre") ?? "").trim(),
    empresa: String(fd.get("empresa") ?? "").trim(),
    correo: String(fd.get("correo") ?? "").trim(),
    telefono: String(fd.get("telefono") ?? "").trim(),
    tipo: String(fd.get("tipo") ?? ""),
    mensaje: String(fd.get("mensaje") ?? "").trim(),
    privacidad: fd.get("privacidad") === "si",
  };
}

/** Normaliza un cuerpo JSON desconocido (servidor). */
export function toContactPayload(input: unknown): ContactPayload {
  const o = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    nombre: str(o.nombre),
    empresa: str(o.empresa),
    correo: str(o.correo),
    telefono: str(o.telefono),
    tipo: str(o.tipo),
    mensaje: str(o.mensaje),
    privacidad: o.privacidad === true,
  };
}

export function validateContact(v: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (v.nombre.length < 2) errors.nombre = "Indique su nombre y apellidos.";
  if (v.empresa.length < 2) errors.empresa = "Indique el nombre de su empresa.";
  if (!EMAIL_PATTERN.test(v.correo)) errors.correo = "Introduzca un correo electrónico válido.";
  if (v.telefono && !PHONE_PATTERN.test(v.telefono)) errors.telefono = "Introduzca un teléfono válido o deje el campo vacío.";
  if (!isNeedValue(v.tipo)) errors.tipo = "Seleccione el tipo de servicio.";
  if (v.mensaje.length < MESSAGE_MIN_LENGTH)
    errors.mensaje = `Describa brevemente su proyecto (mínimo ${MESSAGE_MIN_LENGTH} caracteres).`;
  else if (v.mensaje.length > MESSAGE_MAX_LENGTH)
    errors.mensaje = `La descripción no puede superar los ${MESSAGE_MAX_LENGTH} caracteres.`;
  if (!v.privacidad) errors.privacidad = "Necesitamos su consentimiento para tratar la solicitud.";
  return errors;
}

/** Enlace mailto con la solicitud ya redactada: alternativa honesta mientras no haya envío en servidor. */
export function buildMailto(to: string, v: ContactPayload): string {
  const subject = `Solicitud de conversación técnica · ${v.empresa}`;
  const body = [
    `Nombre y apellidos: ${v.nombre}`,
    `Empresa: ${v.empresa}`,
    `Correo: ${v.correo}`,
    v.telefono ? `Teléfono: ${v.telefono}` : null,
    `Tipo de servicio: ${needLabel(v.tipo)}`,
    "",
    "Descripción del proyecto:",
    v.mensaje,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
