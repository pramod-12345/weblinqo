import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      customColors: {
        primary: '#000000',
        secondary: '#ffffff',
        accent: '#3b82f6',
      },
      customFont: 'Poppins',
      
      // Toggle theme
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
      
      // Update custom colors
      updateColors: (colors) => set((state) => ({
        customColors: { ...state.customColors, ...colors }
      })),
      
      // Update custom font
      updateFont: (font) => set({ customFont: font }),
      
      // Reset to default theme
      resetTheme: () => set({
        theme: 'light',
        customColors: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#3b82f6',
        },
        customFont: 'Poppins',
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore; 