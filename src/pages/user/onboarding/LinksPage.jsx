import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AddLinks from '../../../components/AddLinks';
import OnboardingLayout from '../../../components/user/onboarding/OnboardingLayout';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../stores/userStore';
import toast from 'react-hot-toast';

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const [features, setFeatures] = useState(null);
  const navigate = useNavigate();
  const { setUserProfile } = useUserStore();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await api.get('/api/v1/subscription/features');
        setFeatures(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch plan features");
      }
    };
    fetchFeatures();
  }, []);

  const handleContinue = async () => {
    try {
      await api.post('/api/v1/link/', links);
      navigate('/onboarding/profile');
    } catch (error) {
      console.error("Error saving links:", error);
      toast.error("Failed to save links");
    }
  };

  return (
    <OnboardingLayout
      title="Add Links"
      currentStep={6}
      totalSteps={7}
      onContinue={handleContinue}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <AddLinks 
          links={links} 
          setLinks={setLinks} 
          setUserProfile={setUserProfile}
          features={features}
        />
      </motion.div>
    </OnboardingLayout>
  );
}
