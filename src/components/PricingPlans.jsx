// PricingPlans.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../services/api";

const featureDisplayMap = {
  publicProfile: "Public Profile",
  profileImage: "Profile Image",
  customSlug: "Custom URL",
  lightDarkMode: "Dark Mode",
  bioSocialLinks: "Bio + Social Links",
  maxLinks: "Max Links",
  linkReordering: "Link Reordering",
  clickTracking: "Click Analytics",
  linkScheduling: "Link Scheduling",
  basicAnalytics: "Basic Analytics",
  advancedAnalytics: "Advanced Analytics",
  customDomain: "Custom Domain",
  removeBranding: "Remove Branding",
  prioritySupport: "Priority Support"
};

const PricingPlans = ({ planId, setPlanId, isProcessing }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/v1/subscription/plans");
        setPlans(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load plans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#c4ff4d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-[#c62828] mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#f8faf3] text-[#2a5a00] rounded-xl hover:bg-[#e8f5d0]"
        >
          Try Again
        </button>
      </div>
    );
  }

  const sortedPlans = [...plans].sort((a, b) => a.price - b.price);

  return (
    <div className="py-6 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Simple, Transparent Pricing</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the plan that fits your needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sortedPlans.map((plan) => {
          const isPopular = plan.name.toLowerCase() === "pro";
          const isSelected = planId === plan.name;
          const featureKeys = Object.keys(plan.features || {});

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl overflow-hidden border-2 ${
                isSelected 
                  ? "border-[#c4ff4d] shadow-lg" 
                  : "border-gray-200 hover:border-[#c4ff4d]/50"
              } ${isPopular ? "bg-[#f8faf3]" : "bg-white"}`}
            >
              {isPopular && (
                <div className="absolute top-0 right-0 bg-[#c4ff4d] text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}

              <div 
                className="p-8 cursor-pointer"
                onClick={() => !isProcessing && setPlanId(plan.name)}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 capitalize mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 ml-1 mb-1">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {featureKeys.map((featureKey) => {
                    const featureValue = plan.features[featureKey];
                    const displayName = featureDisplayMap[featureKey] || featureKey;
                    
                    return (
                      <li key={featureKey} className="flex items-start">
                        {featureValue === true || (featureKey === 'maxLinks' && featureValue !== '0') ? (
                          <FaCheckCircle className="text-[#99eb02] mt-0.5 mr-2 flex-shrink-0" />
                        ) : (
                          <FaTimesCircle className="text-[#c62828]/70 mt-0.5 mr-2 flex-shrink-0" />
                        )}
                        <span className={`text-gray-700 ${!featureValue && "opacity-70"}`}>
                          {displayName}
                          {featureKey === 'maxLinks' && featureValue !== '0' && featureValue !== true && (
                            ` (${featureValue})`
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    isSelected
                      ? "bg-[#c4ff4d] text-gray-900"
                      : isPopular
                      ? "bg-[#c4ff4d] text-gray-900 hover:bg-[#b8f542]"
                      : "border-2 border-[#c4ff4d] text-gray-900 hover:bg-[#f8faf3]"
                  } ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSelected ? "Selected" : plan.name === "Free" ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPlans;