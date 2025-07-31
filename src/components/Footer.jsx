import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Examples', 'Integrations'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Guides', 'Help Center', 'API Docs'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About', 'Careers', 'Contact', 'Press'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'Security', 'GDPR'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-indigo-600 text-2xl font-bold flex items-center">
              <span className="bg-indigo-600 text-white px-2 py-1 rounded">weblinqo</span>
            </Link>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LinkHub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;