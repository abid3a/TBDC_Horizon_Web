import React, { useState } from 'react';
import logo from '../../assets/logo.png';

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleDemoLogin = (role: string) => {
    if (role === 'Admin') {
      setEmail('admin@demo.com');
      setPassword('admin123');
    } else {
      setEmail('user@demo.com');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xs flex flex-col items-center">
        {/* Logo */}
        <img src={logo} alt="TBDC Horizon Logo" className="h-24 mb-8" />

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="w-full space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-10 py-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-900 placeholder-gray-400"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1" /></svg>
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-10 py-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-900 placeholder-gray-400"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" /></svg>
            </span>
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-yellow-700 text-white font-semibold text-lg hover:bg-yellow-800 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-8 text-center">
          <div className="text-gray-500 mb-2">Demo Accounts:</div>
          <div className="flex space-x-4 justify-center">
            <button
              className="px-6 py-2 rounded-lg bg-yellow-700 text-white font-semibold hover:bg-yellow-800 transition-colors"
              onClick={() => handleDemoLogin('Admin')}
            >
              Admin
            </button>
            <button
              className="px-6 py-2 rounded-lg bg-yellow-700 text-white font-semibold hover:bg-yellow-800 transition-colors"
              onClick={() => handleDemoLogin('User')}
            >
              User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 