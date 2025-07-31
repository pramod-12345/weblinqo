import { useEffect, useState } from 'react';
import api from '../utils/api';

const Field = ({ label, value }) => (
  <div className="min-w-[150px]">
    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">{label}</label>
    <div className="font-medium text-gray-900">{value || '-'}</div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">{title}</h4>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">{children}</div>
  </div>
);

const UserModal = ({ isOpen, setIsOpen, userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/v1/admin/users/${userId}`);
        setUser(res.data.data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-500 transition-colors text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#c4ff4d]"></div>
            </div>
          ) : user ? (
            <>
              {/* Profile Section */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-shrink-0">
                  <img
                    src={user.profileImage || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                    alt="User"
                    className="w-28 h-28 rounded-xl object-cover border border-gray-200"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
                  <Field label="Username" value={user.username} />
                  <Field label="Profile URL" value={`weblinqo.com/u/${user.username}`} />
                  <Field label="Email" value={user.email} />
                  <Field label="Signup Date" value={new Date(user.signupDate).toLocaleDateString()} />
                  <Field
                    label="Status"
                    value={
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                          {user.status && user.status.toUpperCase()}
                      </span>
                    }
                  />
                </div>
              </div>

              {/* Subscription Section */}
              <Section title="Subscription">
                <Field
                  label="Plan"
                  value={
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.plan === 'Premium'
                        ? 'bg-pink-100 text-pink-800'
                        : user.plan === 'Pro'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.plan.toUpperCase()}
                    </span>
                  }
                />
                <Field label="Start Date" value={user.startDate ? new Date(user.startDate).toLocaleDateString() : 'N/A'} />
                <Field label="Expiry Date" value={user.nextBillingDate ? new Date(user.nextBillingDate).toLocaleDateString() : 'N/A'} />
              </Section>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-red-500 font-medium mb-2">Failed to load user data</div>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;