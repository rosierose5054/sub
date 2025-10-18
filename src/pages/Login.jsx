import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    factoryName: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignIn) {
      if (formData.email && formData.password) {
        window.location.href = '/Home';
      }
    } else {
      if (formData.factoryName && formData.name && formData.email && formData.password && formData.confirmPassword) {
        window.location.href = '/Factories';
      } else if (!formData.factoryName && formData.name && formData.email && formData.password && formData.confirmPassword) {
        window.location.href = '/Home';
      }
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    window.location.href = '/Home';
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      factoryName: ''
    });
  };

  const toggleAuth = (newState) => {
    setIsSignIn(newState);
    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+USA+Modern:wght@400&family=Raleway:wght@600&display=swap');
      `}</style>
      
      <div className="w-screen h-screen relative">
        <div className="flex flex-row h-full relative bg-white overflow-hidden">
          
          {/* Left Panel - Orange */}
          <div className="w-80 bg-gradient-to-b from-orange-400 to-orange-500 p-8 relative overflow-hidden flex flex-col justify-center">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-300 rounded-full opacity-20 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600 rounded-full opacity-20 -mb-16 -ml-16"></div>

            {/* Buttons Container */}
            <div className="relative z-10 space-y-6 flex flex-col items-end">
              {/* Sign In Button */}
              <div className="flex justify-end -mr-16 overflow-visible">
                <button
                  onClick={() => toggleAuth(true)}
                  className={`py-3 px-12 rounded-2xl font-semibold text-lg transition-colors duration-300 active:scale-100 whitespace-nowrap ${
                    isSignIn
                      ? 'bg-white text-orange-400 shadow-lg'
                      : 'text-orange-200 hover:text-white'
                  }`}
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Login
                </button>
              </div>

              {/* Sign Up Button */}
              <div className="flex justify-end -mr-16 overflow-visible">
                <button
                  onClick={() => toggleAuth(false)}
                  className={`py-3 px-12 rounded-2xl font-semibold text-lg transition-colors duration-300 active:scale-100 whitespace-nowrap ${
                    !isSignIn
                      ? 'bg-white text-orange-400 shadow-lg'
                      : 'text-orange-200 hover:text-white'
                  }`}
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 p-8 flex flex-col justify-center overflow-y-auto">
            {isSignIn ? (
              <div className="space-y-6 max-w-sm mx-auto w-full">
                <div className="flex justify-center mb-6">
                  <img src="/logo.png" alt="Logo" className="w-28 h-28 object-contain" />
                </div>

                <h2 style={{ fontFamily: "'Playwrite USA Modern', cursive" }} className="text-2xl font-light text-gray-800 text-center tracking-wide">Welcome Back</h2>

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-orange-400 focus:outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-2 border-b-2 border-gray-300 focus:border-orange-400 focus:outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-full font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg text-sm"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Get started
                </button>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-500 text-xs">OR</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="flex-1 flex items-center justify-center gap-1 py-2 border-2 border-orange-400 rounded-full text-orange-500 font-semibold hover:bg-orange-50 transition-all duration-300 text-xs"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="4"/>
                      <line x1="21.17" y1="8" x2="12" y2="8"/>
                      <line x1="3.95" y1="6.06" x2="8.54" y2="14"/>
                      <line x1="10.88" y1="21.94" x2="15.46" y2="14"/>
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex-1 flex items-center justify-center gap-1 py-2 border-2 border-orange-400 rounded-full text-orange-500 font-semibold hover:bg-orange-50 transition-all duration-300 text-xs"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-sm mx-auto w-full">
                <div className="flex justify-center mb-6">
                  <img src="/logo.png" alt="Logo" className="w-28 h-28 object-contain" />
                </div>

                <h2 style={{ fontFamily: "'Playwrite USA Modern', cursive" }} className="text-2xl font-light text-gray-800 text-center tracking-wide">Create New Account</h2>

                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-orange-400 focus:outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-orange-400 focus:outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password *"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-2 border-b-2 border-gray-300 focus:border-orange-400 focus:outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password *"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-2 border-b-2 border-gray-300 focus:border-orange-400 focus:outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="relative">
                    <User className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="factoryName"
                      placeholder="Factory Name"
                      value={formData.factoryName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-orange-400 focus:outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm"
                    />
                  </div>

                  <p className="text-xs text-gray-500">* Required fields</p>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-full font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg text-sm"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Get started
                </button>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-500 text-xs">OR</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="flex-1 flex items-center justify-center gap-1 py-2 border-2 border-orange-400 rounded-full text-orange-500 font-semibold hover:bg-orange-50 transition-all duration-300 text-xs"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="4"/>
                      <line x1="21.17" y1="8" x2="12" y2="8"/>
                      <line x1="3.95" y1="6.06" x2="8.54" y2="14"/>
                      <line x1="10.88" y1="21.94" x2="15.46" y2="14"/>
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex-1 flex items-center justify-center gap-1 py-2 border-2 border-orange-400 rounded-full text-orange-500 font-semibold hover:bg-orange-50 transition-all duration-300 text-xs"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}