"use client";

/**
 * ContactForm
 * - Validación en cliente (src/lib/contact.ts, compartida con /api/contact).
 * - Modo "demo" (por defecto): no envía nada; muestra una confirmación honesta y ofrece
 *   abrir el cliente de correo con la solicitud ya redactada (mailto), para no perderla.
 * - Preselecciona el tipo de servicio desde ?servicio=<id> (CTA de cada servicio).
 * - Modo "api": POST a /api/contact. La integración real (Resend, Formspree...)
 *   se completa en el servidor; nunca exponer claves en el cliente.
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { contactFormCopy as copy } from "@/content/contact";
import {
  CONTACT_FIELD_ORDER,
  NEED_OPTIONS,
  buildMailto,
  isNeedValue,
  needLabel,
  parseContactForm,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
import { cn } from "@/lib/cn";
import { Badge, buttonClass } from "./ui/Primitives";
import { ArrowRightIcon, CheckIcon, ChevronDownIcon } from "./ui/Icons";

type Result = { kind: "demo" | "sent"; nombre: string; empresa: string; tipo: string; mailto: string };

function Required() {
  return (
    <span aria-hidden="true" className="text-teal">
      {" "}
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} className="min-h-0 text-[13px] leading-snug text-danger">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [tipo, setTipo] = useState("");
  const [preselected, setPreselected] = useState(false);

  const doneRef = useRef<HTMLHeadingElement>(null);

  /* Al confirmar, llevar la vista y el foco al mensaje de resultado. */
  useEffect(() => {
    if (!result || !doneRef.current) return;
    doneRef.current.scrollIntoView({ block: "center" });
    doneRef.current.focus({ preventScroll: true });
  }, [result]);

  /* Servicio solicitado desde la página Servicios (?servicio=redes, etc.). */
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("servicio");
    if (isNeedValue(requested)) {
      setTipo(requested);
      setPreselected(true);
    }
  }, []);

  const isDemo = siteConfig.contactFormMode === "demo";
  const invalid = (f: ContactField) => (errors[f] ? true : undefined);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = parseContactForm(new FormData(form));
    const found = validateContact(data);
    const keys = CONTACT_FIELD_ORDER.filter((k) => found[k]);

    if (keys.length) {
      setErrors(found);
      setStatus(keys.length === 1 ? "Revise el campo marcado." : `Revise los ${keys.length} campos marcados.`);
      requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${keys[0]}"]`)?.focus());
      return;
    }

    setErrors({});
    setStatus("");
    const summary = {
      nombre: data.nombre,
      empresa: data.empresa,
      tipo: needLabel(data.tipo),
      mailto: buildMailto(siteConfig.contactEmail, data),
    };

    if (isDemo) {
      setResult({ kind: "demo", ...summary });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setResult({ kind: "sent", ...summary });
    } catch {
      setStatus(`${copy.apiError} ${siteConfig.contactEmail}.`);
    } finally {
      setSubmitting(false);
    }
  }

  /** Limpia el error de un campo en cuanto el usuario lo corrige. */
  function onChange(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name as ContactField;
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  if (result) {
    const demo = result.kind === "demo";
    return (
      <div role="status" aria-live="polite" className="flex flex-col gap-[22px]">
        <div className="flex items-center gap-3.5">
          <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border border-teal bg-teal/10 text-teal">
            <CheckIcon width={20} height={20} />
          </span>
          {demo && <span className="font-mono text-[11px] tracking-[0.16em] text-teal">MODO DEMO</span>}
        </div>
        <h2 ref={doneRef} tabIndex={-1} className="text-[clamp(1.625rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.025em] outline-none">
          {demo ? copy.demoDoneTitle : copy.apiDoneTitle}
        </h2>
        <p className="max-w-[560px] text-[17px] leading-relaxed text-soft">{demo ? copy.demoDoneText : copy.apiDoneText}</p>
        <dl className="grid grid-fit-180 gap-x-6 gap-y-[18px] border-y border-grey/20 py-[22px]">
          {[
            ["NOMBRE", result.nombre],
            ["EMPRESA", result.empresa],
            ["NECESIDAD", result.tipo],
          ].map(([term, value]) => (
            <div key={term} className="flex flex-col gap-1.5">
              <dt className="font-mono text-[11px] tracking-[0.14em] text-grey">{term}</dt>
              <dd className="m-0 text-base [overflow-wrap:anywhere]">{value}</dd>
            </div>
          ))}
        </dl>
        {demo && (
          <div className="flex flex-col gap-3 rounded-md border border-grey/20 bg-navy/60 p-5">
            <p className="text-[15px] leading-relaxed text-mist">{copy.demoMailtoText}</p>
            <a href={result.mailto} className={buttonClass("primary", "self-start")}>
              {copy.demoMailtoCta}
              <ArrowRightIcon className="transition-transform group-hover:translate-x-[3px]" />
            </a>
            <p className="text-[13px] leading-normal text-grey">{copy.demoMailtoNote}</p>
          </div>
        )}
        <button type="button" className={buttonClass("ghost", "self-start cursor-pointer")} onClick={() => setResult(null)}>
          {copy.reset}
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onChange={onChange} aria-describedby={isDemo ? "formulario-aviso" : undefined} className="flex flex-col gap-6">
      {isDemo && (
        <div id="formulario-aviso" className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5 border-b border-grey/15 pb-[22px]">
          <Badge>{copy.demoBadge}</Badge>
          <span className="text-sm text-muted">{copy.demoNote}</span>
        </div>
      )}

      <div className="grid grid-fit-240 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-nombre" className="text-sm font-semibold">
            Nombre y apellidos
            <Required />
          </label>
          <input
            id="cf-nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            className="field"
            aria-required="true"
            aria-invalid={invalid("nombre")}
            aria-describedby="cf-nombre-error"
          />
          <FieldError id="cf-nombre-error" message={errors.nombre} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-empresa" className="text-sm font-semibold">
            Empresa
            <Required />
          </label>
          <input
            id="cf-empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            className="field"
            aria-required="true"
            aria-invalid={invalid("empresa")}
            aria-describedby="cf-empresa-error"
          />
          <FieldError id="cf-empresa-error" message={errors.empresa} />
        </div>
      </div>

      <div className="grid grid-fit-240 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-correo" className="text-sm font-semibold">
            Correo corporativo
            <Required />
          </label>
          <input
            id="cf-correo"
            name="correo"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="nombre@empresa.com"
            className="field"
            aria-required="true"
            aria-invalid={invalid("correo")}
            aria-describedby="cf-correo-error"
          />
          <FieldError id="cf-correo-error" message={errors.correo} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-telefono" className="text-sm font-semibold">
            Teléfono <span className="font-normal text-grey">(opcional)</span>
          </label>
          <input
            id="cf-telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="field"
            aria-invalid={invalid("telefono")}
            aria-describedby="cf-telefono-error"
          />
          <FieldError id="cf-telefono-error" message={errors.telefono} />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <label htmlFor="cf-tipo" className="text-sm font-semibold">
              Tipo de servicio
              <Required />
            </label>
            {preselected && tipo && (
              <span className="font-mono text-[11px] tracking-[0.12em] text-teal">{copy.preselectedNote}</span>
            )}
          </div>
          <div className="relative">
            <select
              id="cf-tipo"
              name="tipo"
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
                setPreselected(false);
              }}
              className="field"
              aria-required="true"
              aria-invalid={invalid("tipo")}
              aria-describedby="cf-tipo-error"
            >
              <option value="">Seleccione una opción</option>
              {NEED_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey" />
          </div>
          <FieldError id="cf-tipo-error" message={errors.tipo} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cf-mensaje" className="text-sm font-semibold">
          Descripción del proyecto
          <Required />
        </label>
        <p id="cf-mensaje-ayuda" className="text-[13px] leading-normal text-grey">
          {copy.messageHint}
        </p>
        <textarea
          id="cf-mensaje"
          name="mensaje"
          rows={6}
          className="field"
          aria-required="true"
          aria-invalid={invalid("mensaje")}
          aria-describedby="cf-mensaje-ayuda cf-mensaje-error"
        />
        <FieldError id="cf-mensaje-error" message={errors.mensaje} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3.5">
          <input
            id="cf-privacidad"
            name="privacidad"
            type="checkbox"
            value="si"
            className="mt-px size-[22px] flex-none cursor-pointer accent-teal"
            aria-required="true"
            aria-invalid={invalid("privacidad")}
            aria-describedby="cf-privacidad-error"
          />
          <label htmlFor="cf-privacidad" className="text-sm leading-relaxed text-muted">
            He leído y acepto la{" "}
            <a href="/legal#privacidad" target="_blank" className="text-ink underline underline-offset-[3px]">
              política de privacidad
            </a>
            . Autorizo el uso de estos datos únicamente para responder a esta solicitud.
            <Required />
          </label>
        </div>
        <FieldError id="cf-privacidad-error" message={errors.privacidad} />
      </div>

      <p role="status" aria-live="polite" className={cn("font-mono text-xs tracking-[0.06em] text-danger", !status && "sr-only")}>
        {status}
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5 pt-1">
        <button type="submit" disabled={submitting} className={buttonClass("primary", "cursor-pointer disabled:cursor-wait disabled:opacity-70")}>
          {submitting ? copy.submitting : copy.submit}
          <ArrowRightIcon className="transition-transform group-hover:translate-x-[3px]" />
        </button>
        {isDemo && <p className="text-[13px] leading-normal text-grey">{copy.demoSubmitNote}</p>}
      </div>
    </form>
  );
}
