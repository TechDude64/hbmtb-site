/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors from logo
        'hb-blue': '#1E88E5',
        'hb-blue-dark': '#1565C0',
        'hb-blue-light': '#42A5F5',
        // Background colors
        'hb-dark': '#0D0D0D',
        'hb-darker': '#080808',
        // Text colors
        'hb-light': '#F0F0F0',
        'hb-lighter': '#FFFFFF',
        // Grayscale
        'hb-gray': '#1A1A1A',
        'hb-gray-light': '#2A2A2A',
        'hb-gray-lighter': '#3D3D3D',
        // Accent colors (using blue from logo)
        'hb-accent': '#1E88E5',
        'hb-accent-light': '#42A5F5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Bebas Neue', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  corePlugins: {
    preflight: true,
  },
};
