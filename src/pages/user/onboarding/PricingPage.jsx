// PricingPage.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import PricingPlans from '../../../components/PricingPlans';
import OnboardingLayout from '../../../components/user/onboarding/OnboardingLayout';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

export default function PricingPage() {
  const [planId, setPlanId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!planId) return;
    
    setIsProcessing(true);
    try {
      const response = await api.post('/api/v1/subscription/select', { planId });
      const checkoutUrl = response.data.data.checkoutUrl;
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        navigate('/onboarding/template');
      }
    } catch (error) {
      console.error("Error saving selected plan:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <OnboardingLayout
      title="Choose Your Plan"
      currentStep={4}
      totalSteps={7}
      showContinue={true}
      canProceed={!!planId && !isProcessing}
      onContinue={handleContinue}
      maxWidth="max-w-7xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <PricingPlans 
          planId={planId} 
          setPlanId={setPlanId}
          isProcessing={isProcessing}
        />
      </motion.div>
    </OnboardingLayout>
  );
}
