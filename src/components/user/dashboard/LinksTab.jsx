import React, { useState, useCallback, useEffect } from "react";
import {
  FaEdit, FaPlus, FaTrash, FaLink, FaCamera,
  FaFacebookF, FaInstagram, FaTiktok, FaCheck,
  FaExclamationTriangle, FaLock
} from "react-icons/fa";
import { RiThreadsLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-hot-toast";
import { MdDragIndicator } from "react-icons/md";
import api from "../../../services/api";

const getIconForPlatform = (platform) => {
  const map = {
    CUSTOM_LINK: <FaLink className="text-gray-600" size={14} />,
    INSTAGRAM: <FaInstagram className="text-[#E1306C]" size={14} />,
    FACEBOOK: <FaFacebookF className="text-[#3b5998]" size={14} />,
    THREADS: <RiThreadsLine className="text-gray-800" size={14} />,
    TIKTOK: <FaTiktok className="text-black" size={14} />,
  };
  return map[platform?.toUpperCase()] || map.CUSTOM_LINK;
};

const PlanLimitBadge = ({ message, icon = <FaLock size={12} /> }) => (
  <span className="inline-flex items-center gap-1 bg-[#f5f3f0] text-gray-700 text-xs px-2 py-1 rounded-full border border-[#e0ddd9]">
    {icon} {message}
  </span>
);

const ProfileCard = React.memo(({
  userProfile,
  isEditingName,
  isEditingTagline,
  setIsEditingName,
  setIsEditingTagline,
  handleNameSave,
  handleTaglineSave,
  onProfileChange,
  onProfileImageChange,
  uploadProfileImage
}) => {
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const newImageUrl = await uploadProfileImage(formData);
        onProfileImageChange(newImageUrl);
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="relative mx-auto w-fit group">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={userProfile.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <label 
            className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-200 cursor-pointer ${
              isHoveringImage ? 'opacity-100' : 'opacity-0'
            }`}
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full flex flex-col items-center">
              <FaCamera className="text-white text-xl mb-1" />
              <span className="text-white text-xs font-medium">Edit</span>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-center">
        {isEditingName ? (
          <div className="flex justify-center items-center gap-2">
            <input
              value={userProfile.title}
              onChange={(e) => onProfileChange("title", e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
              className="text-2xl font-bold border-b-2 border-[#c4ff4d] focus:outline-none text-center bg-transparent text-gray-900 w-full max-w-xs"
              autoFocus
            />
            <button 
              onClick={handleNameSave} 
              className="text-white bg-[#c4ff4d] p-1.5 rounded-lg hover:bg-[#b8f542] transition-colors"
            >
              <FaCheck size={14} />
            </button>
          </div>
        ) : (
          <motion.h2
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 cursor-pointer hover:text-[#c4ff4d] transition-colors"
            onClick={() => setIsEditingName(true)}
          >
            {userProfile.title || "Your Name"} 
            <FaEdit className="text-gray-400 text-sm hover:text-[#c4ff4d] transition-colors" />
          </motion.h2>
        )}

        {isEditingTagline ? (
          <div className="flex justify-center items-center gap-2">
            <input
              value={userProfile.bio}
              onChange={(e) => onProfileChange("bio", e.target.value)}
              onBlur={handleTaglineSave}
              onKeyDown={(e) => e.key === 'Enter' && handleTaglineSave()}
              className="text-base text-gray-600 border-b border-gray-300 focus:outline-none text-center bg-transparent w-full max-w-xs"
              autoFocus
            />
            <button 
              onClick={handleTaglineSave} 
              className="text-white bg-[#c4ff4d] p-1.5 rounded-lg hover:bg-[#b8f542] transition-colors"
            >
              <FaCheck size={14} />
            </button>
          </div>
        ) : (
          <motion.p
            whileHover={{ scale: 1.02 }}
            className="text-gray-600 cursor-pointer hover:text-[#c4ff4d] transition-colors text-base flex items-center justify-center gap-1"
            onClick={() => setIsEditingTagline(true)}
          >
            {userProfile.bio || "Your tagline here"} 
            <FaEdit className="text-gray-400 text-xs hover:text-[#c4ff4d] transition-colors" />
          </motion.p>
        )}
      </div>
    </div>
  );
});

const AddLinkForm = React.memo(({ onAddLink, features, linksCount, plan }) => {
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("CUSTOM_LINK");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isMaxLinksReached, setIsMaxLinksReached] = useState(false);

  useEffect(() => {
    if (features) {
      const isUnlimited = features.maxLinks.toLowerCase() === 'unlimited';
      const maxLinks = parseInt(features.maxLinks);
      setIsMaxLinksReached(!isUnlimited && linksCount >= maxLinks);
    }
  }, [features, linksCount]);

  const handleAddLink = () => {
    if (!newLinkName.trim() || !newLinkUrl.trim()) return;
    if (isMaxLinksReached) return;

    onAddLink({
      title: newLinkName,
      url: newLinkUrl,
      platform: selectedPlatform,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null
    });

    // Reset form
    setNewLinkName("");
    setNewLinkUrl("");
    setSelectedPlatform("CUSTOM_LINK");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Add New Link</h3>
        {features && (
          <span className="text-sm text-gray-500">
            {linksCount}/{features.maxLinks === 'Unlimited' ? '∞' : features.maxLinks} links
          </span>
        )}
      </div>

      {isMaxLinksReached && (
        <div className="mb-4 p-3 bg-[#f5f3f0] text-gray-700 rounded-lg flex items-start gap-2 border border-[#e0ddd9]">
          <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            You've reached the maximum number of links ({features.maxLinks}) allowed on your plan. 
            <a href="/pricing" className="ml-1 font-medium underline hover:text-black">
              Upgrade to add more
            </a>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="col-span-1 border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#c4ff4d]"
        >
          <option value="CUSTOM_LINK">Custom Link</option>
          <option value="INSTAGRAM">Instagram</option>
          <option value="FACEBOOK">Facebook</option>
          <option value="THREADS">Threads</option>
          <option value="TIKTOK">TikTok</option>
        </select>

        <input
          type="text"
          placeholder="Link Name"
          value={newLinkName}
          onChange={(e) => setNewLinkName(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          disabled={isMaxLinksReached}
        />

        <input
          type="url"
          placeholder="URL (https://...)"
          value={newLinkUrl}
          onChange={(e) => setNewLinkUrl(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          disabled={isMaxLinksReached}
        />

        <div className="relative col-span-1">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={!features?.linkScheduling || isMaxLinksReached}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:opacity-50"
          />
          {!features?.linkScheduling && (
            <div className="absolute -top-2 -right-2">
              <PlanLimitBadge message="Premium" />
            </div>
          )}
        </div>

        <div className="relative col-span-1">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={!features?.linkScheduling || isMaxLinksReached}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:opacity-50"
          />
          {!features?.linkScheduling && (
            <div className="absolute -top-2 -right-2">
              <PlanLimitBadge message="Premium" />
            </div>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddLink}
          disabled={!newLinkName || !newLinkUrl || isMaxLinksReached}
          className={`bg-[#c4ff4d] text-black rounded-lg px-3 py-2 text-sm hover:bg-[#b8f542] transition col-span-1 ${
            isMaxLinksReached ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaPlus className="inline mr-1" />
          Add Link
        </motion.button>
      </div>
    </div>
  );
});

const LinkItem = ({ link, onDeleteLink, isDraggable, features, onUpdateLink, plan }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: link.title,
    url: link.url,
    startDate: link.startDate ? new Date(link.startDate).toISOString().slice(0, 10) : "",
    endDate: link.endDate ? new Date(link.endDate).toISOString().slice(0, 10) : "",
  });

  const isScheduled = link.startDate || link.endDate;
  const isActive = !isScheduled || (
    (!link.startDate || new Date(link.startDate) <= new Date()) &&
    (!link.endDate || new Date(link.endDate) >= new Date())
  );

  const saveChanges = () => {
    if (!form.title.trim() || !form.url.trim()) {
      toast.error("Title and URL are required");
      return;
    }

    if (!features?.linkScheduling && (form.startDate || form.endDate)) {
      toast.error("Link scheduling not allowed on your current plan");
      return;
    }

    onUpdateLink(link.id, {
      title: form.title,
      url: form.url,
      startDate: form.startDate ? new Date(form.startDate) : null,
      endDate: form.endDate ? new Date(form.endDate) : null,
      platform: link.platform,
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border ${
        isActive
          ? 'bg-white border-gray-200 hover:border-[#c4ff4d]'
          : 'bg-[#f5f3f0] border-[#e0ddd9]'
      } transition-colors hover:shadow-sm`}
    >
      <div className="flex flex-1 items-start gap-3 w-full">
        {/* Drag handle */}
        <div
          className={`text-gray-400 ${
            isDraggable ? 'cursor-grab' : 'opacity-40 cursor-not-allowed'
          }`}
          title={isDraggable ? 'Drag to reorder' : 'Reordering not allowed on current plan'}
        >
          <MdDragIndicator size={20} />
        </div>

        {/* Icon */}
        <div className="flex-shrink-0">{getIconForPlatform(link.platform)}</div>

        {/* Editable or view mode */}
        {isEditing ? (
          <div className="w-full space-y-2">
            <input
              className="w-full px-2 py-1 border rounded text-sm"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              className="w-full px-2 py-1 border rounded text-sm"
              placeholder="URL"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
            <div className="flex gap-2">
              <input
                type="date"
                className="w-full px-2 py-1 border rounded text-sm"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                disabled={!features?.linkScheduling}
              />
              <input
                type="date"
                className="w-full px-2 py-1 border rounded text-sm"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                disabled={!features?.linkScheduling}
              />
            </div>
            <div className="flex gap-2">
              <button
                className="text-sm text-white bg-black px-3 py-1 rounded hover:bg-[#b8f542]"
                onClick={saveChanges}
              >
                Save
              </button>
              <button
                className="text-sm text-gray-600 border px-3 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p
                className={`font-medium text-sm truncate ${
                  isActive ? 'text-gray-800' : 'text-gray-500'
                }`}
              >
                {link.title}
              </p>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-600 hover:text-[#b8f542] focus:outline-none focus:ring-2 focus:ring-[#c4ff4d] hover:bg-gray-100 active:scale-95 rounded-full transition-all duration-150"
                  aria-label={`Edit ${link.title}`}
                  tabIndex={0}
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => onDeleteLink(link.id)}
                  className="p-2 text-gray-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 hover:bg-gray-100 active:scale-95 rounded-full transition-all duration-150"
                  aria-label={`Delete ${link.title}`}
                  tabIndex={0}
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
            <a
              href={link.url}
              className="text-xs text-gray-800 hover:text-[#b8f542] truncate"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.url.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const PublishedLinks = React.memo(({ features, links, onDeleteLink, onReorderLinks, setLinks, updateLink, plan }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(links);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const reorderedWithPositions = reordered.map((link, index) => ({
      id: link.id,
      position: index
    }));

    setLinks(reordered);
    onReorderLinks(reorderedWithPositions);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Links</h3>
        <span className="text-sm text-gray-500">
          {links.length} {links.length === 1 ? 'link' : 'links'}
        </span>
      </div>

      {links.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-[#f5f3f0] rounded-full flex items-center justify-center mb-4">
            <FaLink className="text-gray-400 text-xl" />
          </div>
          <h4 className="text-gray-600 font-medium mb-1">No links yet</h4>
          <p className="text-gray-500 text-sm">Add your first link above</p>
        </div>
      ) : features?.linkReordering ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="links">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {links.map((link, index) => (
                  <Draggable key={link.id} draggableId={String(link.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative group"
                      >
                        <LinkItem 
                          link={link} 
                          onDeleteLink={onDeleteLink} 
                          isDraggable={true}
                          features={features}
                          onUpdateLink={updateLink}
                          plan={plan}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="relative group">
              <LinkItem 
                link={link} 
                onDeleteLink={onDeleteLink} 
                isDraggable={false}
                features={features}
                onUpdateLink={updateLink}
                plan={plan}
              />
            </div>
          ))}
        </div>
      )}
      
      {!features?.linkReordering && links.length > 0 && (
        <div className="mt-4 p-3 bg-[#f5f3f0] text-gray-700 rounded-lg flex items-start gap-2 border border-[#e0ddd9]">
          <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            Link reordering is a pro feature. 
            <a href="/pricing" className="ml-1 font-medium underline hover:text-black">
              Upgrade to enable
            </a>
          </p>
        </div>
      )}
    </div>
  );
});

const LinksTab = ({ userProfile, setUserProfile, plan }) => {
  const [links, setLinks] = useState(userProfile.links || []);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTagline, setIsEditingTagline] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await api.get('/api/v1/subscription/features');
        setFeatures(res.data.data);
      } catch {
        toast.error("Failed to load plan features.");
      }
    };
    fetchFeatures();
  }, []);

  const updateLink = async (id, { title, url, platform, startDate, endDate }) => {
    if (!features) return toast.error("Plan features not loaded yet");

    if (!features.linkScheduling && (startDate || endDate)) {
      return toast.error("Link scheduling is not allowed on your current plan.");
    }

    try {
      const response = await api.put(`/api/v1/link/${id}`, {
        title,
        url,
        platform,
        startDate,
        endDate,
      });

      const updatedLink = response.data.data;
      const updatedLinks = links.map(link => link.id === id ? updatedLink : link);
      setLinks(updatedLinks);

      const updated = { ...editedProfile, links: updatedLinks };
      setEditedProfile(updated);
      setUserProfile(updated);
      toast.success("Link updated successfully");
    } catch {
      toast.error("Failed to update link");
    }
  };

  const updateProfile = async (data) => {
    setIsLoading(true);
    try {
      const res = await api.put('/api/v1/user/profile', data);
      return res.data;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfileImage = async (file) => {
    setIsLoading(true);
    try {
      const res = await api.post('/api/v1/user/profile-image', file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    const profileImageUrl = res.data.data.profileImageUrl;

    // Save new image URL to user profile
    await updateProfile({
      title: editedProfile.title,
      bio: editedProfile.bio,
      profileImage: profileImageUrl,
    });

    return profileImageUrl;
    } finally {
      setIsLoading(false);
    }
  };

  const createLinks = async (linksData) => {
    setIsLoading(true);
    try {
      const res = await api.post('/api/v1/link/', linksData);
      return res.data.data;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLink = async (linkId) => {
    setIsLoading(true);
    try {
      await api.delete(`/api/v1/link/${linkId}`);
      const updatedLinks = links.filter((link) => link.id !== linkId);
      setLinks(updatedLinks);

      const updated = { ...editedProfile, links: updatedLinks };
      setEditedProfile(updated);
      setUserProfile(updated);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaglineSave = useCallback(async () => {
    const { title, bio, profileImage } = editedProfile;
    await updateProfile({ title, bio, profileImage }); 
    setIsEditingTagline(false);
  }, [editedProfile]);

  const handleNameSave = useCallback(async () => {
    const { title, bio, profileImage } = editedProfile;
    await updateProfile({ title, bio, profileImage });
    setIsEditingName(false);
  }, [editedProfile]);

  const handleProfileChange = useCallback((field, value) => {
    const updated = { ...editedProfile, [field]: value };
    setEditedProfile(updated);
    setUserProfile(updated);
  }, [editedProfile, setUserProfile]);

  const handleProfileImageChange = useCallback((url) => {
    const updated = { ...editedProfile, profileImage: url };
    setEditedProfile(updated);
    setUserProfile(updated);
  }, [editedProfile, setUserProfile]);

  const handleAddLink = useCallback(async ({ title, url, platform, startDate, endDate }) => {
    if (!features) return toast.error("Plan features not loaded yet");

    const isUnlimited = features.maxLinks.toLowerCase() === 'unlimited';
    if (!isUnlimited && links.length >= parseInt(features.maxLinks)) {
      return toast.error(`You can only add ${features.maxLinks} links on your current plan.`);
    }

    if (!features.linkScheduling && (startDate || endDate)) {
      return toast.error("Link scheduling is not allowed on your current plan.");
    }

    try {
      const response = await createLinks([{
        title,
        url,
        platform,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null
      }]);
      const newLink = response[0];
      const updatedLinks = [...links, newLink];
      setLinks(updatedLinks);
      const updated = { ...editedProfile, links: updatedLinks };
      setEditedProfile(updated);
      setUserProfile(updated);
      toast.success("Link added");
    } catch {
      toast.error("Failed to add link");
    }
  }, [features, links, editedProfile, setUserProfile]);

  const reorderLinks = async (reorderedData) => {
    setIsLoading(true);
    try {
      await api.put('/api/v1/link/reorder', reorderedData); 
      const updatedLinks = reorderedData.map(req =>
        links.find(link => link.id === req.id)
      );
      setLinks(updatedLinks);
      const updated = { ...editedProfile, links: updatedLinks };
      setEditedProfile(updated);
      setUserProfile(updated);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-6 pb-6">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3"
            >
              <div className="h-5 w-5 border-2 border-[#c4ff4d] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-800">Saving changes...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileCard
        userProfile={editedProfile}
        isEditingName={isEditingName}
        isEditingTagline={isEditingTagline}
        setIsEditingName={setIsEditingName}
        setIsEditingTagline={setIsEditingTagline}
        handleNameSave={handleNameSave}
        handleTaglineSave={handleTaglineSave}
        onProfileChange={handleProfileChange}
        onProfileImageChange={handleProfileImageChange}
        uploadProfileImage={uploadProfileImage}
      />

      <AddLinkForm 
        features={features} 
        onAddLink={handleAddLink} 
        linksCount={links.length}
        plan={plan}
      />

      <PublishedLinks
        features={features}
        links={links}
        setLinks={setLinks}
        onDeleteLink={deleteLink}
        onReorderLinks={reorderLinks}
        updateLink={updateLink}
        plan={plan}
      />
    </section>
  );
};

export default LinksTab;