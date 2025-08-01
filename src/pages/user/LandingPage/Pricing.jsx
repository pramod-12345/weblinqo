import React from 'react';
import SectionTitle from './SectionTitle';

const plans = [
    {
        title: 'Free',
        subtitle: 'A great solution for beginners',
        features: [
            'public Profile',
            'profile Image',
            'custom Slug',
            'light Dark Mode',
            'bio Social Links',
            'max Links',
        ],
    },
    {
        title: 'Pro-popular',
        subtitle: 'Choose Pro $ 5/Month',
        features: [
            'public Profile',
            'profile Image',
            'custom Slug',
            'light Dark Mode',
            'bio Social Links',
            'max Links',
            'link Reordering',
            'click Tracking',
        ],
    },
    {
        title: 'Premium',
        subtitle: 'Premium $ 10/Month',
        features: [
            'public Profile',
            'profile Image',
            'custom Slug',
            'light Dark Mode',
            'bio Social Links',
            'max Links',
            'link Reordering',
            'click Tracking',
            'link Scheduling',
            'basic Analytics',
        ],
    },
];

const PricingPlans = () => {
    return (
        <div className="my-[72px] px-4 flex justify-center flex-col items-center">
             <SectionTitle title={'Pricing Plan'}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className="bg-white border border-blue-300 rounded-2xl shadow-md overflow-hidden flex flex-col items-center"
                    >
                        <h2 className="text-size-32 font-semibold text-center mt-6 tracking-wider">{plan.title}</h2>

                        <div className="mt-4 w-[85%] tracking-wider text-white text-size-16 font-medium bg-gradient-to-r from-blue-600 to-purple-400 py-3 rounded-full text-center">
                            {plan.subtitle}
                        </div>

                        <div className='flex justify-center '>
                            <ul className="mt-6 space-y-5 px-8 text-gray-800 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="text-green-600 text-md">✓</span>
                                        <span className='text-size-16'>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="mb-6 mt-auto bg-gradient-to-r from-blue-600 to-purple-400 text-white px-5 py-2 rounded-full text-sm font-semibold">
                            Get Started Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingPlans;
