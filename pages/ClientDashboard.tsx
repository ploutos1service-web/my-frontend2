import React, { useState } from 'react';
import { MessageSquare, Calendar, Heart, Settings, Send } from 'lucide-react';
import { getVibeRecommendation } from '../services/geminiService';

const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hey! I\'m VibeBot. Looking for a specific sound for your next party?' }
  ]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');

    // Call Gemini
    const aiResponse = await getVibeRecommendation(userMsg);
    setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white">My Dashboard</h1>
            <p className="text-gray-400">Welcome back, Alex.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 space-y-2">
              <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all ${activeTab === 'bookings' ? 'bg-brand-neonBlue/10 text-brand-neonBlue border border-brand-neonBlue/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <Calendar size={18} /> Bookings
              </button>
              <button onClick={() => setActiveTab('favorites')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all ${activeTab === 'favorites' ? 'bg-brand-neonBlue/10 text-brand-neonBlue border border-brand-neonBlue/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <Heart size={18} /> Favorites
              </button>
              <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all ${activeTab === 'messages' ? 'bg-brand-neonBlue/10 text-brand-neonBlue border border-brand-neonBlue/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <MessageSquare size={18} /> Messages
              </button>
              <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all ${activeTab === 'settings' ? 'bg-brand-neonBlue/10 text-brand-neonBlue border border-brand-neonBlue/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <Settings size={18} /> Settings
              </button>
            </div>

            {/* AI Vibe Bot Widget */}
            <div className="mt-6 bg-zinc-900 border border-brand-neonPurple/30 rounded-xl overflow-hidden flex flex-col h-96 shadow-[0_0_20px_rgba(156,47,255,0.15)]">
              <div className="bg-brand-neonPurple/10 p-4 border-b border-brand-neonPurple/20">
                 <h3 className="text-brand-neonPurple font-bold flex items-center gap-2 text-sm uppercase tracking-wider">✨ VibeBot Assistant</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-zinc-800 text-white ml-8' : 'bg-brand-neonPurple/20 text-white mr-8'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="p-3 border-t border-white/10 bg-black flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask for recommendations..."
                  className="flex-1 bg-zinc-900 rounded px-3 py-2 text-sm outline-none text-white border border-transparent focus:border-brand-neonPurple"
                />
                <button type="submit" className="bg-brand-neonPurple p-2 rounded text-white hover:bg-brand-neonPurple/80"><Send size={16}/></button>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Upcoming Bookings</h2>
                {/* Mock Booking Card */}
                <div className="bg-zinc-900 rounded-xl border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-brand-neonBlue/30 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden">
                        <img src="https://picsum.photos/800/600?random=1" alt="Artist" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-white">DJ Neon Pulse</h3>
                        <p className="text-gray-400 text-sm">Wedding Afterparty • New York</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded bg-green-900/50 text-green-400 text-xs border border-green-900">Confirmed</span>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-white font-bold mb-1">Oct 24, 2024</p>
                     <button className="text-brand-neonBlue text-sm hover:underline">View Details</button>
                   </div>
                </div>
              </div>
            )}
            {activeTab === 'messages' && (
              <div className="h-[500px] flex items-center justify-center text-gray-500 bg-zinc-900/50 rounded-xl border border-white/5">
                No messages yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
