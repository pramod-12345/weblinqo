// Contact.js
import React from "react";
import { Link } from 'react-router-dom';

const Contact = () => {
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
          <h1 className="text-4xl font-black text-gray-900 mb-6">Contact Us</h1>
          <p className="mb-8 text-gray-600">
            We'd love to hear from you! Whether you have a question, suggestion, or just want to say hi — reach out to us.
          </p>
          
          <div className="space-y-4 mb-8">
            <p className="flex items-center gap-3 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span><span className="font-semibold text-gray-900">Email:</span> support@weblinqo.com</span>
            </p>
          </div>
          
          <form className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#c4ff4d] text-gray-700"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#c4ff4d] text-gray-700"
              />
            </div>
            <div>
              <textarea
                rows="5"
                placeholder="Your message"
                className="w-full border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#c4ff4d] text-gray-700"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#c4ff4d] hover:bg-[#b8f542] text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
            >
              Send Message
            </button>
          </form>
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

export default Contact;