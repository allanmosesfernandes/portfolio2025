/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {

      // ── COLORS ──────────────────────────────────────────────
      colors: {
        // Primary
        yellow: {
          DEFAULT: "#F5C800",
          light:   "#F9D740",
          dark:    "#D4AC00",
          muted:   "#F5C80033",
        },

        // Accents
        pink: {
          DEFAULT: "#F272C8",
          light:   "#F799D8",
          dark:    "#D44EAA",
          muted:   "#F272C833",
        },
        indigo: {
          DEFAULT: "#5865F2",
          light:   "#7B87F5",
          dark:    "#3C4BE0",
          muted:   "#5865F233",
        },

        // Neutrals
        ink: {
          DEFAULT: "#0D0D0D",
          soft:    "#1A1A1A",
          mid:     "#2A2A2A",
          faint:   "#3A3A3A",
        },
        paper: {
          DEFAULT: "#FAFAFA",
          warm:    "#F5F4F0",
          grey:    "#F0F0F0",
          mid:     "#E0E0E0",
        },

        // Semantic aliases
        brand:   "#F5C800",
        surface: "#141414",
        muted:   "#888888",
        "muted-light": "#999999",
      },

      // ── TYPOGRAPHY ──────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", ...fontFamily.sans],
        sans:    ["var(--font-sans)", ...fontFamily.sans],
        mono:    ["var(--font-mono)", ...fontFamily.mono],
        cormorant: ["var(--font-cormorant)", ...fontFamily.serif],
        'eb-garamond': ["var(--font-eb-garamond)", ...fontFamily.serif],
      },

      fontSize: {
        "display-2xl": ["clamp(4rem, 10vw, 8rem)",   { lineHeight: "0.92", letterSpacing: "0.01em" }],
        "display-xl":  ["clamp(3rem, 7vw, 5.5rem)",  { lineHeight: "0.95", letterSpacing: "0.01em" }],
        "display-lg":  ["clamp(2rem, 5vw, 3.5rem)",  { lineHeight: "1",    letterSpacing: "0.02em" }],
        "display-md":  ["clamp(1.5rem, 3vw, 2rem)",  { lineHeight: "1.1",  letterSpacing: "0.02em" }],

        "label-lg":  ["0.85rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        "label-md":  ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.08em" }],
        "label-sm":  ["0.65rem", { lineHeight: "1.5", letterSpacing: "0.12em" }],
        "label-xs":  ["0.6rem",  { lineHeight: "1.5", letterSpacing: "0.15em" }],
      },

      // ── SHADOWS ─────────────────────────────────────────────
      boxShadow: {
        "hard-sm":     "3px 3px 0px #0D0D0D",
        "hard":        "4px 4px 0px #0D0D0D",
        "hard-md":     "6px 6px 0px #0D0D0D",
        "hard-lg":     "8px 8px 0px #0D0D0D",
        "hard-xl":     "12px 12px 0px #0D0D0D",

        "hard-yellow": "4px 4px 0px #F5C800",
        "hard-pink":   "4px 4px 0px #F272C8",
        "hard-indigo": "4px 4px 0px #5865F2",

        "glow-yellow": "0 0 20px #F5C80066, 0 0 40px #F5C80033",
        "glow-pink":   "0 0 20px #F272C866, 0 0 40px #F272C833",
        "glow-indigo": "0 0 20px #5865F266, 0 0 40px #5865F233",

        "float-sm":    "0 4px 16px rgba(0,0,0,0.08)",
        "float":       "0 8px 30px rgba(0,0,0,0.10)",
        "float-md":    "0 16px 48px rgba(0,0,0,0.12)",
        "float-lg":    "0 24px 64px rgba(0,0,0,0.15)",
        "float-xl":    "0 40px 80px rgba(0,0,0,0.20)",

        "dark-float":     "0 4px 20px rgba(0,0,0,0.40)",
        "dark-float-lg":  "0 16px 48px rgba(0,0,0,0.50)",

        "inner-yellow": "inset 2px 2px 0px #D4AC00",
        "inner-dark":   "inset 0 2px 6px rgba(0,0,0,0.4)",

        "edge-light": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },

      // ── BORDER RADIUS ───────────────────────────────────────
      borderRadius: {
        "badge": "4px",
        "btn":   "6px",
        "card":  "12px",
        "card-lg": "16px",
        "panel": "20px",
        "pill":  "100px",
      },

      // ── SPACING EXTRAS ──────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "section": "6rem",
        "gutter":  "3rem",
      },

      // ── TRANSITIONS ─────────────────────────────────────────
      transitionTimingFunction: {
        "spring":    "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-expo":  "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo":   "cubic-bezier(0.7, 0, 0.84, 0)",
        "snappy":    "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },

      // ── KEYFRAME ANIMATIONS ─────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%":   { opacity: "0", transform: "translateX(-32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1",   transform: "scale(1)" },
          "50%":       { opacity: "0.4", transform: "scale(0.75)" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },

      animation: {
        "fade-up":       "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-up-slow":  "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in":       "fade-in 0.4s ease both",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in":      "scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "pulse-dot":     "pulse-dot 2s ease-in-out infinite",
        "marquee":       "marquee 20s linear infinite",
        "marquee-reverse": "marquee-reverse 20s linear infinite",
      },

      backdropBlur: {
        xs: "2px",
      },

      // ── Z-INDEX ─────────────────────────────────────────────
      zIndex: {
        "cursor":  "9999",
        "modal":   "900",
        "nav":     "100",
        "overlay": "50",
        "float":   "10",
      },
    },
  },

  plugins: [
    function ({ matchUtilities }) {
      matchUtilities(
        { "animate-delay": (value) => ({ animationDelay: value }) },
        { values: { 100: "100ms", 200: "200ms", 300: "300ms", 400: "400ms", 500: "500ms", 600: "600ms", 800: "800ms" } }
      );
    },
  ],
};
