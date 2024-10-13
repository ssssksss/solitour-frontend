import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

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
        sidebarFadeIn: {
          from: { transform: "translateY(-35.5rem)" },
          to: { transform: "translateY(0)" },
        },
        sidebarFadeOut: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-35.5rem)" },
        },
        buttonRotation: {
          from: { transform: "rotate(-90deg)", "background-color": "black" },
          to: { transform: "rotate(0deg)", "background-color": "bg-main" },
        },
        buttonReverseRotation: {
          from: { transform: "rotate(0deg)", "background-color": "bg-main" },
          to: { transform: "rotate(-90deg)", "background-color": "black" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
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
        sidebarFadeIn: "sidebarFadeIn 0.3s",
        sidebarFadeOut: "sidebarFadeOut 0.3s",
        buttonRotation: "buttonRotation 0.3s",
        buttonReverseRotation: "buttonReverseRotation 0.3s",
        fadeIn: "fadeIn 0.5s",
        fadeOut: "fadeOut 0.5s",
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
  plugins: [
    ({ addComponents }: PluginAPI) => {
      addComponents({
        ".truncate-vertical-information-title": {
          "text-overflow": "ellipsis",
          overflow: "hidden",
          "word-break": "break-word",
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari, and Opera */,
          },
        },
        ".truncate-vertical-diary-content": {
          "text-overflow": "ellipsis",
          overflow: "hidden",
          "work-break": "break-word",
          display: "-webkit-box",
          "-webkit-line-clamp": "7",
          "-webkit-box-orient": "vertical",
        },
        "@media (max-width: 1024px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "6",
          },
        },
        "@media (max-width: 1000px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "5",
          },
        },
        "@media (max-width: 972px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "7",
          },
        },
        "@media (max-width: 950px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "6",
          },
        },
        "@media (max-width: 910px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "5",
          },
        },
        "@media (max-width: 875px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "4",
          },
        },
        "@media (max-width: 845px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "5",
          },
        },
        "@media (max-width: 820px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "4",
          },
        },
        "@media (max-width: 780px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "3",
          },
        },
        "@media (max-width: 744px)": {
          ".truncate-vertical-diary-content": {
            "-webkit-line-clamp": "5",
          },
        },
      });
    },
  ],
};

export default config;
