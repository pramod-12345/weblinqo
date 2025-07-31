import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";

import Sidebar from "../../components/user/dashboard/Sidebar";
import Header from "../../components/user/dashboard/Header";
import LinksTab from "../../components/user/dashboard/LinksTab";
import AppearanceTab from "../../components/user/dashboard/AppearanceTab";
import AnalyticsTab from "../../components/user/dashboard/AnalyticsTab";
import SettingsTab from "../../components/user/dashboard/SettingsTab";
import ProfilePreview from "../../components/user/dashboard/ProfilePreview";
import PreviewToggleButton from "../../components/user/dashboard/PreviewToggleButton";

import api from "../../utils/api";
import { dummyData } from "../../data/dummyData";
import useUserStore from "../../stores/userStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [selectedTab, setSelectedTab] = useState("Links");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(() => {
    return isMobile ? false : true;
  });
  const { userProfile, setUserProfile, resetAll } = useUserStore();
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await api.get('/v1/subscription/status');
        setPlan(response.data.data.planName.toLowerCase());
        toast.success(`Welcome to your ${response.data.data.planName} plan`);
      } catch (err) {
        console.error("Failed to fetch subscription status", err);
        toast.error("Could not load your subscription plan");
      }
    };

    fetchPlan();
  }, []);

  useEffect(() => {
    if (!userProfile) {
      navigate("/login");
    }
  }, [userProfile, navigate]);

  const logout = () => {
    resetAll();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleShareProfile = (platform = 'native') => {
    if (!userProfile?.slug) {
      toast.error("Profile URL not available");
      return;
    }
    
    const profileUrl = `${window.location.origin}/${userProfile.slug}`;
    const text = `Check out my weblinqo profile: ${profileUrl}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(profileUrl)}&title=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent("Check out my weblinqo profile")}&body=${encodeURIComponent(text)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(profileUrl)
          .then(() => toast.success("Profile link copied!"))
          .catch(() => prompt("Copy this link to share:", profileUrl));
        break;
      default:
        if (navigator.share) {
          navigator.share({ 
            title: "My weblinqo Profile",
            text: "Check out my weblinqo profile",
            url: profileUrl 
          }).catch(console.error);
        } else {
          navigator.clipboard.writeText(profileUrl)
            .then(() => toast.success("Profile link copied!"))
            .catch(() => prompt("Copy this link to share:", profileUrl));
        }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f3f0] text-gray-900 font-sans">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#c4ff4d] p-3 rounded-full shadow-lg hover:bg-[#b8f542] transition-all"
      >
        {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:flex fixed z-40 w-64 h-full bg-white border-r border-gray-200">
        <Sidebar 
          plan={plan} 
          selectedTab={selectedTab} 
          handleTabClick={handleTabClick} 
          onLogout={logout}
        />
      </div>

      {/* Mobile Sidebar (animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed z-40 w-64 h-full bg-white shadow-xl md:hidden"
            >
              <Sidebar 
                plan={plan} 
                selectedTab={selectedTab} 
                handleTabClick={handleTabClick} 
                onLogout={logout}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 md:ml-64 transition-all">
        <Header
          selectedTab={selectedTab}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          onShareProfile={handleShareProfile}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />

        {(selectedTab === "Links" || selectedTab === "Appearance") && (
          <>
            <PreviewToggleButton
              showPreview={showPreview}
              setShowPreview={setShowPreview}
            />
            <ProfilePreview 
              showPreview={showPreview} 
              userProfile={userProfile} 
              plan={plan}
            />
          </>
        )}

        <div className={`transition-all duration-300 ${((selectedTab === "Links" || selectedTab === "Appearance") && showPreview) ? "lg:mr-80" : ""}`}>
          {selectedTab === "Links" && <LinksTab userProfile={userProfile} setUserProfile={setUserProfile} plan={plan} />}
          {selectedTab === "Appearance" && <AppearanceTab plan={plan} />}
          {selectedTab === "Analytics" && <AnalyticsTab data={dummyData} plan={plan} />}
          {selectedTab === "Settings" && <SettingsTab plan={plan} />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;