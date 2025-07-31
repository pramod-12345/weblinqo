const SettingsSection = ({ isActive, className }) => {
  return (
    <div className={`${isActive ? 'block' : 'hidden'} ${className}`}>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Settings</h3>
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-2">General Settings</h4>
            <p className="text-gray-600">Configure your admin panel preferences</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-2">Security</h4>
            <p className="text-gray-600">Manage authentication and access controls</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-2">Notifications</h4>
            <p className="text-gray-600">Set up alert preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;