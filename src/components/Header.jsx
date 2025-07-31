import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-indigo-600 text-2xl font-bold flex items-center">
          <span className="bg-indigo-600 text-white px-2 py-1 rounded">weblinqo</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Pricing
          </Link>
          <Link to="/templates" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Templates
          </Link>
          <Link 
            to="/signup" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden mt-4 space-y-3 pb-4">
          <Link 
            to="/features" 
            onClick={() => setOpen(false)}
            className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Features
          </Link>
          <Link 
            to="/pricing" 
            onClick={() => setOpen(false)}
            className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Pricing
          </Link>
          <Link 
            to="/examples" 
            onClick={() => setOpen(false)}
            className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Examples
          </Link>
          <Link 
            to="/signup" 
            onClick={() => setOpen(false)}
            className="block bg-indigo-600 text-white py-2 px-4 rounded-lg text-center mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;