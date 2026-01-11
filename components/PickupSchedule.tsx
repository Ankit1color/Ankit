
import React from 'react';
import { Calendar, Clock, MapPin, Truck, ChevronRight, ArrowUpRight } from 'lucide-react';
import { PickupSchedule as ScheduleType } from '../types';

const mockSchedules: ScheduleType[] = [
  { day: 'MON', time: '07:30 AM', area: 'Sector 15 & 16', type: 'Dry' },
  { day: 'TUE', time: '08:00 AM', area: 'Downtown Square', type: 'Wet' },
  { day: 'WED', time: '07:45 AM', area: 'Old Town Colony', type: 'E-Waste' },
  { day: 'THU', time: '08:15 AM', area: 'Industrial Belt', type: 'Hazard' },
  { day: 'FRI', time: '07:30 AM', area: 'Residency Park', type: 'Mixed' },
];

export const PickupSchedule: React.FC = () => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-50 p-6 md:p-10 flex flex-col h-full transition-all hover:shadow-green-50/50">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            Logistics Tracker <Truck size={22} className="text-green-500" />
          </h3>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time Fleets</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {mockSchedules.map((item, idx) => (
          <div 
            key={idx} 
            className="group relative flex items-center gap-5 p-5 bg-gray-50/40 rounded-3xl border border-transparent hover:border-green-100 hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center shrink-0 border border-gray-100 group-hover:border-green-100 transition-colors">
               <span className="text-[11px] font-black text-gray-400 uppercase leading-none mb-0.5 group-hover:text-green-600 transition-colors">{item.day}</span>
               <Calendar size={18} className="text-gray-300 group-hover:text-green-500 transition-colors" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black text-gray-400 truncate tracking-[0.1em] uppercase group-hover:text-gray-500 transition-colors">{item.area}</span>
                <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${
                  item.type === 'Wet' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                  item.type === 'Dry' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-100 text-gray-500 border-gray-200'
                }`}>
                  {item.type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-900 font-black text-lg">
                <Clock size={16} className="text-green-500" />
                {item.time}
              </div>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-4">
        <button className="w-full py-5 bg-gray-900 text-white font-black rounded-3xl hover:bg-green-600 transition-all shadow-2xl shadow-gray-200 flex items-center justify-center gap-3 active:scale-[0.97] group">
          <MapPin size={20} className="group-hover:animate-bounce" />
          <span className="text-sm uppercase tracking-[0.2em]">Launch Live Map</span>
        </button>
        <button className="w-full py-4 text-gray-500 font-black text-xs uppercase tracking-widest bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors border border-gray-100">
          Request Priority Pickup
        </button>
      </div>
    </div>
  );
};
