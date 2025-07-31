  import { useState, useRef } from 'react';
  import { motion } from 'framer-motion';
  import ProfileDetails from '../../../components/ProfileDetails';
  import OnboardingLayout from '../../../components/user/onboarding/OnboardingLayout';
  import api from '../../../services/api';
  import { useNavigate } from 'react-router-dom';
  import useUserStore from '../../../stores/userStore';
  import { FiAlertCircle } from 'react-icons/fi';

  export default function ProfilePage() {
    const [profile, setProfileState] = useState({
      profileImage: "",
      title: "",
      bio: ""
    });
    const [validationErrors, setValidationErrors] = useState({});
    const profileDetailsRef = useRef();

    const { setUserProfile } = useUserStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    const setProfile = (field, value) => {
      setProfileState(prev => ({ ...prev, [field]: value }));
      // Clear validation error when user starts typing
      if (validationErrors[field]) {
        setValidationErrors(prev => ({ ...prev, [field]: null }));
      }
    };

    const validateForm = () => {
      const errors = {};
      
      if (!profile.profileImage.trim()) {
        errors.profileImage = "Profile image is required";
      }
      
      if (!profile.title.trim()) {
        errors.title = "Title is required";
      }
      
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const onUploadImage = async (file) => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/api/v1/user/profile-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const imageUrl = response.data?.data?.profileImageUrl;
        setProfile('profileImage', imageUrl);
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        setSubmitError("Failed to upload image. Please try again.");
        throw error;
      }
    };

    const handleContinue = async () => {
      // First validate the form
      const isValid = validateForm();
      if (!isValid) {
        // Scroll to the first error if off-screen
        if (profileDetailsRef.current) {
          profileDetailsRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await api.post('/api/v1/user/profile', {
          profileImage: profile.profileImage,
          title: profile.title,
          bio: profile.bio,
        });

        const response = await api.get('/api/v1/user/profile');
        
        // Update profile in global store
        setUserProfile({
          ...response.data?.data
        });

        navigate('/dashboard');
      } catch (error) {
        console.error("Error saving profile:", error);
        setSubmitError(error?.response?.data?.message || error.message || "Failed to save profile.");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <OnboardingLayout
        title="Profile Details"
        currentStep={7}
        totalSteps={7}
        onContinue={handleContinue}
        isSubmitting={isSubmitting}
        error={submitError}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
          ref={profileDetailsRef}
        >
          {Object.keys(validationErrors).length > 0 && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="text-red-800 font-medium flex items-center">
                <FiAlertCircle className="mr-2" /> Please fix the following errors
              </h3>
              <ul className="mt-2 ml-5 list-disc text-sm text-red-700">
                {validationErrors.profileImage && <li>{validationErrors.profileImage}</li>}
                {validationErrors.title && <li>{validationErrors.title}</li>}
                {validationErrors.bio && <li>{validationErrors.bio}</li>}
              </ul>
            </div>
          )}

          <ProfileDetails 
            profile={profile} 
            setProfile={setProfile} 
            onUploadImage={onUploadImage} 
            errors={validationErrors}
          />
        </motion.div>
      </OnboardingLayout>
    );
  }