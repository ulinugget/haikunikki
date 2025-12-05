/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif-jp': ['Noto Serif JP', 'serif'],
        'instrument-serif': ['Instrument Serif', 'serif'],
      },
      colors: {
        'charcoal': '#1a1a1a',
        'cream': '#fcfbf9',
      }
    },
  },
  plugins: [],
}