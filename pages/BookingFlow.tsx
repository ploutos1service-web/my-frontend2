import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Calendar, MapPin, Users, DollarSign, Lock, ChevronRight, ChevronLeft } from 'lucide-react';
import { MOCK_ARTISTS } from '../constants';

const BookingFlow: React.FC = () => {
  const locationState = useLocation();
  const initialState = locationState.state || {};

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    artistId: initialState.artistId || '1',
    date: initialState.date || '',
    eventType: 'Wedding',
    guests: 100,
    location: initialState.location || '',
    withSono: initialState.withSono || false,
    notes: ''
  });

  const artist = MOCK_ARTISTS.find(a => a.id === bookingData.artistId) || MOCK_ARTISTS[0];

  // Calculations
  const basePrice = bookingData.withSono ? artist.priceWithSono : artist.priceWithoutSono;
  const travelFee = 50;
  const serviceFee = Math.round(basePrice * 0.05);
  const total = basePrice + travelFee + serviceFee;

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-10 max-w-2xl mx-auto relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-10"></div>
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className={`relative flex flex-col items-center`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-brand-neonBlue text-black shadow-[0_0_15px_rgba(0,217,255,0.5)]' : 'bg-zinc-900 text-gray-500 border border-zinc-700'}`}>
            {step > s ? <Check size={18} /> : s}
          </div>
          <span className={`absolute top-12 text-xs font-medium uppercase ${step >= s ? 'text-brand-neonBlue' : 'text-gray-600'}`}>
            {s === 1 ? 'Details' : s === 2 ? 'Options' : s === 3 ? 'Payment' : 'Done'}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-12 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {renderStepIndicator()}

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neonBlue/5 rounded-full blur-[80px] pointer-events-none"></div>

          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Event Type</label>
                  <select
                    value={bookingData.eventType}
                    onChange={(e) => setBookingData({ ...bookingData, eventType: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white outline-none focus:border-brand-neonBlue"
                  >
                    <option>Wedding</option>
                    <option>Birthday</option>
                    <option>Corporate</option>
                    <option>Club Party</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Guest Count</label>
                  <input
                    type="number"
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({ ...bookingData, guests: Number(e.target.value) })}
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white outline-none focus:border-brand-neonBlue"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Venue Address"
                    value={bookingData.location}
                    onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white outline-none focus:border-brand-neonBlue"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Special Requests / Notes</label>
                  <textarea
                    rows={3}
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white outline-none focus:border-brand-neonBlue"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Booking Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${!bookingData.withSono ? 'border-brand-neonBlue bg-brand-neonBlue/5 shadow-[0_0_20px_rgba(0,217,255,0.1)]' : 'border-zinc-700 bg-black hover:border-gray-500'}`} onClick={() => setBookingData({...bookingData, withSono: false})}>
                  <h3 className="text-xl font-bold text-white mb-2">Artist Only</h3>
                  <p className="text-gray-400 text-sm mb-4">Artist connects to venue's existing sound system.</p>
                  <p className="text-2xl font-bold text-white">${artist.priceWithoutSono}</p>
                </div>
                <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${bookingData.withSono ? 'border-brand-neonBlue bg-brand-neonBlue/5 shadow-[0_0_20px_rgba(0,217,255,0.1)]' : 'border-zinc-700 bg-black hover:border-gray-500'}`} onClick={() => setBookingData({...bookingData, withSono: true})}>
                   <h3 className="text-xl font-bold text-white mb-2">With Sono System</h3>
                   <p className="text-gray-400 text-sm mb-4">Includes high-end speakers, subwoofer, and lights.</p>
                   <p className="text-2xl font-bold text-white">${artist.priceWithSono}</p>
                </div>
              </div>
              <div className="bg-black p-6 rounded-xl border border-white/10 mt-6">
                 <h4 className="text-lg font-bold text-white mb-4">Price Breakdown</h4>
                 <div className="space-y-2">
                    <div className="flex justify-between text-gray-400"><span>Base</span><span>${basePrice}</span></div>
                    <div className="flex justify-between text-gray-400"><span>Travel (Estimated)</span><span>${travelFee}</span></div>
                    <div className="flex justify-between text-gray-400"><span>Service Fee</span><span>${serviceFee}</span></div>
                    <div className="flex justify-between text-brand-neonBlue font-bold text-xl pt-4 border-t border-zinc-800"><span>Total</span><span>${total}</span></div>
                 </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Payment</h2>
              <div className="flex gap-4 mb-8">
                <div className="flex-1 p-4 border border-brand-neonBlue bg-brand-neonBlue/10 rounded-lg text-center cursor-pointer">
                  <span className="block font-bold text-white">Pay Deposit (50%)</span>
                  <span className="text-sm text-gray-400">${total / 2} now</span>
                </div>
                <div className="flex-1 p-4 border border-zinc-700 bg-black rounded-lg text-center cursor-pointer opacity-60">
                  <span className="block font-bold text-white">Pay Full</span>
                  <span className="text-sm text-gray-400">${total} now</span>
                </div>
              </div>

              <div className="bg-black p-6 rounded-xl border border-white/10 space-y-4">
                <div>
                   <label className="block text-gray-400 text-xs uppercase mb-1">Card Number</label>
                   <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-zinc-900 border border-white/10 rounded p-3 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-gray-400 text-xs uppercase mb-1">Expiry</label>
                     <input type="text" placeholder="MM/YY" className="w-full bg-zinc-900 border border-white/10 rounded p-3 text-white" />
                  </div>
                  <div>
                     <label className="block text-gray-400 text-xs uppercase mb-1">CVC</label>
                     <input type="text" placeholder="123" className="w-full bg-zinc-900 border border-white/10 rounded p-3 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                <Lock size={14} /> Payments are secure and encrypted.
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-24 h-24 bg-brand-neonBlue/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,217,255,0.3)]">
                <Check size={48} className="text-brand-neonBlue" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">Booking Confirmed!</h2>
              <p className="text-gray-400 mb-8">Your request has been sent to <span className="text-white font-bold">{artist.name}</span>.</p>
              <div className="bg-black inline-block text-left p-6 rounded-xl border border-white/10 min-w-[300px] mb-8">
                 <p className="text-gray-500 text-xs uppercase mb-4">Booking Reference #VOD-8829</p>
                 <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-white"><Calendar size={16} className="text-brand-neonPurple"/> {bookingData.date || 'Date TBD'}</div>
                    <div className="flex items-center gap-2 text-white"><MapPin size={16} className="text-brand-neonPurple"/> {bookingData.location || 'Location TBD'}</div>
                    <div className="flex items-center gap-2 text-white"><DollarSign size={16} className="text-brand-neonPurple"/> Total: ${total}</div>
                 </div>
              </div>
              <div className="flex justify-center gap-4">
                 <Link to="/dashboard/client" className="bg-brand-neonBlue text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">Go to Dashboard</Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center px-6 py-3 rounded-lg text-white font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/10'}`}
              >
                <ChevronLeft size={20} className="mr-2" /> Back
              </button>
              <button
                onClick={nextStep}
                className="flex items-center bg-brand-neonBlue text-black px-8 py-3 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-shadow"
              >
                {step === 3 ? 'Pay & Book' : 'Next Step'} <ChevronRight size={20} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;