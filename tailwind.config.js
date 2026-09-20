/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E8',
        charcoal: '#252525',
        brand: {
          green: '#285943',
          leaf: '#6F8F52',
          cream: '#FFF8E8',
          turmeric: '#E7B94C',
          terra: '#C8754D',
          charcoal: '#252525',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
      },
      borderRadius: {
        card: '1.5rem',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(40, 89, 67, 0.18), 0 2px 8px rgba(37, 37, 37, 0.06)',
        lift: '0 18px 44px -14px rgba(40, 89, 67, 0.28), 0 4px 12px rgba(37, 37, 37, 0.08)',
      },
    },
  },
  plugins: [],
}