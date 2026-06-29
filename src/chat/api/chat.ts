import { completions } from "../client/openai";
import { SYSTEM_PROMPT } from "../prompts/system";
import { matchHardcoded } from "../prompts/hardcoded";
import { buildContext } from "../memory/history";
import type { Message } from "../types";

export type SendResult = {
  reply: string;
  source: "hardcoded" | "api";
};

export async function sendMessage(
  prompt: string,
  history: Message[]
): Promise<SendResult> {
  const hardcoded = matchHardcoded(prompt);
  if (hardcoded) return { reply: hardcoded, source: "hardcoded" };

  const apiKey = import.meta.env.VITE_GPT_MINI;
  if (!apiKey) {
    return {
      reply: "API key isn't set up yet — add VITE_GPT_MINI to your .env file.",
      source: "api",
    };
  }

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...buildContext(history),
    { role: "user" as const, content: prompt },
  ];

  const reply = await completions(messages, apiKey);
  return { reply, source: "api" };
}
