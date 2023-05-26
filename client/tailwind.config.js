/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        red: "#ff1a1a",
        "primary-darker": "#2563eb",
      },
    },
  },
  plugins: [],
};
