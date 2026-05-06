import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F7F2] text-[#1A1A1A] font-sans selection:bg-black selection:text-white">
      {/* HEADER: Klar, ruhig, Stripe-Level */}
      <header className="flex justify-between items-center px-10 py-8 bg-transparent">
        <div className="flex items-center gap-14">
          <span className="text-2xl font-bold tracking-tighter text-black">festag</span>
          <nav className="hidden lg:flex gap-8 text-[13px] font-medium text-black/60">
            <a href="#" className="hover:text-black transition-colors">Entwicklung</a>
            <a href="#" className="hover:text-black transition-colors">Startupkonzepte</a>
            <a href="#" className="hover:text-black transition-colors">Preise</a>
            <a href="#" className="hover:text-black transition-colors">Unternehmen</a>
            <a href="#" className="hover:text-black transition-colors">Teams</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[13px] font-medium text-black/80">Kontakt</button>
          <button className="bg-black text-white px-5 py-2 rounded-lg text-[13px] font-medium hover:bg-black/80 transition-all shadow-sm">
            Log In Workspace ↗
          </button>
          <button className="text-[13px] font-medium text-black/40">Onboarding &gt;</button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-10 pt-24 pb-20">
        <div className="max-w-4xl">
          <h1 className="text-[82px] leading-[0.95] font-semibold tracking-tight text-black mb-10">
            Echte Entwickler für <span className="italic font-serif">Service</span> <br />
            KI-Prozessgestützt mit Garantie.
          </h1>
          
          <p className="text-[22px] leading-relaxed text-black/50 max-w-2xl mb-14 font-medium">
            Festag AI plant, strukturiert & steuert den gesamten Entwicklungsprozess. 
            Von Entwicklern umgesetzt. Ohne Chaos, in einer App. DACH Raum.[cite: 4, 5]
          </p>

          {/* SYSTEM INPUT AREA: Soft Paper Style */}
          <div className="relative max-w-xl group">
            <div className="absolute -inset-4 bg-[#F4F3EE] rounded-[40px] opacity-0 group-focus-within:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-[#F4F3EE]/40 p-1.5 rounded-[36px] backdrop-blur-sm shadow-sm border border-black/5">
              <input 
                type="text" 
                placeholder="Wobei nutzt du Festag's Human AI?" 
                className="w-full bg-[#FFFEFC] border-none rounded-[30px] py-6 px-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-black/5 text-xl placeholder:text-black/20 outline-none transition-all"
              />
            </div>
            
            <button className="mt-8 bg-[#0A1428] text-white px-10 py-5 rounded-full flex items-center gap-4 font-semibold text-lg hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/10">
              <span>Mit Google registrieren</span>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-[12px] font-bold text-[#4285F4]">G</span>
              </div>
            </button>
          </div>

          {/* TRUST INDICATOR & SYSTEM PATH */}
          <div className="flex justify-between items-center mt-24">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-[3px] border-[#F8F7F2] bg-[#E5E7EB] shadow-sm"></div>
                ))}
              </div>
              <span className="text-[13px] font-medium text-black/40 ml-4 italic">Vertraut von Gründern & Teams[cite: 6]</span>
            </div>
            <div className="text-[13px] font-mono text-black/20 tracking-tighter uppercase">
              festag/app/workflow &gt;
            </div>
          </div>
        </div>
      </section>

      {/* READ-ME STYLE CONTAINER (Ivory Air #FFFEFC) */}
      <div className="mx-6 min-h-[400px] bg-[#FFFEFC] rounded-t-[48px] shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.08)] border-t border-white/50 flex flex-col items-center justify-center">
        <div className="w-20 h-1.5 bg-black/5 rounded-full mb-12"></div>
        <p className="text-black/20 font-mono text-sm uppercase tracking-widest">System Architecture Layer</p>
      </div>
    </main>
  );
}