import React, { useState } from "react";
import { FiShare2, FiChevronDown } from "react-icons/fi";
import {
  FiUser,
  FiDollarSign,
  FiInfo,
  FiHelpCircle,
  FiMessageSquare,
  FiLogOut,
} from "react-icons/fi";
import profileImage from "../assets/avatar.jpg"


const CustomHeader = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="relative">
      <header className="bg-blue-500 flex items-center justify-between px-6 py-3 shadow-md">
        {/* Left Logo */}
        <div className="text-white text-2xl font-semibold">MyApp</div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-all">
            <FiShare2 size={18} />
            Share
          </button>

          {/* Profile Section */}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white text-sm">@justin</span>
              <FiChevronDown className="text-white" />
            </div>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-lg z-50 p-4">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">
                    J
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">@Justin</h3>
                    <p className="text-xs text-gray-500">Myapp/justin</p>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md mt-1 inline-block">
                      Free
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <button className="w-full text-sm border border-purple-400 text-purple-600 py-2 rounded-md hover:bg-purple-50 mb-4">
                  Create new account
                </button>

                {/* Menu Options */}
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                    <FiUser /> My account
                  </li>
                  <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                    <FiDollarSign /> Billing
                  </li>
                  <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                    <FiInfo /> Cookie preference
                  </li>

                  <div className="border-t pt-3">
                    <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                      <FiHelpCircle /> Ask a question
                    </li>
                    <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                      <FiInfo /> Help topics
                    </li>
                    <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                      <FiMessageSquare /> Submit feedback
                    </li>
                  </div>

                  <div className="border-t pt-3">
                    <li className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer">
                      <FiLogOut /> Sign out
                    </li>
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default CustomHeader;
