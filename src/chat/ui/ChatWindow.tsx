import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import type { Message } from "../types";

type Props = {
  messages: Message[];
  loading: boolean;
  error: string | null;
};

export default function ChatWindow({ messages, loading, error }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 320 }}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {loading && (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "18px 18px 18px 4px",
              background: "var(--color-surface-secondary-default)",
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-text-secondary)",
                  display: "block",
                  animation: `chat-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {error && (
        <p style={{ fontSize: 13, color: "#c0392b", textAlign: "center", margin: 0 }}>
          {error}
        </p>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
