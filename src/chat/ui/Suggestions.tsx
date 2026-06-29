const SUGGESTIONS = [
  "Who are you?",
  "What are you working on?",
  "Tell me about your case studies",
  "How can I contact you?",
];

export default function Suggestions({ onSelect }: { onSelect: (s: string) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          style={{
            padding: "6px 12px",
            borderRadius: "var(--radius-component-button)",
            border: "1px solid var(--color-border-default)",
            background: "var(--color-surface-secondary-default)",
            color: "var(--color-text-secondary)",
            fontSize: 13,
            cursor: "pointer",
            transition: "border-color 150ms, color 150ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent-default)";
            e.currentTarget.style.color = "var(--color-text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border-default)";
            e.currentTarget.style.color = "var(--color-text-secondary)";
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
