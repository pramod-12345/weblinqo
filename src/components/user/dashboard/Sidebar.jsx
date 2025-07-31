import { Link } from "react-router-dom";
import { FaLink, FaPalette, FaChartBar, FaCog, FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

const PlanBadge = ({ planRequired }) => (
  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#c4ff4d] to-[#b8f542] text-black text-xs px-2 py-1 rounded-full ml-auto">
    <FaCrown size={10} /> {planRequired}
  </span>
);

const Sidebar = ({ plan, selectedTab, handleTabClick, onLogout  }) => {
  const tabs = [
    { 
      tab: "Links", 
      icon: <FaLink />, 
      availableForAll: true,
      description: "Manage your links and bio"
    },
    { 
      tab: "Appearance", 
      icon: <FaPalette />, 
      availableForAll: true,
      description: "Customize your profile look"
    },
    { 
      tab: "Analytics", 
      icon: <FaChartBar />, 
      premiumOnly: true,
      description: "Track link performance"
    },
    { 
      tab: "Settings", 
      icon: <FaCog />, 
      availableForAll: true,
      description: "Account and preferences"
    },
  ];

  const canAccessTab = (tab) => {
    if (tab.availableForAll) return true;
    if (tab.premiumOnly) return plan === "premium";
    return true;
  };

  return (
    <aside className="w-64 bg-white p-6 border-r border-gray-200 h-full flex flex-col">
      {/* Logo Section */}
      <div className="mb-10">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:opacity-90 transition-opacity"
        >
          <span 
            className="text-black p-2 rounded-lg"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
                <img
                  src="/weblinqo.svg"
                  alt="weblinqo Logo"
                  className="w-12 h-12"
                />
          </span>
          <span className="font-extrabold text-black">weblinqo</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {tabs.map((item) => {
          const accessible = canAccessTab(item);
          return (
            <motion.button
              key={item.tab}
              onClick={() => accessible && handleTabClick(item.tab)}
              whileHover={{ x: accessible ? 5 : 0 }}
              whileTap={{ scale: accessible ? 0.98 : 1 }}
              className={`flex flex-col w-full gap-1 px-4 py-3 rounded-xl transition-all duration-200 text-left
                ${selectedTab === item.tab
                  ? "bg-[#c4ff4d]/20 text-black border-l-4 border-[#c4ff4d]"
                  : accessible 
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              disabled={!accessible}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg ${
                  selectedTab === item.tab 
                    ? 'text-black' 
                    : accessible 
                      ? 'text-gray-600' 
                      : 'text-gray-300'
                }`}>
                  {item.icon}
                </span>
                <span className={`${!accessible && 'opacity-60'}`}>{item.tab}</span>
                {!accessible && (
                  <PlanBadge planRequired="Premium" />
                )}
              </div>
              <p className={`text-xs ml-8 ${
                accessible 
                  ? 'text-gray-500' 
                  : 'text-gray-400'
              }`}>
                {item.description}
              </p>
            </motion.button>
          );
        })}
      </nav>

      {/* Plan Status & Upgrade Section */}
      <div className="mt-auto space-y-4">
        {plan !== "premium" ? (
          <div className="p-3 bg-[#f5f3f0] rounded-xl border border-[#e0ddd9]">
            <div className="flex items-start gap-2">
              <FaCrown className="text-black mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {plan === "free" ? "Upgrade to Pro or Premium" : "Upgrade to Premium"}
                </h4>
                <Link
                  to="/pricing"
                  className="mt-2 inline-block text-xs font-medium bg-[#c4ff4d] hover:bg-[#b8f542] text-black px-3 py-1.5 rounded-full transition-colors"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-[#f5f3f0] rounded-xl border border-[#e0ddd9]">
            <div className="flex items-center gap-2">
              <FaCrown className="text-[#c4ff4d]" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Premium Plan Active</h4>
                <p className="text-xs text-gray-600 mt-1">
                  You have access to all features
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Plan Indicator */}
        <div className="pt-3 border-t border-gray-200">
          <div className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${
            plan === "free" 
              ? "bg-gray-100 text-gray-600"
              : plan === "pro"
                ? "bg-[#c4ff4d]/20 text-gray-900"
                : "bg-[#c4ff4d]/30 text-gray-900"
          }`}>
            {plan !== "free" && <FaCrown size={10} className="text-black" />}
            <span className="capitalize">{plan}</span>
          </div>
        </div>
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 justify-center mt-4 px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <FiLogOut /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;