
import React from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { WasteClassifier } from './components/WasteClassifier';
import { PickupSchedule } from './components/PickupSchedule';
import { Recycle, Leaf, Heart, ShieldCheck, Github, ExternalLink, Menu, Bell, User } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col antialiased selection:bg-green-100 selection:text-green-900">
      {/* Premium Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 px-4 h-16 md:h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
              <Leaf className="text-white" size={22} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">Garbage Clinic</h1>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-0.5">Community First</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 bg-gray-50/50 px-6 py-2 rounded-full border border-gray-100">
            <a href="#classify" className="text-xs font-bold text-gray-500 hover:text-green-600 transition-colors uppercase tracking-widest">AI Scanner</a>
            <a href="#schedule" className="text-xs font-bold text-gray-500 hover:text-green-600 transition-colors uppercase tracking-widest">Logistics</a>
            <a href="#impact" className="text-xs font-bold text-gray-500 hover:text-green-600 transition-colors uppercase tracking-widest">Our Impact</a>
          </nav>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2.5 text-gray-400 hover:text-green-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="hidden md:flex items-center gap-2 pl-2 pr-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-md active:scale-95 group">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-[10px] font-bold">
                <User size={14} />
              </div>
              <span className="text-xs font-bold">My Account</span>
            </button>
            <button className="lg:hidden p-2 text-gray-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-5 py-8 md:py-12 w-full">
        {/* Dynamic Hero Section */}
        <section className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold mb-8 uppercase tracking-[0.2em] border border-emerald-100/50 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Nationwide Cleanliness Drive
          </div>
          
          <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight max-w-4xl">
            Gadi Wala Aaya, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Ghar Se Kachra Nikal!</span>
          </h2>
          
          <p className="text-base md:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed">
            The anthem of a cleaner India, now powered by AI. Join millions in segregating waste and making our cities shine with Shyam Bairagi's melody.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
            {[
              { icon: Recycle, color: 'text-green-500', val: '12.4M', label: 'Waste Segregated', desc: 'Across 12 cities' },
              { icon: ShieldCheck, color: 'text-blue-500', val: '99.2%', label: 'AI Accuracy', desc: 'Real-time detection' },
              { icon: Heart, color: 'text-rose-500', val: '5k+', label: 'Volunteers', desc: 'Active daily' },
              { icon: Leaf, color: 'text-emerald-500', val: '180k', label: 'Carbon Saved', desc: 'Metric tons CO2' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500 text-left group">
                <stat.icon className={`${stat.color} mb-4 group-hover:scale-110 transition-transform`} size={24} />
                <div className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{stat.val}</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-[10px] text-gray-400 leading-tight">{stat.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Grid */}
        <div className="space-y-12">
          <AudioPlayer />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div id="classify">
              <WasteClassifier />
            </div>
            <div id="schedule">
              <PickupSchedule />
            </div>
          </div>
        </div>

        {/* Visual Education Section */}
        <section id="impact" className="mt-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-black text-gray-900 mb-4">Master Your Segregation</h3>
            <p className="text-gray-500 font-medium">Small habits lead to giant changes. Here's how to separate like a pro.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Organic / Wet', color: 'from-emerald-500 to-green-600', emoji: '🥗', desc: 'Food scraps, peels, flowers. Used for nutrient-rich compost.' },
              { title: 'Dry / Recyclable', color: 'from-blue-500 to-indigo-600', emoji: '📦', desc: 'Plastics, paper, glass. Sent to processing plants for reuse.' },
              { title: 'Domestic Hazard', color: 'from-rose-500 to-orange-600', emoji: '🧪', desc: 'Sanitary waste, paints, medicines. Requires specialized handling.' }
            ].map((card, i) => (
              <div key={i} className="group relative overflow-hidden bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 p-8 flex flex-col h-full hover:-translate-y-2 transition-all duration-500">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-5 rounded-bl-[100px]`} />
                <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 shadow-gray-100`}>
                  <span className="text-2xl">{card.emoji}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{card.desc}</p>
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Learn More</span>
                  <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-600 group-hover:text-white transition-all`}>
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modern High-End Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gray-50">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
                  <Leaf className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-black tracking-tight text-gray-900">Garbage Clinic</h1>
              </div>
              <p className="text-gray-500 text-base max-w-sm leading-relaxed mb-8">
                Building a circular economy where waste is seen as a resource. Inspired by the legends, built for the future.
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
                  Join Newsletter
                </button>
                <div className="flex gap-2">
                  <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-green-600 transition-colors border border-gray-100">
                    <Github size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h5 className="font-black text-xs uppercase tracking-[0.2em] text-gray-900 mb-8">Platform</h5>
                <ul className="space-y-4 text-sm font-medium text-gray-500">
                  <li><a href="#" className="hover:text-green-600 transition-colors">AI Scanner</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Route Planner</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Pickup Status</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Clinic Rewards</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-black text-xs uppercase tracking-[0.2em] text-gray-900 mb-8">Company</h5>
                <ul className="space-y-4 text-sm font-medium text-gray-500">
                  <li><a href="#" className="hover:text-green-600 transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Sustainability</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Media Kit</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Careers</a></li>
                </ul>
              </div>
              <div className="hidden md:block">
                <h5 className="font-black text-xs uppercase tracking-[0.2em] text-gray-900 mb-8">Support</h5>
                <ul className="space-y-4 text-sm font-medium text-gray-500">
                  <li><a href="#" className="hover:text-green-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Legal Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col md:row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            <p>© 2024 GARBAGE CLINIC GLOBAL. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-2">
               <Heart size={12} className="text-rose-500 fill-rose-500" />
               FOR SWACHH BHARAT MISSION
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
