const PROJECTS = [
  {
    name: "Website Relaunch",
    type: "App Entwicklung",
    status: "In Entwicklung",
    updated: "Heute, 12:08",
    active: true,
  },
  {
    name: "Mobile Banking App",
    type: "App Entwicklung",
    status: "In Planung",
    updated: "Gestern, 21:44",
  },
  {
    name: "Client Portal",
    type: "Plattform",
    status: "Review",
    updated: "09. Juni",
  },
  {
    name: "Design System",
    type: "Produkt",
    status: "In Planung",
    updated: "08. Juni",
  },
];

export function ProjectsDashboardPreviewLight({
  compact = false,
  showcase = false,
}: {
  compact?: boolean;
  showcase?: boolean;
}) {
  const rows = compact || showcase ? PROJECTS.slice(0, 3) : PROJECTS;
  const isCompact = compact || showcase;

  return (
    <div
      className={`lp-proj${showcase ? " lp-proj--showcase" : ""}`}
      aria-label="Festag Projekte, Vorschau"
    >
      <header className="lp-proj-head">
        <div>
          <h3 className="lp-proj-title">Alle Projekte.</h3>
          <p className="lp-proj-sub">Auf einem Blick. KI gesteuert.</p>
        </div>
        {!isCompact ? (
          <div className="lp-proj-actions">
            <button type="button" className="lp-proj-tool" aria-label="Filter">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path
                  d="M1.5 3h12M4 7.5h7M6.5 12h2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button type="button" className="lp-proj-tool" aria-label="Sortieren">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path
                  d="M4 2.5v10M11 12.5V2.5M4 2.5 2 4.5M4 2.5l2 2M11 12.5l-2-2M11 12.5l2-2"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="lp-proj-new">+ Neues Projekt</span>
          </div>
        ) : null}
      </header>

      <div className="lp-proj-table">
        <div className="lp-proj-row lp-proj-row--head">
          <span>Projekt</span>
          <span>Status</span>
          {!isCompact ? <span>Dev&apos;ler</span> : null}
          <span>Aktualisiert</span>
          {!isCompact ? <span>In Teams</span> : null}
        </div>

        {rows.map((project) => (
          <div
            key={project.name}
            className={`lp-proj-row${project.active ? " is-active" : ""}${isCompact ? " lp-proj-row--compact" : ""}`}
          >
            <div className="lp-proj-cell-name">
              <strong>{project.name}</strong>
              <small>{project.type}</small>
            </div>
            <div className="lp-proj-cell-status">
              <span className="lp-proj-dot" aria-hidden />
              {project.status}
            </div>
            {!isCompact ? (
              <>
                <div className="lp-proj-avatars" aria-hidden>
                  <span />
                  <span />
                </div>
                <span className="lp-proj-updated">{project.updated}</span>
                <span className="lp-proj-team">—</span>
              </>
            ) : (
              <span className="lp-proj-updated">{project.updated}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
