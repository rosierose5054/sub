import React, { useState } from 'react';
import { X, CreditCard, Globe, Lock, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const PaymentOverlay = ({ onClose, planType = 'monthly', testMode = true, onPaymentSuccess }) => {
  const [step, setStep] = useState('payment-method');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    country: 'Iraq'
  });

  const planDetails = {
    weekly: {
      id: 2,
      name: 'Weekly Plan',
      price: 10000,
      currency: 'IQD',
      interval: 'week',
      trialDays: 3,
      description: 'Weekly subscription payment'
    },
    monthly: {
      id: 3,
      name: 'Monthly Plan',
      price: 20000,
      currency: 'IQD',
      interval: 'month',
      trialDays: 3,
      description: 'Monthly subscription payment'
    },
    free: {
      id: 1,
      name: 'Free Trial',
      price: 0,
      currency: 'IQD',
      interval: 'month',
      trialDays: 30,
      description: 'Free trial subscription'
    }
  };

  const currentPlan = planDetails[planType] || planDetails.monthly;

  const getUserToken = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  };

  const getApiUrl = () => {
    return process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardData({ ...cardData, [name]: formatted.slice(0, 19) });
    } else if (name === 'expiryDate') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 4);
      }
      setCardData({ ...cardData, [name]: formatted });
    } else if (name === 'cvc') {
      setCardData({ ...cardData, [name]: value.replace(/\D/g, '').slice(0, 3) });
    } else {
      setCardData({ ...cardData, [name]: value });
    }
  };

  const validateCardData = () => {
    const errors = {};
    
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 13) {
      errors.cardNumber = 'Invalid card number';
    }
    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      errors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    if (!cardData.cvc || cardData.cvc.length < 3) {
      errors.cvc = 'Invalid CVC';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // معالجة الدفع بالبطاقة
  const handleCardPayment = async () => {
    if (!validateCardData()) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (testMode) {
        // محاكاة الدفع الناجح
        const subscriptionData = {
          id: Math.random().toString(36).substr(2, 9),
          status: 'active',
          planId: currentPlan.id,
          plan: {
            id: currentPlan.id,
            name: currentPlan.name,
            interval: currentPlan.interval
          },
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };

        localStorage.setItem('subscriptionId', subscriptionData.id);
        localStorage.setItem('subscriptionStatus', 'active');
        localStorage.setItem('userSubscription', JSON.stringify(subscriptionData));

        setShowSuccess(true);
        
        if (onPaymentSuccess) {
          setTimeout(() => {
            onPaymentSuccess(subscriptionData);
          }, 1500);
        }

        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setFormErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  // معالجة PayPal
  const handlePayPalPayment = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (testMode) {
        // محاكاة PayPal الناجح
        const subscriptionData = {
          id: Math.random().toString(36).substr(2, 9),
          status: 'active',
          planId: currentPlan.id,
          plan: {
            id: currentPlan.id,
            name: currentPlan.name,
            interval: currentPlan.interval
          },
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };

        localStorage.setItem('subscriptionId', subscriptionData.id);
        localStorage.setItem('subscriptionStatus', 'active');
        localStorage.setItem('userSubscription', JSON.stringify(subscriptionData));

        setShowSuccess(true);
        
        if (onPaymentSuccess) {
          setTimeout(() => {
            onPaymentSuccess(subscriptionData);
          }, 1500);
        }

        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('PayPal error:', error);
      setFormErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = () => {
    if (selectedMethod === 'card') {
      handleCardPayment();
    } else if (selectedMethod === 'paypal') {
      handlePayPalPayment();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Card - ضبابي شفاف */}
      <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 border-opacity-30">
        
        {/* Header */}
        <div className="sticky top-0 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200 border-opacity-30 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-black">Complete Your Purchase</h2>
            <p className="text-sm text-gray-700 mt-1">{currentPlan.name}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={24} className="text-black" />
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-6 bg-green-50 bg-opacity-80 backdrop-blur-sm border-b border-gray-200 border-opacity-30">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-green-700" />
              <div>
                <p className="font-semibold text-green-900">تمت العملية بنجاح! ✅</p>
                <p className="text-sm text-green-800">تم تفعيل اشتراكك</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!showSuccess && (
          <div className="p-6 space-y-6">
            
            {/* Plan Summary */}
            <div className="bg-gray-100 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 border-opacity-30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-black font-medium">{currentPlan.name}</span>
                {currentPlan.price > 0 ? (
                  <span className="text-2xl font-bold text-orange-600">
                    {currentPlan.price} <span className="text-sm">{currentPlan.currency}</span>
                  </span>
                ) : (
                  <span className="text-2xl font-bold text-black">
                    Free
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-700">
                Free trial: {currentPlan.trialDays} days, then auto-renews
              </p>
            </div>

            {/* Error Message */}
            {formErrors.submit && (
              <div className="bg-red-50 bg-opacity-80 backdrop-blur-sm border border-red-200 border-opacity-30 rounded-lg p-3">
                <p className="text-red-800 text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> {formErrors.submit}
                </p>
              </div>
            )}

            {/* Payment Method Selection */}
            {step === 'payment-method' && (
              <div className="space-y-4">
                <p className="font-semibold text-black">Select Payment Method</p>
                
                {/* Card Payment Option */}
                <button
                  onClick={() => {
                    setSelectedMethod('card');
                    setStep('card-details');
                    setFormErrors({});
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    selectedMethod === 'card'
                      ? 'border-orange-600 bg-gray-50 bg-opacity-60'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50 bg-opacity-40'
                  } backdrop-blur-sm`}
                >
                  <CreditCard size={24} className="text-orange-600" />
                  <div className="text-left">
                    <p className="font-semibold text-black">Credit/Debit Card</p>
                    <p className="text-xs text-gray-700">Visa, Mastercard, Amex</p>
                  </div>
                </button>

                {/* PayPal Option */}
                <button
                  onClick={() => {
                    setSelectedMethod('paypal');
                    setFormErrors({});
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    selectedMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-50 bg-opacity-60'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50 bg-opacity-40'
                  } backdrop-blur-sm`}
                >
                  <div className="text-2xl">
                    <span className="font-bold text-blue-600">Pay</span>
                    <span className="font-bold text-blue-700">Pal</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-black">PayPal</p>
                    <p className="text-xs text-gray-700">Fast & Secure</p>
                  </div>
                </button>

                {/* Continue Button */}
                <button
                  onClick={() => {
                    if (selectedMethod === 'paypal') {
                      handlePaymentSubmit();
                    } else if (selectedMethod === 'card') {
                      setStep('card-details');
                    }
                  }}
                  disabled={!selectedMethod || loading}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Continue to Payment'
                  )}
                </button>
              </div>
            )}

            {/* Card Details Form */}
            {step === 'card-details' && selectedMethod === 'card' && (
              <div className="space-y-4">
                <p className="font-semibold text-black">Enter Card Details</p>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard size={18} className="absolute left-3 top-3 text-gray-600" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      disabled={loading}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 bg-white bg-opacity-70 backdrop-blur-sm text-black ${
                        formErrors.cardNumber
                          ? 'border-red-500 focus:ring-red-300'
                          : 'border-gray-300 focus:ring-orange-300'
                      }`}
                    />
                  </div>
                  {formErrors.cardNumber && (
                    <p className="text-red-700 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {formErrors.cardNumber}
                    </p>
                  )}
                </div>

                {/* Expiry and CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardData.expiryDate}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      disabled={loading}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 bg-white bg-opacity-70 backdrop-blur-sm text-black ${
                        formErrors.expiryDate
                          ? 'border-red-500 focus:ring-red-300'
                          : 'border-gray-300 focus:ring-orange-300'
                      }`}
                    />
                    {formErrors.expiryDate && (
                      <p className="text-red-700 text-xs mt-1">{formErrors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      CVC
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-2 text-gray-600" />
                      <input
                        type="text"
                        name="cvc"
                        value={cardData.cvc}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        maxLength="3"
                        disabled={loading}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 bg-white bg-opacity-70 backdrop-blur-sm text-black ${
                          formErrors.cvc
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-orange-300'
                        }`}
                      />
                    </div>
                    {formErrors.cvc && (
                      <p className="text-red-700 text-xs mt-1">{formErrors.cvc}</p>
                    )}
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <Globe size={18} className="absolute left-3 top-2 text-gray-600" />
                    <select
                      name="country"
                      value={cardData.country}
                      onChange={handleCardInputChange}
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 appearance-none disabled:bg-gray-100 bg-white bg-opacity-70 backdrop-blur-sm text-black"
                    >
                      <option value="Iraq">Iraq 🇮🇶</option>
                      <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                      <option value="UAE">UAE 🇦🇪</option>
                      <option value="Kuwait">Kuwait 🇰🇼</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setStep('payment-method');
                      setFormErrors({});
                    }}
                    disabled={loading}
                    className="flex-1 py-3 border-2 border-gray-400 text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={loading}
                    className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Get Free Trial'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOverlay;