import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import AdminHeader from '../../components/AdminHeader';
import AnalyticsSection from '../../components/AnalyticsSection';
import UsersSection from '../../components/UsersSection';
import SettingsSection from '../../components/SettingsSection';
import UserModal from '../../components/UserModal';

function Admin() {
  const [activeSection, setActiveSection] = useState('users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="pl-20 md:pl-64 transition-all duration-300">
        <div className="p-6">
          <AdminHeader activeSection={activeSection} />
          
          {/* Content Sections */}
          <div className="space-y-6">
            <AnalyticsSection 
              isActive={activeSection === 'analytics'} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            />
            
            <UsersSection
              isActive={activeSection === 'users'}
              onUserClick={handleUserClick}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            />
            
            <SettingsSection 
              isActive={activeSection === 'settings'} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            />
          </div>

          {/* User Modal */}
          <UserModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            userId={selectedUserId}
          />
        </div>
      </div>
    </div>
  );
}

export default Admin;