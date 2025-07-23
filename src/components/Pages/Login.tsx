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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <img src={logo} alt="TBDC Horizon Logo" className="h-32 mb-8" />
        <h1 className="text-2xl font-bold text-gray-900 mb-8 w-full text-center">Log In</h1>
        <form onSubmit={handleSignIn} className="w-full space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400 bg-white"
              required
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {/* Standard mail (envelope) icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a3 3 0 003.22 0L22 8m-19 8V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400 bg-white"
              required
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {/* Lock icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z" /></svg>
            </span>
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? (
                // Eye open icon (simple, matching the provided image)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="12" rx="8" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg>
              ) : (
                // Eye off icon (simple, matching the provided image)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="12" rx="8" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"/></svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-amber-400 text-black font-semibold text-lg hover:bg-amber-500 transition-colors shadow-md"
          >
            Login
          </button>
        </form>
        <div className="mt-8 w-full text-center">
          <div className="text-gray-500 mb-2">Demo Accounts:</div>
          <div className="flex space-x-4 justify-center">
            <button
              className="px-6 py-2 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-500 transition-colors"
              onClick={() => handleDemoLogin('Admin')}
            >
              Admin
            </button>
            <button
              className="px-6 py-2 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-500 transition-colors"
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