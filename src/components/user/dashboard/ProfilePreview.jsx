import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaTimes
} from "react-icons/fa";

const ProfilePreview = ({ showPreview, userProfile, onClose }) => {
  const template = userProfile.template || {};
  const links = userProfile.links || [];

  const containerClasses = [
    'fixed inset-y-0 w-full max-w-[300px] shadow-2xl transform transition-all duration-300 z-20 overflow-y-auto',
    'backdrop-blur-sm bg-opacity-90',
    showPreview ? 'right-0' : 'right-[-350px]',
    template.backgroundColor ? '' : 'bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]',
  ].join(' ');

  const backgroundStyle = template.backgroundImageUrl ? {
    backgroundImage: `url(${template.backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  } : {
    backgroundColor: template.backgroundColor || 'transparent',
  };

  const getButtonStyle = (buttonStyle) => {
    switch(buttonStyle) {
      case 'rounded':
        return 'rounded-full px-6 py-3';
      case 'outline':
        return 'bg-transparent border-2 px-4 py-2 rounded-md';
      default:
        return 'px-4 py-3 rounded-md';
    }
  };

  return (
    <div 
      className={containerClasses}
      style={backgroundStyle}
    >
      <div 
        className={`h-full p-8 flex flex-col ${template.titlePlacement || ''}`}
        style={{
          fontFamily: template.font || "inherit",
          color: template.textColor || "#333333",
        }}
      >
        {/* Profile Image */}
        {userProfile.profileImage && (
          <div className="relative group mx-auto mb-6">
            <img
              src={userProfile.profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full mb-4 border-[3px] border-white shadow-lg object-cover mx-auto transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary opacity-0 group-hover:opacity-100 transition-all"></div>
          </div>
        )}

        {/* Title */}
        <h2 className={`font-bold text-2xl text-center mb-2 ${template.titlePlacement === "top" ? "order-first" : ""}`}>
          {userProfile.title || "No title provided"}
        </h2>

        {/* Bio */}
        <p className={`text-sm text-center mb-6 px-4 leading-relaxed ${template.bioPlacement === "top" ? "order-first mb-4" : ""}`}>
          {userProfile.bio || "No bio provided."}
        </p>

        {/* Social Icons */}
        <div className="flex space-x-5 text-xl mb-8 justify-center">
          <a href="#" className="p-2 rounded-full bg-opacity-70 hover:bg-opacity-100 shadow-sm transition-all hover:-translate-y-0.5">
            <FaInstagram className="hover:text-[#E1306C]" />
          </a>
          <a href="#" className="p-2 rounded-full bg-opacity-70 hover:bg-opacity-100 shadow-sm transition-all hover:-translate-y-0.5">
            <FaFacebookF className="hover:text-[#3b5998]" />
          </a>
          <a href="#" className="p-2 rounded-full bg-opacity-70 hover:bg-opacity-100 shadow-sm transition-all hover:-translate-y-0.5">
            <FaTwitter className="hover:text-[#1DA1F2]" />
          </a>
          <a href="#" className="p-2 rounded-full bg-opacity-70 hover:bg-opacity-100 shadow-sm transition-all hover:-translate-y-0.5">
            <FaLinkedin className="hover:text-[#0077b5]" />
          </a>
        </div>

        {/* Links */}
        {links.length > 0 && (
          <div className="flex flex-col gap-4 w-full mt-auto">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  ${getButtonStyle(template.buttonStyle)} 
                  text-white font-medium text-center 
                  transition-all hover:shadow-md hover:transform hover:-translate-y-0.5
                  active:scale-95
                `}
              >
                {link.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;