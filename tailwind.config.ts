import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#030712",
          900: "#060919",
          850: "#0b112c",
          800: "#0f1738",
          700: "#1b2554",
        },
        hud: {
          cyan: "#00f5ff",
          magenta: "#ff006e",
          green: "#39ff14",
          gold: "#ffd700",
          purple: "#bf5af2",
          orange: "#ff5722",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "Share Tech Mono", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0, 245, 255, 0.35)",
        "neon-magenta": "0 0 20px rgba(255, 0, 110, 0.35)",
        "neon-green": "0 0 20px rgba(57, 255, 20, 0.35)",
        "neon-gold": "0 0 20px rgba(255, 215, 0, 0.35)",
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan": "scan 6s linear infinite",
        "hud-glow": "glow 3s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        glow: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1", filter: "brightness(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
