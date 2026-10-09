import { Icon } from "./Icon";

/** macOS-style product window used by every demo. */
export function Window({
  title,
  url,
  children,
  full,
  className,
  style,
}: {
  title?: string;
  url?: string;
  children: React.ReactNode;
  full?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`window${full ? " window--full" : ""} ${className ?? ""}`} style={style}>
      <div className="window-bar">
        <div className="window-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        {url ? (
          <div className="window-url">
            <Icon name="lock" />
            <span>{url}</span>
          </div>
        ) : (
          <div className="window-title">{title}</div>
        )}
        <div />
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}

/** Painterly stage that frames a product window, Cursor-style. */
export function Stage({
  children,
  caption,
  className,
  pad,
}: {
  children: React.ReactNode;
  caption?: string;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div className={`stage${pad ? " stage--pad" : ""} ${className ?? ""}`}>
      <div className="stage-inner">{children}</div>
      {caption ? (
        <div className="stage-caption">
          <span className="live-dot" aria-hidden />
          {caption}
        </div>
      ) : null}
    </div>
  );
}
