/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      screens: {
        md: "1000px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    container: {
      screens: {
        md: "1000px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("daisyui")],
};
