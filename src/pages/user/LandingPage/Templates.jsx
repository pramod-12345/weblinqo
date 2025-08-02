
// import React, { useRef, useState } from "react";
// import { Link } from 'react-router-dom';
// const dummyAvatars = [
//     '/avatar1.jpg',
//     '/avatar2.avif',
//     '/avatar3.jpg',
//     '/avatar4.jpeg'
// ];

// const Templates = ({ templates }) => {
//     const [showLeftArrow, setShowLeftArrow] = useState(false);
//     const [showRightArrow, setShowRightArrow] = useState(false);
//     const containerRef = useRef(null);
//     const handleScroll = () => {
//         if (containerRef.current) {
//             const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
//             setShowLeftArrow(scrollLeft > 0);
//             setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
//         }
//     };
//     const dummyBios = [
//         "Creative Designer | Dreamer | Explorer",
//         "Tech Enthusiast | Content Creator | Gamer",
//         "Fitness Coach | Motivator | Wellness Advocate",
//         "Food Blogger | Traveler | Storyteller"
//     ];
//     return (
//         <section id="templates" className="px-6 py-16 max-w-7xl mx-auto text-center bg-[#f5f3f0]">
//             <div className="inline-block bg-[#c4ff4d] px-6 py-2 rounded-full mb-6">
//                 <span className="font-semibold text-gray-900">Templates</span>
//             </div>
//             <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Choose a Template That Fits Your Style</h2>
//             <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
//                 Pick from a variety of professionally designed templates to make your weblinqo page stand out.
//             </p>

//             {/* Scrollable Templates Container with Smart Arrows */}
//             <div className="relative">
//                 {/* Left Arrow */}
//                 <button
//                     className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md transition-opacity duration-200 hover:bg-gray-50 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//                     onClick={() => {
//                         containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//                     }}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                 </button>

//                 {/* Templates Container */}
//                 <div
//                     id="templates-container"
//                     ref={containerRef}
//                     className="flex gap-6 w-full overflow-x-auto pb-8 px-1 scrollbar-hide"
//                     style={{
//                         scrollBehavior: 'smooth',
//                         overflowX: 'scroll',
//                         whiteSpace: 'nowrap'
//                     }}
//                     onScroll={handleScroll}
//                 >
//                     {templates.length > 0 ? (
//                         templates.map((template, index) => (
//                             <div
//                                 key={template.id}
//                                 className={`flex-shrink-0 w-[320px] min-w-[320px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center p-6 ${template.backgroundColor || 'bg-white'} ${template.textColor || 'text-black'} ${template.font || ''} relative group`}
//                                 style={{
//                                     backgroundImage: template.backgroundImageUrl ? `url(${template.backgroundImageUrl})` : undefined,
//                                     backgroundSize: 'cover',
//                                     backgroundPosition: 'center',
//                                     height: '480px'
//                                 }}
//                             >
//                                 {/* Overlay with "Choose Template" button that appears on hover */}
//                                 <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                     <Link
//                                         to="/signup"
//                                         className="bg-[#c4ff4d] hover:bg-[#b8f542] text-black font-semibold text-base px-6 py-2.5 rounded-full border-0 shadow-none transition-all duration-200 hover:scale-105"
//                                         state={{ templateId: template.id }} // Optional: pass template ID to signup page
//                                     >
//                                         Choose Template
//                                     </Link>
//                                 </div>

//                                 <img
//                                     src={dummyAvatars[index % dummyAvatars.length]}
//                                     alt="avatar"
//                                     className="w-20 h-20 rounded-full border-4 border-white shadow mb-4 object-cover"
//                                 />
//                                 <h3 className={`text-xl font-bold mb-2 ${template.titlePlacement || ''}`}>{template.name}</h3>
//                                 <p className={`text-sm mb-6 ${template.bioPlacement || ''}`}>
//                                     {dummyBios[index % dummyBios.length]}
//                                 </p>
//                                 <div className="flex flex-col gap-3 w-full mt-auto">
//                                     <button className={`${template.buttonStyle || 'bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg'} w-full transition-colors duration-200`}>
//                                         Add YouTube Link
//                                     </button>
//                                     <button className={`${template.buttonStyle || 'bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg'} w-full transition-colors duration-200`}>
//                                         Add Instagram Link
//                                     </button>
//                                     <button className={`${template.buttonStyle || 'bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg'} w-full transition-colors duration-200`}>
//                                         Add TikTok Link
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-red-500 text-center w-full py-10 font-semibold text-lg">
//                             No templates available at the moment.
//                         </p>
//                     )}
//                 </div>

