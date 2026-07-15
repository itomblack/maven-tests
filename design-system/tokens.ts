/**
 * Maven Design System — TypeScript tokens
 * Source: Figma "Ians-Maven-Design-System"
 * https://www.figma.com/design/cTVSorq0dtdnCc6wS8TwOl/Ians-Maven-Design-System
 *
 * Prefer these tokens over hardcoded values in any JS/TS/React code.
 */

export const color = {
  brand: {
    maven25:  "#f5fff9",
    maven100: "#d2f2e9",
    maven300: "#71d1b5",
    maven400: "#50b79e",
    maven500: "#028c74",
    maven600: "#00826a",
    maven700: "#006d57",
    maven800: "#035748",
    maven900: "#013126",
  },
  neutral: {
    neutral10:  "#ffffff",
    neutral20:  "#f6f6f6",
    neutral30:  "#dee3e3",
    neutral40:  "#b7c0c0",
    neutral50:  "#64726f",
    neutral60:  "#172321",
    gray300:    "#e3e2e0",
    gray500:    "#bab7b3",
    coconut100: "#f2f0ec",
  },
  accent: {
    mint200:      "#bcf8da",
    lychee200:    "#ffccc2",
    blueberry500: "#0066ff",
  },
  text: {
    primary:         "#191817",
    primaryInverse:  "#ffffff",
    secondary:       "#5c5954",
    activeSecondary: "#74716c",
    disabled:        "#bab7b3",
    attention:       "#003d99",
    linkPrimary:     "#035748",
    buttonSecondary: "#035748",
  },
  surface: {
    primary:          "#ffffff",
    secondary:        "#f2f0ec",
    overlay:          "#00000066",
    overlayLight:     "#ffffff99",
    warning:          "#fff5d1",
    attentionPrimary: "#e5f0ff",
  },
  fill: {
    buttonPrimary:          "#035748",
    buttonPrimaryInverse:   "#ffffff",
    buttonSecondaryInverse: "#ffffff26",
    buttonDestructive:      "#a41604",
    buttonDisabled:         "#f8f7f7",
    buttonSubtle:           "#f2f0ec",
    errorPrimary:           "#a41604",
    errorSecondary:         "#fef5f3",
    successPrimary:         "#00826a",
    successSecondary:       "#e7faf3",
    warningSecondary:       "#fef4e6",
    attentionSecondary:     "#f2f7ff",
  },
  border: {
    primary:          "#bab7b3",
    primaryInverse:   "#ffffff",
    brand:            "#035748",
    disabled:         "#e3e2e0",
    error:            "#ea2f0d",
    success:          "#00826a",
    warning:          "#dd6a02",
    attentionPrimary: "#0066ff",
  },
  icon: {
    primary:        "#191817",
    primaryInverse: "#ffffff",
    maven:          "#035748",
    disabled:       "#cfcdca",
    success:        "#00826a",
    warning:        "#dd6a02",
    error:          "#ea2f0d",
    attention:      "#003d99",
  },
} as const;

export const font = {
  family: {
    primary:  '"Helvetica Neue", Helvetica, Arial, sans-serif',
    emphasis: '"Ivar Display", Georgia, "Times New Roman", serif',
  },
  size: {
    legal:          "12px",
    overline:       "12px",
    bodySm:         "14px",
    bodyDefault:    "16px",
    subheadlineXxs: "16px",
    subheadlineXs:  "18px",
    subheadlineSm:  "22px",
    subheadlineLg:  "24px",
    headlineLg:     "34px",
    headlineXlg:    "40px",
    displaySm:      "46px",
    displayLg:      "63px",
  },
  tracking: {
    headline:  "0",
    numerical: "0",
    overline:  "1px",
    ivar:      "0.25px",
  },
  weight: {
    regular: 400,
    medium:  500,
    bold:    700,
  },
} as const;

/**
 * Named text styles — exact mappings of the Figma text styles.
 * Spread these into a style prop or CSS-in-JS object.
 *
 *   <h1 style={typography.headlineEmphasisLg}>Title</h1>
 */
