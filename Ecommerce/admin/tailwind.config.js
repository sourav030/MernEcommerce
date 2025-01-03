/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(slate|pink)-100/, 
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

