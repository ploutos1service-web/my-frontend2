import React from 'react';
import { Users, ShieldCheck, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <h1 className="text-4xl font-bold text-white mb-10">Admin Console</h1>
         <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg mb-8">
           <p className="text-red-400">⚠️ Demo Mode: Admin actions are simulated.</p>
         </div>

         <div className="space-y-8">
            {/* Pending Approvals */}
            <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
               <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
                 <h3 className="font-bold text-white">Artist Approvals</h3>
                 <span className="bg-brand-neonBlue/20 text-brand-neonBlue text-xs px-2 py-1 rounded-full">2 Pending</span>
               </div>
               <table className="w-full text-left text-sm">
                 <thead className="bg-black/50 text-gray-400">
                    <tr>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Joined</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                 </thead>
                 <tbody className="text-gray-300 divide-y divide-white/5">
                    <tr>
                      <td className="px-6 py-4">The Jazz Cats</td>
                      <td className="px-6 py-4">Band</td>
                      <td className="px-6 py-4">Today</td>
                      <td className="px-6 py-4">
                        <button className="text-green-400 hover:underline mr-3">Approve</button>
                        <button className="text-red-400 hover:underline">Deny</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">DJ Spark</td>
                      <td className="px-6 py-4">DJ</td>
                      <td className="px-6 py-4">Yesterday</td>
                      <td className="px-6 py-4">
                        <button className="text-green-400 hover:underline mr-3">Approve</button>
                        <button className="text-red-400 hover:underline">Deny</button>
                      </td>
                    </tr>
                 </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
