# Maven Mini Design System

A lightweight token library for prototyping Maven design work.
Values mirror the Figma variables from the
[Ians-Maven-Design-System](https://www.figma.com/design/cTVSorq0dtdnCc6wS8TwOl/Ians-Maven-Design-System)
file.

## Files

| File                      | Use when…                                                  |
| ------------------------- | ---------------------------------------------------------- |
| `tokens.json`             | You need raw values in any tool (scripts, Style Dictionary)|
| `tokens.css`              | You are styling with plain CSS / vanilla HTML              |
| `tokens.ts` / `index.ts`  | You are in a TS/JS/React file (CSS-in-JS, inline styles)   |
| `tailwind.preset.js`      | The project uses Tailwind                                  |

## Quick start

### Plain CSS / HTML
```html
<link rel="stylesheet" href="/design-system/tokens.css" />
<h1 class="ds-headline-emphasis-lg" style="color: var(--color-maven-800)">
  Hello Maven
</h1>
```

### React / TS
```tsx
import { color, typography } from "@/design-system";

export const Heading = () => (
  <h1 style={{ ...typography.headlineEmphasisLg, color: color.brand.maven800 }}>
    Hello Maven
  </h1>
);
```

### Tailwind
```js
// tailwind.config.js
module.exports = {
  presets: [require("./design-system/tailwind.preset.js")],
  content: ["./src/**/*.{ts,tsx,js,jsx,html}"],
};
```
```tsx
<h1 className="font-emphasis text-headline-lg text-maven-800">Hello Maven</h1>
```

## Token groups

### Color
- **Brand (Maven Green):** `maven-25 → maven-900` (primary brand = `maven-800` `#035748`)
- **Neutrals:** `neutral-10 → neutral-60`, `gray-300/500`, `coconut-100`
- **Accents:** `mint-200`, `lychee-200`, `blueberry-500`
- **Semantic:** `text-*`, `surface-*`, `fill-*`, `border-*`, `icon-*`
  (primary, secondary, success, warning, error, attention, disabled, inverse)

### Typography
- **Families:** `primary` (Helvetica Neue), `emphasis` (Ivar Display)
- **Sizes:** `legal` 12 · `overline` 12 · `body-sm` 14 · `body-default` 16 · `subheadline-xxs` 16 · `subheadline-xs` 18 · `subheadline-sm` 22 · `subheadline-lg` 24 · `headline-lg` 34
- **Named styles:** `overline-regular`, `body-supportive`, `body-small`, `body-default`, `interactive-small`, `interactive-default`, `subheadline-xxs/xs/sm`, `headline-emphasis-xs/sm/lg`

### Spacing
`0, 2, 4, 8, 12, 16, 20, 24` (px)

### Radius
`sm 8` · `md 12` · `lg 16` · `full`

## Rules

1. **Always** use tokens — never hardcode hex codes or pixel values.
2. **Never** introduce a new color or text style without adding it to the
   tokens first. If Figma doesn't have it, flag it rather than invent it.
3. Prefer **semantic** tokens (`color-text-primary`) over raw palette
   tokens (`maven-800`) unless you're deliberately reaching for a brand color.
4. Body copy defaults to `primary` family; only headlines use `emphasis`.
