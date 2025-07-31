import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SignupForm from "../../../components/SignupForm";

const baseUrl = "https://api.weblinqo.com";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const showSuccess = (message, duration = 3000) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), duration);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isNavigating) return;
    setError(null);
    setIsLoading(true);
    try {
      await axios.post(`${baseUrl}/api/v1/auth/signup`, {
        email: formData.email,
        password: formData.password,
      });
      showSuccess("Account created! Check your email for OTP");
      setIsNavigating(true);
      setTimeout(() => {
        navigate("/verify", { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      
      <div className="min-h-screen bg-[#f5f3f0]">
        {/* Header */}
        <div className="w-full px-6 py-6">
          <header className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
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
              <Link 
                className="text-gray-700 hover:text-gray-900 font-medium text-base transition-colors duration-200"
                to="/login">
                Login
              </Link>
            </div>
          </header>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-600">Start building your personal link hub today</p>
            </div>

{/* Message Container */}
<div className="mb-6 space-y-3">
  {/* Success Message - Updated to match weblinqo theme */}
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
  {/* Error Message - Updated to match weblinqo theme */}
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

            {/* Signup Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <SignupForm
                formData={formData}
                setFormData={setFormData}
                showPassword={showPassword}
                togglePassword={togglePassword}
                isLoading={isLoading}
                isNavigating={isNavigating} 
                handleSignup={handleSignup}
              />
              <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-black hover:underline font-medium transition-colors duration-150"
                >
                  Sign in
                </Link>
              </div>

            </div>

            <div className="mt-8 text-center text-xs text-gray-400">
              By signing up, you agree to our <Link to="/terms" className="text-gray-600 hover:underline">Terms</Link> and <Link to="/privacy" className="text-gray-600 hover:underline">Privacy Policy</Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-12 max-w-7xl mx-auto bg-white rounded-t-3xl mt-12">
          <div className="flex flex-col items-center gap-6">
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

            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-[#c4ff4d] transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-[#c4ff4d] transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-[#c4ff4d] transition-colors">Contact</a>
            </div>

            <p className="text-gray-500 text-sm mt-4">weblinqo © 2025. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SignupPage;