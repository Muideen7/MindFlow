import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#FAF8F6",
          card: "#FFFFFF",
          text: "#1A1A1A",
          accent: "#FF6B35",
          accentHover: "#E55A2B",
          border: "#E0DDD9",
        },
        dark: {
          bg: "#0F1419",
          card: "#1E2530",
          text: "#F5F5F5",
          accent: "#FF8C42",
          accentHover: "#FF7A20",
          border: "#2D3748",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
