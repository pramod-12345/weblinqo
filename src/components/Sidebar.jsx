import { useEffect, useState } from 'react';
import { FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`bg-white h-screen shadow-sm border-r border-gray-100 transition-all duration-300 ease-in-out fixed top-0 left-0 z-50 p-4 
        ${collapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="pb-6 border-b border-gray-100 mb-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <img
            src="/weblinqo.svg"
            alt="weblinqo Logo"
            className="w-6 h-6"
          />
          {!collapsed && (
            <span className="font-bold text-xl text-gray-900 tracking-tight">weblinqo</span>
          )}
        </div>
      </div>

      <ul className="space-y-2">
        {[
          { id: 'users', icon: <FaUsers size={20} />, label: 'User Management' },
          { id: 'analytics', icon: <FaChartLine size={20} />, label: 'Analytics' },
          { id: 'settings', icon: <FaCog size={20} />, label: 'Settings' },
        ].map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li
              key={item.id}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 
                ${isActive ? 'bg-[#c4ff4d] text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span>{item.icon}</span>
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;