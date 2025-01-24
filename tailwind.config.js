/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#038C3E",
          light: "#04A94C",
          dark: "#026D30",
        },
        secondary: {
          DEFAULT: "#92BF4E",
          light: "#A8D45E",
          dark: "#7CA642",
        },
        accent: {
          DEFAULT: "#0477BF",
          light: "#0590E6",
          dark: "#035E96",
        },
        background: {
          light: "#C2D9A0",
          lighter: "#D1E3B7",
          neutral: "#F2F2F2",
          dark: "#E0E0E0",
        },
        text: {
          primary: "#333333",
          secondary: "#666666",
          light: "#FFFFFF",
          dark: "#000000",
        },
        status: {
          error: "#D32F2F",
          success: "#4CAF50",
          warning: "#FFA000",
          info: "#2196F3",
        },
        tertiary: "#F9A825",
      },
    },
  },
  variants: {},
  plugins: [],
};
