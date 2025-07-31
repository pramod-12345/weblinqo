import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from './api';

const useAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await api.post('/analytics/pageview', {
          path: location.pathname,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [location]);

  // Track link clicks
  const trackLinkClick = async (linkId, linkUrl) => {
    try {
      await api.post('/analytics/link-click', {
        linkId,
        linkUrl,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to track link click:', error);
    }
  };

  // Track custom events
  const trackEvent = async (eventName, eventData) => {
    try {
      await api.post('/analytics/event', {
        eventName,
        eventData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  };

  return {
    trackLinkClick,
    trackEvent,
  };
};

export default useAnalytics; 