//                 {/* Right Arrow */}
//                 <button
//                     className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md transition-opacity duration-200 hover:bg-gray-50 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//                     onClick={() => {
//                         containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//                     }}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                 </button>
//             </div>
//         </section>
//     )
// };

// export default Templates;

import { useRef } from 'react';
import template1 from '../../../assets/images/templates/template1.svg';
import template2 from '../../../assets/images/templates/template2.svg';
import template3 from '../../../assets/images/templates/template3.svg';
import template4 from '../../../assets/images/templates/template4.svg';
import SectionTitle from './SectionTitle';
import Triangle from './Arrow';
import templatesBg from '../../../assets/images/svg/templatesBg.svg';
import { Link } from 'react-router-dom';

const templates = [
    {
        name: 'Sheila Davis',
        title: 'Director at Horizon',
        socials: ['🌐', '📧', '📞'],
        bg: template1,
    },
    {
        name: 'Asha Sharma',
        title: 'CEO at Prismix',
        socials: ['🌐', '📧', '📞'],
        bg: template2,
    },
    {
        name: 'David Edgar',
        title: 'Consultant',
        socials: ['🌐', '📧', '📞'],
        bg: template3,
    },
    {
        name: 'Oliver Williams',
        title: 'Consultant',
        socials: ['🌐', '📧', '📞'],
        bg: template4,
    },
    {
        name: 'Asha Sharma',
        title: 'CEO at Prismix',
        socials: ['🌐', '📧', '📞'],
        bg: template2,
    },
    {
        name: 'David Edgar',
        title: 'Consultant',
        socials: ['🌐', '📧', '📞'],
        bg: template3,
    },
    {
        name: 'Oliver Williams',
        title: 'Consultant',
        socials: ['🌐', '📧', '📞'],
        bg: template4,
    },
];

const Templates = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className=" bg-[#f6f3f0] py-20 ">
            {/* <div className="absolute inset-0 flex justify-center items-center overflow-hidden z-0">
                <div className="w-[90%] h-[700px] rounded-full bg-gradient-to-r from-[#6e7dfc] to-[#56a7f4] blur-[100px] opacity-70" />
            </div> */}

            {/* <div style={{backgroundImage: `url(${templatesBg})`}} className={`relative z-10 max-w-[92%] mx-auto text-center p-4 h-[1150px] py-32 px-10 text-white overflow-hidden bg-cover bg-center`}> */}
            <div className={`relative z-10 mx-auto text-center p-4 px-10 text-white `}>
                <div className="w-[100%] h-[80vh] md:h-[100vh] lg:h-[120vh] bg-template-gradient rounded-[50%] absolute z-0 border-8 left-0 border border-white" />
                <div className='relative z-10 px-5'>

                    <SectionTitle title={'Templates'} style={'mt-[20px]'} color={'text-white'} />
                    <p className="mb-10 text-size-18 text-white">
                        "Crafted for creators, built for impact. <br />
                        Our templates make your page shine effortlessly."
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <button
                            className="cursor-pointer"
                            onClick={() => scroll('left')}
                        >
                            <Triangle direction="left" color="white" size="24" />
                        </button>

                        <div
                            ref={scrollRef}
                            className="flex items-center justify-start gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {templates.map((template, idx) => (
                                <div
                                    key={idx}
                                    className="relative w-72 min-w-[240px] md:min-w-[316px] rounded-xl shadow-lg p-4 flex flex-col justify-between bg-cover text-white group"
                                >
                                    {/* Overlay with "Choose Template" button that appears on hover */}
                                    <div className="absolute z-10 inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Link
                                            to="/signup"
                                            className="bg-primary hover:bg-white text-white hover:text-primary border-primary  border-2 border  font-semibold text-base px-6 py-2.5 rounded-full border-0 shadow-none transition-all duration-200 hover:scale-105"
                                            state={{ templateId: template.id }} // Optional: pass template ID to signup page
                                        >
                                            Choose Template
                                        </Link>
                                    </div>
                                    <img className='relative z-0' src={template.bg} alt={template.name} />
                                </div>
                            ))}
                        </div>

                        <button
                            className="cursor-pointer"
                            onClick={() => scroll('right')}
                        >
                            <Triangle direction="right" color="white" size="24" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Templates;

