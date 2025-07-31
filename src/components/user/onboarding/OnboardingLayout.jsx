import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OnboardingLayout({
  children,
  title,
  currentStep,
  totalSteps,
  showContinue = true,
  canProceed = true,
  onContinue,
  maxWidth = "max-w-md"
}) {
  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans flex items-center justify-center px-4 py-8">
      <div className={`w-full mx-auto ${maxWidth}`}>
        {/* Brand Header */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <img 
            src="/weblinqo.svg" 
            alt="weblinqo Logo" 
            className="w-12 h-12"
          />
          <span className="text-2xl font-bold text-gray-900">weblinqo</span>
        </div>

        {/* Progress Bar */}
        {currentStep && totalSteps && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                className="bg-[#c4ff4d] h-2 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
        )}

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          {title && <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">{title}</h2>}
          {children}
        </motion.div>

        {/* Continue Button */}
        {showContinue && (
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={onContinue}
              disabled={!canProceed}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 ${
                canProceed
                  ? 'bg-[#c4ff4d] text-black hover:bg-[#b8f542] hover:scale-[1.02] active:scale-95 shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}