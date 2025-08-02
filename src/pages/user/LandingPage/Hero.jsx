import React from "react";
import socialImg from '../../../assets/images/svg/socialMediaHeroImg.svg'
import TemplateHeroImg from '../../../assets/images/svg/TemplateHeroImg.svg'
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="px-6 py-16 max-w-7xl mx-auto" >
            <div className='flex justify-between gap-10 flex-col lg:flex-row'>
                {/* left */}
                <div className='max-w-[100%] md:max-w-[70%]'>
                    <h1 className='m-0 font-bold text-size-48 md:text-size-72 leading-[60px] md:leading-[85px]  text-center lg:text-start'>Everything you are. In one,
                        simple link in bio.
                    </h1>
                    <div className='flex items-center mt-10 gap-10 lg:justify-between justify-center flex-col lg:flex-row'>
                        <div className='flex items-center justify-start flex-col lg:items-start'>
                            <p className='font-normal text-size-18 text-gray-400 text-center lg:text-start md:w-[60%] w-[80%]'>Join 70M+ people using Weblingo for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
                            <Link
                                to="/signup">
                                <button className="mt-14 bg-gradient-to-r from-primary to-purple-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300">
                                    Get Started for Free
                                </button>
                            </Link>
                        </div>
                        <img src={socialImg} className='w-full max-w-[262px] aspect-square lg:mr-20' />
                    </div>
                </div>

                {/* right */}
                <div className='flex justify-center lg:justify-start'>
                    <img src={TemplateHeroImg} className='max-w-[300px] w-full ' />
                </div>
            </div>
        </section >
    )
}

export default Hero;