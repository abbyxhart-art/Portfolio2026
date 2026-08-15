import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TOKENS_PATH = resolve(ROOT, "src/tokens/tokens.json");
const OUTPUT_PATH = resolve(ROOT, "src/styles/tokens.css");

// ─── Types ───────────────────────────────────────────────────────────────────

type TokenLeaf = { $value: string | number; $type?: string };
type TokenNode = TokenLeaf | { [key: string]: TokenNode };

function isLeaf(node: unknown): node is TokenLeaf {
  return typeof node === "object" && node !== null && "$value" in node;
}

// ─── Reference resolver ──────────────────────────────────────────────────────

const REF_RE = /^\{([^}]+)\}$/;

function getByPath(root: Record<string, unknown>, dotPath: string): unknown {
  return dotPath.split(".").reduce<unknown>((cur, key) => {
    if (cur && typeof cur === "object") return (cur as Record<string, unknown>)[key];
    return undefined;
  }, root);
}

function resolveValue(raw: string | number, root: Record<string, unknown>): string {
  const str = String(raw);
  const match = str.match(REF_RE);
  if (!match) return str;

  const refPath = match[1];
  const target = getByPath(root, refPath);

  if (target == null) {
    process.stderr.write(`  ⚠  unresolved reference: {${refPath}}\n`);
    return str;
  }

  if (isLeaf(target)) return resolveValue(target.$value, root);
  if (typeof target === "string" || typeof target === "number") return String(target);

  process.stderr.write(`  ⚠  reference resolved to non-scalar: {${refPath}}\n`);
  return str;
}

// ─── Path → CSS var name ─────────────────────────────────────────────────────

// camelCase keys to kebab-case; everything else passes through unchanged
function toKebab(key: string): string {
  return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}

// ─── Token walker ─────────────────────────────────────────────────────────────

function collectVars(
  node: Record<string, TokenNode>,
  path: string[],
  root: Record<string, unknown>,
  out: Map<string, string>
): void {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$") || key.startsWith("_")) continue;

    const parts = [...path, toKebab(key)];

    if (isLeaf(child)) {
      const varName = "--" + parts.join("-");
      const value = resolveValue(child.$value, root);
      out.set(varName, value);
    } else if (child && typeof child === "object") {
      collectVars(child as Record<string, TokenNode>, parts, root, out);
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
// Site is dark-only — there is no separate light-mode token set anymore, so
// everything just collects into one flat :root block.

const SKIP_KEYS = new Set(["primitive", "_meta"]);

const tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf-8")) as Record<string, TokenNode>;

const vars = new Map<string, string>();

for (const [key, section] of Object.entries(tokens)) {
  if (SKIP_KEYS.has(key)) continue;
  collectVars(section as Record<string, TokenNode>, [key], tokens as Record<string, unknown>, vars);
}

// Sort alphabetically by variable name
const sorted = [...vars.entries()].sort(([a], [b]) => a.localeCompare(b));

// ─── Emit CSS ─────────────────────────────────────────────────────────────────

const lines = sorted.map(([name, value]) => `  ${name}: ${value};`);

const css = [
  "/* Auto-generated — do not edit by hand */",
  "/* Regenerate: npm run tokens        */",
  "",
  ":root {",
  ...lines,
  "}",
  "",
].join("\n");

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, css, "utf-8");

console.log(`✓  ${sorted.length} variables → ${OUTPUT_PATH}`);
