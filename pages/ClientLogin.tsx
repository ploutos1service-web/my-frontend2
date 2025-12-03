import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ArrowRight, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ClientLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      login(email, 'client');
      addToast('Welcome to vibeondemand!', 'success');
      navigate('/dashboard/client');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-neonBlue/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-md w-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block group">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform border border-white/10">
              <User className="text-brand-neonBlue w-8 h-8" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Client Login</h1>
          <p className="text-gray-400">Access your bookings and messages.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-neonBlue focus:ring-1 focus:ring-brand-neonBlue outline-none transition-all placeholder-gray-600"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-xs text-brand-neonBlue hover:text-white transition-colors">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                id="password"
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-neonBlue focus:ring-1 focus:ring-brand-neonBlue outline-none transition-all placeholder-gray-600"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="flex items-center ml-1">
             <input 
               id="remember"
               type="checkbox"
               checked={rememberMe}
               onChange={(e) => setRememberMe(e.target.checked)}
               className="w-4 h-4 rounded border-gray-600 bg-black text-brand-neonBlue focus:ring-brand-neonBlue accent-brand-neonBlue"
             />
             <label htmlFor="remember" className="ml-2 text-sm text-gray-400 cursor-pointer select-none">Remember me</label>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white hover:bg-brand-neonBlue hover:text-black text-black font-bold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] flex items-center justify-center group"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Sign In <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/client/signup" className="text-brand-neonBlue font-bold hover:text-white transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;