/**
 * Maven Design System — Tailwind preset
 *
 * Use in any Tailwind project in this repo:
 *
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require("./design-system/tailwind.preset.js")],
 *     content: ["./src/**\/*.{ts,tsx,js,jsx,html}"],
 *   };
 *
 * Then use utilities like: text-maven-800, bg-surface-primary, font-emphasis,
 * text-body-default, rounded-md, p-16, etc.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        // Brand
        maven: {
          25:  "#f5fff9",
          100: "#d2f2e9",
          300: "#71d1b5",
          400: "#50b79e",
          500: "#028c74",
          600: "#00826a",
          700: "#006d57",
          800: "#035748",
          900: "#013126",
        },
        // Neutrals
        neutral: {
          10: "#ffffff",
          20: "#f6f6f6",
          30: "#dee3e3",
          40: "#b7c0c0",
          50: "#64726f",
          60: "#172321",
        },
        gray: {
          300: "#e3e2e0",
          500: "#bab7b3",
        },
        coconut: { 100: "#f2f0ec" },
        // Accents
        mint:      { 200: "#bcf8da" },
        lychee:    { 200: "#ffccc2" },
        blueberry: { 500: "#0066ff" },
        // Semantic
        text: {
          primary:           "#191817",
          "primary-inverse": "#ffffff",
          secondary:         "#5c5954",
          "active-secondary":"#74716c",
          disabled:          "#bab7b3",
          attention:         "#003d99",
          "link-primary":    "#035748",
          "button-secondary":"#035748",
        },
        surface: {
          primary:             "#ffffff",
          secondary:           "#f2f0ec",
          overlay:             "#00000066",
          "overlay-light":     "#ffffff99",
          warning:             "#fff5d1",
          "attention-primary": "#e5f0ff",
        },
        fill: {
          "button-primary":           "#035748",
          "button-primary-inverse":   "#ffffff",
          "button-secondary-inverse": "#ffffff26",
          "button-destructive":       "#a41604",
          "button-disabled":          "#f8f7f7",
          "button-subtle":            "#f2f0ec",
          "error-primary":            "#a41604",
          "error-secondary":          "#fef5f3",
          "success-primary":          "#00826a",
          "success-secondary":        "#e7faf3",
          "warning-secondary":        "#fef4e6",
          "attention-secondary":      "#f2f7ff",
        },
        border: {
          primary:             "#bab7b3",
          "primary-inverse":   "#ffffff",
          brand:               "#035748",
          disabled:            "#e3e2e0",
          error:               "#ea2f0d",
          success:             "#00826a",
          warning:             "#dd6a02",
          "attention-primary": "#0066ff",
        },
        icon: {
          primary:          "#191817",
          "primary-inverse":"#ffffff",
          maven:            "#035748",
          disabled:         "#cfcdca",
          success:          "#00826a",
          warning:          "#dd6a02",
          error:            "#ea2f0d",
          attention:        "#003d99",
        },
      },
      fontFamily: {
        sans:     ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        primary:  ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        emphasis: ['"Ivar Display"', "Georgia", '"Times New Roman"', "serif"],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }]
        legal:             ["12px", { lineHeight: "18px", letterSpacing: "0" }],
        overline:          ["12px", { lineHeight: "18px", letterSpacing: "1px" }],
        "body-sm":         ["14px", { lineHeight: "20px", letterSpacing: "0" }],
        "body-default":    ["16px", { lineHeight: "24px", letterSpacing: "0" }],
        "subheadline-xxs": ["16px", { lineHeight: "20px" }],
        "subheadline-xs":  ["18px", { lineHeight: "22px" }],
        "subheadline-sm":  ["22px", { lineHeight: "26px" }],
        "subheadline-lg":  ["24px", { lineHeight: "1.1", letterSpacing: "1px" }],
        "headline-lg":     ["34px", { lineHeight: "1.2" }],
        "headline-xlg":    ["40px", { lineHeight: "1.1", letterSpacing: "0.25px" }],
        "display-sm":      ["46px", { lineHeight: "1.1", letterSpacing: "0.25px" }],
        "display-lg":      ["63px", { lineHeight: "1.1", letterSpacing: "0.25px" }],
      },
      letterSpacing: {
        headline:  "0",
        numerical: "0",
        overline:  "1px",
        ivar:      "0.25px",
      },
      spacing: {
        0:  "0px",
        2:  "2px",
        4:  "4px",
        8:  "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
      },
      borderRadius: {
        sm:   "8px",
        md:   "12px",
        lg:   "16px",
        full: "9999px",
      },
      boxShadow: {
        "elevation-overlay": "0 5px 10px 0 #0000000D, 0 15px 25px 0 #00000012",
      },
      backdropBlur: {
        overlay: "52px",
      },
    },
  },
};
