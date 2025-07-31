import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="w-full bg-white shadow-sm">
            <header className="max-h-[4.5rem] py-auto max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:opacity-90 transition-opacity"
                    >
                        <span
                            className="text-black p-2 rounded-lg"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img
                                src="/weblinqo.svg"
                                alt="weblinqo Logo"
                                className="w-12 h-12"
                            />
                        </span>
                        <span className="font-extrabold text-black">weblinqo</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">
                        <a
                            href="#pricing"
                            className="text-black font-semibold text-size-14 transition-colors duration-200"
                        >
                            Pricing
                        </a>
                        <a
                            href="#templates"
                            className="text-black font-semibold text-size-14 transition-colors duration-200"
                        >
                            Templates
                        </a>
                    </nav>

                    <Link
                        className="bg-primary hover:bg-white border-2 border-white hover:border-primary text-white hover:text-primary font-semibold text-base px-6 py-2.5 rounded-full border-0 shadow-none transition-all duration-200"
                        to="/signup">
                        Sign up
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Navbar;