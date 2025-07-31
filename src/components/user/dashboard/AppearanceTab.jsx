import { useState, useEffect } from "react";
import { FaPalette, FaCheck, FaLock, FaCrown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "../../../assets/avatar.jpg";
import api from "../../../services/api";
import useUserStore from "../../../stores/userStore";
import toast from "react-hot-toast";

const PlanBadge = ({ level }) => {
  const getBadgeStyle = () => {
    switch(level) {
      case "FREE": return "bg-green-100 text-green-800";
      case "PRO": return "bg-[#c4ff4d]/30 text-gray-900";
      case "PREMIUM": return "bg-gradient-to-r from-[#c4ff4d] to-[#b8f542] text-black";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getBadgeStyle()}`}>
      {level === "FREE" ? null : <FaCrown size={10} />}
      {level}
    </span>
  );
};

const AppearanceTab = ({ plan }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { setUserProfile } = useUserStore();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await api.get("/api/v1/template/");
        setTemplates(res.data.data);
      } catch (err) {
        console.error("Error fetching templates", err);
        toast.error("Failed to load templates");
      }
    };

    fetchTemplates();
  }, []);

  const handleSelect = async (template) => {
    const allowed = {
      free: ["FREE"],
      pro: ["FREE", "PRO"],
      premium: ["FREE", "PRO", "PREMIUM"]
    };

    if (!allowed[plan]?.includes(template.accessLevel)) {
      toast.error(`Upgrade to ${template.accessLevel} plan to use this template`);
      return;
    }

    setSelectedTemplate(template.id);
    try {
      await api.post(`/api/v1/template/${template.id}/select`);
      setUserProfile({ template });
      toast.success(`"${template.name}" template applied successfully`);
    } catch (error) {
      console.error("Failed to select template:", error);
      toast.error("Failed to apply template");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            {templates.length} available
          </div>
        </div>
        
        {templates.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-[#f5f3f0] rounded-full flex items-center justify-center mb-4">
              <FaPalette className="text-gray-400 text-xl" />
            </div>
            <h4 className="text-gray-600 font-medium mb-1">No templates available</h4>
            <p className="text-gray-500 text-sm">Check back later for new templates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const isLocked =
                (plan === "free" && template.accessLevel !== "FREE") ||
                (plan === "pro" && template.accessLevel === "PREMIUM");

              return (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: !isLocked ? 1.02 : 1 }}
                  whileTap={{ scale: !isLocked ? 0.98 : 1 }}
                  onClick={() => !isLocked && handleSelect(template)}
                  className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                    isLocked ? "cursor-not-allowed" : "cursor-pointer hover:shadow-xl"
                  } ${
                    selectedTemplate === template.id
                      ? "ring-2 ring-[#c4ff4d] shadow-md"
                      : "border border-gray-200"
                  }`}
                  style={{
                    backgroundColor: template.backgroundColor || "#ffffff",
                    backgroundImage: template.backgroundImageUrl
                      ? `url(${template.backgroundImageUrl})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    fontFamily: template.font || "inherit",
                    color: template.textColor || "#333333",
                    aspectRatio: "9/16",
                    minHeight: "320px"
                  }}
                >
                  <div className="absolute top-3 left-3">
                    <PlanBadge level={template.accessLevel} />
                  </div>
                  
                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedTemplate === template.id 
                      ? "bg-[#c4ff4d] text-black" 
                      : "bg-white/80 text-gray-600"
                  }`}>
                    {selectedTemplate === template.id && <FaCheck size={12} />}
                  </div>
                  
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-10">
                      <div className="bg-white/10 p-3 rounded-full mb-3">
                        <FaLock className="text-white" size={20} />
                      </div>
                      <span className="text-white font-medium text-center">
                        {template.accessLevel} template
                      </span>
                      <span className="text-white/80 text-sm text-center mt-1">
                        Upgrade to unlock
                      </span>
                      <button className="mt-3 bg-[#c4ff4d] hover:bg-[#b8f542] text-black px-4 py-1.5 rounded-full text-sm font-medium">
                        Upgrade Now
                      </button>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center h-full p-6">
                    <div className="relative group mb-4">
                      <img
                        src={template.imageUrl || Avatar}
                        alt="avatar"
                        className="w-20 h-20 rounded-full border-2 border-white shadow-md object-cover group-hover:scale-105 transition-transform"
                      />
                      {selectedTemplate === template.id && (
                        <div className="absolute inset-0 rounded-full border-2 border-[#c4ff4d] animate-pulse"></div>
                      )}
                    </div>
                    <h4 className="font-semibold text-lg text-center mb-2">{template.name}</h4>
                    <p className="text-sm text-center mb-6 opacity-80">{template.bio || "No bio provided."}</p>
                    
                    <div className="mt-auto flex gap-3">
                      {["Instagram", "Twitter", "LinkedIn"].map((platform) => (
                        <div 
                          key={platform}
                          className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                        >
                          <span className="text-xs font-medium text-gray-700">
                            {platform[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppearanceTab;