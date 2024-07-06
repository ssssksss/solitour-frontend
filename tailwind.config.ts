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
          from: { left: "-300px" },
          to: { left: "0px" },
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
          "0%": { bottom: "-20px", opacity: "0.5" },
          "50%": { bottom: "0px", opacity: "1" },
          "100%": { bottom: "20px", opacity: "0" },
        },
        cardFlip: {
          from: { transform: "rotateY(-90deg)" },
          to: { transform: "rotateY(0deg)" },
        },
        cardFlip2: {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(90deg)" },
        },
      },
      animation: {
        sidebarFadeIn: "sidebarFadeIn 0.3s",
        buttonRotation: "buttonRotation 0.3s",
        fadeIn: "fadeIn 0.5s",
        bannerImage1: "bannerImage 2s linear infinite",
        bannerImage2: "bannerImage 2.5s linear infinite",
        bannerImage3: "bannerImage 3s linear infinite",
        cardFlip: "cardFlip 0.5s linear",
        cardFlip2: "cardFlip2 0.5s linear",
      },
    },
  },
  plugins: [],
};
export default config;
