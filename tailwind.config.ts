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
        main: "#00B488",
        black: "#111111",
        gray1: "#666666",
        gray2: "#A3A3A3",
        gray3: "#d9d9d9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "search-icon": "url('/search-icon.png')",
        "search-icon-dark-mode": "url('/search-icon-dark-mode.png')",
      },
      keyframes: {
        sidebarFadeIn: {
          from: { top: "-35.5rem" },
          to: { top: "0px" },
        },
        buttonRotation: {
          from: { transform: "rotate(-45deg)", "background-color": "black" },
          to: { transform: "rotate(0deg)", "background-color": "bg-main" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        bannerImage: {
          "0%": { bottom: "-16px" },
          "46.6%": { bottom: "12px" },
          "100%": { bottom: "-16px" },
        },
        cardFlip: {
          from: { transform: "rotateY(-90deg)" },
          to: { transform: "rotateY(0deg)" },
        },
        cardFlip2: {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(90deg)" },
        },
        pulseAuth: {
          "0%": {
            "background-image":
              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          },
          "50%": {
            "background-image":
              "linear-gradient(90deg, #f0f0f0 25%, #f0f0f0 50%, #e0e0e0 75%)",
          },
          "100%": {
            "background-image":
              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          },
        },
        arrow: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.5)" },
        },
      },
      animation: {
        sidebarFadeIn: "sidebarFadeIn 0.3s",
        buttonRotation: "buttonRotation 0.3s",
        fadeIn: "fadeIn 0.5s",
        bannerImage: "bannerImage 1.8s ease-in-out infinite",
        cardFlip: "cardFlip 0.5s linear",
        cardFlip2: "cardFlip2 0.5s linear",
        pulseAuth: "pulseAuth 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        arrow: "arrow 1s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
