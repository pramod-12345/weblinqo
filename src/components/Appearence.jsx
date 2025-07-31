// src/components/Appearance.jsx
import React from "react";
import { FaLock } from "react-icons/fa";

const Appearance = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-[#333] mb-4">🎨 Themes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="relative h-36 rounded-xl bg-gradient-to-br from-purple-300 to-indigo-400 flex items-center justify-center text-white text-lg font-semibold cursor-pointer shadow-md"
            >
              Theme {i + 1}
              {i >= 3 && (
                <div className="absolute top-2 right-2 text-yellow-500">
                  <FaLock />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-[#333] mb-4">🖼 Backgrounds</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {["#f8fafc", "#fef3c7", "#d1fae5", "#e0f2fe", "#fde68a", "#fbcfe8"].map((color, i) => (
            <div
              key={i}
              className="h-12 w-12 rounded-full cursor-pointer shadow-md border"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-[#333] mb-4">🔠 Fonts</h3>
        <div className="space-y-2">
          {["Poppins", "Roboto", "Inter", "Open Sans"].map((font, i) => (
            <div key={i} className="text-gray-700 cursor-pointer hover:font-bold">
              {font}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appearance;