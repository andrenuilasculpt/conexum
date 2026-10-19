"use client";

/**
 * Itinerarios de colaboración (Home): pestañas accesibles con navegación por flechas.
 */
import { useRef, useState, type KeyboardEvent } from "react";
import { collaborationSection, collaborationTracks } from "@/content/home";
import { cn } from "@/lib/cn";
import { FlowDiagram } from "./ui/FlowDiagram";
import { ButtonLink, CheckList, Eyebrow, TextLink } from "./ui/Primitives";

export function CollaborationTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const track = collaborationTracks[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = collaborationTracks.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="colaboracion-titulo" className="section-y bg-navy">
      <div className="container-x grid grid-fit-420 items-start gap-x-[72px] gap-y-12">
        <div className="flex flex-col gap-6">
          <Eyebrow>{collaborationSection.index}</Eyebrow>
          <h2 id="colaboracion-titulo" className="text-section font-semibold text-balance">
            {collaborationSection.title}
          </h2>
          <p className="max-w-[480px] text-lg leading-relaxed text-muted">{collaborationSection.intro}</p>

          <div
            role="tablist"
            aria-label="Modelos de colaboración"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex flex-col gap-3 pt-3"
          >
            {collaborationTracks.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el: HTMLButtonElement | null) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group flex w-full cursor-pointer items-start gap-4 rounded-md border border-grey/20 px-[22px] py-5 text-left text-ink transition-colors hover:border-grey/50 aria-selected:border-teal aria-selected:bg-teal/[0.07]"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-[5px] size-3.5 flex-none rounded-full border-[1.5px] transition-colors",
                      selected ? "border-teal bg-teal" : "border-grey",
                    )}
                  />
                  <span className="flex flex-col gap-1">
                    <span className="text-lg font-semibold tracking-[-0.01em]">{t.tabTitle}</span>
                    <span className="text-sm leading-normal text-muted">{t.tabText}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`panel-${track.id}`}
          aria-labelledby={`tab-${track.id}`}
          tabIndex={0}
          className="flex flex-col gap-7 rounded-lg border border-grey/20 bg-panel p-[clamp(1.5rem,3.4vw,2.75rem)]"
        >
          <div className="flex flex-col gap-3.5">
            <p className="font-mono text-[11px] tracking-[0.16em] text-teal">{track.audience}</p>
            <h3 className="text-[clamp(1.625rem,2.6vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.025em]">{track.title}</h3>
            <p className="text-base leading-[1.65] text-muted">{track.text}</p>
          </div>
          <CheckList items={track.points} />
          <FlowDiagram nodes={track.flow} bidirectional={track.flowBidirectional} ariaLabel={track.flowAria} />
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink href={track.secondaryLink.href} size="sm" arrow>
              {track.secondaryLink.label}
            </ButtonLink>
            <TextLink href={track.link.href} arrow>
              {track.link.label}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
