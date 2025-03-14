import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["CustomFont", "sans-serif"],
      },
      colors: {
        main: "#00B488",
        black: "#111111",
        gray1: "#666666",
        gray2: "#A3A3A3",
        gray3: "#d9d9d9",
        lightGreen: "#F2FAF7",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "search-icon": "url('/common/search-icon.png')",
      },
      keyframes: {
        bannerImage: {
          "0%": { transform: "translateY(-1rem)" },
          "46.6%": { transform: "translateY(0.75rem)" },
          "100%": { transform: "translateY(-1rem)" },
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
        rotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        rotateReversed: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        bannerImage: "bannerImage 1.8s ease-in-out infinite",
        cardFlip: "cardFlip 0.5s linear",
        cardFlip2: "cardFlip2 0.5s linear",
        pulseAuth: "pulseAuth 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        arrow: "arrow 1s linear infinite alternate",
        rotate: "rotate 15s linear infinite",
        rotateReversed: "rotateReversed 15s linear infinite",
      },
    },
  },
};

export default config;
