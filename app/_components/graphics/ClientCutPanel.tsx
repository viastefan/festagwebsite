import { SIGNAL_CUT } from "./tokens";

const STYLES = `
  .sc-client {
    position: relative;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid rgba(15,15,17,0.08);
    box-shadow:
      0 1px 2px rgba(15,15,17,0.03),
      0 24px 60px rgba(15,15,17,0.07);
    overflow: hidden;
    padding: 28px;
  }
  .sc-client-cut {
    position: absolute;
    right: -20%;
    top: -30%;
    width: 70%;
    height: 140%;
    background: linear-gradient(
      ${SIGNAL_CUT.cutAngle}deg,
      transparent 40%,
      rgba(91,100,125,0.06) 45%,
      rgba(91,100,125,0.1) 50%,
      transparent 55%
    );
    pointer-events: none;
  }
  .sc-client-top {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    font-size: 13px;
    color: #5c5c62;
  }
  .sc-client-mark {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: #0a0a0b;
    display: grid;
    place-items: center;
  }
  .sc-client-mark svg { width: 14px; height: 14px; }
  .sc-client h3 {
    position: relative;
    z-index: 1;
    margin: 0;
    font-size: 28px;
    letter-spacing: -0.035em;
    font-weight: 560;
    color: #0a0a0b;
  }
  .sc-client > p {
    position: relative;
    z-index: 1;
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.55;
    color: #5c5c62;
    max-width: 42ch;
  }
  .sc-client-rows {
    position: relative;
    z-index: 1;
    margin-top: 26px;
    display: grid;
    gap: 8px;
  }
  .sc-client-rows > div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border-radius: 12px;
    background: ${SIGNAL_CUT.paper};
    border: 1px solid rgba(15,15,17,0.05);
    font-size: 13.5px;
  }
  .sc-client-rows b { font-weight: 500; color: #0a0a0b; }
  .sc-client-rows span { color: #5c5c62; }
  .sc-client-rows em {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
    background: ${SIGNAL_CUT.slate};
    vertical-align: middle;
  }
  .sc-client-rows .is-wait em { background: ${SIGNAL_CUT.wood}; opacity: 0.75; }
  .sc-client-rows .is-done em { background: #0a0a0b; opacity: 0.35; }
`;

/** Client clarity panel — warm paper + cut beam, rare wood accent on waiting. */
export function ClientCutPanel() {
  return (
    <div className="sc-client" aria-hidden>
      <style>{STYLES}</style>
      <div className="sc-client-cut" />
      <div className="sc-client-top">
        <span className="sc-client-mark">
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
        </span>
        Client Panel
      </div>
      <h3>Dein Fortschritt, verständlich.</h3>
      <p>
        Keine Ticketlisten. Status, Entscheidungen und nächste Schritte — ruhig und
        freigabefähig.
      </p>
      <div className="sc-client-rows">
        <div>
          <b>
            <em />
            On track
          </b>
          <span>Checkout MVP</span>
        </div>
        <div className="is-wait">
          <b>
            <em />
            Wartet
          </b>
          <span>Refund-Policy</span>
        </div>
        <div className="is-done">
          <b>
            <em />
            Erledigt
          </b>
          <span>Auth & Billing</span>
        </div>
      </div>
    </div>
  );
}
