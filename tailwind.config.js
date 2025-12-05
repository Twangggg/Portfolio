/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aquamarine: {
          50: "#beffdc",
          100: "#8fffc7",
          200: "#00f6a5",
          300: "#00dc93",
          400: "#00bf7f",
          500: "#00a06a",
          600: "#008154",
          700: "#00613f",
          800: "#004229",
          900: "#002414",
          950: "#00150a",
        },
      },
    },
  },
  plugins: [],
};
