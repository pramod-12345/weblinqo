// Terms.js
import React from "react";
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
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
              to="/signup"
              className="bg-[#c4ff4d] hover:bg-[#b8f542] text-black font-semibold text-base px-6 py-2.5 rounded-full border-0 shadow-none transition-all duration-200 hover:scale-105"
            >
              Sign up
            </Link>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <h1 className="text-4xl font-black text-gray-900 mb-6">Terms of Service</h1>
          <p className="mb-6 text-gray-600">
            Welcome to weblinqo! By using our service, you agree to the following terms. Please read them carefully.
          </p>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Usage</h2>
              <p className="text-gray-600">
                You agree not to misuse our services or help anyone else to do so.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Content</h2>
              <p className="text-gray-600">
                You are responsible for the content you upload and share. Do not upload content that is illegal, harmful, or violates intellectual property rights.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Termination</h2>
              <p className="text-gray-600">
                We may suspend or terminate your account if you violate our terms.
              </p>
            </div>
          </div>
          
          <p className="mt-12 text-sm text-gray-500">Last updated: July 13, 2025</p>
        </div>
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
            <Link to="/terms" className="text-gray-600 hover:text-[#c4ff4d] transition-colors">Terms</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-[#c4ff4d] transition-colors">Privacy</Link>
            <Link to="/contact" className="text-gray-600 hover:text-[#c4ff4d] transition-colors">Contact</Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">weblinqo © 2025. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Terms;