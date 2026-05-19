import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#050505",
          panel: "rgba(255, 255, 255, 0.07)",
          line: "rgba(255, 255, 255, 0.12)",
          green: "#16a34a",
          mint: "#22c55e"
        }
      },
      boxShadow: {
        "green-glow": "0 0 40px rgba(34, 197, 94, 0.28)",
        "soft-lift": "0 24px 80px rgba(0, 0, 0, 0.42)"
      },
      backgroundImage: {
        "radial-green": "radial-gradient(circle at top, rgba(34, 197, 94, 0.25), transparent 38%)",
        "luxury-fade": "linear-gradient(135deg, rgba(22, 163, 74, 0.22), rgba(255, 255, 255, 0.03) 36%, rgba(0, 0, 0, 0.4))"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { transform: "translateX(120%)" },
          "100%": { transform: "translateX(-120%)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 24px rgba(34, 197, 94, 0.2)" },
          "50%": { boxShadow: "0 0 44px rgba(34, 197, 94, 0.42)" }
        }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        fadeUp: "fadeUp 0.75s ease both",
        shimmer: "shimmer 2.6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
