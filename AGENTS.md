# Project: Maven Design Prototypes

This repo is for prototyping Maven design work. **A mini design system already
exists at `design-system/` and MUST be used for every build in this project.**

## Design system — non-negotiable rules

When writing any HTML / CSS / JS / TS / React / Tailwind in this repo:

1. **Always** pull colors and typography from `design-system/` tokens.
   Never hardcode hex codes or raw pixel font sizes in component code.
2. **Always** use the token names that match Figma — `color-maven-800`,
   `color-text-primary`, `font-family-emphasis`, `headlineEmphasisLg`, etc.
3. **Prefer semantic tokens** (`color-text-primary`, `color-surface-primary`,
   `color-fill-button-primary`) over raw palette tokens (`maven-800`,
   `neutral-60`) unless you are intentionally reaching for a brand color.
4. **Body copy uses `font-family-primary`** (Helvetica Neue).
   **Headlines use `font-family-emphasis`** (Ivar Display).
5. **Spacing** must come from the `space-*` / `spacing` scale
   (`0, 2, 4, 8, 12, 16, 20, 24`). Radii must come from the `radius` scale
   (`sm 8`, `md 12`, `lg 16`, `full`).
6. If a value you need is **not in the tokens**, stop and flag it —
   do not invent a new color/size. Either reuse the closest token or add
   the missing one to `design-system/tokens.*` first (all four files),
   then use it.

## How to import tokens

Pick the entry point that matches the stack you're building in:

| Stack                      | Import                                                                 |
| -------------------------- | ---------------------------------------------------------------------- |
| Plain HTML / CSS           | `<link rel="stylesheet" href="/design-system/tokens.css">`             |
| Vite / webpack / Next CSS  | `import "@/design-system/tokens.css"` (or relative path)               |
| React / TS                 | `import { color, typography, spacing, radius } from "@/design-system"` |
| Tailwind                   | `presets: [require("./design-system/tailwind.preset.js")]`             |
| Any tool needing raw JSON  | `design-system/tokens.json`                                            |

Ensure `tokens.css` is loaded **once** at the app root so the CSS variables
are available globally. In React apps, also import the CSS file in the top
level entry (e.g. `main.tsx` / `_app.tsx`).

## Repo layout

```
/
├── index.html              # home page — registry of all prototypes
├── design-system/          # shared tokens library (do not scatter tokens)
└── prototypes/
    ├── design-system/      # the token preview (foundations)
    └── <slug>/             # one folder per prototype, kebab-case slug
        └── index.html
```

## Starting a new prototype in this repo

1. Create a folder under `prototypes/<slug>/` and scaffold the prototype
   there (Vite/Next/plain HTML — whatever fits).
2. **First file edit after scaffolding**: wire up `design-system/tokens.css`
   (and the Tailwind preset if using Tailwind). From
   `prototypes/<slug>/index.html` the relative path is
   `../../design-system/tokens.css`.
3. Add a breadcrumb link back to the home page in the prototype header:
   `<a href="../../">← All prototypes</a>`.
4. **Register the prototype** in the root `index.html` by adding an entry
   to the `prototypes` array (title, desc, href, tag, status). Use
   `status: "wip"` until it's ready to share; flip to `"ready"` when done.
5. Only then build UI. Every color, font, spacing, and radius reference
   must resolve to a token.

## Source of truth

All tokens were extracted from the Figma file
"Ians-Maven-Design-System":
<https://www.figma.com/design/cTVSorq0dtdnCc6wS8TwOl/Ians-Maven-Design-System?node-id=10024-7949>

If a new design is shared that introduces a token not present here, update
`design-system/tokens.json`, `tokens.css`, `tokens.ts`, and
`tailwind.preset.js` together so all four stay in sync, and note the Figma
source in the commit message.

## Git

Feature development happens on the designated branch
(`Codex/design-system-setup-FkNgr` for the initial setup). Never push to
`main` without explicit permission.
