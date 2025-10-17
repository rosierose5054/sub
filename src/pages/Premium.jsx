// src/pages/Premium.jsx
import React, { useState, useEffect } from 'react';
import PaymentOverlay from '../components/PaymentOverlay';

const Premium = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPlans = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const openPaymentOverlay = () => {
    setShowPaymentOverlay(true);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div 
            className="space-y-6"
            style={{
              transform: `translateX(${-scrollY * 0.3}px)`,
              opacity: Math.max(1 - scrollY / 500, 0),
              transition: 'transform 0.1s ease-out'
            }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Elevate Your Industrial Experience — Discover More with Wasl Premium
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              With a "Wasl Premium" subscription, you'll gain access to detailed information about factories and the services they offer, the types of products they manufacture, and their precise geographic locations.
            </p>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={openPaymentOverlay}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 font-medium"
              >
                Get Started
              </button>
              <button 
                onClick={scrollToPlans}
                className="px-8 py-3 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div 
            className="flex justify-center items-center"
            style={{
              transform: `translateX(${scrollY * 0.3}px)`,
              opacity: Math.max(1 - scrollY / 500, 0),
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img 
              src="/assets/images/credit-cards.png" 
              alt="Credit Cards" 
              className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-white">
        <h2 className="text-5xl font-bold mb-16 text-center">Choose Your Best Plan</h2>
        
        <div className="max-w-7xl w-full grid md:grid-cols-3 gap-8">
          {/* Free Trial Card */}
          <div className="border border-gray-300 rounded-2xl p-8 bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <h3 className="text-3xl font-bold mb-2">Free Trial</h3>
            <p className="text-xs text-gray-600 mb-6">
              Experience the basics
            </p>
            <div className="text-4xl font-bold mb-6">0 IQD</div>
            <button 
              onClick={openPaymentOverlay}
              className="w-full py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium mb-8"
            >
              Start Now
            </button>
            <div className="space-y-3">
              <p className="font-semibold mb-4">Features of this subscription</p>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">General overview of factory types and services</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">Limited view of geographic locations</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">Viewing ad-supported content</p>
              </div>
            </div>
          </div>

          {/* Weekly Plan Card */}
          <div className="border border-gray-300 rounded-2xl p-8 bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <h3 className="text-3xl font-bold mb-2">Weekly Plan</h3>
            <p className="text-xs text-gray-600 mb-6">
              Unlock full access and stay informed with the Weekly Plan
            </p>
            <div className="text-4xl font-bold mb-6">10,000 IQD</div>
            <button 
              onClick={openPaymentOverlay}
              className="w-full py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium mb-8"
            >
              Subscribe Now
            </button>
            <div className="space-y-3">
              <p className="font-semibold mb-4">Features of this subscription</p>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">Ad-free browsing 🚫</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">Exclusive industrial news</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">Latest sector updates</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">Full factory contact info (phone, email, chat)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">3-day free trial with reminder</p>
              </div>
            </div>
          </div>

          {/* Monthly Plan Card */}
          <div className="border border-gray-300 rounded-2xl p-8 bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <h3 className="text-3xl font-bold mb-2">Monthly Plan</h3>
            <div className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full mb-2">
              Best Value
            </div>
            <p className="text-xs text-gray-600 mb-6">
              Get the full experience with maximum savings and insights
            </p>
            <div className="text-4xl font-bold mb-6">20,000 IQD</div>
            <button 
              onClick={openPaymentOverlay}
              className="w-full py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium mb-8"
            >
              Subscribe Now
            </button>
            <div className="space-y-3">
              <p className="font-semibold mb-4">Features of this subscription</p>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">All Weekly Plan features</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">Access to monthly industrial reports</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">3-day free trial before activation</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">Auto-renewal discount</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm">Save 25% compared to weekly plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Overlay */}
      {showPaymentOverlay && (
        <PaymentOverlay onClose={() => setShowPaymentOverlay(false)} testMode />
      )}
    </div>
  );
};

export default Premium;
