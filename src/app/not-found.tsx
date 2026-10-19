import { ButtonLink, Eyebrow } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <section aria-labelledby="no-encontrada" className="dot-grid bg-navy">
      <div className="container-x flex min-h-[60vh] flex-col justify-center gap-6 py-24">
        <Eyebrow dot>ERROR 404</Eyebrow>
        <h1 id="no-encontrada" className="max-w-[760px] text-section font-semibold text-balance">
          Esta ruta no existe en la red.
        </h1>
        <p className="max-w-[520px] text-lg leading-relaxed text-muted">La página que busca no está disponible o ha cambiado de dirección.</p>
        <ButtonLink href="/" arrow className="self-start">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
