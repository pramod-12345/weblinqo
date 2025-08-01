import React from 'react';
import { FaInstagram, FaChartPie, FaPhoneAlt } from 'react-icons/fa';
import trafficAnalytics  from '../../../assets/images/svg/trafficAnalyticsImg.svg'

const TrafficAnalyticsSection = () => {
  return (
    <section className="mt-[4.5rem] px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left Text Section */}
        <div className="max-w-xl text-left flex flex-col items-center md:items-start">
          <h2 className="text-size-32 sm:text-size-40  md:text-size-48 font-medium text-black text-center md:text-start mb-6 leading-tight tracking-widest">
            More Traffic.
            More Clicks.
            MoreTools.
          </h2>
          <p className="text-gray-700 mb-6 text-center md:text-start text-size-18">
            Measure, optimize, repeat. See the MEEEK data flow into Analytics,
            so you can measure click and see which content is driving revenue
            to your business.
          </p>
          <button className="px-5 py-2 rounded-md border text-size-18 border-gray-500 text-black font-semibold shadow-sm hover:shadow-md transition hover:border-purple-500 hover:text-purple-600">
            Drive more traffic
          </button>
        </div>

        {/* Right Chart Section */}
        <div className=" w-full max-w-md">
          
          {/* Charts */}
          <div className="p-4 rounded-xl shadow-lg mb-6">
            <img
              src={trafficAnalytics}
              alt="analytics"
              className="w-full rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrafficAnalyticsSection;
