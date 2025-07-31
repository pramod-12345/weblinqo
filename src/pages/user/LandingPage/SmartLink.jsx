import React from 'react';
import { Link } from 'react-router-dom';

const SmartLinkSection = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-400 via-[#333] to-gray-400 text-center px-4 py-10">
            <h1 className="text-size-48 md:text-size-32 font-bold text-black mb-4">
                Ready to share everything in one smart link?
            </h1>
            <p className="text-sm md:text-base text-black mb-8 max-w-md">
                Turn your profile into a powerful hub. Link content, products, and more with <span className="font-medium">weblinq.</span>
            </p>
            <Link to={'/signup'}>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition text-white font-medium py-3 px-12 rounded-full shadow-md">
                    Get Started for free
                </button>
            </Link>
        </div>
    );
};

export default SmartLinkSection;
