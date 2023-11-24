/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark': '#9F8BF9',
        'medium': '#BEB1FB',
        'light': '#DED8FD',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      }
    }
  },
  plugins: []
}
