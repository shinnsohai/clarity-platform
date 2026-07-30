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
        ink: '#0B1F3F',
        graphite: '#14171C',
        concrete: '#64748B',
        'concrete-light': '#D8DADD',
        paper: '#FFFFFF',
        accent: '#F5A623',
        'accent-dim': '#C97F12',
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
