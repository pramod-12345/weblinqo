import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";

const SignupForm = ({
  formData,
  setFormData,
  showPassword,
  togglePassword,
  isLoading,
  isNavigating,
  handleSignup
}) => (
  <form className="space-y-6" onSubmit={handleSignup}>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="your@email.com"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c4ff4d] focus:border-[#c4ff4d] transition bg-gray-50"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
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
  onChange={e => setFormData({ ...formData, password: e.target.value })}
  required
/>

        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
        </button>
      </div>
    </div>
    <button
      type="submit"
      className={`w-full py-3.5 px-4 rounded-xl font-semibold flex justify-center items-center transition-all duration-200
        ${
          isLoading || isNavigating
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#c4ff4d] text-black hover:bg-[#b8f542] hover:scale-[1.02] active:scale-95 shadow-md"
        }
      `}
      disabled={isLoading || isNavigating}
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
          />
          <span>Creating account...</span>
        </>
      ) : (
        "Create account"
      )}
    </button>
  </form>
);

export default SignupForm;