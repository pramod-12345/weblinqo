import React from 'react';
import { FaEnvelope, FaComments, FaBook, FaUser, FaCog, FaChartBar, FaMoneyBill, FaWrench } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

const features = [
    {
        title: 'Email Support',
        description: 'Have a question or issue? Reach out to us anytime at support@weblinqo.com — we typically respond within 24 hours.',
        icon: <FaEnvelope size={32} />,
    },
    {
        title: 'Live Chat (Optional if applicable)',
        description: 'Need help right now? Chat with our support team directly from your dashboard during business hours.',
        icon: <FaComments size={32} />,
    },
    {
        title: 'Help Center',
        description: 'Step-by-step guides, video tutorials, and tips to help you get the most out of Weblinqo. Visit our Help Center.',
        icon: <FaBook size={32} />,
    },
    {
        title: 'We’re Here for Creators',
        description: 'Whether you’re just getting started or scaling up, our support helps creators succeed with Weblinqo.',
        icon: <FaUser size={32} />,
    },
    {
        title: 'Smart Link Management',
        description: 'Add as many links as you need. – Set start and end times for special promotions.',
        icon: <FaCog size={32} />,
    },
    {
        title: 'Analytics & Performance',
        description: 'Real-Time Stats – See who clicked, when, and where. Know which links are performing best.',
        icon: <FaChartBar size={32} />,
    },
    {
        title: 'Monetization Tools',
        description: 'Storefront Integration – Connect Shopify, Gumroad, or Etsy. Digital Downloads – Sell eBooks, presets, templates, etc.',
        icon: <FaMoneyBill size={32} />,
    },
    {
        title: 'Advanced Tool',
        description: 'Custom Domain Support – Use your own branded URL. SEO Optimization – Add page titles.',
        icon: <FaWrench size={32} />,
    },
];

const Features = () => {
    return (
        <>
            <SectionTitle title={'Features'} />
            <section className=''>
                <div className="max-w-7xl mx-auto p-6 bg-white border-2 border-secondary rounded-bl-[150px] rounded-tr-[150px] rounded-br-3xl rounded-tl-3xl shadow-md px-[114px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-start p-4 gap-4 border border-secondary rounded-2xl shadow-sm bg-white hover:shadow-md transition"
                            >
                                <h3 className="font-semibold text-size-20 m-0 text-center w-full leading-6">{feature.title}</h3>
                                <div className='flex justify-center w-full'>
                                    <div className="text-black mb-2 text-center">{feature.icon}</div>
                                </div>
                                <p className="text-sm text-gray-700">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
