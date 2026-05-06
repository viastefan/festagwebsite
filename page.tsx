import { ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export default function FestagLanding() {
  return (
    <div style={{ backgroundColor: '#F8F7F2', color: '#0F172A', minHeight: '100vh', padding: '4rem 2rem', fontFamily: 'sans-serif' }}>
      <section style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', paddingBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '600', marginBottom: '1rem' }}>Festag</h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>
          Software development, made structured.[cite: 2]
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(15,23,42,0.1)' }}>
          <Zap size={32} style={{ marginBottom: '1rem' }} />
          <h3>AI Orchestration</h3>
          <p>AI plant, strukturiert und steuert den gesamten Prozess.[cite: 2, 5]</p>
        </div>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(15,23,42,0.1)' }}>
          <ShieldCheck size={32} style={{ marginBottom: '1rem' }} />
          <h3>Human Execution</h3>
          <p>Verifizierte Experten verantworten die finale Umsetzung.[cite: 4, 5]</p>
        </div>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(15,23,42,0.1)' }}>
          <BarChart3 size={32} style={{ marginBottom: '1rem' }} />
          <h3>Full Visibility</h3>
          <p>Jeder Fortschritt ist in Echtzeit für Sie sichtbar.[cite: 2, 6]</p>
        </div>
      </div>
    </div>
  );
}
