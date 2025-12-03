import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, MapPin, Sliders, Star, X } from 'lucide-react';
import { MOCK_ARTISTS } from '../constants';
import { Artist } from '../types';

const Search: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(5000);
  const [withSono, setWithSono] = useState(false);
  const [lastMinute, setLastMinute] = useState(false);
  const [maxTravel, setMaxTravel] = useState(100);

  // Mock filtering logic
  const filteredArtists = MOCK_ARTISTS.filter(artist => {
    // Price logic
    const relevantPrice = withSono ? artist.priceWithSono : artist.priceWithoutSono;
    if (relevantPrice > priceRange) return false;

    // Last Minute
    if (lastMinute && !artist.isLastMinuteAvailable) return false;

    // Distance (Mock check against user location)
    if (artist.maxTravelKm < maxTravel) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Search Header */}
      <div className="bg-zinc-900 border-b border-white/10 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Find Artists</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
               <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
               <input type="text" placeholder="Enter city or venue..." className="w-full bg-black border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-brand-neonBlue focus:ring-1 focus:ring-brand-neonBlue outline-none" />
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden flex items-center justify-center bg-zinc-800 text-white px-4 py-3 rounded-lg border border-white/20"
            >
              <Filter size={18} className="mr-2" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`fixed inset-0 z-40 bg-zinc-900 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 md:bg-transparent md:block md:w-64 md:h-auto md:inset-auto border-r border-white/10 md:border-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          {/* Mobile Header */}
          <div className="flex justify-between items-center md:hidden p-6 border-b border-white/10 shrink-0">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)}><X className="text-white" /></button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-0 md:overflow-visible space-y-8">
            {/* Toggle Group */}
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-gray-300 group-hover:text-white transition-colors">With Sono System</span>
                <div className="relative inline-block w-10 h-6 align-middle select-none">
                  <input type="checkbox" checked={withSono} onChange={(e) => setWithSono(e.target.checked)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 right-4 checked:right-0 checked:bg-brand-neonBlue" />
                  <span className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer border border-white/20 ${withSono ? 'bg-brand-neonBlue/20' : 'bg-zinc-800'}`}></span>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-gray-300 group-hover:text-white transition-colors">Last Minute Only</span>
                <div className="relative inline-block w-10 h-6 align-middle select-none">
                  <input type="checkbox" checked={lastMinute} onChange={(e) => setLastMinute(e.target.checked)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 right-4 checked:right-0 checked:bg-brand-neonPurple" />
                  <span className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer border border-white/20 ${lastMinute ? 'bg-brand-neonPurple/20' : 'bg-zinc-800'}`}></span>
                </div>
              </label>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Max Price</span>
                <span className="text-white font-bold">${priceRange}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-neonBlue"
              />
            </div>

             {/* Travel Distance */}
             <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Artist Max Travel</span>
                <span className="text-white font-bold">{maxTravel} km</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={maxTravel}
                onChange={(e) => setMaxTravel(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-neonPurple"
              />
            </div>

            {/* Genre */}
            <div>
              <h3 className="text-white font-semibold mb-3">Genre</h3>
              <div className="space-y-2">
                {['House', 'Techno', 'Jazz', 'Pop', 'Rock'].map(genre => (
                  <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox rounded bg-zinc-800 border-white/20 text-brand-neonBlue focus:ring-brand-neonBlue" />
                    <span className="text-gray-400">{genre}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Apply Button (Fixed on Mobile, Static on Desktop) */}
          <div className="p-6 border-t border-white/10 bg-zinc-900 md:bg-transparent md:border-none md:p-0 md:mt-8 shrink-0">
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="w-full bg-brand-neonBlue text-black font-bold py-3 rounded-lg hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,217,255,0.3)] uppercase tracking-wider text-sm"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Results Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400">{filteredArtists.length} artists found</p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm">Sort by:</span>
              <select className="bg-zinc-900 border border-white/10 text-white rounded px-3 py-1 text-sm outline-none focus:border-brand-neonBlue">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <Link to={`/artist/${artist.id}`} key={artist.id} className="bg-zinc-900 rounded-xl overflow-hidden border border-white/10 hover:border-brand-neonBlue transition-all duration-300 group hover:shadow-[0_0_25px_rgba(0,217,255,0.1)]">
                <div className="relative h-48">
                   <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-zinc-900 to-transparent"></div>
                   <div className="absolute top-2 right-2 flex gap-1">
                     {artist.isLastMinuteAvailable && (
                       <span className="bg-brand-neonPurple text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Last Minute</span>
                     )}
                   </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-neonBlue transition-colors">{artist.name}</h3>
                      <p className="text-sm text-gray-500">{artist.category}</p>
                    </div>
                    <div className="flex items-center bg-white/5 px-2 py-1 rounded">
                      <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm font-bold">{artist.rating}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {artist.genres.slice(0,3).map(g => <span key={g} className="text-xs text-gray-400 bg-black/50 px-2 py-0.5 rounded border border-white/5">{g}</span>)}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-gray-500 uppercase">Base</span>
                      <span className="font-mono text-lg text-white">${artist.priceWithoutSono}</span>
                    </div>
                    <div className="text-right">
                       <span className="block text-xs text-gray-500 uppercase text-brand-neonBlue">With Sono</span>
                       <span className="font-mono text-lg text-brand-neonBlue">${artist.priceWithSono}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;