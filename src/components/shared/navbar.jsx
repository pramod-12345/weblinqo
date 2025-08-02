import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from '../../assets/images/logos/logo-black-transparent.svg'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div className="w-full bg-white shadow-sm">
            <header className="max-h-[4.5rem] py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:opacity-90 transition-opacity"
                    >
                        <img
                            src={logo}
                            alt="weblinqo Logo"
                            className="h-10"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10">
                        <a href="#pricing" className="text-black font-semibold text-sm hover:text-primary">
                            Pricing
                        </a>
                        <a href="#templates" className="text-black font-semibold text-sm hover:text-primary">
                            Templates
                        </a>
                    </nav>

                    <div className="hidden md:block">
                        <Link
                            className="bg-primary hover:bg-white border-2 border-primary text-white hover:text-primary font-semibold text-base px-5 py-2 rounded-full transition-all duration-200"
                            to="/signup"
                        >
                            Sign up
                        </Link>
                    </div>

                    {/* Hamburger Icon for Mobile */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-black focus:outline-none">
                            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden mt-4 space-y-4 absolute w-full bg-white left-0 p-4">
                        <a href="#pricing" className="block text-black font-medium hover:text-primary">
                            Pricing
                        </a>
                        <a href="#templates" className="block text-black font-medium hover:text-primary">
                            Templates
                        </a>
                        <Link
                            to="/signup"
                            className="block w-full text-center bg-primary hover:bg-white border-2 border-white hover:border-primary text-white hover:text-primary font-semibold px-4 py-2 rounded-full transition-all duration-200"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Navbar;
