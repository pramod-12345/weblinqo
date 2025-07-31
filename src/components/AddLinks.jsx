import { useEffect } from 'react';
import { FiTrash2, FiPlus, FiExternalLink, FiLock } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { 
  FaLink, 
  FaInstagram, 
  FaFacebookF, 
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';
import { RiThreadsLine } from 'react-icons/ri';

const PLATFORM_OPTIONS = [
  { 
    label: "Custom Link", 
    value: "CUSTOM_LINK", 
    icon: <FaLink className="text-gray-600" />,
    color: "text-gray-600"
  },
  { 
    label: "Instagram", 
    value: "INSTAGRAM", 
    icon: <FaInstagram className="text-[#E1306C]" />,
    color: "text-[#E1306C]"
  },
  { 
    label: "Facebook", 
    value: "FACEBOOK", 
    icon: <FaFacebookF className="text-[#3b5998]" />,
    color: "text-[#3b5998]"
  },
  { 
    label: "Threads", 
    value: "THREADS", 
    icon: <RiThreadsLine className="text-[#000000]" />,
    color: "text-[#000000]"
  },
  { 
    label: "TikTok", 
    value: "TIKTOK", 
    icon: <FaTiktok className="text-[#000000]" />,
    color: "text-[#000000]"
  },
  { 
    label: "YouTube", 
    value: "YOUTUBE", 
    icon: <FaYoutube className="text-[#FF0000]" />,
    color: "text-[#FF0000]"
  },
  { 
    label: "Twitter", 
    value: "TWITTER", 
    icon: <FaTwitter className="text-[#1DA1F2]" />,
    color: "text-[#1DA1F2]"
  },
  { 
    label: "LinkedIn", 
    value: "LINKEDIN", 
    icon: <FaLinkedin className="text-[#0077B5]" />,
    color: "text-[#0077B5]"
  }
];

const AddLinks = ({ links = [], setLinks, setUserProfile, features }) => {
  useEffect(() => {
    const today = new Date();
    const filteredLinks = links.filter(link => {
      return !link.startDate || new Date(link.startDate) <= today;
    });
    setUserProfile({ links: filteredLinks });
  }, [links, setUserProfile]);

  const handleLinkChange = (index, field, value) => {
    if (!features?.linkScheduling && (field === 'startDate' || field === 'endDate')) {
      toast.error("Link scheduling is a premium feature. Upgrade to access this.");
      return;
    }

    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const addNewLink = () => {
    const max = features?.maxLinks?.toLowerCase() === 'unlimited'
      ? Infinity
      : parseInt(features?.maxLinks || '5');

    if (links.length >= max) {
      toast.error(`Maximum ${features?.maxLinks} links allowed on your current plan.`);
      return;
    }

    setLinks([
      ...links,
      {
        title: '',
        url: '',
        platform: 'CUSTOM_LINK',
        startDate: '',
        endDate: ''
      }
    ]);
  };

  const removeLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const isMaxReached = () => {
    if (!features) return false;
    return features.maxLinks.toLowerCase() !== 'unlimited' &&
      links.length >= parseInt(features.maxLinks);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Links</h2>
        <span className="text-sm text-gray-600">
          {links.length}/{features?.maxLinks || '5'} links used
        </span>
      </div>

      {links.length === 0 ? (
        <div className="bg-[#f5f3f0] rounded-xl p-8 text-center border-2 border-dashed border-gray-200">
          <FiExternalLink className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-800">No links added yet</h3>
          <p className="mt-1 text-sm text-gray-600">Add your first link to get started</p>
          <button
            onClick={addNewLink}
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-[#c4ff4d] hover:bg-[#b8f542] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c4ff4d] transition-all hover:scale-[1.02]"
          >
            <FiPlus className="mr-2" /> Add Link
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <div className="relative">
                    <select
                      value={link.platform || 'CUSTOM_LINK'}
                      onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4ff4d] focus:border-[#c4ff4d] bg-white"
                    >
                      {PLATFORM_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <span className="absolute left-3 top-3 text-lg">
                      {PLATFORM_OPTIONS.find(o => o.value === link.platform)?.icon || '🔗'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4ff4d] focus:border-[#c4ff4d]"
                    placeholder="e.g. My Portfolio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4ff4d] focus:border-[#c4ff4d]"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    Start Date
                    {!features?.linkScheduling && (
                      <FiLock className="ml-1 h-3 w-3 text-yellow-500" />
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={link.startDate || ''}
                      onChange={(e) => handleLinkChange(index, 'startDate', e.target.value)}
                      className={`w-full px-3 py-2.5 border ${
                        !features?.linkScheduling ? 'bg-gray-50 text-gray-400' : ''
                      } border-gray-200 rounded-xl`}
                      disabled={!features?.linkScheduling}
                    />
                    {!features?.linkScheduling && (
                      <div className="absolute inset-0 flex items-center justify-end pr-3 pointer-events-none">
                        <span className="bg-yellow-50 text-yellow-700 text-xs px-2 py-0.5 rounded-md">Premium</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    End Date
                    {!features?.linkScheduling && (
                      <FiLock className="ml-1 h-3 w-3 text-yellow-500" />
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={link.endDate || ''}
                      onChange={(e) => handleLinkChange(index, 'endDate', e.target.value)}
                      className={`w-full px-3 py-2.5 border ${
                        !features?.linkScheduling ? 'bg-gray-50 text-gray-400' : ''
                      } border-gray-200 rounded-xl`}
                      disabled={!features?.linkScheduling}
                    />
                    {!features?.linkScheduling && (
                      <div className="absolute inset-0 flex items-center justify-end pr-3 pointer-events-none">
                        <span className="bg-yellow-50 text-yellow-700 text-xs px-2 py-0.5 rounded-md">Premium</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => removeLink(index)}
                  className="text-red-600 hover:text-red-800 flex items-center text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <FiTrash2 className="mr-1.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={addNewLink}
        disabled={isMaxReached()}
        className={`w-full flex items-center justify-center px-6 py-3.5 border ${
          isMaxReached() 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed rounded-xl' 
            : 'bg-[#c4ff4d] text-black border-[#c4ff4d] hover:bg-[#b8f542] rounded-full font-medium transition-all hover:scale-[1.02] shadow-sm'
        }`}
      >
        <FiPlus className="mr-2" /> Add New Link
      </button>

      {isMaxReached() && (
        <div className="bg-[#c4ff4d]/20 border border-[#c4ff4d] rounded-xl p-4 text-center text-sm text-gray-800">
          You've reached your link limit. <span className="font-semibold">Upgrade your plan</span> to add more links.
        </div>
      )}
    </div>
  );
};

export default AddLinks;