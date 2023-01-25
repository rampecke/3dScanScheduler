/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfeff",
          200: "#bae6fd",
          400: "#38bdf8",
          600: "#0284c7",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
