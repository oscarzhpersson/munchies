/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
        sm: '375px',
      },
      fontSize: {
        display: ['40px', '48px'],
        h1: ['24px', '32px'],
        title: ['14px', '20px'],
        subtitle: ['12px', '18px'],
        body: ['12px', '16px'],
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
    },
  },
  plugins: [],
}
