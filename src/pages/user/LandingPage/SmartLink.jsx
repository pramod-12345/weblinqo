import React from 'react';
import { Link } from 'react-router-dom';

const SmartLinkSection = () => {
    return (
        <div className="relative mb-[72px] flex flex-col items-center justify-center bg-smart-link-gradient text-center px-4 py-10">
                <h1 className="md:text-size-48 text-size-32 font-bold text-black mb-4">
                    Ready to share everything in one smart link?
                </h1>
                <p className="text-size-16 text-black mb-8 max-w-md">
                    Turn your profile into a powerful hub. Link content, products, and more with <span className="font-medium">weblinq.</span>
                </p>
                <Link to={'/signup'}>
                    <button className="border-primary bg-white border-2 border transition text-primary font-medium py-3 px-7 rounded-full shadow-md">
                        Get Started for free
                    </button>
                </Link>
        </div>
    );
};

export default SmartLinkSection;
