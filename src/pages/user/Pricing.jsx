import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaDollarSign, FaSpinner, FaCrown, FaStar } from "react-icons/fa";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import api from "../../services/api";
import useUserStore from '../../stores/userStore';
import { useNavigate } from "react-router-dom";

const featuresList = [
  "publicProfile",
  "profileImage",
  "customSlug",
  "lightDarkMode",
  "bioSocialLinks",
  "maxLinks",
  "linkReordering",
  "clickTracking",
  "linkScheduling",
  "basicAnalytics",
];

const featureDisplayNames = {
  publicProfile: "Public Profile",
  profileImage: "Profile Image",
  customSlug: "Custom Slug",
  lightDarkMode: "Light/Dark Mode",
  bioSocialLinks: "Title + Bio + Social Links",
  maxLinks: "Max Links",
  linkReordering: "Link Reordering (Drag & Drop)",
  clickTracking: "Link Click Tracking (Counts)",
  linkScheduling: "Link Scheduling (Start/End Time)",
  basicAnalytics: "Basic Analytics",
};

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const setSelectedPlanId = useUserStore.getState().setSelectedPlanId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get("/api/v1/subscription/plans");
        setPlans(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load subscription plans. Please try again later.");
        setLoading(false);
        console.error("Error fetching plans:", err);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Sort plans by price (ascending)
  const sortedPlans = [...plans].sort((a, b) => a.price - b.price);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Choose Your Perfect Plan
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Start with a free plan and upgrade anytime to unlock more features
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {sortedPlans.map((plan, index) => (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-xl shadow-lg p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl min-h-[650px] ${
                  index === 1 
                    ? "bg-gradient-to-b from-indigo-50 to-white border-2 border-indigo-500 transform md:scale-105 z-10" 
                    : "bg-white border border-gray-200"
                }`}
              >
                {index === 1 && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold flex items-center">
                    <FaStar className="mr-1" /> Most Popular
                  </div>
                )}
                
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price > 0 ? (
                        <>
                          <span className="text-2xl text-gray-500">{plan.currency}</span>
                          {plan.price.toFixed(2)}
                          <span className="text-xl text-gray-500">/mo</span>
                        </>
                      ) : (
                        <span className="text-3xl">Free</span>
                      )}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6 capitalize flex items-center">
                    {plan.name.toLowerCase()}
                    {index === 1 && <FaCrown className="ml-2 text-yellow-500" />}
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900">Key Features</h4>
                    <ul className="space-y-3">
                      {featuresList.map((featureKey) => {
                        const featureValue = plan.features[featureKey];
                        return (
                          <li key={featureKey} className="flex items-start">
                            {featureValue === true || (featureKey === 'maxLinks' && featureValue !== '0') ? (
                              <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                            ) : (
                              <FaTimesCircle className="text-gray-300 mr-2 mt-1 flex-shrink-0" />
                            )}
                            <span className={`${featureValue ? 'text-gray-800' : 'text-gray-400'}`}>
                              {featureDisplayNames[featureKey]}
                              {featureKey === 'maxLinks' && featureValue !== '0' && featureValue !== true && (
                                ` (${featureValue})`
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSelectedPlanId(plan.name);
                      navigate("/signup");
                    }}
                    className={`mt-4 py-4 rounded-lg text-lg font-semibold transition-all w-full flex items-center justify-center ${
                      index === 1
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                        : hoveredPlan === plan.id
                          ? "bg-indigo-600 text-white"
                          : "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    {plan.name === "Free" ? "Get Started for Free" : `Select ${plan.name.charAt(0).toUpperCase() + plan.name.slice(1)} Plan`}
                    {hoveredPlan === plan.id && (
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </button>
                  
                  {plan.price > 0 && (
                    <p className="mt-3 text-center text-sm text-gray-500">
                      No long-term contracts. Cancel anytime.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
              >
                Need help choosing a plan?
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;