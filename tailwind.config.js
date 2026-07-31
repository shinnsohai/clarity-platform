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
        ink: '#111827',
        paper: '#FFFFFF',
        pearl: '#F1F3F6',
        concrete: '#64748B',
        azure: '#0A6CFF',
        'azure-dim': '#0850C4',
        'azure-light': '#E8F1FF',
      },
      fontFamily: {
        display: ['"Archivo Black"', '"Arial Black"', 'sans-serif'],
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.06em',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(17, 24, 39, 0.06)',
        'soft-lg': '0 16px 48px rgba(17, 24, 39, 0.1)',
      },
    },
  },
  plugins: [],
}
