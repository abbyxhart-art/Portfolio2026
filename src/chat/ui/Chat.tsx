import { useState, useEffect } from "react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../../app/components/layout/HomeButton";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import Suggestions from "./Suggestions";
import { sendMessage } from "../api/chat";
import { saveHistory, loadHistory, clearHistory } from "../memory/history";
import type { Message } from "../types";

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content: "Hey! I'm Abby — ask me anything about my work, background, or how to get in touch.",
  timestamp: Date.now(),
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = loadHistory();
    return stored.length > 0 ? stored : [GREETING];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  async function handleSend(text: string = input) {
    const prompt = text.trim();
    if (!prompt || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };

    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const { reply } = await sendMessage(prompt, next.filter((m) => m.id !== "greeting"));
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply, timestamp: Date.now() },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    clearHistory();
    setMessages([GREETING]);
    setError(null);
  }

  const isFirstMessage = messages.length <= 1;

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-background-page)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navigation />
      <HomeButton />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: 640,
          width: "100%",
          margin: "0 auto",
          padding: "120px 16px 32px",
          gap: 24,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                margin: "0 0 6px",
              }}
            >
              Chat
            </p>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 380,
                color: "var(--color-text-primary)",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Ask me anything
            </h1>
          </div>

          {!isFirstMessage && (
            <button
              onClick={handleClear}
              style={{
                fontSize: 12,
                color: "var(--color-text-disabled)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                transition: "color 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-disabled)";
              }}
            >
              Clear chat
            </button>
          )}
        </div>

        <ChatWindow messages={messages} loading={loading} error={error} />

        {isFirstMessage && <Suggestions onSelect={handleSend} />}

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => handleSend()}
          disabled={loading}
        />

        <p
          style={{
            fontSize: 11,
            color: "var(--color-text-disabled)",
            textAlign: "center",
            margin: 0,
          }}
        >
          Powered by GPT-4o mini · answers may not be 100% accurate
        </p>
      </div>

      <style>{`
        @keyframes chat-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
