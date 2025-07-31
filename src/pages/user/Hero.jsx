import { useState, useRef, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Navbar from '../../components/shared/navbar';
import Hero from './LandingPage/Hero';
import customizeImg from '../../assets/images/svg/customizeImg.svg'
import Features from './LandingPage/Features';
import Customize from './LandingPage/Customize';
import TrafficAnalyticsSection from './LandingPage/TrafficAnalytics';
import SmartLinkSection from './LandingPage/SmartLink';

const dummyAvatars = [
  '/avatar1.jpg',
  '/avatar2.avif',
  '/avatar3.jpg',
  '/avatar4.jpeg'
];

const dummyBios = [
  "Creative Designer | Dreamer | Explorer",
  "Tech Enthusiast | Content Creator | Gamer",
  "Fitness Coach | Motivator | Wellness Advocate",
  "Food Blogger | Traveler | Storyteller"
];

export default function WebLinqoLanding() {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(container);

      // Initial check
      handleScroll();

      return () => {
        container.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, [templates]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get('/api/v1/template/');
        setTemplates(response.data.data);
        // Force a scroll check after templates are loaded
        setTimeout(handleScroll, 100);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/api/v1/subscription/plans');
        setPlans(response.data.data);
      } catch (err) {
        console.error('Error fetching pricing plans:', err);
        setError('Unable to fetch plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (

    <div className="min-h-screen bg-[#f5f3f0] ">
      {/* Header */}
      <Navbar />
      {/* blue strip */}
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="space-y-6 bg-primary py-3 px-6 rounded-b-lg">
          <p className="text-size-14 text-white font-medium leading-normal">
            Time to convert clicks into customers. Weblingo new growth tools are here!
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <Hero />

      {/* customize */}
      <Customize/>

      {/* Feature */}
      <Features/>

      {/* Traffic Analytics */}
      <TrafficAnalyticsSection/>

      {/* Smart link */}
      <SmartLinkSection/>

      {/* Features Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto text-center">
        <div className="inline-block bg-[#c4ff4d] px-6 py-2 rounded-full mb-6">
          <span className="font-semibold text-gray-900">Features</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">The Only Link in Bio You'll Ever Need</h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Packed with powerful features to help you share, sell, and scale all in one place.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#c4ff4d] border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-0">
              <div className="p-6 text-left">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Everything in One Place</h3>
                <p className="text-gray-700">Consolidate all your links in a single, beautiful page.</p>
              </div>
              <div className="h-48 bg-white m-4 rounded-xl overflow-hidden shadow-inner">
                <div className="w-full h-full">
                  <img
                    src="/1.jpg"
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#ffa726] border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-0">
              <div className="p-6 text-left">
                <h3 className="text-2xl font-bold mb-2">Build Your Personal Brand</h3>
                <p>Customize every detail to match your unique style.</p>
              </div>
              <div className="h-48 bg-white m-4 rounded-xl overflow-hidden shadow-inner">
                <div className="w-full h-full">
                  <img
                    src="/2.jpg"
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-200 border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-0">
              <div className="p-6 text-left">
                <h3 className="text-2xl font-bold mb-2">Control Your Page Flow</h3>
                <p>Guide visitors through your most important links.</p>
              </div>
              <div className="h-48 bg-white m-4 rounded-xl overflow-hidden shadow-inner">
                <div className="w-full h-full">
                  <img
                    src="/3.jpg"
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
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

      {/* Social Platforms Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto bg-white rounded-3xl shadow-lg">
        <div className="grid lg:grid-cols-2 gap-12 items-center p-8">
          {/* Left: Text */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">
              Share Your weblinqo Across Platforms
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Add your unique weblinqo link to Instagram, TikTok, Twitter, & anywhere your audience is. Use your QR code
              to turn offline moments into online traffic.
            </p>
            <Link
              to="/signup"
              className="w-72 bg-[#c4ff4d] text-black hover:bg-[#b8f542] rounded-full px-8 py-3 text-lg font-semibold shadow-md transition-all duration-200 hover:scale-[1.03] active:scale-95 flex items-center justify-center"
            >
              Get started for free
              <span className="ml-2">→</span>
            </Link>
          </div>
          {/* Right: Image */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden p-4">
              <img
                src="/social.svg"
                alt="Share weblinqo"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="px-6 py-20 mx-6 mb-16 bg-gradient-to-br from-black to-gray-900 rounded-3xl text-white text-center max-w-7xl lg:mx-auto relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#c4ff4d]/10 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#ffa726]/10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>

        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#c4ff4d] to-[#ffa726]">
            Ready to share everything in one smart link?
          </h2>
          <p className="text-gray-300/90 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Turn your profile into a powerful hub. Link content, products, and more with weblinqo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-[#c4ff4d] hover:bg-[#d9ff85] text-gray-900 rounded-full px-8 py-4 text-lg font-bold shadow-lg transition-all duration-200 hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center gap-2 min-w-[200px]"
            >
              Get started for free
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/demo"
              className="border-2 border-white/20 hover:border-white/40 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center gap-2 min-w-[200px]"
            >
              Watch demo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
              </svg>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((id) => (
                  <img
                    key={id}
                    src={`https://i.pravatar.cc/64?u=${id}`}
                    alt={`avatar-${id}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span>Join 10,000+ creators</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c4ff4d]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      </div > 
  );  
}