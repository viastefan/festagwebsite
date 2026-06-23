import { HeroAnimatedContent } from "./HeroAnimatedContent";
import { HeroBackground } from "./HeroBackground";
import { HeroTrustStrip } from "./HeroTrustStrip";
import { SystemMotionStage } from "./SystemMotionStage";

export function HeroSection() {
  return (
    <section className="lp-hero" aria-labelledby="lp-hero-title">
      <div className="lp-hero-bg" aria-hidden />
      <HeroBackground />

      <div className="lp-hero-body">
        <HeroAnimatedContent />

        <div className="lp-hero-stage lp-rise lp-rise-3">
          <div className="lp-hero-shot lp-hero-shot--motion">
            <SystemMotionStage />
          </div>
          <HeroTrustStrip />
        </div>
      </div>
    </section>
  );
}
