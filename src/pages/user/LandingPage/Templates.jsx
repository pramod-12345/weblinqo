
import React from "react";
import { Link } from 'react-router-dom';

const Templates = ({ templates, containerRef, handleScroll }) => {
    const dummyBios = [
        "Creative Designer | Dreamer | Explorer",
        "Tech Enthusiast | Content Creator | Gamer",
        "Fitness Coach | Motivator | Wellness Advocate",
        "Food Blogger | Traveler | Storyteller"
    ];
    return (
        <section id="templates" className="px-6 py-16 max-w-7xl mx-auto text-center bg-[#f5f3f0]">
            <div className="inline-block bg-[#c4ff4d] px-6 py-2 rounded-full mb-6">
                <span className="font-semibold text-gray-900">Templates</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Choose a Template That Fits Your Style</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                Pick from a variety of professionally designed templates to make your weblinqo page stand out.
            </p>

            {/* Scrollable Templates Container with Smart Arrows */}
            <div className="relative">
                {/* Left Arrow */}
                <button
                    className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md transition-opacity duration-200 hover:bg-gray-50 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => {
                        containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Templates Container */}
                <div
                    id="templates-container"
                    ref={containerRef}
                    className="flex gap-6 w-full overflow-x-auto pb-8 px-1 scrollbar-hide"
                    style={{
                        scrollBehavior: 'smooth',
                        overflowX: 'scroll',
                        whiteSpace: 'nowrap'
                    }}
                    onScroll={handleScroll}
                >
                    {templates.length > 0 ? (
                        templates.map((template, index) => (
                            <div
                                key={template.id}
                                className={`flex-shrink-0 w-[320px] min-w-[320px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center p-6 ${template.backgroundColor || 'bg-white'} ${template.textColor || 'text-black'} ${template.font || ''} relative group`}
                                style={{
                                    backgroundImage: template.backgroundImageUrl ? `url(${template.backgroundImageUrl})` : undefined,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '480px'
                                }}
                            >
                                {/* Overlay with "Choose Template" button that appears on hover */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Link
                                        to="/signup"
                                        className="bg-[#c4ff4d] hover:bg-[#b8f542] text-black font-semibold text-base px-6 py-2.5 rounded-full border-0 shadow-none transition-all duration-200 hover:scale-105"
                                        state={{ templateId: template.id }} // Optional: pass template ID to signup page
                                    >
                                        Choose Template
                                    </Link>
                                </div>

                                <img
                                    src={dummyAvatars[index % dummyAvatars.length]}
                                    alt="avatar"
                                    className="w-20 h-20 rounded-full border-4 border-white shadow mb-4 object-cover"
                                />
                                <h3 className={`text-xl font-bold mb-2 ${template.titlePlacement || ''}`}>{template.name}</h3>
                                <p className={`text-sm mb-6 ${template.bioPlacement || ''}`}>
                                    {dummyBios[index % dummyBios.length]}
                                </p>
                                <div className="flex flex-col gap-3 w-full mt-auto">
                                    <button className={`${template.buttonStyle || 'bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg'} w-full transition-colors duration-200`}>
                                        Add YouTube Link
                                    </button>
                                    <button className={`${template.buttonStyle || 'bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg'} w-full transition-colors duration-200`}>
                                        Add Instagram Link
                                    </button>
                                    <button className={`${template.buttonStyle || 'bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg'} w-full transition-colors duration-200`}>
                                        Add TikTok Link
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-red-500 text-center w-full py-10 font-semibold text-lg">
                            No templates available at the moment.
                        </p>
                    )}
                </div>

                {/* Right Arrow */}
                <button
                    className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md transition-opacity duration-200 hover:bg-gray-50 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => {
                        containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    )
};

export default Templates;