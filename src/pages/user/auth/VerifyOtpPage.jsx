import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import OtpForm from "../../../components/OtpForm";
import useUserStore from "../../../stores/userStore";

const baseUrl = "https://api.weblinqo.com";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const resendIntervalId = useRef(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const { setAccessToken, setRefreshToken, setIsAuthenticated } = useUserStore();

  const email = location.state?.email || "";

  useEffect(() => {
    return () => {
      if (resendIntervalId.current) clearInterval(resendIntervalId.current);
    };
  }, []);

  const startResendTimer = () => {
    setResendDisabled(true);
    let timer = 30;
    setResendTimer(timer);
    if (resendIntervalId.current) clearInterval(resendIntervalId.current);
    resendIntervalId.current = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(resendIntervalId.current);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const showSuccess = (message, duration = 3000) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), duration);
  };

  const handleResendOtp = async () => {
    if (!email) return;
    
    setError(null);
    setIsLoading(true);
    try {
      await axios.post(`${baseUrl}/api/v1/auth/resend`, {
        email: email,
        purpose: "SIGNUP_EMAIL_VERIFICATION"
      });
      showSuccess("New verification code sent to your email");
      startResendTimer();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setError(null);
    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/v1/auth/verify`, {
        email: email,
        otp: otp
      });
      
      setAccessToken(res.data.data.accessToken);
      setRefreshToken(res.data.data.refreshToken);
      setIsAuthenticated(true);

      showSuccess("Email verified! Redirecting...");
      setIsNavigating(true);
      setTimeout(() => navigate("/onboarding/slug"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startResendTimer();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
{/* Brand Header */}
<div className="text-center mb-10">
  <div className="flex justify-center items-center gap-3 mb-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:opacity-90 transition-opacity"
        >
          <span 
            className="text-black p-2 rounded-lg"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
                <img
                  src="/weblinqo.svg"
                  alt="weblinqo Logo"
                  className="w-12 h-12"
                />
          </span>
          <span className="font-extrabold text-black">weblinqo</span>
        </Link>
  </div>
  <div className="space-y-2">
    <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
    <p className="text-gray-600 text-lg">
      We sent a 6-digit code to <span className="font-medium text-gray-800">{email}</span>
    </p>
  </div>
</div>

        {/* Message Container */}
        <div className="mb-6 space-y-3">
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-[#e8f5d0] border border-[#c4ff4d] text-[#2a5a00] rounded-lg flex items-start text-sm">
                  <svg
                    className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{success}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-[#ffebee] border border-[#ff6b6b] text-[#c62828] rounded-lg flex items-start text-sm">
                  <svg
                    className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* OTP Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            isLoading={isLoading || isNavigating}
            handleOtpSubmit={handleOtpSubmit}
            handleResendOtp={handleResendOtp}
            resendDisabled={resendDisabled}
            resendTimer={resendTimer}
            onBack={() => navigate("/signup")}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtpPage;