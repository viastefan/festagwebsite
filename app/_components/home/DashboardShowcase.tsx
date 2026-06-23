import Image from "next/image";

const SIDEBAR = [
  { id: "projekte", label: "Projekte", active: true },
  { id: "inbox", label: "Inbox" },
  { id: "status-1", label: "Statusbericht" },
  { id: "status-2", label: "Statusbericht" },
  { id: "status-3", label: "Statusbericht" },
  { id: "status-4", label: "Statusbericht" },
  { id: "status-5", label: "Statusbericht" },
];

function SidebarIcon({ active }: { active?: boolean }) {
  if (active) {
    return (
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden>
        <rect x="1" y="1" width="8" height="8" rx="2" stroke="#a3a7b1" strokeWidth="1.2" />
        <rect x="11" y="1" width="8" height="8" rx="2" stroke="#a3a7b1" strokeWidth="1.2" />
        <rect x="1" y="11" width="8" height="10" rx="2" stroke="#a3a7b1" strokeWidth="1.2" />
        <rect x="11" y="11" width="8" height="10" rx="2" stroke="#a3a7b1" strokeWidth="1.2" />
      </svg>
    );
  }

  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none" aria-hidden>
      <path
        d="M9 2C5.5 2 3 4.5 3 8v8c0 3.5 2.5 6 6 6s6-2.5 6-6V8c0-3.5-2.5-6-6-6Z"
        stroke="#a3a7b1"
        strokeWidth="1.2"
      />
      <path d="M9 7v4" stroke="#a3a7b1" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="15" r="0.8" fill="#a3a7b1" />
    </svg>
  );
}

export function DashboardShowcase() {
  return (
    <section className="wire-showcase shell-wide">
      <div className="wire-showcase-grid">
        <div className="wire-showcase-nav">
          {SIDEBAR.map((item) => (
            <div
              key={item.id}
              className={`nav-pill ${item.active ? "nav-pill--active" : "nav-pill--default"}`}
            >
              <SidebarIcon active={item.active} />
              {item.label}
            </div>
          ))}
        </div>

        <div className="wire-showcase-panel">
          <div className="wire-showcase-shot">
            <Image
              src="/marketing/dashboard-preview.png"
              alt="Alle Projekte. Auf einem Blick. KI gesteuert."
              fill
              sizes="(max-width: 1024px) 100vw, 736px"
              className="wire-showcase-img"
            />
          </div>

          <p className="wire-showcase-caption">
            <span className="text-[#a3a7b1]">
              Wir bieten In-house Softwareentwicklung, Figma Prototyping und
              Webseitenerstellung.
            </span>{" "}
            <span className="text-[#0f0f10]">
              Als White Label für Agenturen. Projektmanagement auf höchstem
              Niveau.
            </span>{" "}
            <span className="text-[#a3a7b1]">
              Wir bieten In-house Softwareentwicklung, Figma Prototyping und
              Webseitenerstellung.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
