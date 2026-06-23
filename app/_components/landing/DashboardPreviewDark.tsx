const PROJECTS = [
  {
    name: "Hisdf",
    type: "App Entwicklung",
    status: "In Planung",
    updated: "Heute, 12:08",
    active: true,
  },
  {
    name: "Festag SaaS-Plattform",
    type: "Website",
    status: "In Planung",
    updated: "Gestern, 21:44",
  },
  {
    name: "Website Redesign",
    type: "Website",
    status: "In Planung",
    updated: "09. Juni",
  },
  {
    name: "Mobile App",
    type: "App Entwicklung",
    status: "In Planung",
    updated: "08. Juni",
  },
  {
    name: "E-Commerce Integration",
    type: "Website",
    status: "In Planung",
    updated: "05. Juni",
  },
];

function AvatarStack() {
  return (
    <div className="lp-dash-avatars" aria-hidden>
      <span />
      <span />
    </div>
  );
}

export function DashboardPreviewDark() {
  return (
    <div className="lp-dash" aria-label="Festag Projekte, Dark Mode Vorschau">
      <header className="lp-dash-head">
        <div className="lp-dash-head-copy">
          <h2 className="lp-dash-title">Alle Projekte.</h2>
          <p className="lp-dash-sub">Auf einem Blick. KI gesteuert.</p>
        </div>
        <div className="lp-dash-head-actions">
          <button type="button" className="lp-dash-tool" aria-label="Filter">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
              <path
                d="M1.5 3h12M4 7.5h7M6.5 12h2"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button type="button" className="lp-dash-tool" aria-label="Sortieren">
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
          <span className="lp-dash-new">Neues Projekt</span>
        </div>
      </header>

      <div className="lp-dash-table" role="presentation">
        <div className="lp-dash-row lp-dash-row--head">
          <span>Projekt</span>
          <span>Status</span>
          <span>Dev&apos;ler</span>
          <span>Aktualisiert</span>
          <span>In Teams</span>
          <span aria-hidden />
        </div>

        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className={`lp-dash-row${project.active ? " is-active" : ""}`}
          >
            <div className="lp-dash-project">
              <strong>{project.name}</strong>
              <small>{project.type}</small>
            </div>
            <div className="lp-dash-status">
              <span className="lp-dash-dot" aria-hidden />
              {project.status}
            </div>
            <AvatarStack />
            <span className="lp-dash-updated">{project.updated}</span>
            <span className="lp-dash-team-dot" aria-hidden />
            <span className="lp-dash-more" aria-hidden>
              ···
            </span>
          </div>
        ))}
      </div>

      <div className="lp-dash-fab" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 12.5 12.5 3M12.5 3H7M12.5 3v5.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
