import React, { useRef, useState } from 'react';
import { FiUpload, FiEdit2, FiTrash2, FiUser, FiX, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProfileDetails = ({ profile, setProfile, onUploadImage }) => {
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [uploadStatus, setUploadStatus] = useState(null);

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    if (field === 'profileImage') {
      if (!value || value.trim() === '') {
        newErrors.profileImage = 'Profile image is required';
      } else {
        delete newErrors.profileImage;
      }
    } else if (field === 'title') {
      if (!value || value.trim() === '') {
        newErrors.title = 'Profile title is required';
      } else if (value.length > 60) {
        newErrors.title = 'Title must be 60 characters or less';
      } else {
        delete newErrors.title;
      }
    } else if (field === 'bio') {
      // Bio is now optional, only validate length if there is content
      if (value && value.length > 250) {
        newErrors.bio = 'Bio must be 250 characters or less';
      } else {
        delete newErrors.bio;
      }
    }

    setErrors(newErrors);
    return !newErrors[field]; // Returns true if valid
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus(null);
    setErrors(prev => ({ ...prev, profileImage: null }));

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, profileImage: 'Please select an image file (JPEG, PNG, etc.)' }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, profileImage: 'Image size should be less than 2MB' }));
      return;
    }

    try {
      setUploadStatus('uploading');
      const imageUrl = await onUploadImage(file);
      setProfile('profileImage', imageUrl);
      setUploadStatus('success');
      validateField('profileImage', imageUrl);
      setTimeout(() => setUploadStatus(null), 2000);
    } catch (error) {
      setUploadStatus('error');
      setErrors(prev => ({ ...prev, profileImage: 'Image upload failed. Please try again.' }));
      console.error(error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setProfile('profileImage', '');
    validateField('profileImage', '');
  };

  const handleFieldChange = (field, value) => {
    setProfile(field, value);
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleFieldBlur = (field, value) => {
    validateField(field, value);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
        <p className="text-gray-500 mt-1">Complete your profile information</p>
      </div>

      {/* Profile Image Upload */}
      <div className="flex flex-col items-center">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative group"
        >
          <div 
            onClick={triggerFileInput}
            className={`relative w-32 h-32 rounded-full bg-gray-100 border-4 ${
              errors.profileImage ? 'border-red-500' : 'border-white'
            } shadow-md overflow-hidden cursor-pointer transition-all duration-200`}
          >
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <FiUser className="w-12 h-12" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200">
              {uploadStatus === 'uploading' ? (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              ) : uploadStatus === 'success' ? (
                <FiCheck className="text-green-400 w-6 h-6" />
              ) : uploadStatus === 'error' ? (
                <FiX className="text-red-400 w-6 h-6" />
              ) : (
                <FiEdit2 className="text-white w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          </div>
          
          {profile.profileImage && (
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-md text-red-500 hover:text-red-700 transition-colors"
              aria-label="Remove profile image"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            aria-label="Profile image upload"
          />
        </motion.div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={triggerFileInput}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
          >
            {profile.profileImage ? (
              <>
                <FiEdit2 className="mr-2" /> Change Photo
              </>
            ) : (
              <>
                <FiUpload className="mr-2" /> Upload Photo
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Recommended: Square image, 500x500px, max 2MB</p>
        
        {errors.profileImage && (
          <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1.5 rounded-md flex items-center">
            <FiX className="mr-1.5" /> {errors.profileImage}
          </div>
        )}
      </div>

      {/* Profile Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <span className="bg-indigo-100 text-indigo-800 w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs">1</span>
            Profile Title *
          </label>
          <input
            type="text"
            value={profile.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            onBlur={(e) => handleFieldBlur('title', e.target.value)}
            className={`w-full px-4 py-3 border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
            placeholder="e.g. Digital Creator | Photographer"
            maxLength={60}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          <div className="flex justify-between mt-1">
            <div>
              {errors.title ? (
                <p id="title-error" className="text-xs text-red-600 flex items-center">
                  <FiX className="mr-1" /> {errors.title}
                </p>
              ) : (
                <p className="text-xs text-gray-500">This will be displayed on your profile</p>
              )}
            </div>
            <p className={`text-xs ${
              (profile.title || '').length === 60 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {(profile.title || '').length}/60
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <span className="bg-indigo-100 text-indigo-800 w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs">2</span>
            Bio
          </label>
          <textarea
            value={profile.bio || ''}
            onChange={(e) => handleFieldChange('bio', e.target.value)}
            onBlur={(e) => handleFieldBlur('bio', e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 border ${
              errors.bio ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
            placeholder="Tell people about yourself, your work, and your interests... (optional)"
            maxLength={250}
            aria-invalid={!!errors.bio}
            aria-describedby={errors.bio ? "bio-error" : undefined}
          />
          <div className="flex justify-between mt-1">
            <div>
              {errors.bio && (
                <p id="bio-error" className="text-xs text-red-600 flex items-center">
                  <FiX className="mr-1" /> {errors.bio}
                </p>
              )}
            </div>
            <p className={`text-xs ${
              (profile.bio || '').length === 250 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {(profile.bio || '').length}/250
            </p>
          </div>
        </div>
      </div>

      {/* Form status */}
      {Object.keys(errors).length > 0 && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="text-red-800 font-medium flex items-center">
            <FiX className="mr-2" /> Please complete all required fields
          </h3>
          <ul className="mt-2 ml-5 list-disc text-sm text-red-700">
            {errors.profileImage && <li>{errors.profileImage}</li>}
            {errors.title && <li>{errors.title}</li>}
            {errors.bio && <li>{errors.bio}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;