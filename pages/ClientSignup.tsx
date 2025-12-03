import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ArrowRight, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ClientSignup: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Log the user in immediately
      login(formData.email, 'client', formData.name);
      addToast('Account created successfully!', 'success');
      navigate('/dashboard/client');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-neonBlue/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-md w-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join vibeondemand to book top talent.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-neonBlue focus:ring-1 focus:ring-brand-neonBlue outline-none transition-all placeholder-gray-600"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-neonBlue focus:ring-1 focus:ring-brand-neonBlue outline-none transition-all placeholder-gray-600"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-neonBlue focus:ring-1 focus:ring-brand-neonBlue outline-none transition-all placeholder-gray-600"
                placeholder="Create a password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brand-neonBlue hover:bg-white text-black font-bold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] flex items-center justify-center group mt-4"
          >
             {isLoading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Create Account <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/client/login" className="text-brand-neonBlue font-bold hover:text-white transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientSignup;