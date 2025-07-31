// src/components/Analytics.jsx
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dummyData = [
  { day: "Mon", clicks: 50, views: 120 },
  { day: "Tue", clicks: 70, views: 160 },
  { day: "Wed", clicks: 90, views: 200 },
  { day: "Thu", clicks: 40, views: 100 },
  { day: "Fri", clicks: 100, views: 220 },
  { day: "Sat", clicks: 80, views: 190 },
  { day: "Sun", clicks: 60, views: 150 },
];

const Analytics = () => {
  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Analytics Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-sm">Total Clicks</p>
          <h3 className="text-2xl font-bold text-[#4A4A4A]">490</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-sm">Total Views</p>
          <h3 className="text-2xl font-bold text-[#4A4A4A]">1140</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-sm">Conversion Rate</p>
          <h3 className="text-2xl font-bold text-[#4A4A4A]">42%</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-sm">Active Links</p>
          <h3 className="text-2xl font-bold text-[#4A4A4A]">4</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Weekly Clicks & Views</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="clicks" stroke="#A78BFA" strokeWidth={2} />
            <Line type="monotone" dataKey="views" stroke="#4A4A4A" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
