type Props = {
  id?: string;
  eyebrow?: string;
  headline: string;
  subtitle?: string;
  accentColor?: string;
  dividerGap?: number;
};

export default function CasestudySectionHeader({ id, eyebrow, headline, subtitle, accentColor, dividerGap = 100 }: Props) {
  return (
    <div id={id} style={{ position: "relative", width: "100%", paddingTop: 60, paddingBottom: 32 }}>
      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: "#302f34" }} />

      {/* Content */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 40, alignItems: "center", paddingTop: dividerGap }}>
        {accentColor && (
          <div style={{
            position: "absolute",
            width: "200%",
            height: "200%",
            left: "-50%",
            top: "-50%",
            background: `radial-gradient(22% 45% at 50% 50%, ${accentColor}28 0%, transparent 100%)`,
            pointerEvents: "none",
          }} />
        )}
        {eyebrow && (
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: "#908e99",
            letterSpacing: "0.08em",
            lineHeight: "16.5px",
            textTransform: "uppercase",
            textAlign: "center",
            margin: 0,
            position: "relative",
          }}>
            {eyebrow}
          </p>
        )}
        <p style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          color: "#faf9ff",
          lineHeight: 1.2,
          textAlign: "center",
          margin: 0,
          position: "relative",
        }}>
          {headline}
        </p>
        {subtitle && (
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 17,
            fontWeight: 400,
            color: "#908e99",
            lineHeight: 1.65,
            textAlign: "center",
            margin: 0,
            position: "relative",
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
