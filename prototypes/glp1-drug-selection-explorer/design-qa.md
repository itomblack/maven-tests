# Design QA — GLP-1 Drug Selection Price Transparency

- Source visual truth: `/Users/itomblack/Library/CloudStorage/Dropbox/11-Repos/maven-tests/prototypes/glp1-drug-selection-explorer/source-maven-mobile.png`
- Implementation screenshot: `/Users/itomblack/Library/CloudStorage/Dropbox/11-Repos/maven-tests/prototypes/glp1-drug-selection-explorer/implementation-current.png`
- Combined comparison: `/Users/itomblack/Library/CloudStorage/Dropbox/11-Repos/maven-tests/prototypes/glp1-drug-selection-explorer/qa-comparison.png`
- Viewport: source 390 × 844; implementation phone 390 × 844 within a 1280 × 1000 gallery viewport
- State: current-design reference, pricing collapsed, no medication selected, sticky CTA disabled

## Full-view comparison evidence

The side-by-side comparison confirms the implemented phone uses the same visible Maven language as the existing mobile source: Ivar/Georgia-style editorial headings, Helvetica Neue body copy, warm coconut canvas, white cards, green progress and action color, soft borders, generous vertical rhythm, and restrained clinical hierarchy. The implementation is intentionally a different product screen, so the comparison judges shared system fidelity rather than pixel-identical content.

## Focused-region comparison evidence

A separate focused crop was not needed because both 390px phone surfaces are shown at native readable scale in the combined comparison. Pricing-card typography, borders, radii, selection marks, header, progress, and sticky action area are all legible in the full comparison. The bottom sheet, comparison table, accordion, and calculator were additionally inspected as live browser states.

## Required fidelity surfaces

- Fonts and typography: passed. Editorial headings use `font-family-emphasis`; body, labels, prices, and controls use `font-family-primary`. All sizes and weights resolve through the Maven token preset, and price values use tabular numerals.
- Spacing and layout rhythm: passed. The phone is 390 × 844, content scrolls independently, the action remains pinned, and cards use the shared spacing and radius scales. No primary control is clipped.
- Colors and visual tokens: passed. App colors, borders, surfaces, text, selection, and success states resolve through Maven semantic tokens. No component hardcodes a hex color.
- Image quality and asset fidelity: passed for the supplied source. The visible source does not establish medication packaging imagery; the implementation uses crisp Lucide pill/injection icons with tokenized treatments rather than fabricated product art.
- Copy and content: passed. All six medications, prices, badges, prepay options, clinical review language, membership disclaimer, fallback recommendation, annotation fields, and metrics match the brief.

## Interaction and accessibility checks

- Verified all 11 concept-switcher destinations render the correct labeled preview.
- Verified medication selection enables the sticky CTA.
- Verified “I’m not sure” changes and enables the clinician-recommendation CTA.
- Verified expandable price details and the complete-pricing bottom sheet.
- Verified pill/injection format-first filtering and back navigation.
- Verified compare-up-to-three mode and the side-by-side attribute view.
- Verified the single-open accordion pattern.
- Verified calculator controls update 1-, 3-, and 12-month estimates and prepay savings.
- Verified keyboard-visible focus styles, button labels, pressed/expanded state, and reduced-motion handling.
- Browser console checked after the final build: no errors or warnings.

## Comparison history

### Iteration 1

- [P2] Equal calculator bounds displayed as a redundant range (for example, `$2338–$2338`).
- Fix: added a shared money-range formatter that collapses equal bounds to one amount and applies the same behavior to first-month and ongoing ranges.
- Post-fix evidence: TypeScript and production build pass; calculator controls were retested in the browser with 12-month pill preference.

### Iteration 2

- No remaining P0, P1, or P2 findings.

## Follow-up polish

- [P3] If the missing current-screen screenshot is later supplied and it contains distinctive packaging photography, replace the generic pill/injection icons with validated product imagery while preserving the current price hierarchy.

## Implementation checklist

- [x] React + TypeScript + Tailwind + Lucide implementation
- [x] Maven token CSS loaded once at the app root
- [x] Maven Tailwind preset configured
- [x] Current design plus 10 structurally distinct concepts
- [x] Consistent mock medication data
- [x] Working switcher, selection, disclosures, sheets, filters, comparison, calculator, and sticky CTA
- [x] Root prototype registry entry
- [x] TypeScript, production build, browser interaction, console, and visual QA complete

final result: passed
