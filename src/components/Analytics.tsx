import { useEffect } from "react";

interface AnalyticsProps {
  trackingId?: string;
  enableInDevelopment?: boolean;
}

// Google Analytics 4
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const Analytics = ({
  trackingId,
  enableInDevelopment = false,
}: AnalyticsProps) => {
  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Don't load analytics in development unless explicitly enabled
    if (isDevelopment && !enableInDevelopment) {
      return;
    }

    // Don't load if no tracking ID provided
    if (!trackingId) {
      console.warn("Analytics: No tracking ID provided");
      return;
    }

    // Initialize Google Analytics 4
    const initializeGA4 = () => {
      // Load gtag script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      window.gtag("js", new Date());
      window.gtag("config", trackingId, {
        // Privacy-friendly settings
        anonymize_ip: true,
        cookie_flags: "SameSite=None;Secure",
        // Enhanced ecommerce for mental health services
        custom_map: {
          custom_parameter_1: "service_type",
          custom_parameter_2: "transformation_track",
        },
      });

      console.log("Analytics initialized with tracking ID:", trackingId);
    };

    initializeGA4();

    // Track page views on route changes
    const trackPageView = (url: string) => {
      if (window.gtag) {
        window.gtag("config", trackingId, {
          page_path: url,
        });
      }
    };

    // Listen for navigation changes
    const handleRouteChange = () => {
      trackPageView(window.location.pathname + window.location.search);
    };

    // Track initial page view
    trackPageView(window.location.pathname + window.location.search);

    // Listen for browser navigation
    window.addEventListener("popstate", handleRouteChange);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [trackingId, enableInDevelopment]);

  return null;
};

// Custom tracking functions
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackConversion = (conversionType: string, value?: number) => {
  if (window.gtag) {
    window.gtag("event", "conversion", {
      send_to: conversionType,
      value: value,
      currency: "USD",
    });
  }
};

// Mental health specific tracking
export const trackServiceInterest = (serviceType: string) => {
  trackEvent("service_interest", "engagement", serviceType);
};

export const trackFormSubmission = (formType: string) => {
  trackEvent("form_submit", "lead_generation", formType);
};

export const trackBookingAttempt = (trackType: string) => {
  trackEvent("booking_attempt", "conversion", trackType);
};

export default Analytics;
