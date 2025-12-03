import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, ArrowRight, Star, Zap, CheckCircle } from 'lucide-react';
import { MOCK_ARTISTS, CATEGORIES } from '../constants';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-neonBlue/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-neonPurple/20 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571266028243-3716950387ca?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-brand-neonBlue text-xs font-bold tracking-wider uppercase">The Future of Booking</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Book the Best <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neonBlue to-brand-neonPurple">DJs & Live Bands</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Weddings • Birthdays • Corporate • Clubs. <br />
            Experience the seamless connection between elite artists and your next event.
          </p>

          {/* Main Search Bar */}
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl max-w-4xl mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative flex items-center px-4 border-b md:border-b-0 md:border-r border-white/10 py-3 md:py-0">
              <MapPin className="text-gray-500 mr-3" size={20} />
              <input type="text" placeholder="Location (e.g. New York)" className="bg-transparent w-full outline-none text-white placeholder-gray-500" />
            </div>
            <div className="flex-1 relative flex items-center px-4 border-b md:border-b-0 md:border-r border-white/10 py-3 md:py-0">
              <Calendar className="text-gray-500 mr-3" size={20} />
              <input type="date" className="bg-transparent w-full outline-none text-white placeholder-gray-500 [color-scheme:dark]" />
            </div>
            <div className="flex-1 relative flex items-center px-4 py-3 md:py-0">
              <Zap className="text-gray-500 mr-3" size={20} />
              <select className="bg-transparent w-full outline-none text-white placeholder-gray-500 appearance-none cursor-pointer">
                <option className="bg-zinc-900 text-gray-400" value="">Any Artist Type</option>
                <option className="bg-zinc-900" value="DJ">DJ</option>
                <option className="bg-zinc-900" value="Band">Live Band</option>
              </select>
            </div>
            <Link to="/search" className="bg-brand-neonBlue hover:bg-brand-neonBlue/90 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(0,217,255,0.4)] flex items-center justify-center">
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-20 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Trending Artists</h2>
              <p className="text-gray-400">Top rated performers available for booking</p>
            </div>
            <Link to="/search" className="text-brand-neonBlue hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_ARTISTS.map((artist) => (
              <Link to={`/artist/${artist.id}`} key={artist.id} className="group block bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-neonBlue/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,217,255,0.15)]">
                <div className="relative h-64 overflow-hidden">
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 border border-white/10">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{artist.rating}</span>
                  </div>
                  {artist.isLastMinuteAvailable && (
                    <div className="absolute top-3 left-3 bg-brand-neonPurple/90 px-2 py-1 rounded-full border border-brand-neonPurple/50 shadow-lg">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Last Minute</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                       <h3 className="text-lg font-bold text-white truncate">{artist.name}</h3>
                       <p className="text-sm text-gray-400">{artist.category}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {artist.genres.slice(0, 2).map(g => (
                      <span key={g} className="text-[10px] bg-white/5 text-gray-300 px-2 py-1 rounded-md border border-white/5">{g}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Starting from</p>
                      <p className="text-brand-neonBlue font-bold">${artist.priceWithoutSono}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase">With Sono</p>
                      <p className="text-white font-bold">${artist.priceWithSono}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Curated for Every Vibe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link to={`/search?type=${cat.id}`} key={cat.id} className="relative h-64 rounded-2xl overflow-hidden group border border-white/10">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-neonBlue transition-colors">{cat.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-zinc-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,217,255,0.2)] border border-brand-neonBlue/30">
                <Search className="text-brand-neonBlue w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Discover</h3>
              <p className="text-gray-400">Browse hundreds of vetted artists. Filter by genre, budget, and equipment needs.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(156,47,255,0.2)] border border-brand-neonPurple/30">
                <CheckCircle className="text-brand-neonPurple w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Customize</h3>
              <p className="text-gray-400">Select "With Sono" for full equipment or "Without". Add travel details and check instant pricing.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/20">
                <Zap className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Book Instantly</h3>
              <p className="text-gray-400">Secure your booking with a deposit. Communicate directly with the artist via your dashboard.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
