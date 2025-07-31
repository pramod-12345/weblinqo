import React from "react";
import { Link } from 'react-router-dom';
import Hero from "./Hero";
import Features from "./Features";
import Templates from "./Templates";
import Pricing from "./Pricing";

const dummyAvatars = [
  '/avatar1.jpg',
  '/avatar2.avif',
  '/avatar3.jpg',
  '/avatar4.jpeg'
];

const WebLinqoLanding = () => {
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
            <Hero />
            <Features/>
            <Templates templates={templates} containerRef={containerRef} handleScroll={handleScroll}/>
            <Pricing/>
        </div>
    )
}
export default WebLinqoLanding;