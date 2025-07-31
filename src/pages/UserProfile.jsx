import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { slug } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // ✅ Skip auth token for public profile
        const res = await api.get(`/v1/user/public-profile/${slug}`, {
          skipAuth: true,
        });
        setUserProfile(res.data.data);

        // ✅ Skip auth token for view tracking
        await api.post(`/v1/user/track/${slug}`, null, {
          skipAuth: true,
        });
      } catch (err) {
        console.error("Failed to load or track profile:", err);
        toast.error("Failed to load profile.");
      }
    };

    if (slug) {
      fetchProfile();
    }
  }, [slug]);

  if (!userProfile) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  const template = userProfile.template || {};
  const links = userProfile.links || [];

  const backgroundStyle = template.backgroundImageUrl
    ? {
        backgroundImage: `url(${template.backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundColor: template.backgroundColor || "#f8f9fa",
      };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={backgroundStyle}>
      <div
        className="w-full max-w-md p-6 rounded-xl shadow-xl backdrop-blur-md"
        style={{
          fontFamily: template.font || "inherit",
          color: template.textColor || "#333333",
        }}
      >
        {/* Avatar */}
        {userProfile.profileImage && (
          <img
            src={userProfile.profileImage}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md object-cover"
          />
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          {userProfile.title || "No title provided"}
        </h2>

        {/* Bio */}
        <p className="text-sm text-center mb-4">
          {userProfile.bio || "No bio provided."}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 text-xl mb-6">
          <FaInstagram className="hover:text-[#E1306C] cursor-pointer" />
          <FaFacebookF className="hover:text-[#3b5998] cursor-pointer" />
          <FaTwitter className="hover:text-[#1DA1F2] cursor-pointer" />
          <FaLinkedin className="hover:text-[#0077b5] cursor-pointer" />
        </div>

        {/* Links */}
        {links.length > 0 && (
          <div className="flex flex-col gap-3 w-full">
            {links.map((link, idx) => (
              <button
                key={idx}
                onClick={async () => {
                  try {
                    // ✅ Skip auth token for public link tracking
                    await api.post(`/v1/link/track/${link.id}`, null, {
                      skipAuth: true,
                    });
                  } catch (err) {
                    console.error("Click tracking failed:", err);
                    toast.error("Failed to track link click");
                  } finally {
                    window.open(link.url, "_blank");
                  }
                }}
                className={
                  template.buttonStyle ||
                  "bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
                }
              >
                {link.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
