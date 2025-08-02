import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Templates from "./Templates";
import PricingPlans from "./Pricing";
import SmartLinkSection from "./SmartLink";
import Footer from "./Footer";
import Faq from "./Faqs";
import TrafficAnalyticsSection from "./TrafficAnalytics";
import Customize from "./Customize";
import api from "../../../services/api";
import Navbar from "../../../components/shared/navbar";


const WebLinqoLanding = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get('/api/v1/template/');
        setTemplates(response.data.data);
        // Force a scroll check after templates are loaded
        // setTimeout(handleScroll, 100);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="min-h-screen bg-offWhite ">
      {/* Header */}
      <Navbar />
      {/* blue strip */}
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="space-y-6 bg-gradient-to-r from-primary to-purple-500 py-3 px-6 rounded-b-lg">
          <p className="text-size-14 text-white font-normal tracking-wide text-center leading-normal">
            Time to convert clicks into customers. Weblingo new growth tools are here!
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <Hero />

      {/* customize */}
      <Customize />

      {/* Feature */}
      <Features />

      <Templates/>

      {/* Traffic Analytics */}
      <TrafficAnalyticsSection />

      {/* FAQs */}
      <Faq />

      {/* Pricing */}
      <PricingPlans />

      {/* Smart link */}
      <SmartLinkSection />

      {/* Footer */}
      <Footer />

      {/* Copyright */}
      <div className="w-full flex justify-center">
        <div className="space-y-6 bg-primary py-3 px-6 w-full">
          <p className="text-size-14 text-white text-center font-medium leading-normal">
            weblinqo © 2025. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
export default WebLinqoLanding;