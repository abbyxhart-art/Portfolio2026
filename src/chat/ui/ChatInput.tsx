import { useRef } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
};

export default function ChatInput({ value, onChange, onSend, disabled }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  function handleInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "flex-end",
        padding: "8px 8px 8px 14px",
        borderRadius: 16,
        border: "1px solid var(--color-border-default)",
        background: "var(--color-surface-secondary-default)",
        transition: "border-color 150ms",
      }}
      onFocusCapture={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border-dark)";
      }}
      onBlurCapture={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border-default)";
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Type a message…"
        rows={1}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          fontSize: 15,
          lineHeight: 1.5,
          color: "var(--color-text-primary)",
          fontFamily: "inherit",
          padding: "4px 0",
          maxHeight: 120,
          overflowY: "auto",
        }}
      />
      <button
        onClick={onSend}
        disabled={!canSend}
        aria-label="Send"
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "none",
          background: canSend ? "var(--color-text-primary)" : "var(--color-surface-fill2)",
          color: canSend ? "var(--color-text-light)" : "var(--color-text-disabled)",
          cursor: canSend ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 150ms, color 150ms",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 13V3M3 8l5-5 5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
