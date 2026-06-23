import { TagroFeatureCarousel } from "./TagroFeatureCarousel";

export function SolutionSection() {
  return (
    <section id="tagro" className="lp-section lp-tagro-section">
      <div className="lp-tagro-shell">
        <div className="lp-tagro-header">
          <h2 className="lp-tagro-title">
            Mit Tagro AI. Verwandeln wir jedes Projekt ohne Kopfschmerzen.
          </h2>
        </div>

        <TagroFeatureCarousel />
      </div>
    </section>
  );
}
