const PILLS = [
  "Festag Entwickler finden",
  "Bestehendem Dev'ler zuweisen",
  "Dev'ler neu einladen",
  "Dev-Team-Projekt",
];

function NewProjectCard() {
  return (
    <>
      <header className="lp-npm-head">
        <p className="lp-npm-title">Website Relaunch</p>
        <button type="button" className="lp-npm-close" aria-label="Schließen">
          ×
        </button>
      </header>

      <div className="lp-npm-body">
        <div className="lp-npm-section">
          <div className="lp-npm-label">
            <span>Umsetzung</span>
            <span className="lp-npm-help" aria-hidden>
              ?
            </span>
          </div>
          <div className="lp-npm-pills">
            {PILLS.map((pill, index) => (
              <span
                key={pill}
                className={`lp-npm-pill${index === 0 ? " is-active" : ""}`}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="lp-npm-section">
          <p className="lp-npm-textarea">
            Neue Marketing-Website mit klarer Projektstruktur, CMS-Anbindung
            und wöchentlichen Status-Updates für das Team.
          </p>
        </div>
      </div>

      <footer className="lp-npm-foot">
        <span className="lp-npm-mic" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 11.5a2.5 2.5 0 0 0 2.5-2.5V5A2.5 2.5 0 1 0 5.5 8.5v1A2.5 2.5 0 0 0 8 11.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M4 8.5a4 4 0 0 0 8 0M8 12.5V14"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="lp-npm-cta">Mit Tagro fortfahren →</span>
      </footer>
    </>
  );
}

export function NewProjectPreview({ showcase = false }: { showcase?: boolean }) {
  if (showcase) {
    return (
      <article
        className="lp-npm-card lp-npm-card--showcase"
        aria-label="Neues Projekt, Festag Popup"
      >
        <NewProjectCard />
      </article>
    );
  }

  return (
    <div className="lp-npm-scene" aria-label="Neues Projekt, Festag Popup">
      <div className="lp-npm-backdrop" aria-hidden />
      <article className="lp-npm-card">
        <NewProjectCard />
      </article>
    </div>
  );
}
