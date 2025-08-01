import React from 'react';
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok } from 'react-icons/fa';
import logoYellowTransparent from '../../../assets/images/logos/logo-yellow-transparent.svg'
const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-20 py-10 flex flex-col justify-between md:flex-row gap-10">
      {/* Left Side */}
      <div className='flex md:items-start flex-col items-center gap-2 justify-center'>
        <div className='mb-8'>
            <img src={logoYellowTransparent} className='h-[57px]'/>
        </div>
        <p className="text-logoGolden tracking-wider text-size-24 font-semibold">We bake emails too.</p>
        <p className="text-logoGolden tracking-wider text-size-24 font-semibold">Sign up to <span className="">receive the latest news.</span></p>

        <div className="flex mt-8 mb-7 p-3 border-1 border border-white rounded-sm grow w-full max-w-[470px]">
          <input
            type="email"
            placeholder="enter your email address"
            className="px-3 py-3 w-full max-w-xs text-white bg-charCoalBlack outline-none grow w-full"
          />
          <button className=" text-white px-5 py-2 ">SUBMIT</button>
        </div>

        <div className="flex items-start mb-7">
          <input type="checkbox" className="mr-2 mt-1" />
          <p className="text-size-14 text-white font-normal leading-tight">
            By providing your email, you consent to our Privacy<br />
            Policy and Terms & Conditions.
          </p>
        </div>

        <p className="mb-2 font-normal text-size-16">Follow Us</p>
        <div className="flex gap-4 text-lg">
          <FaFacebookF />
          <FaInstagram />
          <FaPinterestP />
          <FaTiktok />
        </div>
      </div>
      <div className='bg-white w-[1px] h-[430px] hidden md:block'/>
      <div className='bg-white w-full h-[1px] block md:hidden'/>
      {/* Right Side */}
      <div className="grid grid-cols-2 gap-10 text-sm text-gray-300">
        <div className='flex  items-center flex-col space-y-6'>
          <h2 className="font-semibold text-size-16">Information</h2>
          <ul className='space-y-6'>
            <li className="text-size-14 font-normal hover:underline cursor-pointer">About</li>
          </ul>
        </div>
        <div className='flex items-center flex-col space-y-6'>
          <h2 className="font-semibold text-size-16">Customer Service</h2>
          <ul className='space-y-6'>
            <li className="hover:underline cursor-pointer text-size-14 font-normal">Privacy Policy</li>
            <li className="hover:underline cursor-pointer text-size-14 font-normal">Terms & Conditions</li>
            <li className="hover:underline cursor-pointer text-size-14 font-normal">FAQ</li>
            <li className="hover:underline cursor-pointer text-size-14 font-normal">Contact Us</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
