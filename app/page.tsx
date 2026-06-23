import type { Metadata } from "next";
import {
  CtaSection,
  HeroSection,
  HowItWorksSection,
  PositioningSection,
  ProblemSection,
  ProductExperienceSection,
  SocialProofSection,
  SolutionSection,
  TrustSection,
  ValueSection,
} from "./_components/landing";

export const metadata: Metadata = {
  title: "Festag — Softwareentwicklung, strukturiert gemacht",
  description:
    "Festag ist ein KI-natives Produktionssystem, das Softwareentwicklung in einen transparenten, planbaren und jederzeit sichtbaren Prozess verwandelt.",
  openGraph: {
    title: "Festag — Softwareentwicklung, strukturiert gemacht",
    description:
      "Ein System, das Softwareentwicklung transparent, planbar und nachvollziehbar macht.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <ProductExperienceSection />
      <TrustSection />
      <ValueSection />
      <PositioningSection />
      <SocialProofSection />
      <CtaSection />
    </>
  );
}
