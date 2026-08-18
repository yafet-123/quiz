/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#00d1bb',
        secondaryColor: '#94bb3c',
        // Premium design-system palette
        primary: {
          DEFAULT: '#00b3a0',
          50: '#e6fbf8',
          100: '#ccf7f0',
          200: '#99efe1',
          300: '#5ce4d0',
          400: '#24d3bc',
          500: '#00b3a0',
          600: '#008f81',
          700: '#007268',
          800: '#00574f',
          900: '#003c36',
        },
        ocean: {
          DEFAULT: '#417094',
          50: '#eef4f9',
          100: '#d8e6f0',
          200: '#b3cde0',
          300: '#86afca',
          400: '#5c91b1',
          500: '#417094',
          600: '#365e7c',
          700: '#2c4c65',
          800: '#223b50',
          900: '#182a3a',
        },
        accent: {
          DEFAULT: '#5b7cfa',
          400: '#7c99fb',
          500: '#5b7cfa',
          600: '#3e59e8',
        },
        ink: {
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#0f172a',
          900: '#0b1220',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 6px 24px -8px rgba(31, 45, 90, 0.10), 0 2px 8px -4px rgba(31,45,90,0.06)',
        'card': '0 10px 40px -12px rgba(31, 45, 90, 0.16), 0 4px 12px -6px rgba(31,45,90,0.08)',
        'lift': '0 24px 60px -16px rgba(24, 42, 74, 0.28), 0 10px 24px -10px rgba(24,42,74,0.14)',
        'glow': '0 0 0 1px rgba(0,209,187,0.18), 0 12px 48px -8px rgba(0,209,187,0.45)',
        'nav': '0 12px 40px -12px rgba(24, 42, 74, 0.18)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.5rem',
      },
      keyframes: {
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.08)' },
          '66%': { transform: 'translate(-25px,25px) scale(0.95)' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px -4px rgba(0,209,187,0.5)' },
          '50%': { boxShadow: '0 0 42px -2px rgba(0,209,187,0.75)' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        fadeDown: 'fadeDown .8s ease-out',
        fadeUp: 'fadeUp .9s ease-out',
        fadeIn: 'fadeIn 1s ease-out',
        floaty: 'floaty 6s ease-in-out infinite',
        blob: 'blob 20s ease-in-out infinite',
        gradientShift: 'gradientShift 6s ease infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        spinSlow: 'spinSlow 24s linear infinite',
      },
    },
  },
  plugins: [],
  // JIT must keep these animation utilities referenced in markup/globals.css
  safelist: [
    'animate-blob',
    'animate-floaty',
    'animate-fadeDown',
    'animate-fadeUp',
    'animate-fadeIn',
    'animate-gradientShift',
    'animate-shimmer',
    'animate-pulseGlow',
    'animate-spinSlow',
  ],
}

