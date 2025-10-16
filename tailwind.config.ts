import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Include all app files
  ],
  theme: {
    extend: {
      colors: {
        // 🌌 Space palette
        space: {
          900: "#0b1120", // deep space blue
          800: "#111827", // near black-blue
          700: "#1e1e28", // slate blue
          600: "#2a2a3b",
        },
        // 🌈 Neon accent colors
        neon: {
          blue: "#38bdf8",
          green: "#22c55e",
          purple: "#a855f7",
          pink: "#ec4899",
          yellow: "#facc15",
          orange: "#fb923c",
        },
        // ✨ Star hues
        stars: {
          50: "#f9fafb",
          100: "#f8fafc",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
        },
      },

      // 🌀 Custom animations & keyframes
      animation: {
        "pulse-slow": "pulse 5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fade-in 1s ease-out forwards",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      // 🔥 Glowing text & glass morph effect
      boxShadow: {
        glow: "0 0 15px rgba(56, 189, 248, 0.6)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }), // ✅ for the horizontal scroll in projects
  ],
};

export default config;
