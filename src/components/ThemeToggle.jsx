import { FiSun, FiMoon } from "react-icons/fi";
import useUserStore from '../stores/userStore';

const ThemeToggle = () => {
  const { theme, setTheme } = useUserStore();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Toggle ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <FiSun className="text-yellow-400 w-5 h-5" /> : <FiMoon className="text-blue-400 w-5 h-5" />}
      <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default ThemeToggle;
