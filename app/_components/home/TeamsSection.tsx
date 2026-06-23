const TEAM_ROWS = [
  { name: "Website Relaunch", status: "In Planung", date: "12.06.2026" },
  { name: "App MVP", status: "In Arbeit", date: "28.06.2026" },
  { name: "Brand Portal", status: "Review", date: "05.07.2026" },
];

function TeamsMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ebebf4] bg-white">
      <div className="flex items-center justify-between border-b border-[#ebebf4] px-6 py-4">
        <p className="text-[14px] font-medium tracking-[0.012em] text-[#0f0f10]">
          Projekte
        </p>
        <span className="rounded-full bg-[#fcfcfc] px-3 py-1 text-[12px] text-[#8f93a4]">
          Neues Projekt
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3 text-[11px] uppercase tracking-[0.12em] text-[#a3a7b1]">
        <span>Name</span>
        <span>Status</span>
        <span>Deadline</span>
      </div>
      {TEAM_ROWS.map((row) => (
        <div
          key={row.name}
          className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-[#f0f0f2] px-6 py-4"
        >
          <span className="text-[14px] text-[#0f0f10]">{row.name}</span>
          <span className="rounded-full bg-[#fcfcfc] px-3 py-1 text-[12px] text-[#5b647d]">
            {row.status}
          </span>
          <span className="text-[13px] text-[#8f93a4]">{row.date}</span>
        </div>
      ))}
    </div>
  );
}

export function TeamsSection() {
  return (
    <section className="shell-wide pb-32 pt-8 md:pb-40">
      <h2 className="t-section text-[clamp(28px,4vw,40px)] text-[#0f0f10]">
        Festag Teams.
      </h2>

      <div className="feature-card mx-auto mt-16 grid max-w-[1100px] gap-6 p-6 md:grid-cols-2 md:p-8">
        <div className="flex flex-col justify-between rounded-2xl bg-white p-8">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#8f93a4]">
              Delivery Mode
            </p>
            <p className="mt-6 t-section text-[clamp(22px,2.8vw,28px)] text-[#0f0f10]">
              Alle Projekte auf einem Blick. KI gesteuert.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed tracking-[0.017em] text-[#a3a7b1]">
              Status, Risiken und Entscheidungen für interne Teams — ohne
              manuelle Statusberichte.
            </p>
          </div>
        </div>
        <TeamsMock />
      </div>

      <div className="feature-card mx-auto mt-8 grid max-w-[1100px] gap-6 p-6 md:grid-cols-2 md:p-8">
        <div className="flex flex-col justify-between rounded-2xl bg-white p-8">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#8f93a4]">
              Client Mode
            </p>
            <p className="mt-6 t-section text-[clamp(22px,2.8vw,28px)] text-[#0f0f10]">
              Kunden sehen Fortschritt, nicht Chaos.
            </p>
          </div>
        </div>
        <TeamsMock />
      </div>
    </section>
  );
}
