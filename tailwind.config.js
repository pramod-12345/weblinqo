module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure it includes your source folder
  ],
  theme: {
    extend: {
      fontFamily: {
         pier: ['"Pier Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#2848F0',
        secondary: '#0D569A'
      },
      fontSize: {
        'size-12': '0.75rem', 
        'size-14': '0.875rem', 
        'size-16': '1rem', 
        'size-18': '1.125rem', 
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
