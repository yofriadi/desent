/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bali: {
          teak: {
            light: '#E2BD96',
            DEFAULT: '#B47A46',
            dark: '#7A4B22',
            deep: '#4E2C0F',
          },
          jungle: {
            light: '#95D5B2',
            DEFAULT: '#2D6A4F',
            dark: '#1B4332',
            deep: '#081C15',
          },
          sand: {
            50: '#FAF8F5',
            100: '#F4EFEA',
            200: '#E8DED1',
            300: '#D5C4AF',
            400: '#BEA689',
          },
          sunset: {
            amber: '#F59E0B',
            coral: '#F97316',
            rose: '#E11D48',
            glow: '#FEF3C7',
          }
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
