/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1680px',
    },
    extend: {
      colors: {
        ink: '#0A0A0A',
        navy: '#0B1F3F',
        'navy-2': '#12294F',
        paper: '#FFFFFF',
        concrete: '#64748B',
        'concrete-light': '#B7BEC9',
        accent: '#FFD400',
        'accent-dim': '#C9A200',
      },
      fontFamily: {
        display: ['"Archivo Black"', '"Arial Black"', 'sans-serif'],
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.06em',
      },
    },
  },
  plugins: [],
}
