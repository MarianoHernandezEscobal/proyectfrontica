/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#038C3E", // Verde principal
          light: "#04A94C",   // Verde claro
          dark: "#026D30",    // Verde oscuro
        },
        secondary: {
          DEFAULT: "#92BF4E", // Verde oliva
          light: "#A8D45E",   // Verde oliva claro
          dark: "#7CA642",    // Verde oliva oscuro
        },
        accent: {
          DEFAULT: "#0477BF", // Azul principal
          light: "#0590E6",   // Azul claro
          dark: "#035E96",    // Azul oscuro
        },
        background: {
          light: "#C2D9A0",   // Fondo verde claro
          lighter: "#D1E3B7", // Fondo verde más claro
          neutral: "#F2F2F2", // Fondo neutro (gris claro)
          dark: "#E0E0E0",    // Fondo gris oscuro
        },
        text: {
          primary: "#333333", // Texto principal (gris oscuro)
          secondary: "#666666", // Texto secundario (gris medio)
          light: "#FFFFFF",    // Texto blanco
          dark: "#000000",     // Texto negro
        },
        status: {
          error: "#D32F2F",   // Color de error (rojo)
          success: "#4CAF50", // Color de éxito (verde)
          warning: "#FFA000", // Color de advertencia (amarillo)
          info: "#2196F3",    // Color de información (azul)
        },
        tertiary: "#F9A825", // Color terciario (amarillo mostaza)
      },
    },
  },
  variants: {},
  plugins: [],
};