import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, Upload, MapPin, DollarSign, Music, Zap, Clock, 
  Info, Camera, FileText, CheckCircle, ChevronRight, ChevronLeft, Shield 
} from 'lucide-react';

const ArtistProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // File Refs
  const profileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const riderInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    // Basic
    stageName: '',
    fullName: '',
    phone: '',
    location: '',
    category: 'DJ',
    
    // Vibe & Questions
    bio: '',
    genres: [] as string[],
    genreInput: '',
    experienceYears: '',
    equipmentList: '',
    
    // Media (Mock URLs for preview)
    profileImage: null as string | null,
    galleryImages: [] as string[],
    techRiderFile: null as string | null,
    socialInstagram: '',
    socialSoundcloud: '',

    // Logistics
    priceNoSono: 1000,
    priceWithSono: 1500,
    travelKm: 100,
    hasInsurance: false,
    insuranceProvider: '',
    lastMinute: true,
  });

  const steps = [
    { id: 1, title: "Identity", icon: Info },
    { id: 2, title: "The Vibe", icon: Music },
    { id: 3, title: "Media & Assets", icon: Camera },
    { id: 4, title: "Logistics", icon: DollarSign },
  ];

  // --- Handlers ---

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleAddGenre = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const val = formData.genreInput.trim();
      if (!val) return;

      if (formData.genres.length >= 10) {
        return;
      }
      
      // Prevent duplicates
      if (!formData.genres.includes(val)) {
        setFormData(prev => ({
          ...prev,
          genres: [...prev.genres, val],
          genreInput: ''
        }));
      } else {
        setFormData(prev => ({ ...prev, genreInput: '' }));
      }
    }
  };

  const removeGenre = (genre: string) => {
    setFormData(prev => ({ ...prev, genres: prev.genres.filter(g => g !== genre) }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'gallery' | 'rider') => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a fake local URL for preview
      const url = URL.createObjectURL(file);
      
      if (type === 'profile') setFormData(prev => ({ ...prev, profileImage: url }));
      if (type === 'rider') setFormData(prev => ({ ...prev, techRiderFile: file.name }));
      if (type === 'gallery') setFormData(prev => ({ ...prev, galleryImages: [...prev.galleryImages, url] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API save
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard/artist');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Build Your Artist Profile</h1>
          <p className="text-gray-400">Complete these steps to activate your booking page.</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-10"></div>
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-black px-2">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${currentStep >= step.id 
                  ? 'bg-brand-neonBlue border-brand-neonBlue text-black shadow-[0_0_15px_rgba(0,217,255,0.4)]' 
                  : 'bg-zinc-900 border-zinc-700 text-gray-500'}`}
              >
                <step.icon size={20} />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-brand-neonBlue' : 'text-gray-600'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-neonBlue/5 rounded-full blur-[100px] pointer-events-none"></div>

          <form onSubmit={handleSubmit}>
            
            {/* --- STEP 1: IDENTITY --- */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Stage Name / Band Name *</label>
                    <input 
                      required
                      value={formData.stageName}
                      onChange={e => setFormData({...formData, stageName: e.target.value})}
                      className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-brand-neonBlue outline-none" 
                      placeholder="e.g. The Night Owls"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Legal Name (Private) *</label>
                    <input 
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-brand-neonBlue outline-none" 
                      placeholder="For contracts & payouts"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Primary Category *</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-brand-neonBlue outline-none cursor-pointer"
                    >
                        <option>DJ</option>
                        <option>Live Band</option>
                        <option>Soloist</option>
                        <option>Ensemble</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Phone Number *</label>
                    <input 
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-brand-neonBlue outline-none" 
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-300">Home Base Location *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 text-gray-500" size={18} />
                      <input 
                        required
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-black border border-white/20 rounded-lg p-3 pl-10 text-white focus:border-brand-neonBlue outline-none" 
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 2: VIBE & QUESTIONS --- */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Style & Experience</h2>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Artist Bio *</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-brand-neonPurple outline-none" 
                    placeholder="Tell clients about your style, your energy, and what they can expect..."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">Genres (Type & Enter) *</label>
                    <span className={`text-xs ${formData.genres.length >= 10 ? 'text-brand-neonBlue' : 'text-gray-500'}`}>
                      {formData.genres.length}/10
                    </span>
                  </div>
                  <div className="relative">
                    <Music className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    <input 
                      value={formData.genreInput}
                      onChange={e => setFormData({...formData, genreInput: e.target.value})}
                      onKeyDown={handleAddGenre}
                      disabled={formData.genres.length >= 10}
                      placeholder={formData.genres.length >= 10 ? "Max genres reached" : "House, Jazz, Top 40, R&B..."}
                      className={`w-full bg-black border rounded-lg p-3 pl-10 text-white outline-none transition-colors ${formData.genres.length >= 10 ? 'border-brand-neonBlue/50 opacity-50 cursor-not-allowed' : 'border-white/20 focus:border-brand-neonPurple'}`} 
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 min-h-[32px]">
                    {formData.genres.map(g => (
                      <span key={g} className="bg-brand-neonPurple/20 text-brand-neonPurple border border-brand-neonPurple/30 px-3 py-1 rounded-full text-sm flex items-center gap-2 animate-fade-in">
                        {g} <button type="button" onClick={() => removeGenre(g)} className="hover:text-white font-bold ml-1">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Years of Experience</label>
                      <select 
                        value={formData.experienceYears}
                        onChange={e => setFormData({...formData, experienceYears: e.target.value})}
                        className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-brand-neonPurple outline-none"
                      >
                         <option value="">Select...</option>
                         <option value="1-3">1-3 Years</option>
                         <option value="3-5">3-5 Years</option>
                         <option value="5-10">5-10 Years</option>
                         <option value="10+">10+ Years</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Social Media Link (Instagram)</label>
                      <input 
                        value={formData.socialInstagram}
                        onChange={e => setFormData({...formData, socialInstagram: e.target.value})}
                        className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-brand-neonPurple outline-none" 
                        placeholder="@username"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Equipment List (Optional)</label>
                    <textarea 
                      rows={2}
                      value={formData.equipmentList}
                      onChange={e => setFormData({...formData, equipmentList: e.target.value})}
                      className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-brand-neonPurple outline-none" 
                      placeholder="e.g. 2x Pioneer CDJ-3000, DJM-900NXS2, Shure SM58..."
                    />
                    <p className="text-xs text-gray-500">List specific gear you bring if booking "With Sono".</p>
                </div>
              </div>
            )}

            {/* --- STEP 3: MEDIA & UPLOADS --- */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Media & Assets</h2>
                
                {/* Profile Picture */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">Profile Picture *</label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center overflow-hidden">
                      {formData.profileImage ? (
                        <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserIconPlaceholder />
                      )}
                    </div>
                    <div>
                      <button 
                        type="button" 
                        onClick={() => profileInputRef.current?.click()}
                        className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
                      >
                        Upload Photo
                      </button>
                      <input 
                        type="file" 
                        ref={profileInputRef} 
                        onChange={(e) => handleFileUpload(e, 'profile')} 
                        className="hidden" 
                        accept="image/*"
                      />
                      <p className="text-xs text-gray-500 mt-2">Recommended: 1000x1000px JPG/PNG</p>
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">Action Shots (Gallery)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.galleryImages.map((img, idx) => (
                       <div key={idx} className="aspect-square rounded-lg bg-zinc-800 overflow-hidden relative group">
                          <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                          <button type="button" className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                             {/* Mock delete */}
                             <div className="w-3 h-3 bg-white rounded-full"></div>
                          </button>
                       </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => galleryInputRef.current?.click()} 
                      className="aspect-square rounded-lg bg-zinc-900 border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center text-gray-500 hover:border-brand-neonBlue hover:text-brand-neonBlue transition-colors"
                    >
                      <Camera size={24} className="mb-2" />
                      <span className="text-xs">Add Photo</span>
                    </button>
                    <input 
                        type="file" 
                        ref={galleryInputRef} 
                        onChange={(e) => handleFileUpload(e, 'gallery')} 
                        className="hidden" 
                        accept="image/*"
                      />
                  </div>
                </div>

                {/* Tech Rider */}
                <div className="p-4 bg-zinc-800/50 rounded-lg border border-white/5">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="p-3 bg-brand-neonBlue/10 rounded-lg text-brand-neonBlue">
                         <FileText size={24} />
                       </div>
                       <div>
                         <h4 className="text-white font-bold text-sm">Tech Rider & Stage Plot</h4>
                         <p className="text-gray-400 text-xs">{formData.techRiderFile ? formData.techRiderFile : "Upload PDF for venues (Optional)"}</p>
                       </div>
                     </div>
                     <button 
                        type="button" 
                        onClick={() => riderInputRef.current?.click()}
                        className="text-brand-neonBlue text-sm font-bold hover:underline"
                      >
                        {formData.techRiderFile ? "Change" : "Upload"}
                     </button>
                     <input 
                        type="file" 
                        ref={riderInputRef} 
                        onChange={(e) => handleFileUpload(e, 'rider')} 
                        className="hidden" 
                        accept="application/pdf"
                      />
                   </div>
                </div>
              </div>
            )}

            {/* --- STEP 4: LOGISTICS & PRICING --- */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Business & Logistics</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Base Price (No Equipment)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3.5 text-gray-500" size={18} />
                        <input 
                          type="number"
                          value={formData.priceNoSono}
                          onChange={e => setFormData({...formData, priceNoSono: parseInt(e.target.value)})}
                          className="w-full bg-black border border-white/20 rounded-lg p-3 pl-10 text-white focus:border-green-400 outline-none" 
                        />
                      </div>
                      <p className="text-xs text-gray-500">Artist fee only.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">With Sono (Full Equipment)</label>
                      <div className="relative">
                        <Zap className="absolute left-3 top-3.5 text-brand-neonBlue" size={18} />
                        <input 
                          type="number"
                          value={formData.priceWithSono}
                          onChange={e => setFormData({...formData, priceWithSono: parseInt(e.target.value)})}
                          className="w-full bg-black border border-brand-neonBlue/30 rounded-lg p-3 pl-10 text-white focus:border-brand-neonBlue outline-none shadow-[0_0_10px_rgba(0,217,255,0.1)]" 
                        />
                      </div>
                      <p className="text-xs text-gray-500">Fee including sound & lighting rental.</p>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex justify-between">
                        <span>Max Travel Distance</span>
                        <span className="text-brand-neonBlue font-bold">{formData.travelKm} km</span>
                      </label>
                      <input 
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={formData.travelKm}
                        onChange={e => setFormData({...formData, travelKm: parseInt(e.target.value)})}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white" 
                      />
                   </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                   {/* Last Minute Toggle */}
                   <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                      <div className="relative flex items-center">
                         <input 
                           type="checkbox"
                           checked={formData.lastMinute}
                           onChange={e => setFormData({...formData, lastMinute: e.target.checked})}
                           className="w-5 h-5 accent-brand-neonPurple rounded" 
                         />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-2 font-bold text-white text-sm">
                           <Clock size={16} className="text-brand-neonPurple" /> Last Minute Availability
                         </div>
                         <p className="text-xs text-gray-500 mt-1">
                           Enable this if you accept bookings for events happening within the next 7 days.
                         </p>
                      </div>
                   </label>

                   {/* Insurance Toggle */}
                   <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                      <div className="relative flex items-center">
                         <input 
                           type="checkbox"
                           checked={formData.hasInsurance}
                           onChange={e => setFormData({...formData, hasInsurance: e.target.checked})}
                           className="w-5 h-5 accent-brand-neonBlue rounded" 
                         />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-2 font-bold text-white text-sm">
                           <Shield size={16} className="text-green-400" /> Public Liability Insurance
                         </div>
                         <p className="text-xs text-gray-500 mt-1">Check this if you have valid PLI coverage for events.</p>
                      </div>
                   </label>
                   
                   {formData.hasInsurance && (
                      <div className="ml-8 space-y-2 animate-fade-in">
                        <label className="text-sm font-medium text-gray-300">Insurance Provider / Policy #</label>
                        <input 
                          value={formData.insuranceProvider}
                          onChange={e => setFormData({...formData, insuranceProvider: e.target.value})}
                          className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-green-400 outline-none" 
                          placeholder="e.g. Hiscox / 992831..."
                        />
                      </div>
                   )}
                </div>

              </div>
            )}

            {/* --- NAVIGATION BUTTONS --- */}
            <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <ChevronLeft size={20} className="mr-2" /> Back
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-brand-neonBlue hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all flex items-center"
                >
                  Next Step <ChevronRight size={20} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-brand-neonBlue text-black px-8 py-3 rounded-lg font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(0,217,255,0.4)] flex items-center gap-2"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <CheckCircle size={20} /> Publish Profile
                    </>
                  )}
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

// Helper for empty avatar
const UserIconPlaceholder = () => (
  <svg className="w-12 h-12 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default ArtistProfileSetup;