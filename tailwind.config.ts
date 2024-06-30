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
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        sidebarFadeIn: "sidebarFadeIn 0.3s",
        buttonRotation: "buttonRotation 0.3s",
        fadeIn: "fadeIn 0.5s",
        fadeOut: "fadeOut 0.5s",
      },
    },
  },
  plugins: [],
};
export default config;
