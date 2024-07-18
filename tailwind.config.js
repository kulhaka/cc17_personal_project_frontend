/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ssr: "#D98524",
        sr: "#7465A3",
        r: "#5e7aa3",
      },
    },
  },
  plugins: [],
};
