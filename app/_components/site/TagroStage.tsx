"use client";

import { TagroDecisionChat } from "./TagroDecisionChat";

/** Premium chat stage — open bottom border + fade into canvas */
export function TagroStage() {
  return (
    <div className="tg-stage">
      <div className="tg-stage-glow" aria-hidden />
      <div className="tg-stage-frame">
        <div className="tg-stage-chrome">
          <span className="tg-stage-pill">
            <span className="tg-stage-live" aria-hidden />
            Tagro
          </span>
          <span className="tg-stage-hint">Entscheidung</span>
        </div>
        <TagroDecisionChat compact />
        <div className="tg-stage-fade" aria-hidden />
      </div>
      <style dangerouslySetInnerHTML={{ __html: TG_STAGE_CSS }} />
    </div>
  );
}

const TG_STAGE_CSS = `
  .tg-stage {
    position: relative;
    width: 100%;
    max-width: 560px;
    margin-left: auto;
    padding-top: 8px;
  }
  .tg-stage-glow {
    position: absolute;
    left: -18%;
    right: -18%;
    top: -8%;
    bottom: -30%;
    background:
      radial-gradient(ellipse 55% 45% at 50% 28%, rgba(91, 100, 125, 0.16), transparent 70%),
      radial-gradient(ellipse 40% 35% at 70% 60%, rgba(255, 255, 255, 0.7), transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  .tg-stage-frame {
    position: relative;
    z-index: 1;
    border-radius: 28px 28px 0 0;
    border: 1px solid rgba(30, 30, 32, 0.1);
    border-bottom: none;
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0.92) 58%,
      rgba(247, 248, 248, 0.35) 88%,
      rgba(247, 248, 248, 0) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.95),
      0 1px 2px rgba(30, 30, 32, 0.04),
      0 32px 88px rgba(30, 30, 32, 0.08);
    padding: 18px 20px 72px;
    min-height: 420px;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%);
    mask-image: linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%);
  }
  .tg-stage-chrome {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    padding: 0 2px;
  }
  .tg-stage-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 28px;
    padding: 0 12px 0 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(30, 30, 32, 0.08);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    font-size: 12.5px;
    letter-spacing: var(--ls-ui);
    color: var(--heading);
  }
  .tg-stage-live {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #5b647d;
    box-shadow: 0 0 0 3px rgba(91, 100, 125, 0.16);
  }
  .tg-stage-hint {
    font-size: 12px;
    letter-spacing: var(--ls-ui);
    color: var(--faint);
  }
  .tg-stage-fade {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 150px;
    background: linear-gradient(
      180deg,
      rgba(247, 248, 248, 0) 0%,
      rgba(247, 248, 248, 0.5) 40%,
      var(--canvas) 100%
    );
    pointer-events: none;
    z-index: 2;
  }
  @media (max-width: 960px) {
    .tg-stage {
      max-width: 100%;
      margin: 0;
    }
    .tg-stage-frame {
      border-radius: 24px 24px 0 0;
    }
  }
`;
