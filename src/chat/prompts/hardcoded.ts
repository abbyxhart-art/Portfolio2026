type HardcodedEntry = {
  keywords: string[];
  reply: string;
};

const HARDCODED: HardcodedEntry[] = [
  {
    keywords: ["email", "contact", "reach you", "reach out", "get in touch"],
    reply:
      "You can email me at axh2451@g.rit.edu — I usually get back within a day or two.",
  },
  {
    keywords: ["who are you", "introduce yourself", "tell me about yourself"],
    reply:
      "I'm Abby! UX and product designer at RIT. I spend most of my time in Figma working on design systems, case studies, and interfaces that feel good to use.",
  },
  {
    keywords: ["what are you working on", "current project", "what's new", "lately"],
    reply:
      "Right now I'm wrapping up my portfolio and a couple Figma-heavy projects. Ask me about any of the case studies if you want specifics.",
  },
  {
    keywords: ["resume", "cv", "experience", "background"],
    reply:
      "Check out the About page for a summary of my experience — or just ask me something specific and I'll tell you directly.",
  },
  {
    keywords: ["figma", "tools", "design tool", "software"],
    reply:
      "Figma is basically home base. I use it for everything — wireframes, hi-fi, design systems, prototyping, and Code Connect for handoff.",
  },
  {
    keywords: ["case study", "projects", "portfolio", "work", "studies"],
    reply:
      "I've got case studies on Gentle Monster, Capitol Aluminum, Texas Mobile, FigBuild, Aixels, and Fragrantica — each one's pretty different. Anything specific you want to know about?",
  },
  {
    keywords: ["rit", "rochester", "school", "college", "university", "studying"],
    reply:
      "I'm at RIT studying interaction design. Rochester's cold but the program is solid.",
  },
];

export function matchHardcoded(input: string): string | null {
  const lower = input.toLowerCase();
  for (const entry of HARDCODED) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.reply;
    }
  }
  return null;
}
