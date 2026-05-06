import { ShieldCheck, Zap, BarChart3, ChevronRight } from 'lucide-react';

export default function FestagLanding() {
  const colors = {
    bg: '#F8F7F2',
    primary: '#0F172A',
    secondary: '#8E98A7',
    white: '#FFFFFF'
  };

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.primary, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* 1. HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>festag</div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: '500', alignItems: 'center' }}>
          <a href="#system" style={{ textDecoration: 'none', color: colors.primary }}>The System</a>
          <a href="#guarantee" style={{ textDecoration: 'none', color: colors.primary }}>Guarantee</a>
          <button style={{ backgroundColor: colors.primary, color: colors.white, border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
            Start Project
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '8rem 2rem 6rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '20px', backgroundColor: 'rgba(15, 23, 42, 0.05)', fontSize: '0.85rem', marginBottom: '2rem', fontWeight: '600', color: colors.primary }}>
          NEXT-GEN SOFTWARE PRODUCTION[cite: 4]
        </div>
        
        <h1 style={{ fontSize: '4.5rem', fontWeight: '600', lineHeight: '1.05', letterSpacing: '-0.04em', marginBottom: '2.5rem' }}>
          Software development, <br />
          <span style={{ color: colors.secondary }}>made structured.</span>
        </h1>
        
        <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: colors.primary, opacity: 0.9, maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          Festag ist das Betriebssystem für moderne Softwareentwicklung – AI-gesteuert, menschlich umgesetzt, zentral kontrolliert[cite: 5].
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem' }}>
          <button style={{ backgroundColor: colors.primary, color: colors.white, border: 'none', padding: '1.1rem 2.2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
            Build your Project <ChevronRight size={18} />
          </button>
          <button style={{ backgroundColor: 'transparent', color: colors.primary, border: `1px solid rgba(15, 23, 42, 0.2)`, padding: '1.1rem 2.2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
            View Demo
          </button>
        </div>
      </section>

      {/* 3. VALUE PROPS (SYSTEM TIERS) */}
      <section id="system" style={{ maxWidth: '1200px', margin: '2rem auto 8rem', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: colors.white, padding: '3.5rem 2.5rem', borderRadius: '16px', border: '1px solid rgba(15,23,42,0.04)' }}>
          <Zap size={28} color={colors.primary} style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>AI Layer</h3>
          <p style={{ color: colors.secondary, lineHeight: '1.7', fontSize: '1rem' }}>
            Strukturiert Ideen, erstellt Tasks und analysiert den täglichen Fortschritt automatisch.
          </p>
        </div>
        
        <div style={{ backgroundColor: colors.white, padding: '3.5rem 2.5rem', borderRadius: '16px', border: '1px solid rgba(15,23,42,0.04)' }}>
          <ShieldCheck size={28} color={colors.primary} style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>Execution Layer</h3>
          <p style={{ color: colors.secondary, lineHeight: '1.7', fontSize: '1rem' }}>
            Verifizierte Experten verantworten die finale Umsetzung nach dem AI-Blueprint[cite: 2, 4].
          </p>
        </div>
        
        <div style={{ backgroundColor: colors.white, padding: '3.5rem 2.5rem', borderRadius: '16px', border: '1px solid rgba(15,23,42,0.04)' }}>
          <BarChart3 size={28} color={colors.primary} style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>System Layer</h3>
          <p style={{ color: colors.secondary, lineHeight: '1.7', fontSize: '1rem' }}>
            Echtzeit-Sichtbarkeit über jeden Entwicklungsschritt – keine Blackbox mehr[cite: 2, 6].
          </p>
        </div>
      </section>
    </div>
  );
}
