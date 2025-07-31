import React, { useState, useEffect } from "react";
import { FaLink, FaPalette, FaChartBar, FaCog, FaExternalLinkAlt, FaEdit, FaCheck, FaTimes, FaShapes, FaShare } from "react-icons/fa";
import { toast } from "react-hot-toast";
import api from "../../../services/api";

const Header = ({ selectedTab, showPreview, userProfile, setUserProfile }) => {
  const [isEditingSlug, setIsEditingSlug] = useState(false);
  const [newSlug, setNewSlug] = useState(userProfile?.slug || "");
  const [slugAvailable, setSlugAvailable] = useState(true);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugError, setSlugError] = useState("");
  
  const tabIcons = {
    Links: <FaLink className="text-black" />,
    Appearance: <FaPalette className="text-black" />,
    Analytics: <FaChartBar className="text-black" />,
    Settings: <FaCog className="text-black" />
  };

  const profileUrl = userProfile?.slug
    ? `${window.location.origin}/u/${userProfile.slug}`
    : null;

  const copyProfileLink = () => {
    if (!profileUrl) {
      toast.error("Profile URL not available");
      return;
    }

    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        toast.success("Profile link copied!");
        window.open(profileUrl, "_blank", "noopener,noreferrer");
      })
      .catch(() => {
        prompt("Copy this link:", profileUrl);
        window.open(profileUrl, "_blank", "noopener,noreferrer");
      });
  };

  const checkSlugAvailability = async (slug) => {
    if (!slug) {
      setSlugAvailable(false);
      setSlugError("Slug cannot be empty");
      return;
    }

    if (slug === userProfile?.slug) {
      setSlugAvailable(true);
      setSlugError("");
      return;
    }

    setCheckingSlug(true);
    setSlugError("");
    
    try {
      const response = await api.get("/api/v1/user/check-slug", { params: { slug } });
      setSlugAvailable(response.data.data.available);
      if (!response.data.data.available) {
        setSlugError("This username is already taken");
      }
    } catch (error) {
      setSlugError("Error checking username availability");
      setSlugAvailable(false);
    } finally {
      setCheckingSlug(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (newSlug && isEditingSlug) {
        checkSlugAvailability(newSlug);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [newSlug, isEditingSlug]);

  const handleSlugChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    setNewSlug(value);
  };

  const startEditing = () => {
    setIsEditingSlug(true);
    setNewSlug(userProfile?.slug || "");
    setSlugAvailable(true);
    setSlugError("");
  };

  const cancelEditing = () => {
    setIsEditingSlug(false);
    setNewSlug(userProfile?.slug || "");
    setSlugError("");
  };

  const saveSlug = async () => {
    // Don't call API if slug hasn't changed
    if (newSlug === userProfile?.slug) {
      setIsEditingSlug(false);
      return;
    }

    if (!slugAvailable || checkingSlug || !newSlug) return;

    try {
      const response = await api.post("/api/v1/user/slug", { slug: newSlug });
      toast.success("Username updated successfully!");
      setIsEditingSlug(false);
      setUserProfile({...userProfile, slug: newSlug});
    } catch (error) {
      toast.error("Failed to update username");
      console.error("Error updating slug:", error);
    }
  };

  return (
    <>
      {/* Modal Backdrop */}
 {isEditingSlug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Username</h3>
              <button 
                onClick={cancelEditing}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 whitespace-nowrap mr-2">
                  weblinqo.com/u/
                </span>
                <div className="flex-1 relative">
                  <input
                    value={newSlug}
                    onChange={handleSlugChange}
                    className="w-full py-2.5 px-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-white"
                    autoFocus
                    spellCheck={false}
                  />
                </div>
              </div>

              <div className="text-xs h-5 flex items-center px-1">
                {checkingSlug ? (
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></span>
                    Checking availability...
                  </span>
                ) : slugError ? (
                  <span className="text-red-500 flex items-center gap-1.5">
                    <FaTimes size={10} /> {slugError}
                  </span>
                ) : slugAvailable && newSlug ? (
                  <span className="text-black flex items-center gap-1.5">
                    <FaCheck size={10} /> Available!
                  </span>
                ) : null}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSlug}
                  disabled={!slugAvailable || checkingSlug || !newSlug}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                    slugAvailable && !checkingSlug && newSlug
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Content */}
      <header className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 transition-all duration-300 ${
        (selectedTab === "Links" || selectedTab === "Appearance") && showPreview ? "lg:mr-80" : ""
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#c4ff4d]/20">
            {tabIcons[selectedTab]}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedTab}
            </h2>
            {selectedTab === "Links" && (
              <p className="text-sm text-gray-600">
                {userProfile?.links?.length || 0} links added
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {userProfile?.slug && (
            <div className="flex flex-col gap-2 min-w-0 max-w-full">
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors group">
                <button
                  onClick={copyProfileLink}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 px-4 py-2.5 min-w-0 flex-1 text-left"
                >
                  <span className="truncate">weblinqo.com/u/{userProfile.slug}</span>
                </button>
                <div className="flex border-l border-gray-300 h-full">
                  <button
                    onClick={() => window.open(`/u/${userProfile.slug}`, '_blank')}
                    className="p-2 text-gray-500 hover:text-black transition-colors"
                    aria-label="Open profile"
                  >
                    <FaShare size={14} />
                  </button>
                  <button
                    onClick={startEditing}
                    className="p-2 text-gray-500 hover:text-black transition-colors"
                    aria-label="Edit username"
                  >
                    <FaEdit size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;