"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const SLIDES = [
  {
    id: "people",
    title: "Sichtbarkeit schaffen",
    body: "Echte Fortschritte für Teams und Kunden — nicht nur internes Projektwissen.",
    theme: "photo" as const,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Person vor einer sonnigen Wand",
  },
  {
    id: "analyze",
    title: "Analysieren und matchen",
    body: "Tagro analysiert Anforderungen und matched passende Umsetzung.",
    theme: "dark" as const,
  },
  {
    id: "structure",
    title: "Strukturieren",
    body: "Ideen werden in Pläne, Aufgaben und klare nächste Schritte zerlegt.",
    theme: "light" as const,
  },
  {
    id: "briefing",
    title: "Briefings",
    body: "Tagro komprimiert Signale zu verständlichen Antworten, immer mit Quelle.",
    theme: "light" as const,
  },
] as const;

function SlideVisual({
  theme,
  id,
  image,
  imageAlt,
}: {
  theme: (typeof SLIDES)[number]["theme"];
  id: string;
  image?: string;
  imageAlt?: string;
}) {
  if (theme === "photo" && image) {
    return (
      <div className="lp-tagro-slide-art lp-tagro-slide-art--photo" aria-hidden>
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          className="lp-tagro-slide-photo-img"
          sizes="(max-width: 768px) 78vw, 340px"
        />
      </div>
    );
  }

  if (theme === "dark") {
    return (
      <div className="lp-tagro-slide-art lp-tagro-slide-art--dark" aria-hidden>
        <div className="lp-tagro-slide-prompt">
          <span>Projektanfrage</span>
          <p>Website Relaunch mit CMS, wöchentlichen Updates und klarem Scope.</p>
        </div>
        <div className="lp-tagro-slide-match">
          <span>Match</span>
          <strong>App Entwicklung, 3 Devs</strong>
        </div>
      </div>
    );
  }

  if (id === "briefing") {
    return (
      <div className="lp-tagro-slide-art lp-tagro-slide-art--light" aria-hidden>
        <div className="lp-tagro-slide-bubble">
          <span className="lp-tagro-slide-bubble-label">Tagro Briefing</span>
          <p>Scope-Freigabe steht aus. Nächster Meilenstein: Design Review Freitag.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lp-tagro-slide-art lp-tagro-slide-art--light" aria-hidden>
      <div className="lp-tagro-slide-plan">
        <span>Plan</span>
        <div className="lp-tagro-slide-plan-rows">
          <span style={{ width: "92%" }} />
          <span style={{ width: "78%" }} />
          <span style={{ width: "64%" }} />
        </div>
        <div className="lp-tagro-slide-plan-chips">
          <span>Discovery</span>
          <span className="is-active">Build</span>
          <span>Review</span>
        </div>
      </div>
    </div>
  );
}

export function TagroFeatureCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return;

    const center = track.scrollLeft + track.clientWidth * 0.28;
    let nextIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth * 0.5;
      const distance = Math.abs(center - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        nextIndex = index;
      }
    });

    setActiveIndex(nextIndex);
  }, []);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIndex(index);
  };

  return (
    <div className="lp-tagro-carousel-wrap">
      <div
        ref={trackRef}
        className="lp-tagro-carousel"
        aria-label="Tagro Funktionen"
        onScroll={updateActiveFromScroll}
      >
        {SLIDES.map((slide) => (
          <article key={slide.id} className="lp-tagro-slide">
            <div className="lp-tagro-slide-visual">
              <SlideVisual
                theme={slide.theme}
                id={slide.id}
                image={"image" in slide ? slide.image : undefined}
                imageAlt={"imageAlt" in slide ? slide.imageAlt : undefined}
              />
            </div>
            <p className="lp-tagro-slide-caption">
              <strong>{slide.title}.</strong> {slide.body}
            </p>
          </article>
        ))}
      </div>

      <div className="lp-tagro-carousel-dots" aria-hidden>
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={index === activeIndex ? "is-active" : undefined}
            onClick={() => scrollToIndex(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
