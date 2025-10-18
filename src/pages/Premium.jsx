// src/pages/Premium.jsx
import React, { useState, useEffect } from 'react';
import PaymentOverlay from '../components/PaymentOverlay';

const Premium = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState('monthly');

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

  const openPaymentOverlay = (planType) => {
    setSelectedPlanType(planType);
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
                onClick={() => openPaymentOverlay('monthly')}
                className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 font-medium"
              >
                Get Started
              </button>
              <button 
                onClick={scrollToPlans}
                className="px-8 py-3 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 font-medium"
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
              src="/credit-cards.png" 
              alt="Credit Cards" 
              className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-white">
        <h2 className="text-5xl font-bold mb-16 text-center text-black">Choose Your Best Plan</h2>
        
        <div className="max-w-4xl w-full grid md:grid-cols-3 gap-6">
          {/* Free Trial Card */}
          <div className="border border-gray-300 rounded-xl p-6 bg-white bg-opacity-95 backdrop-blur-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-2 text-black">Free Trial</h3>
            <p className="text-xs text-gray-600 mb-4">
              Experience the basics
            </p>
            <div className="text-3xl font-bold mb-4 text-black">0 IQD</div>
            <button 
              onClick={() => openPaymentOverlay('free')}
              className="w-full py-2 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-300 font-medium mb-6 text-sm"
            >
              Start Now
            </button>
            <div className="space-y-2">
              <p className="font-semibold mb-3 text-black text-sm">Features</p>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 mt-1 flex-shrink-0"></div>
                <p className="text-xs text-gray-700">General overview</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 mt-1 flex-shrink-0"></div>
                <p className="text-xs text-gray-700">Limited locations</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 mt-1 flex-shrink-0"></div>
                <p className="text-xs text-gray-700">Ad-supported</p>
              </div>
            </div>
          </div>

          {/* Weekly Plan Card */}
          <div className="border border-gray-300 rounded-xl p-6 bg-white bg-opacity-95 backdrop-blur-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-2 text-black">Weekly Plan</h3>
            <p className="text-xs text-gray-600 mb-4">
              Full access weekly
            </p>
            <div className="text-3xl font-bold mb-4 text-orange-600">10,000 IQD</div>
            <button 
              onClick={() => openPaymentOverlay('weekly')}
              className="w-full py-2 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-300 font-medium mb-6 text-sm"
            >
              Subscribe Now
            </button>
            <div className="space-y-2">
              <p className="font-semibold mb-3 text-black text-sm">Features</p>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-600 mt-1 flex-shrink-0"></div>
                <p className="text-xs text-gray-700">Ad-free browsing</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-600 mt-1 flex-shrink-0"></div>
                <p className="text-xs text-gray-700">Exclusive news</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-600 mt-1 flex-shrink-0"></div>
                <p className="text-xs text-gray-700">Contact info</p>
              </div>
            </div>
          </div>

          {/* Monthly Plan Card */}
          <div className="border border-gray-300 rounded-xl p-6 bg-white bg-opacity-95 backdrop-blur-md hover:shadow-lg transition-all duration-300">
            <div className="inline-block bg-orange-600 text-white text-xs px-2 py-1 rounded-full mb-2">
              Best Value
            </div>
            <h3 className="text-2xl font-bold mb-2 text-black">Monthly Plan</h3>
            <p className="text-xs text-gray-600 mb-4">
              Full experience
            </p>
            <div className="text-3xl font-bold mb-4 text-orange-600">20,000 IQD</div>
            <button 
              onClick={() => openPaymentOverlay('monthly')}
              className="w-full py-2 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-300 font-medium mb-6 text-sm"
            >
              Subscribe Now
            </button>
            <div className="space-y-2">
              <p className="font-semibold mb-3 text-black text-sm">Features</p>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-600 mt-1 flex-shrink-0"></div>
                <p className="text-xs text-gray-700">All Weekly features</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-600 mt-1 flex-shrink-0"></div>
                <p className="text-xs text-gray-700">Monthly reports</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-600 mt-1 flex-shrink-0"></div>
                <p className="text-xs text-gray-700">25% savings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Overlay */}
      {showPaymentOverlay && (
        <PaymentOverlay 
          onClose={() => setShowPaymentOverlay(false)} 
          planType={selectedPlanType}
          testMode={true}
        />
      )}
    </div>
  );
};

export default Premium;