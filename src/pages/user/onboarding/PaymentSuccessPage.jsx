import OnboardingLayout from '../../../components/user/onboarding/OnboardingLayout';
import SuccessMessage from '../../../components/SuccessMessage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../../services/api';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

 useEffect(() => {
    const verifySubscription = async () => {
      try {
        const { data } = await api.get('/api/v1/subscription/status');

        const isActive = data?.data?.status === 'ACTIVE';
        if (isActive) {
          setTimeout(() => {
            navigate('/onboarding/template');
          }, 5000);
        } else {
          navigate('/onboarding/pricing'); 
        }
      } catch (err) {
        console.error('Subscription verification failed:', err);
        navigate('/onboarding/pricing');
      }
    };

    verifySubscription();
  }, [navigate]);

  return (
    <OnboardingLayout
      title="Payment Successful"
      showContinue={false}
    >
      <SuccessMessage
        title="Payment Successful!"
        description="Thank you for your subscription. Your payment has been processed successfully."
        footnote="You'll be redirected to the next step in 5 seconds..."
      />
    </OnboardingLayout>
  );
}