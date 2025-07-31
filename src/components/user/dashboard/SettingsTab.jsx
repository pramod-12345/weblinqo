// SettingsTab.js
import { FiSettings, FiLock } from "react-icons/fi";

const SettingsTab = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-gray-700 hover:shadow-md transition-all duration-200 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FiSettings className="w-6 h-6" />
          Settings
        </h2>
      </div>

      <div className="py-12 text-center">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FiLock className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">Coming Soon!</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          We're working hard to bring you more customization options. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default SettingsTab;