import { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import api from '../utils/api';
import { FiUsers, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

const AnalyticsSection = ({ isActive, className }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const destroyChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get('/v1/admin/analytics');
        const data = res.data.data;
        setStats(data);
      } catch (err) {
        console.error('Analytics fetch failed:', err);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => destroyChart();
  }, [isActive]);

  useEffect(() => {
    if (!stats || !chartRef.current) return;

    const free = stats.planDistribution?.['Free'] || 0;
    const pro = stats.planDistribution?.['Pro'] || 0;
    const premium = stats.planDistribution?.['Premium'] || 0;

    destroyChart();

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Free', 'Pro', 'Premium'],
        datasets: [
          {
            data: [free, pro, premium],
            backgroundColor: ['#93c5fd', '#818cf8', '#f472b6'],
            borderColor: ['#1d4ed8', '#4f46e5', '#db2777'],
            borderWidth: 1,
            hoverOffset: 15,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 16,
              font: {
                family: 'DM Sans, sans-serif',
                size: 12,
              },
            },
          },
        },
      },
    });
  }, [stats]);

  if (!isActive) return null;

  const totalUsers = stats?.totalUsers || 0;
  const newSignups = stats?.newSignups || 0;
  const mrr = stats?.mrr || 0;

  if (error) {
    return (
      <div className={className}>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[ 
          { title: 'Total Users', value: totalUsers, icon: <FiUsers size={28} className="text-[#c4ff4d]" />, trend: stats?.userGrowth ?? 0 },
          { title: 'New Signups', value: newSignups, icon: <FiTrendingUp size={28} className="text-[#c4ff4d]" />, trend: stats?.signupTrend ?? 0 },
          { title: 'MRR', value: `$${mrr.toLocaleString()}`, icon: <FiDollarSign size={28} className="text-[#c4ff4d]" />, trend: stats?.revenueGrowth ?? 0 },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">{stat.title}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
              <div className="p-2 bg-[#f5f3f0] rounded-lg">{stat.icon}</div>
            </div>
            {stat.trend !== 0 && (
              <div className={`mt-2 text-sm ${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}% from last period
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Plan Distribution */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Plans</h3>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 h-64 relative">
            <canvas ref={chartRef} className="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;