export const typography = {
  overlineRegular: {
    fontFamily: font.family.primary,
    fontSize: font.size.overline,
    fontWeight: font.weight.regular,
    lineHeight: "18px",
    letterSpacing: font.tracking.overline,
    textTransform: "uppercase" as const,
  },
  bodySupportive: {
    fontFamily: font.family.primary,
    fontSize: font.size.legal,
    fontWeight: font.weight.regular,
    lineHeight: "18px",
    letterSpacing: font.tracking.headline,
  },
  bodySmall: {
    fontFamily: font.family.primary,
    fontSize: font.size.bodySm,
    fontWeight: font.weight.regular,
    lineHeight: "20px",
    letterSpacing: font.tracking.numerical,
  },
  bodyDefault: {
    fontFamily: font.family.primary,
    fontSize: font.size.bodyDefault,
    fontWeight: font.weight.regular,
    lineHeight: "24px",
    letterSpacing: font.tracking.headline,
  },
  interactiveSmall: {
    fontFamily: font.family.primary,
    fontSize: font.size.bodySm,
    fontWeight: font.weight.regular,
    lineHeight: "20px",
    letterSpacing: font.tracking.headline,
  },
  interactiveDefault: {
    fontFamily: font.family.primary,
    fontSize: font.size.bodyDefault,
    fontWeight: font.weight.regular,
    lineHeight: "24px",
    letterSpacing: font.tracking.numerical,
  },
  subheadlineXxs: {
    fontFamily: font.family.primary,
    fontSize: font.size.subheadlineXxs,
    fontWeight: font.weight.regular,
    lineHeight: "20px",
  },
  subheadlineXs: {
    fontFamily: font.family.primary,
    fontSize: font.size.subheadlineXs,
    fontWeight: font.weight.regular,
    lineHeight: "22px",
  },
  subheadlineSm: {
    fontFamily: font.family.primary,
    fontSize: font.size.subheadlineSm,
    fontWeight: font.weight.regular,
    lineHeight: "26px",
  },
  headlineEmphasisXs: {
    fontFamily: font.family.emphasis,
    fontSize: font.size.subheadlineSm,
    fontWeight: font.weight.regular,
    lineHeight: 1.2,
    letterSpacing: "1px",
  },
  headlineEmphasisSm: {
    fontFamily: font.family.emphasis,
    fontSize: font.size.subheadlineLg,
    fontWeight: font.weight.regular,
    lineHeight: 1.1,
    letterSpacing: "1px",
  },
  headlineEmphasisLg: {
    fontFamily: font.family.emphasis,
    fontSize: font.size.headlineLg,
    fontWeight: font.weight.regular,
    lineHeight: 1.2,
    letterSpacing: "0",
  },
  headlineEmphasisXlg: {
    fontFamily: font.family.emphasis,
    fontSize: font.size.headlineXlg,
    fontWeight: font.weight.regular,
    lineHeight: 1.1,
    letterSpacing: font.tracking.ivar,
  },
  displayEmphasisSm: {
    fontFamily: font.family.emphasis,
    fontSize: font.size.displaySm,
    fontWeight: font.weight.regular,
    lineHeight: 1.1,
    letterSpacing: font.tracking.ivar,
  },
  displayEmphasisLg: {
    fontFamily: font.family.emphasis,
    fontSize: font.size.displayLg,
    fontWeight: font.weight.regular,
    lineHeight: 1.1,
    letterSpacing: font.tracking.ivar,
  },
} as const;

export const spacing = {
  "0":  "0px",
  "2":  "2px",
  "4":  "4px",
  "8":  "8px",
  "12": "12px",
  "16": "16px",
  "20": "20px",
  "24": "24px",
} as const;

export const radius = {
  sm:   "8px",
  md:   "12px",
  lg:   "16px",
  full: "9999px",
} as const;

export const effect = {
  elevationOverlay: "0 5px 10px 0 #0000000D, 0 15px 25px 0 #00000012",
  backgroundBlur:   "blur(52px)",
} as const;

export const tokens = { color, font, typography, spacing, radius, effect } as const;
export type Tokens = typeof tokens;
export default tokens;
