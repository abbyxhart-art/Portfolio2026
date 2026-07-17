import icons from "../../../assets/icons/icons.json";

type IconData = { viewBox: string; paths: { d: string }[] };

const TOOLS: { key: string; label: string; icon: IconData; stroke: boolean }[] = [
  { key: "figma", label: "Figma", icon: icons.brands.figma, stroke: true },
  { key: "figma-make", label: "Figma Make", icon: icons.brands["figma-make"], stroke: false },
  { key: "claude", label: "Claude", icon: icons.brands.claude, stroke: false },
  { key: "cursor", label: "Cursor", icon: icons.system.cursor, stroke: false },
];

function ToolIcon({ icon, label, stroke }: { icon: IconData; label: string; stroke: boolean }) {
  return (
    <svg width="18" height="18" viewBox={icon.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={label}>
      {icon.paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill={stroke ? "none" : "var(--color-text-primary)"}
          stroke={stroke ? "var(--color-text-primary)" : "none"}
          strokeWidth={stroke ? 1.5 : undefined}
          strokeLinecap={stroke ? "round" : undefined}
          strokeLinejoin={stroke ? "round" : undefined}
        />
      ))}
    </svg>
  );
}

export default function FavoriteToolsCard() {
  return (
    <div
      className="relative rounded-[12px] overflow-hidden select-none flex flex-col items-center"
      style={{
        width: "100%",
        height: "100%",
        background: "rgba(88,85,100,0.15)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        paddingTop: 12,
      }}
    >
      <p className="font-['Inter_Tight',sans-serif] leading-none text-foreground whitespace-nowrap" style={{ fontSize: 12 }}>
        Favorite tools
      </p>
      <div className="grid grid-cols-2 flex-1" style={{ gap: 14, alignContent: "center", justifyItems: "center" }}>
        {TOOLS.map((tool) => (
          <ToolIcon key={tool.key} icon={tool.icon} label={tool.label} stroke={tool.stroke} />
        ))}
      </div>
    </div>
  );
}
