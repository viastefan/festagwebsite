import { FestagFeatureGallery } from "./FestagFeatureGallery";
import { FestagPlatformSection } from "./FestagPlatformSection";
import { FestagUpgradeSection } from "./FestagUpgradeSection";

export function ProductStorySection() {
  return (
    <section className="lp-product-story" aria-label="Festag Produktgeschichte">
      <FestagUpgradeSection />
      <FestagFeatureGallery />
      <FestagPlatformSection />
    </section>
  );
}
