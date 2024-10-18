/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      screens: {
        displayMax: '1440px',
        displayMin: '375px',
        lg: '1200px',
      },
      fontSize: {
        display: ['2.5rem', '3rem'],
        h1: ['1.5rem', '2rem'],
        title: ['0.875rem', '1.25rem'],
        subtitle: ['0.75rem', '1.125rem'],
        body: ['0.75rem', '1rem'],
      },
      colors: {
        white: '#ffffff',
        offWhite: '#fafafa',
        black: '#000000',
        green: '#00703a',
        stroke: 'rgba(0, 0, 0, 0.1)',
        strokeOpaque: '#dfdfdf',
      },
      borderWidth: {
        0.6: '0.6px',
      },
      fontWeight: {
        semibold: 590,
      },
    },
  },
  plugins: [],
}
