/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tg: {
          green: {
            DEFAULT: '#006A4E', // Telangana official green/emerald
            dark: '#004d39',
            light: '#e6f4ea',
            accent: '#0d9488'
          },
          gold: {
            DEFAULT: '#D4AF37',
            dark: '#B89628',
            light: '#FFF9E6'
          },
          blue: {
            DEFAULT: '#1E3A8A', // Telangana navy blue
            dark: '#172554',
            light: '#EFF6FF'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 4px 20px -2px rgba(0, 77, 57, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'gov-lg': '0 10px 30px -4px rgba(0, 77, 57, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}

