/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0 4px 14px 4px rgba(0, 0, 0, 1)', // Custom shadow
      },
      container: {
        center: true, // Centers the container
        padding: '1rem', // Adds default padding
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      },
      maxWidth: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        '2xl': '1320px',
      },
    },
  },
  plugins: [],
}

