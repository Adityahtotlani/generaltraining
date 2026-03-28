/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf4f0',
          100: '#fae4d8',
          200: '#f5c6ad',
          300: '#eca07a',
          400: '#e17349',
          500: '#d4552a',
          600: '#b8411f',
          700: '#96331b',
          800: '#7a2b1c',
          900: '#64271a',
        },
      },
    },
  },
  plugins: [],
}
