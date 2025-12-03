import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, ArrowRight, Lock, Mail, User, Mic2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ArtistSignup: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: 'DJ'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Log in as artist so they can access the protected /artist/setup route
      login(formData.email, 'artist', formData.name);
      addToast('Account created! Let\'s set up your profile.', 'success');
      navigate('/artist/setup');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-neonPurple/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-md w-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Step 1: Create Account</h1>
          <p className="text-gray-400">Join vibeondemand. You will set up your artist profile in the next step.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Stage Name / Band Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-neonPurple focus:ring-1 focus:ring-brand-neonPurple outline-none transition-all placeholder-gray-600"
                  placeholder="e.g. The Night Owls"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Artist Category</label>
              <div className="relative">
                <Mic2 className="absolute left-3 top-3.5 text-gray-500" size={18} />
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-neonPurple focus:ring-1 focus:ring-brand-neonPurple outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="DJ">DJ</option>
                  <option value="Live Band">Live Band</option>
                  <option value="Soloist">Solo Musician</option>
                  <option value="Ensemble">Ensemble</option>
                </select>
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
                  className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-neonPurple focus:ring-1 focus:ring-brand-neonPurple outline-none transition-all placeholder-gray-600"
                  placeholder="contact@artist.com"
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
                  className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-neonPurple focus:ring-1 focus:ring-brand-neonPurple outline-none transition-all placeholder-gray-600"
                  placeholder="Create a strong password"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brand-neonPurple hover:bg-white text-white hover:text-black font-bold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(156,47,255,0.3)] hover:shadow-[0_0_30px_rgba(156,47,255,0.5)] flex items-center justify-center group mt-4"
          >
             {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Continue to Profile Setup <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/artist/login" className="text-brand-neonBlue font-bold hover:text-white transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistSignup;