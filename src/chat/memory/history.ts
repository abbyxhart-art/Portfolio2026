import type { Message } from "../types";
import type { OpenAIMessage } from "../client/openai";

const STORAGE_KEY = "__chat_history__";
const MAX_STORED = 40;
const MAX_CONTEXT_TURNS = 10;

export function buildContext(history: Message[]): OpenAIMessage[] {
  return history
    .slice(-MAX_CONTEXT_TURNS * 2)
    .map((m) => ({ role: m.role, content: m.content }));
}

export function saveHistory(messages: Message[]): void {
  try {
    const trimmed = messages.slice(-MAX_STORED);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {}
}

export function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Message[];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
