// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredPlan = null }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        
        if (!token) {
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

        // التحقق من حالة الاشتراك من Backend
        const response = await fetch(`${apiUrl}/subscriptions/status`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        // التحقق من أن الاشتراك نشط
        const isActive = data.subscription && data.subscription.status === 'active';
        
        // إذا كان هناك نوع خطة معين مطلوب
        if (requiredPlan && isActive) {
          const hasPlan = data.subscription.plan.interval === requiredPlan;
          setIsAuthorized(hasPlan);
        } else {
          setIsAuthorized(isActive);
        }

        // حفظ معلومات الاشتراك محلياً
        if (isActive) {
          localStorage.setItem('subscriptionStatus', data.subscription.status);
          localStorage.setItem('userSubscription', JSON.stringify(data.subscription));
          localStorage.setItem('subscriptionPlan', data.subscription.plan.name);
        }

      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();

    // إعادة التحقق كل 5 دقائق
    const interval = setInterval(checkSubscription, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [requiredPlan]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking your subscription...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/premium" replace />;
  }

  return children;
};

export default ProtectedRoute;