import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from '../../../stores/userStore';

const baseUrl = "https://api.weblinqo.com";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const showSuccess = (message, duration = 3000) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), duration);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    
    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/auth/login`,
        {
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const { accessToken, refreshToken, profile } = res.data.data;

      useUserStore.getState().setAccessToken(accessToken);
      useUserStore.getState().setRefreshToken(refreshToken);
      useUserStore.getState().setUserProfile(profile);
      useUserStore.getState().setIsAuthenticated(true);

      showSuccess("Login successful! Redirecting...");

      const onboardingRes = await axios.get(`${baseUrl}/api/v1/user/onboarding-screen`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      const nextScreen = onboardingRes.data.data.nextScreen;

      switch (nextScreen) {
        case "EMAIL_VERIFICATION":
          navigate("/verify",  { state: { email: formData.email } });
          break;
        case "SLUG_SELECTION":
          navigate("/onboarding/slug");
          break;
        case "GOAL_SELECTION":
          navigate("/onboarding/goal");
          break;
        case "CATEGORY_SELECTION":
          navigate("/onboarding/category");
          break;
        case "PLAN_SELECTION":
          navigate("/onboarding/pricing");
          break;
        case "PAYMENT":
          try {
            const checkoutRes = await axios.get(`${baseUrl}/api/v1/subscription/checkout-url`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            const checkoutUrl = checkoutRes.data.data.checkoutUrl;
            window.location.href = checkoutUrl;
          } catch (err) {
            setError("Unable to redirect to payment. Please try again.");
          }
          break;
        case "TEMPLATE_SELECTION":
          navigate("/onboarding/template");
          break;
        case "LINKS_SETUP":
          navigate("/onboarding/links");
          break;
        case "PROFILE_DETAILS":
          navigate("/onboarding/profile");
          break;
        case "COMPLETED":
        default:
          navigate("/dashboard");
          break;
      }

    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else if (err.response.status === 400) {
          setError("Please provide both email and password.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
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
                to="/signup">
                Sign up
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
              <p className="text-gray-600">Login to your weblinqo account</p>
            </div>

            {/* Message Container */}
            <div className="mb-6 space-y-3">
              {/* Success Message */}
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
              {/* Error Message */}
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

            {/* Login Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c4ff4d] focus:border-[#c4ff4d] transition bg-gray-50"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c4ff4d] focus:border-[#c4ff4d] transition bg-gray-50 pr-12 placeholder-gray-400 ${
                        showPassword ? "font-pier" : "font-sans"
                      }`}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />

                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-black hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold flex justify-center items-center transition-all duration-200 h-12 ${
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#c4ff4d] text-black hover:bg-[#b8f542] hover:scale-[1.02] active:scale-95 shadow-md"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
                      />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-black hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-400">
              By logging in, you agree to our <Link to="/terms" className="text-gray-600 hover:underline">Terms</Link> and <Link to="/privacy" className="text-gray-600 hover:underline">Privacy Policy</Link>
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

export default Login;