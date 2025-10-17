import React, { useState } from 'react';
import { X, CreditCard, Globe, Lock, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const PaymentOverlay = ({ onClose, planType = 'monthly', testMode = true }) => {
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
      priceCents: 1000000,
      currency: 'IQD',
      interval: 'week',
      trialDays: 3
    },
    monthly: {
      id: 3,
      name: 'Monthly Plan',
      price: 20000,
      priceCents: 2000000,
      currency: 'IQD',
      interval: 'month',
      trialDays: 3
    },
    free: {
      id: 1,
      name: 'Free Trial',
      price: 0,
      priceCents: 0,
      currency: 'IQD',
      interval: 'month',
      trialDays: 30
    }
  };

  const currentPlan = planDetails[planType] || planDetails.monthly;

  // Get user token from localStorage or cookies
  const getUserToken = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
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

  // Process Card Payment
  const handleCardPayment = async () => {
    if (!validateCardData()) return;
    
    setLoading(true);
    try {
      const token = getUserToken();
      
      // Extract expiry month and year
      const [month, year] = cardData.expiryDate.split('/');
      
      const payload = {
        planId: currentPlan.id,
        paymentMethod: 'card',
        card: {
          number: cardData.cardNumber.replace(/\s/g, ''),
          expMonth: parseInt(month),
          expYear: parseInt('20' + year),
          cvc: cardData.cvc,
          country: cardData.country
        }
      };

      // Call your backend API
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/payments/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment failed');
      }

      // Store payment and subscription info
      localStorage.setItem('paymentId', data.paymentId);
      localStorage.setItem('subscriptionId', data.subscriptionId);
      localStorage.setItem('subscriptionStatus', 'active');

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        // Refresh page or redirect
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      setFormErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Process PayPal Payment
  const handlePayPalPayment = async () => {
    setLoading(true);
    try {
      const token = getUserToken();

      const payload = {
        planId: currentPlan.id,
        paymentMethod: 'paypal',
        returnUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/payments/paypal/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'PayPal payment failed');
      }

      // Redirect to PayPal
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
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
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h2>
            <p className="text-sm text-gray-600 mt-1">{currentPlan.name}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-6 bg-green-50 border-b border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-green-600" />
              <div>
                <p className="font-semibold text-green-900">Payment Successful!</p>
                <p className="text-sm text-green-700">Your subscription has been activated</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!showSuccess && (
          <div className="p-6 space-y-6">
            
            {/* Plan Summary */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{currentPlan.name}</span>
                <span className="text-2xl font-bold text-orange-600">
                  {currentPlan.price} <span className="text-sm">{currentPlan.currency}</span>
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Free trial: {currentPlan.trialDays} days, then auto-renews
              </p>
            </div>

            {/* Error Message */}
            {formErrors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> {formErrors.submit}
                </p>
              </div>
            )}

            {/* Payment Method Selection */}
            {step === 'payment-method' && (
              <div className="space-y-4">
                <p className="font-semibold text-gray-900">Select Payment Method</p>
                
                {/* Card Payment Option */}
                <button
                  onClick={() => {
                    setSelectedMethod('card');
                    setStep('card-details');
                    setFormErrors({});
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    selectedMethod === 'card'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard size={24} className="text-orange-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                    <p className="text-xs text-gray-600">Visa, Mastercard, Amex</p>
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
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl">
                    <span className="font-bold text-blue-600">Pay</span>
                    <span className="font-bold text-blue-700">Pal</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">PayPal</p>
                    <p className="text-xs text-gray-600">Fast & Secure</p>
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
                  className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
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
                <p className="font-semibold text-gray-900">Enter Card Details</p>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      disabled={loading}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
                        formErrors.cardNumber
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-orange-200'
                      }`}
                    />
                  </div>
                  {formErrors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {formErrors.cardNumber}
                    </p>
                  )}
                </div>

                {/* Expiry and CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
                        formErrors.expiryDate
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-orange-200'
                      }`}
                    />
                    {formErrors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-2 text-gray-400" />
                      <input
                        type="text"
                        name="cvc"
                        value={cardData.cvc}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        maxLength="3"
                        disabled={loading}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
                          formErrors.cvc
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-orange-200'
                        }`}
                      />
                    </div>
                    {formErrors.cvc && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.cvc}</p>
                    )}
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <Globe size={18} className="absolute left-3 top-2 text-gray-400" />
                    <select
                      name="country"
                      value={cardData.country}
                      onChange={handleCardInputChange}
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 appearance-none disabled:bg-gray-100"
                    >
                      <option value="Iraq">Iraq 🇮🇶</option>
                      <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                      <option value="UAE">UAE 🇦🇪</option>
                      <option value="Kuwait">Kuwait 🇰🇼</option>
                    </select>
                  </div>
                </div>

                {/* Test Mode Notice */}
                {testMode && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      <strong>Test Mode:</strong> Use card number <code className="bg-blue-100 px-1 rounded">4111 1111 1111 1111</code> for testing
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setStep('payment-method');
                      setFormErrors({});
                    }}
                    disabled={loading}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={loading}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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