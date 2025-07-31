import OnboardingLayout from '../../../components/user/onboarding/OnboardingLayout';
import CancelMessage from '../../../components/CancelMessage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function PaymentCancelPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding/pricing');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <OnboardingLayout title="Payment Cancelled" showContinue={false}>
      <CancelMessage
        autoDismiss={false}
        footnote="You'll be redirected back to pricing in 5 seconds to try again."
      />
    </OnboardingLayout>
  );
}
