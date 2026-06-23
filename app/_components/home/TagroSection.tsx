import { PillButton } from "../PillButton";

function TagroMock() {
  return (
    <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#f8f8fa] p-8">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(91,100,125,0.12), transparent 60%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex size-16 items-center justify-center rounded-full border border-[#ebebf4] bg-white shadow-sm">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="14" r="4" fill="#5b647d" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="14"
                y1="14"
                x2={14 + 10 * Math.cos((deg * Math.PI) / 180)}
                y2={14 + 10 * Math.sin((deg * Math.PI) / 180)}
                stroke="#bfc4d2"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>
        <p className="text-center text-[13px] tracking-[0.017em] text-[#8f93a4]">
          Tagro analysiert Projektsignale
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-full border border-[#ebebf4] px-5 py-2 text-[13px] text-[#a3a7b1]"
          >
            Abbrechen
          </button>
          <button
            type="button"
            className="rounded-full bg-[#5b647d] px-5 py-2 text-[13px] text-white"
          >
            Tagro AI starten
          </button>
        </div>
      </div>
    </div>
  );
}

export function TagroSection() {
  return (
    <section className="shell-wide py-24 md:py-32">
      <h2 className="t-section mx-auto max-w-[720px] text-center text-[clamp(28px,4vw,40px)] text-[#0f0f10]">
        Mit Tagro AI verwandeln wir jedes Projekt ohne Kopfschmerzen.
      </h2>

      <div className="feature-card mx-auto mt-16 grid max-w-[1100px] gap-6 p-6 md:grid-cols-2 md:p-8">
        <div className="flex flex-col justify-between rounded-2xl bg-white p-8">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#8f93a4]">
              Festag AI
            </p>
            <p className="mt-6 t-section text-[clamp(22px,2.8vw,28px)] text-[#0f0f10]">
              Mit Tagro AI verwandeln wir jedes Projekt ohne Kopfschmerzen.
            </p>
          </div>
          <PillButton href="/tagro" variant="primary" className="mt-10 w-fit">
            Tagro entdecken
          </PillButton>
        </div>
        <TagroMock />
      </div>
    </section>
  );
}
