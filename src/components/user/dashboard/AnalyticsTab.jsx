import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import toast from "react-hot-toast";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AnalyticsTab = () => {
  const [overview, setOverview] = useState(null);
  const [dailyStats, setDailyStats] = useState([]);
  const [topLinks, setTopLinks] = useState([]);
  const [selectedDays, setSelectedDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async (days) => {
    setLoading(true);
    try {
      const [overviewRes, statsRes, topLinksRes] = await Promise.all([
        api.get(`/v1/analytics/overview?days=${days}`),
        api.get(`/v1/analytics/daily-stats?days=${days}`),
        api.get(`/v1/analytics/top-links?limit=5`),
      ]);

      setOverview(overviewRes.data.data);
      setDailyStats(statsRes.data.data);
      setTopLinks(topLinksRes.data.data);
    } catch (error) {
      toast.error("Failed to load analytics");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(selectedDays);
  }, [selectedDays]);

  return (
    <div className="w-full px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900">
            Analytics Overview
          </h2>
          <p className="text-gray-600 mt-2">
            Track your link performance and engagement metrics
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={selectedDays}
            onChange={(e) => setSelectedDays(Number(e.target.value))}
            className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4ff4d]"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-[#c4ff4d] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Metrics */}
          {overview && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Link Clicks"
                value={overview.totalClicks}
                color="green"
              />
              <MetricCard
                title="Total Profile Views"
                value={overview.totalViews}
                color="orange"
              />
              <MetricCard
                title="Click-to-View Rate"
                value={`${overview.conversionRate.toFixed(1)}%`}
                color="yellow"
              />
              <MetricCard
                title="Active Links"
                value={overview.activeLinks}
                color="gray"
              />
            </div>
          )}

          {/* Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Weekly Link Clicks & Profile Views
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyStats}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    name="Link Clicks"
                    stroke="#c4ff4d"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    name="Profile Views"
                    stroke="#ffa726"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Links */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Top Performing Links
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Based on link clicks divided by total profile views.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <TableHeader title="Link" />
                    <TableHeader title="Link Clicks" />
                    <TableHeader title="Click/View %" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topLinks.map((link, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#c4ff4d]">
                        {link.link}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {link.clicks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {link.conversion.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const MetricCard = ({ title, value, color }) => {
  const colorMap = {
    green: "bg-[#c4ff4d]",
    orange: "bg-[#ffa726]",
    yellow: "bg-[#ffe066]",
    gray: "bg-gray-200",
  };

  const textColorMap = {
    green: "text-gray-900",
    orange: "text-gray-900",
    yellow: "text-gray-900",
    gray: "text-gray-900",
  };

  return (
    <div
      className={`${colorMap[color]} p-6 rounded-2xl shadow-sm border-0 hover:shadow-md transition-all`}
    >
      <div>
        <p className={`${textColorMap[color]} text-sm font-medium`}>{title}</p>
        <h3 className="text-3xl font-black text-gray-900 mt-2">
          {value}
        </h3>
      </div>
    </div>
  );
};

const TableHeader = ({ title }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
    {title}
  </th>
);

export default AnalyticsTab;