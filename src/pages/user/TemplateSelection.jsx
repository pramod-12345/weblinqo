import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaCheck,
  FaSpinner,
  FaArrowRight
} from "react-icons/fa";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import api from "../../services/api";
import Avatar from "../../assets/avatar.jpg";
import useUserStore from '../../stores/userStore';

const TemplateSelection = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setSelectedTemplateId = useUserStore.getState().setSelectedTemplate;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get("/api/v1/template/");
        setTemplates(response.data.data);
      } catch (err) {
        console.error("Error fetching templates:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleSelect = async (id) => {
    if (selectedTemplate === id) return;
    setSelectedTemplateId(id);
    setIsSubmitting(true);
    navigate("/signup");
  };

  const getAccessLevelBadge = (level) => {
    const baseClasses = "absolute top-3 left-3 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md z-10";

    switch (level) {
      case "FREE":
        return <span className={`${baseClasses} bg-green-500`}>Free</span>;
      case "PRO":
        return <span className={`${baseClasses} bg-blue-500`}>Pro</span>;
      case "PREMIUM":
        return <span className={`${baseClasses} bg-purple-500`}>Premium</span>;
      default:
        return <span className={`${baseClasses} bg-gray-500`}>{level}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-indigo-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading templates...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen px-4 sm:px-6 py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
              Choose Your Template
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select a template that best represents your personal brand. You can customize it later.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelect(template.id)}
                className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer group ${
                  selectedTemplate === template.id
                    ? "ring-4 ring-indigo-500 border-indigo-500 scale-[1.02]"
                    : "border border-gray-200 hover:border-indigo-300"
                } ${
                  isSubmitting && selectedTemplate === template.id ? "opacity-75" : ""
                }`}
                style={{
                  backgroundColor: template.backgroundColor || "#f8f9fa",
                  backgroundImage: template.backgroundImageUrl
                    ? `url(${template.backgroundImageUrl})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  fontFamily: template.font || "inherit",
                  color: template.textColor || "#333333",
                  height: "500px",
                }}
              >
                {getAccessLevelBadge(template.accessLevel)}

                {/* Selection indicator */}
                <div
                  className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    selectedTemplate === template.id
                      ? "bg-indigo-600 text-white scale-100"
                      : "bg-white border border-gray-300 scale-90 group-hover:scale-100"
                  }`}
                >
                  {selectedTemplate === template.id ? (
                    isSubmitting ? (
                      <FaSpinner className="animate-spin" size={12} />
                    ) : (
                      <FaCheck size={12} />
                    )
                  ) : null}
                </div>

                {/* Template content */}
                <div
                  className={`flex flex-col items-center h-full p-6 ${
                    template.titlePlacement === "top"
                      ? "justify-start"
                      : "justify-center"
                  }`}
                >
                  <img
                    src={template.imageUrl || Avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-md object-cover transition-transform group-hover:scale-105"
                  />
                  <h4 className="font-semibold text-xl text-center mb-1">
                    {template.name}
                  </h4>

                  <p
                    className={`text-sm text-center mt-1 mb-4 px-2 ${
                      template.bioPlacement === "top" ? "order-first mb-2" : ""
                    }`}
                  >
                    {template.bio || "No bio provided."}
                  </p>

                  <div className="flex space-x-4 text-lg mb-6">
                    <FaInstagram className="hover:text-[#E1306C] transition-colors" />
                    <FaFacebookF className="hover:text-[#3b5998] transition-colors" />
                    <FaTwitter className="hover:text-[#1DA1F2] transition-colors" />
                    <FaLinkedin className="hover:text-[#0077b5] transition-colors" />
                  </div>

                  <div className="flex flex-col gap-3 w-full mt-auto">
                    <div
                      className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        template.buttonStyle || "bg-white text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      Add YouTube Link
                    </div>
                    <div
                      className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        template.buttonStyle || "bg-white text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      Add Instagram Link
                    </div>
                    <div
                      className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        template.buttonStyle || "bg-white text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      Add TikTok Link
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <FaArrowRight className="text-indigo-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Help text */}
          <div className="mt-12 text-center max-w-2xl mx-auto">
            {isSubmitting && (
              <p className="mt-3 text-indigo-600 text-sm flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Setting up your template...
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TemplateSelection;