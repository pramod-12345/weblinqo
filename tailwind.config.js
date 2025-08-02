module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure it includes your source folder
  ],
  theme: {
    extend: {
      backgroundImage: {
        'smart-link-gradient': `linear-gradient(
          175deg,
          #d5daf3 0%,
          rgba(245, 243, 240, 0.75) 56%,
          #2848f0 65%,
          rgba(245, 243, 240, 0.75) 98%,
          #d5daf3 100%
        )`,
        'template-gradient': `linear-gradient(
          160deg,
          #F5F3F0 0%,
          #F5F3F0 15%,
          #7A8BE0 30%,
          #2848f0 60%,
          #F5F3F0 85%,
          #F5F3F0 100%
        )`,
      },
      fontFamily: {
        pier: ['"Pier Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#2848F0',
        secondary: '#0D569A',
        logoGolden: '#C7AE6AEA',
        charCoalBlack: '#232323',
        offWhite: '#F5F3F0'
      },
      fontSize: {
        'size-12': '0.75rem',
        'size-14': '0.875rem',
        'size-16': '1rem',
        'size-18': '1.125rem',
        'size-20': '1.25rem',
        'size-24': '1.5rem',
        'size-32': '2rem',
        'size-40': '2.5rem',
        'size-48': '3rem',
        'size-56': '3.5rem',
        'size-64': '4rem',
        'size-72': '4.5rem',
        'size-80': '5rem',
      },
    },
  },
  plugins: [],
}
