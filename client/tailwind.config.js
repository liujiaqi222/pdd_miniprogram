/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f33a50",
        "primary-lighter": "#fa5151",
        green: "#07c160",
        orange: "#d48624",
        "gray-light": "#f5f5f5",
        "pink-light": "#fff4f6",
        "green-light": "#ecf9f2",
        "green-darker": "#00a32e",
      },
    },
  },
  plugins: [],
};
