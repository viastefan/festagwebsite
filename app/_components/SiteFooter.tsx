import Link from "next/link";
import { FestagWordmark } from "./Brand";

const COL_PRODUCT = [
  { href: "/product", label: "Product" },
  { href: "/proof", label: "ProofGrid" },
  { href: "/tagro", label: "Tagro" },
  { href: "/decisions", label: "Decisions" },
  { href: "/marketing-projects", label: "Marketing Projects" },
  { href: "/internal-company-mode", label: "Internal Company Mode" },
];

const COL_COMPANY = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/now", label: "Now" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const COL_RESOURCES = [
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/security", label: "Security" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/imprint", label: "Imprint" },
];

export function SiteFooter() {
  return (
    <footer className="surface-dark mt-32">
      <div className="shell pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <FestagWordmark className="h-[22px] w-auto text-white" />
            <p className="t-body mt-6 max-w-md text-white/55 text-[15px]">
              Festag is the AI control layer for modern project work. Work,
              decisions, proof and reports — in one calm system.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <a href="https://festag.app/login" className="btn btn-primary">
                Open app <span aria-hidden>↗</span>
              </a>
              <Link href="/contact" className="btn btn-ghost-dark">
                Book demo
              </Link>
            </div>
          </div>

          <FooterCol title="Product" links={COL_PRODUCT} />
          <FooterCol title="Company" links={COL_COMPANY} />
          <FooterCol title="Resources" links={COL_RESOURCES} />
        </div>

        <div className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="t-mono text-white/30">
            © {new Date().getFullYear()} Festag · DACH
          </p>
          <p className="t-mono text-white/30">
            Modern Black · Modern White · Primary #5B647D
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="md:col-span-2 md:col-start-auto">
      <p className="t-mono text-white/40 mb-5">{title}</p>
      <ul className="grid gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[14px] text-white/70 hover:text-white transition-colors tracking-[0.012em]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
