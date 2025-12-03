import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Music, Calendar, ShieldCheck, Info } from 'lucide-react';
import { MOCK_ARTISTS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ArtistProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  
  const artist = MOCK_ARTISTS.find(a => a.id === id) || MOCK_ARTISTS[0];

  // Booking State
  const [withSono, setWithSono] = useState(false);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  // Math
  const basePrice = withSono ? artist.priceWithSono : artist.priceWithoutSono;
  const travelFee = 50; 
  const serviceFee = Math.round(basePrice * 0.05);
  const total = basePrice + travelFee + serviceFee;

  const handleContinueToBooking = () => {
    // 1. Validate Inputs
    if (!date) {
      addToast('Please select an event date.', 'info');
      return;
    }
    if (!location) {
      addToast('Please enter a venue location.', 'info');
      return;
    }

    // 2. Check Auth
    if (!user) {
        addToast('Please log in or sign up to book this artist.', 'info');
        navigate('/client/login');
        return;
    }

    // 3. Navigate to Booking Flow with Data
    navigate('/booking', {
      state: {
        artistId: artist.id,
        date,
        location,
        withSono,
        totalEstimate: total
      }
    });
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] w-full">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-brand-neonBlue/20 text-brand-neonBlue border border-brand-neonBlue/30 rounded-full text-xs font-bold uppercase tracking-wider">{artist.category}</span>
                {artist.isLastMinuteAvailable && <span className="px-3 py-1 bg-brand-neonPurple/20 text-brand-neonPurple border border-brand-neonPurple/30 rounded-full text-xs font-bold uppercase tracking-wider">Last Minute Available</span>}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{artist.name}</h1>
              <div className="flex items-center text-gray-300 gap-4 text-sm md:text-base">
                <div className="flex items-center"><MapPin size={16} className="mr-1 text-brand-neonBlue" /> {artist.location}</div>
                <div className="flex items-center"><Star size={16} className="mr-1 text-yellow-400 fill-yellow-400" /> {artist.rating} ({artist.reviewCount} reviews)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Bio */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Info size={20} className="text-brand-neonBlue" /> About</h2>
            <p className="text-gray-400 leading-relaxed text-lg">{artist.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {artist.genres.map(g => (
                <span key={g} className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 text-sm">{g}</span>
              ))}
            </div>
          </section>

          {/* Media */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Music size={20} className="text-brand-neonPurple" /> Media</h2>
            <div className="grid grid-cols-2 gap-4">
              {artist.gallery.map((img, idx) => (
                <img key={idx} src={img} alt="Gallery" className="rounded-lg object-cover h-48 w-full border border-white/5 hover:opacity-80 transition-opacity cursor-pointer" />
              ))}
            </div>
            {/* Fake Player */}
            <div className="mt-6 bg-zinc-900 p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-neonBlue rounded-full flex items-center justify-center text-black cursor-pointer hover:scale-105 transition-transform">
                <div className="ml-1 w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-black border-b-[6px] border-b-transparent"></div>
              </div>
              <div className="flex-1">
                <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-brand-neonBlue"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Live Set 2023 - Intro</span>
                  <span>01:23 / 04:00</span>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section>
             <h2 className="text-2xl font-bold text-white mb-4">Reviews</h2>
             <div className="space-y-4">
               {artist.reviews.length > 0 ? artist.reviews.map(review => (
                 <div key={review.id} className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
                   <div className="flex justify-between mb-2">
                     <span className="font-bold text-white">{review.author}</span>
                     <span className="text-gray-500 text-sm">{review.date}</span>
                   </div>
                   <div className="flex mb-2">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={14} className={`${i < Math.floor(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
                     ))}
                   </div>
                   <p className="text-gray-400">{review.text}</p>
                 </div>
               )) : <p className="text-gray-500 italic">No reviews yet.</p>}
             </div>
          </section>
        </div>

        {/* Right Sticky Sidebar (Booking Calculator) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="text-center mb-6 pb-6 border-b border-white/10">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Starting Price</p>
              <p className="text-4xl font-bold text-white">${withSono ? artist.priceWithSono : artist.priceWithoutSono}</p>
              {withSono && <p className="text-brand-neonBlue text-sm font-medium mt-1">Includes Full Sound System</p>}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Event Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-lg py-3 px-4 text-white outline-none focus:border-brand-neonBlue [color-scheme:dark]"
                  />
                  <Calendar className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Venue Location *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="City, State"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-lg py-3 px-4 text-white outline-none focus:border-brand-neonBlue"
                  />
                  <MapPin className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Sono Toggle */}
              <div className="bg-black p-4 rounded-xl border border-white/10 flex items-center justify-between cursor-pointer" onClick={() => setWithSono(!withSono)}>
                <div>
                  <span className="block text-white font-medium">Need Sound System?</span>
                  <span className="text-xs text-gray-500">Artist brings speakers & lights</span>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${withSono ? 'bg-brand-neonBlue' : 'bg-zinc-800'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${withSono ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-sm pt-4">
                <div className="flex justify-between text-gray-400">
                  <span>Artist Fee</span>
                  <span>${basePrice}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Travel Estimate</span>
                  <span>${travelFee}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Service Fee (5%)</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                  <span>Total Estimate</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                onClick={handleContinueToBooking}
                className="block w-full bg-brand-neonBlue hover:bg-brand-neonBlue/90 text-black font-bold text-center py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]"
              >
                Continue to Booking
              </button>

              <div className="text-center">
                <span className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <ShieldCheck size={12} /> Secure platform
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;