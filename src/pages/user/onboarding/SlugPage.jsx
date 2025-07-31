import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OnboardingLayout from '../../../components/user/onboarding/OnboardingLayout';
import Slug from '../../../components/Slug';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../stores/userStore';

export default function SlugPage() {
  const [slug, setSlug] = useState("");
  const [slugAvailable, setSlugAvailable] = useState(false);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [saving, setSaving] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { setUserProfile } = useUserStore();
  const navigate = useNavigate();

  const checkSlugAvailability = async (slug) => {
    if (!slug) {
      setSlugAvailable(false);
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
      if (slug) {
        checkSlugAvailability(slug);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  const handleContinue = async () => {
    if (!slugAvailable || checkingSlug || saving || isNavigating) return;

    setSaving(true);
    try {
      const res = await api.post("/api/v1/user/slug", { slug });
      setIsNavigating(true); 
      setUserProfile({ slug }); 
      setTimeout(() => {
        navigate("/onboarding/goal");
      }, 1500);
    } catch (err) {
      setSlugError("Failed to save username. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <OnboardingLayout
      title="Choose Your weblinqo URL"
      currentStep={1}
      totalSteps={7}
      canProceed={slugAvailable && !checkingSlug && !isNavigating}
      onContinue={handleContinue}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Slug 
          slug={slug}
          setSlug={setSlug}
          slugAvailable={slugAvailable}
          checkingSlug={checkingSlug}
          slugError={slugError}
          saving={saving}
          isNavigating={isNavigating}
        />
      </motion.div>
    </OnboardingLayout>
  );
}