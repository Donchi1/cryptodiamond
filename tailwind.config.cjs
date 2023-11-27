/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue, js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ['Ubuntu', 'Sans', 'Lato'],
      },
      colors:{
        "gold": "#b38728"
      }
    },
  },
  extend: {},
  plugins: [],
}
