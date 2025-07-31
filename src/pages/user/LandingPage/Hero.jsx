import React from "react";
import socialImg from '../../../assets/images/svg/socialMediaHeroImg.svg'
import TemplateHeroImg from '../../../assets/images/svg/TemplateHeroImg.svg'
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        < section className="px-6 py-16 max-w-7xl mx-auto" >
            <div className='flex justify-between gap-10'>
                {/* left */}
                <div className='max-w-[70%]'>
                    <h1 className='m-0 font-bold text-size-72 leading-[85px] text-center'>Everything you are. In one,
                        simple link in bio.
                    </h1>
                    <div className='flex items-center mt-10 gap-10 justify-between'>
                        <img src={socialImg} className='w-full max-w-[262px] aspect-square' />
                        <div className='flex items-center justify-center flex-col'>
                            <p className='font-normal text-size-18 text-gray-400 text-center w-[60%]'>Join 70M+ people using Weblingo for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
                            <Link
                                to="/signup">
                                <button className="mt-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300">
                                    Get Started for Free
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* right */}
                <div className='flex'>
                    <img src={TemplateHeroImg} className='max-w-[300px] w-full ' />
                </div>
            </div>
        </section >
    )
}

export default Hero;