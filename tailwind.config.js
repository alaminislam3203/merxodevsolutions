/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm)', 'sans-serif'],
        display: ['var(--font-anton)', 'sans-serif'],
        raleway: ['var(--font-raleway)', 'sans-serif'],
      },
      colors: {
        brand: {
          violet: '#7c3aed',
          cyan: '#06b6d4',
          amber: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
};
