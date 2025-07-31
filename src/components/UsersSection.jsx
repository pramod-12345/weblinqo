import { useEffect, useState } from 'react';
import { FaEye, FaFilter, FaTimes } from 'react-icons/fa';
import api from '../utils/api';

const UsersSection = ({ isActive, onUserClick, className }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    plan: 'All',
    status: 'All',
    signupDate: { start: '', end: '' }
  });
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/v1/admin/users?page=0&size=10');
        setUsers(res.data.data);
      } catch (err) {
        console.error('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const planMatch = filters.plan === 'All' || user.plan === filters.plan;
    const statusMatch = filters.status === 'All' || user.status === filters.status.toLowerCase();
    
    let dateMatch = true;
    if (filters.signupDate.start || filters.signupDate.end) {
      const signupDate = new Date(user.signupDate);
      const startDate = filters.signupDate.start ? new Date(filters.signupDate.start) : null;
      const endDate = filters.signupDate.end ? new Date(filters.signupDate.end) : null;
      
      if (startDate && signupDate < startDate) dateMatch = false;
      if (endDate && signupDate > endDate) dateMatch = false;
    }
    
    return planMatch && statusMatch && dateMatch;
  });

  const handlePlanFilterChange = (plan) => {
    setFilters({ ...filters, plan });
    setActiveFilter(null);
  };

  const handleStatusFilterChange = (status) => {
    setFilters({ ...filters, status });
    setActiveFilter(null);
  };

  const handleDateFilterChange = (field, value) => {
    setFilters({
      ...filters,
      signupDate: {
        ...filters.signupDate,
        [field]: value
      }
    });
  };

  const resetDateFilter = () => {
    setFilters({
      ...filters,
      signupDate: { start: '', end: '' }
    });
  };

  const getUniquePlans = () => {
    const plans = new Set(users.map(user => user.plan));
    return ['All', 'Free', 'Pro', 'Premium', ...Array.from(plans)].filter(
      (value, index, self) => self.indexOf(value) === index
    );
  };

  const openFilter = (filterName, event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setFilterPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX
    });
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveFilter(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!isActive) return null;

  if (loading) {
    return (
      <div className={className}>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Filter UI (positioned outside the table) */}
      {activeFilter && (
        <div 
          className="fixed z-50 bg-white rounded-md shadow-lg border border-gray-200 p-4"
          style={{
            top: `${filterPosition.top}px`,
            left: `${filterPosition.left}px`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {activeFilter === 'plan' && (
            <div className="w-40">
              <div className="py-1 max-h-60 overflow-y-auto">
                {getUniquePlans().map(plan => (
                  <button
                    key={plan}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanFilterChange(plan);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      filters.plan === plan 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {plan}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeFilter === 'status' && (
            <div className="w-32">
              <div className="py-1">
                {['All', 'Active', 'Inactive'].map(status => (
                  <button
                    key={status}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusFilterChange(status);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      filters.status === status 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeFilter === 'signupDate' && (
            <div className="w-64">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <input
                    type="date"
                    value={filters.signupDate.start}
                    onChange={(e) => handleDateFilterChange('start', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input
                    type="date"
                    value={filters.signupDate.end}
                    onChange={(e) => handleDateFilterChange('end', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                {(filters.signupDate.start || filters.signupDate.end) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetDateFilter();
                    }}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center"
                  >
                    <FaTimes className="mr-1" /> Reset
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              
              {/* Plan Filter Column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-between">
                  <span>Plan</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openFilter('plan', e);
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <FaFilter size={12} />
                  </button>
                </div>
                {filters.plan !== 'All' && (
                  <span className="block h-0.5 bg-blue-500 mt-1"></span>
                )}
              </th>

              {/* Signup Date Filter Column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-between">
                  <span>Signup Date</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openFilter('signupDate', e);
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <FaFilter size={12} />
                  </button>
                </div>
                {(filters.signupDate.start || filters.signupDate.end) && (
                  <span className="block h-0.5 bg-blue-500 mt-1"></span>
                )}
              </th>

              {/* Status Filter Column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openFilter('status', e);
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <FaFilter size={12} />
                  </button>
                </div>
                {filters.status !== 'All' && (
                  <span className="block h-0.5 bg-blue-500 mt-1"></span>
                )}
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.email} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                        alt={user.username}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      user.plan === 'Premium'
                        ? 'bg-pink-100 text-pink-800'
                        : user.plan === 'Pro'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user.plan.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.signupDate?.split('T')[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onUserClick(user.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-black bg-[#c4ff4d] hover:bg-[#b8f542] text-gray-900 transition-colors"
                  >
                    <FaEye className="mr-1.5" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersSection;