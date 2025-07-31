import React from "react"
import { Link } from 'react-router-dom';

const Pricing = ({plans, loading, error}) => {
    return (
        <section id="pricing" className="px-6 py-16 max-w-7xl mx-auto text-center">
            <div className="inline-block bg-[#c4ff4d] px-6 py-2 rounded-full mb-6">
                <span className="font-semibold text-gray-900">Pricing</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Plans that work best for you</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                Simple, transparent pricing that scales with your audience.
            </p>

            {loading ? (
                <p className="text-gray-500 text-center w-full py-10 font-semibold text-lg">
                    Loading plans...
                </p>
            ) : error ? (
                <p className="text-red-500 text-center w-full py-10 font-semibold text-lg">
                    {error}
                </p>
            ) : (
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.sort((a, b) => a.price - b.price).map((plan, index) => (
                        <div
                            key={plan.id}
                            className={`border-2 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${index === 1 ? 'border-[#c4ff4d] bg-[#c4ff4d]/10 relative' : 'border-gray-200'
                                }`}
                        >
                            {index === 1 && (
                                <div className="absolute top-0 right-0 bg-[#c4ff4d] text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                    POPULAR
                                </div>
                            )}
                            <div className="p-8 flex flex-col items-center">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 capitalize">{plan.name}</h3>
                                <div className="mb-6">
                                    {plan.price > 0 ? (
                                        <>
                                            <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                                            <span className="text-gray-600">/month</span>
                                        </>
                                    ) : (
                                        <span className="text-4xl font-bold text-gray-900">Free</span>
                                    )}
                                </div>
                                <Link
                                    to="/signup"
                                    className={`w-full ${index === 1 ? 'bg-[#c4ff4d] text-black hover:bg-[#b8f542]' : 'bg-black text-white hover:bg-gray-800'} mb-6 rounded-full px-8 py-3 text-lg font-semibold shadow-md transition-all duration-200 hover:scale-[1.03] active:scale-95`}
                                >
                                    {plan.price > 0 ? `Choose ${plan.name}` : 'Get started'}
                                </Link>
                                <div className="text-left w-full space-y-3">
                                    <p className="font-semibold mb-3 text-gray-900">What's included:</p>
                                    {Object.entries(plan.features).map(([key, value]) => (
                                        value && (
                                            <div key={key} className="flex items-center gap-2">
                                                <span className="text-green-500">✓</span>
                                                <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </section>
    )
}
export default Pricing;
