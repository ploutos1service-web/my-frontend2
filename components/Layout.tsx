import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Music, User, LayoutDashboard, LogIn, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { addToast } = useToast();

  const navLinks = [
    { name: 'Find Artists', path: '/search' },
    { name: 'How it works', path: '/#how-it-works' },
  ];

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
    navigate('/');
    setIsLoginDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'artist') return '/dashboard/artist';
    if (user.role === 'admin') return '/dashboard/admin';
    return '/dashboard/client';
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-neonBlue selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-neonBlue to-brand-neonPurple flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.5)] group-hover:shadow-[0_0_25px_rgba(156,47,255,0.6)] transition-all duration-300">
                <Music className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">
                vibe<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neonBlue to-brand-neonPurple">ondemand</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="hover:text-brand-neonBlue transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Actions (Desktop) */}
            <div className="hidden md:flex items-center gap-6">
              {isAuthenticated && user ? (
                 // Logged In State
                 <div className="relative group">
                   <button 
                     onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                     className="flex items-center gap-2 text-white font-medium hover:text-brand-neonBlue transition-colors text-sm focus:outline-none bg-white/5 px-4 py-2 rounded-full border border-white/10"
                   >
                     <span className="w-2 h-2 rounded-full bg-green-500"></span>
                     {user.name} <ChevronDown size={14} />
                   </button>
                   {/* Dropdown Menu */}
                   <div className={`absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-200 origin-top-right z-50 ${isLoginDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                      <Link to={getDashboardLink()} onClick={() => setIsLoginDropdownOpen(false)} className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white border-b border-white/5 flex items-center gap-2">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 flex items-center gap-2">
                        <LogOut size={16} /> Log Out
                      </button>
                   </div>
                 </div>
              ) : (
                // Guest State
                <div className="relative group">
                  <button 
                    onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsLoginDropdownOpen(false), 200)}
                    className="flex items-center gap-1 text-white font-medium hover:text-brand-neonBlue transition-colors text-sm focus:outline-none"
                  >
                    Log In <ChevronDown size={14} />
                  </button>
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-200 origin-top-right z-50 ${isLoginDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                     <Link to="/client/login" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white border-b border-white/5 flex items-center gap-2">
                       <User size={16} /> Client Login
                     </Link>
                     <Link to="/artist/login" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                       <Music size={16} /> Artist Login
                     </Link>
                  </div>
                </div>
              )}
              
              <Link to="/search" className="bg-white text-black hover:bg-brand-neonBlue hover:text-black transition-all duration-300 px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-brand-neonBlue block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="border-t border-white/10 my-2 pt-2">
                {isAuthenticated && user ? (
                  <>
                    <p className="px-3 text-xs text-gray-500 uppercase tracking-wider mb-2">Signed in as {user.name}</p>
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white hover:text-brand-neonBlue block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-400 hover:text-red-300 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                    >
                      <LogOut size={18} /> Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <p className="px-3 text-xs text-gray-500 uppercase tracking-wider mb-2">Log In</p>
                    <Link
                      to="/client/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white hover:text-brand-neonBlue block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                    >
                      <User size={18} /> Client Login
                    </Link>
                    <Link
                      to="/artist/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white hover:text-brand-neonBlue block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                    >
                      <Music size={18} /> Artist Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold tracking-tighter text-white">
                vibe<span className="text-brand-neonBlue">ondemand</span>
              </span>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                The premier platform for booking high-end DJs and live bands. Elevate your event with the perfect sound.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/search" className="hover:text-brand-neonBlue transition-colors">Find Artists</Link></li>
                <li><Link to="/#how-it-works" className="hover:text-brand-neonBlue transition-colors">How it works</Link></li>
                <li><Link to="/artist/signup" className="hover:text-brand-neonBlue transition-colors">Artist Signup</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-brand-neonBlue transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-brand-neonBlue transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-neonBlue transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Stay Tuned</h3>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-brand-neonBlue hover:text-black transition-all cursor-pointer">
                  <Music size={18} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-8 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} vibeondemand. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;