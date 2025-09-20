/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'primary': '#3B82F6',
        'secondary': '#6B7280',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
            },
            colors: {
                dark: {
                    100: '#1a1a1a',
                    200: '#141414',
                    300: '#0f0f0f',
                    400: '#0a0a0a',
                    500: '#000000',
                },
                light: {
                    100: '#ffffff',
                    200: '#f5f5f5',
                    300: '#e5e5e5',
                    400: '#d4d4d4',
                    500: '#a3a3a3',
                }
            },
            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
                'safe-left': 'env(safe-area-inset-left)',
                'safe-right': 'env(safe-area-inset-right)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 1.2s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ping-slow': 'ping-slow 8s cubic-bezier(0, 0, 0.2, 1) infinite',
                'ping-slower': 'ping-slower 12s cubic-bezier(0, 0, 0.2, 1) infinite',
                'ping-slowest': 'ping-slowest 16s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px) rotateX(-15deg)' },
                    '100%': { opacity: '1', transform: 'translateY(0) rotateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'ping-slow': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
                    '50%': { transform: 'scale(1.5)', opacity: '0.2' },
                },
                'ping-slower': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
                    '50%': { transform: 'scale(1.8)', opacity: '0.1' },
                },
                'ping-slowest': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
                    '50%': { transform: 'scale(2)', opacity: '0.05' },
                }
            }
        },
    },
    plugins: [],
}