import { useEffect } from 'react';
import useUserStore from '../stores/userStore';

const useTheme = () => {
  const { theme } = useUserStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
};

export default useTheme;
