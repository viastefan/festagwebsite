import { SIGNAL_CUT } from "./tokens";

const STYLES = `
  .sc-tagro {
    position: relative;
    width: 100%;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid rgba(15,15,17,0.08);
    box-shadow:
      0 1px 2px rgba(15,15,17,0.03),
      0 28px 70px rgba(15,15,17,0.07);
    overflow: hidden;
  }
  .sc-tagro-beam {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      ${SIGNAL_CUT.cutAngle}deg,
      transparent 0%,
      transparent 48%,
      rgba(91,100,125,0.08) 49%,
      rgba(91,100,125,0.08) 51%,
      transparent 52%,
      transparent 100%
    );
    pointer-events: none;
  }
  .sc-tagro-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(15,15,17,0.06);
    font-size: 13px;
    color: #5c5c62;
  }
  .sc-tagro-body {
    position: relative;
    z-index: 1;
    padding: 26px 22px 18px;
  }
  .sc-tagro-mark {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #0a0a0b;
    display: grid;
    place-items: center;
    margin-bottom: 16px;
  }
  .sc-tagro-mark svg { width: 22px; height: 22px; }
  .sc-tagro-body h3 {
    margin: 0;
    font-size: 22px;
    letter-spacing: -0.03em;
    font-weight: 560;
    color: #0a0a0b;
  }
  .sc-tagro-list {
    list-style: none;
    margin: 18px 0 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }
  .sc-tagro-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 12px;
    border-radius: 12px;
    background: ${SIGNAL_CUT.paper};
    border: 1px solid rgba(15,15,17,0.05);
    font-size: 13.5px;
    color: #5c5c62;
  }
  .sc-tagro-list i {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    background: #0a0a0b;
    flex-shrink: 0;
    position: relative;
  }
  .sc-tagro-list i::after {
    content: "";
    position: absolute;
    inset: 4px;
    background: linear-gradient(135deg, #fff 40%, transparent 41%),
      linear-gradient(315deg, #c8ceda 40%, transparent 41%);
    border-radius: 2px;
    opacity: 0.9;
  }
  .sc-tagro-input {
    margin: 10px 14px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 999px;
    border: 1px solid rgba(15,15,17,0.1);
    background: #fafafa;
    font-size: 13px;
    color: #8a8a91;
  }
  .sc-tagro-chip {
    height: 24px;
    padding: 0 9px;
    border-radius: 999px;
    background: rgba(91,100,125,0.12);
    color: #444b5f;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
  }
`;

/** Tagro briefing card with Signal Cut beam — not a chatbot bubble UI. */
export function TagroCutCard() {
  return (
    <div className="sc-tagro" aria-hidden>
      <style>{STYLES}</style>
      <div className="sc-tagro-beam" />
      <div className="sc-tagro-top">
        <span>Tagro Briefing</span>
        <span style={{ opacity: 0.45 }}>⋯</span>
      </div>
      <div className="sc-tagro-body">
        <div className="sc-tagro-mark">
          <svg viewBox="0 0 32 32" fill="none">
            <path
              fill="#E8EDF4"
              d="M7 5c0-1.1.9-2 2-2h10.2c.8 0 1.5.4 1.9 1.1L26 14.2c.3.6.2 1.3-.2 1.8L18.1 23c-.4.4-1.1.5-1.6.2L8.1 17.2A2 2 0 0 1 7 15.5V5z"
            />
            <path
              fill="#C5CAD6"
              d="M19.2 21.8c.5-.4 1.2-.4 1.6.1L26.5 28c.6.7.1 1.8-.8 1.8H21c-1.1 0-2-.9-2-2v-4.2c0-.6.2-1.1.7-1.5l-.5-.3z"
            />
          </svg>
        </div>
        <h3>Wie steht das Projekt?</h3>
        <ul className="sc-tagro-list">
          <li>
            <i />
            Status für den Kunden formulieren
          </li>
          <li>
            <i />
            Offene Entscheidungen finden
          </li>
          <li>
            <i />
            Nächste Schritte ableiten
          </li>
        </ul>
      </div>
      <div className="sc-tagro-input">
        <span className="sc-tagro-chip">@ Acme Checkout</span>
        <span>Frag Tagro…</span>
      </div>
    </div>
  );
}
