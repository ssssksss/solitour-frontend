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
        main: "#26B888",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "search-icon": "url('/search-icon.png')",
      },
      keyframes: {
        sidebar: {
          from: { left: "-300px" },
          to: { left: "0px" },
        },
        carousel: {
          from: { opacity: "0.75" },
          to: { opacity: "1.0" },
        },
      },
      animation: {
        sidebar: "sidebar 0.3s",
        carousel: "carousel 1.0s ease",
      },
    },
  },
  plugins: [],
};
export default config;
