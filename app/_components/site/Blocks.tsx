import Link from "next/link";
import { Icon, type IconName } from "../ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Stage } from "../ui/Window";
import { TextLink } from "../ui/Button";
import { connectors, CONNECTOR_STATUS_LABEL } from "@/lib/site/connectors";
import { changelog, voices, type ChangelogEntry } from "@/lib/site/content";

/** Cursor-style alternating feature: copy on one side, live demo on a painted stage. */
export function FeatureBlock({
  id,
  title,
  sub,
  link,
  flip,
  children,
}: {
  id?: string;
  title: string;
  sub: string;
  link?: { href: string; label: string };
  flip?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="article" className={`feature${flip ? " feature--flip" : ""}`} id={id}>
      <div className="feature-copy">
        <h3 className="h3">
          {title}
          <span style={{ color: "var(--muted)" }}> {sub}</span>
        </h3>
        {link ? <TextLink href={link.href}>{link.label}</TextLink> : null}
      </div>
      <div className="feature-media">
        <Stage pad>{children}</Stage>
      </div>
    </Reveal>
  );
}

export function ConnectorMarquee({ label }: { label?: string }) {
  const list = [...connectors, ...connectors];
  return (
    <section className="strip" aria-label="Connectors">
      <div className="wrap wrap--wide">
        {label ? <p className="strip-label">{label}</p> : null}
        <div className="marquee">
          <div className="marquee-track">
            {list.map((c, i) => (
              <Link
                key={`${c.id}-${i}`}
                href="/connectors"
                className="chip"
                tabIndex={i >= connectors.length ? -1 : undefined}
                aria-hidden={i >= connectors.length ? true : undefined}
              >
                <span className="chip-icon">
                  <Icon name={c.id} />
                </span>
                {c.name}
                {c.status !== "live" ? <span className="chip-state">{CONNECTOR_STATUS_LABEL[c.status]}</span> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function VoicesGrid({ limit = 6 }: { limit?: number }) {
  return (
    <RevealGroup className="quote-grid">
      {voices.slice(0, limit).map((v) => (
        <RevealItem key={v.quote} className="quote">
          <p>{v.quote}</p>
          <div className="quote-meta">
            <span className="quote-avatar" aria-hidden>
              {v.initials}
            </span>
            <span>
              <span className="quote-name" style={{ display: "block" }}>
                {v.name}
              </span>
              <span className="quote-role">{v.role}</span>
            </span>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

const ART_ICON: Record<ChangelogEntry["art"], IconName> = {
  connectors: "flow",
  executive: "chart",
  tagro: "sparkles",
  okm: "brain",
  extension: "puzzle",
  cursor: "cursor",
  audio: "audio",
  objectives: "target",
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}

export function UpdateCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <Link href={`/changelog#v${entry.version}`} className="update">
      <div className="update-art" aria-hidden>
        <div className="update-art-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="card-icon" style={{ margin: 0, width: 28, height: 28 }}>
              <Icon name={ART_ICON[entry.art]} size={15} />
            </span>
            <span style={{ fontSize: 12, color: "var(--ink)" }}>{entry.tags[0]}</span>
            <span className="tag" style={{ marginLeft: "auto", height: 20, fontSize: 11 }}>
              v{entry.version}
            </span>
          </div>
          <div className="skeleton" style={{ height: 8, width: "82%" }} />
          <div className="skeleton" style={{ height: 8, width: "64%" }} />
          <div className="skeleton" style={{ height: 8, width: "72%" }} />
        </div>
      </div>
      <div className="update-copy">
        <div className="update-date">{formatDate(entry.date)}</div>
        <div className="update-title">{entry.title}</div>
        <div className="update-body">{entry.body}</div>
      </div>
    </Link>
  );
}

export function LatestUpdates({ count = 3 }: { count?: number }) {
  return (
    <RevealGroup className="updates">
      {changelog.slice(0, count).map((e) => (
        <RevealItem key={e.version}>
          <UpdateCard entry={e} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function IconCard({
  icon,
  title,
  body,
  href,
}: {
  icon: IconName;
  title: string;
  body: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="card-icon">
        <Icon name={icon} />
      </span>
      <h3 className="h4">{title}</h3>
      <p className="body">{body}</p>
      {href ? <Icon name="arrowUpRight" size={16} className="card-arrow" /> : null}
    </>
  );
  if (href) {
    return (
      <Link href={href} className="card card--link" style={{ display: "block", height: "100%" }}>
        {inner}
      </Link>
    );
  }
  return (
    <div className="card" style={{ height: "100%" }}>
      {inner}
    </div>
  );
}
