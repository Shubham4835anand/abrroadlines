/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            DEFAULT: '#ff5722',
            light: '#ff7a47',
            dark: '#e64a19',
            hover: '#f4511e',
            50: '#fff3e0',
            100: '#ffe0b2',
          },
          cyan: {
            DEFAULT: '#65d3e3',
            hover: '#4cc5d6',
            dark: '#2ca8bb',
            50: '#e0f7fa',
          },
          navy: {
            DEFAULT: '#1f262d',
            light: '#2c353f',
            dark: '#161b20',
            slate: '#606676',
            body: '#7b8a97',
          },
          slate: {
            subtle: '#f9fbfd',
            border: '#eef2f5',
            muted: '#9197a8',
            dark: '#2c3e50',
          }
        },
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Source Sans Pro"', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        'pill': '30px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(31, 38, 45, 0.07)',
        'soft-lg': '0 10px 30px -4px rgba(31, 38, 45, 0.1)',
        'btn': '0 4px 15px rgba(255, 87, 34, 0.35)',
      },
    },
  },
  plugins: [],
}
