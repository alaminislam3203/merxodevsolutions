/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-exo2)', 'var(--font-dm)', 'sans-serif'],
        exo: ['var(--font-exo2)', 'sans-serif'],
        exo2: ['var(--font-exo2)', 'sans-serif'],
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
      animation: {
        marquee: 'marquee 28s linear infinite',
      }, // ✅ এই closing bracket missing ছিল
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
