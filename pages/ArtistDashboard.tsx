import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Eye, Calendar, Sliders, Edit2 } from 'lucide-react';

const data = [
  { name: 'Jan', bookings: 2 },
  { name: 'Feb', bookings: 4 },
  { name: 'Mar', bookings: 3 },
  { name: 'Apr', bookings: 6 },
  { name: 'May', bookings: 8 },
  { name: 'Jun', bookings: 5 },
];

const ArtistDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">Artist Portal</h1>
            <p className="text-gray-400">Manage your profile, pricing, and bookings.</p>
          </div>
          <Link to="/artist/setup" className="bg-brand-neonBlue text-black px-6 py-3 rounded-lg font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(0,217,255,0.3)] flex items-center gap-2">
            <Edit2 size={18} /> Edit Profile
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-brand-neonBlue/10 rounded-lg text-brand-neonBlue"><DollarSign size={24}/></div>
              <span className="text-green-400 text-xs">+12%</span>
            </div>
            <p className="text-gray-400 text-sm">Total Earnings</p>
            <p className="text-2xl font-bold text-white">$14,250</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
             <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-brand-neonPurple/10 rounded-lg text-brand-neonPurple"><Calendar size={24}/></div>
              <span className="text-white text-xs">4 Pending</span>
            </div>
            <p className="text-gray-400 text-sm">Bookings (Month)</p>
            <p className="text-2xl font-bold text-white">8</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
             <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/10 rounded-lg text-white"><Eye size={24}/></div>
            </div>
            <p className="text-gray-400 text-sm">Profile Views</p>
            <p className="text-2xl font-bold text-white">1,204</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Performance</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: '#fff' }}
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  />
                  <Bar dataKey="bookings" fill="#00D9FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Pricing Settings */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Sliders size={20}/> Quick Pricing</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Base Price (No Sono)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input type="number" defaultValue={1000} className="w-full bg-black border border-white/20 rounded p-2 pl-6 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">With Sono Price</label>
                 <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input type="number" defaultValue={1500} className="w-full bg-black border border-white/20 rounded p-2 pl-6 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                 <span className="text-sm text-white">Last Minute Deal?</span>
                 <input type="checkbox" defaultChecked className="accent-brand-neonPurple w-5 h-5" />
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded mt-2 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;