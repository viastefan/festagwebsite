import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/** Schriftgeführte Liste wie die Seitenleiste der App: Kürzel, Titel, Text, optional Meta. */
export function KeyList({ items }: { items: { k?: string; title: string; body?: string; meta?: string }[] }) {
  return (
    <RevealGroup className="klist">
      {items.map((it, i) => (
        <RevealItem key={it.title}>
          <span className="klist-k">{it.k ?? String(i + 1)}</span>
          <span className="klist-t">{it.title}</span>
          {it.body ? <p className="klist-b">{it.body}</p> : null}
          {it.meta ? <span className="klist-m">{it.meta}</span> : null}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Ungleich große Glas-Zellen. span: "wide" = halbe Breite, "full" = ganze Breite. */
export function Bento({ children }: { children: React.ReactNode }) {
  return <RevealGroup className="bento">{children}</RevealGroup>;
}
export function BentoCell({
  title,
  body,
  span,
  children,
}: {
  title: string;
  body?: string;
  span?: "wide" | "full";
  children?: React.ReactNode;
}) {
  return (
    <RevealItem className={`bento-cell${span === "wide" ? " is-wide" : span === "full" ? " is-full" : ""}`}>
      <h3>{title}</h3>
      {body ? <p>{body}</p> : null}
      {children ? <div className="bento-art">{children}</div> : null}
    </RevealItem>
  );
}

/** Kennzahlen mit Haarlinien. */
export function StatStrip({ items }: { items: { v: string; l: string }[] }) {
  return (
    <Reveal className="stats">
      {items.map((s) => (
        <div key={s.l}>
          <b>{s.v}</b>
          <span>{s.l}</span>
        </div>
      ))}
    </Reveal>
  );
}
