import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TemplateComponent from '../../../components/TemplateComponent';
import OnboardingLayout from '../../../components/user/onboarding/OnboardingLayout';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../stores/userStore';
import toast from 'react-hot-toast';

export default function TemplatePage() {
  const [template, setTemplate] = useState('');
  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();
  const { setUserProfile } = useUserStore();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await api.get('/api/v1/subscription/status');
        setPlan(res.data.data.planName.toLowerCase());
      } catch (err) {
        console.error('Failed to fetch plan:', err);
        toast.error('Could not load your subscription plan');
      }
    };
    fetchPlan();
  }, []);

  const handleContinue = async () => {
    if (!template) return;

    try {
      await api.post(`/api/v1/template/${template}/select`);
      navigate('/onboarding/links');
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Template selection failed');
    }
  };

  return (
    <OnboardingLayout
      title="Choose Your Template"
      currentStep={5}
      totalSteps={7}
      showContinue={true}
      canProceed={!!template}
      onContinue={handleContinue}
      maxWidth="max-w-7xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        {plan && (
          <TemplateComponent
            template={template}
            setTemplate={setTemplate}
            setUserProfile={setUserProfile}
            currentPlan={plan}
          />
        )}
      </motion.div>
    </OnboardingLayout>
  );
}