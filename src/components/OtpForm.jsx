import React from "react";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft } from "react-icons/ai";

const OtpForm = ({
  otp,
  setOtp,
  isLoading,
  handleOtpSubmit,
  handleResendOtp,
  resendDisabled,
  resendTimer,
  onBack
}) => (
  <div className="space-y-5">
    <form onSubmit={handleOtpSubmit} className="space-y-4">
      <div>
        <label htmlFor="otp" className="sr-only">Verification code</label>
        <input
          id="otp"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="• • • • • •"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c4ff4d] focus:border-[#c4ff4d] transition bg-gray-50 text-center tracking-[0.5em] text-lg"
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setOtp(value.slice(0, 6));
          }}
          required
          maxLength={6}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3.5 px-4 rounded-xl font-semibold flex justify-center items-center transition-all duration-200 h-12 ${
          isLoading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#c4ff4d] text-black hover:bg-[#b8f542] hover:scale-[1.02] active:scale-95 shadow-md"
        }`}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
            />
            <span>Verifying...</span>
          </>
        ) : (
          "Verify & Continue"
        )}
      </button>
    </form>

    <div className="text-center text-sm text-gray-500">
      Didn't receive a code?{" "}
      <button
        onClick={handleResendOtp}
        disabled={resendDisabled || isLoading}
        className={`font-medium ${
          resendDisabled || isLoading
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-black hover:underline'
        }`}
      >
        {resendDisabled ? `Resend in ${resendTimer}s` : "Resend code"}
      </button>
    </div>

    <button 
      onClick={onBack} 
      className="flex items-center justify-center w-full text-gray-500 hover:text-gray-700 mt-4 text-sm font-medium"
    >
      <AiOutlineArrowLeft className="mr-1.5" />
      Back to sign up
    </button>
  </div>
);

export default OtpForm;