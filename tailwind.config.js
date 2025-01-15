import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
    colors: {
      primaryLight: "#2627D9",
      secondaryLight: "#F5F7FA",
    },
  },
  darkMode: "class",
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,

      themes: {
        light: {
          colors: {
            primary: "#2627D9",
            background: "#F5F7FA",
            foreground: "#333333",
          },
        },
        dark: {
          colors: {
            background: "#1C1C1E",
            primary: "#2627D9",
            foreground: "#FFFFFF",
            content1: "#1C1C1E",
            default: {
              100: "#3A3A3C",
            },
          },
        },
      },
    }),
  ],
};
