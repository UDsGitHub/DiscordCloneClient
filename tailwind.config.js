/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-500": "#5865f2",
        "purple-600": "#4752c4",
        "grey-300": "#dbdee1",
        "grey-400": "#b5bac1",
        "grey-500": "#35373c",
        "grey-600": "#313338",
        "grey-800": "#1e1f22",
      },
    },
  },
  plugins: [],
};
