

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00',
        secondary: '#FFB347',
        tertiary: '#FFE5CC',
        accent: '#FF6B35',
        background: '#FFF8F5',
        cardBg: '#FFFFFF',
        textPrimary: '#2D3748',
        textSecondary: '#718096',
        textMuted: '#A0AEC0'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'card': '0 4px 20px rgba(255, 122, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(255, 122, 0, 0.12)',
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      }
    }
  },
  plugins: [],
}

