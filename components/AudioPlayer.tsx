
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Mic2, Heart, Share2 } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(p || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-6 md:p-8 border border-gray-100 overflow-hidden relative group transition-all duration-500 hover:shadow-green-100/30">
      {/* Background Glow */}
      <div className={`absolute -right-20 -top-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Album Art Container */}
        <div className="relative group/art">
          <div className={`w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-200 flex items-center justify-center transition-transform duration-700 ${isPlaying ? 'scale-105 rotate-3' : 'scale-100'}`}>
            <Music size={56} className="text-white drop-shadow-lg" />
            
            {/* Play/Pause Overlay for Art */}
            <button 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/art:opacity-100 transition-opacity rounded-[2.5rem] backdrop-blur-[2px]"
            >
              {isPlaying ? <Pause size={32} className="text-white" fill="currentColor" /> : <Play size={32} className="text-white ml-2" fill="currentColor" />}
            </button>
          </div>
          {/* Audio Visualization - Dummy Bars */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 h-8 w-24 px-2">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 bg-green-500/30 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-1 opacity-50'}`}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  height: isPlaying ? `${Math.random() * 100}%` : '4px'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Content & Controls */}
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                 <div className="px-2 py-0.5 bg-green-50 rounded-full border border-green-100">
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">National Anthem of Swachhata</span>
                 </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">Gadi Wala Aaya...</h3>
              <p className="text-gray-400 text-sm font-bold flex items-center justify-center md:justify-start gap-2">
                Shyam Bairagi <span className="w-1 h-1 bg-gray-300 rounded-full" /> Garbage Clinic Official
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90">
                <Heart size={20} />
              </button>
              <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-blue-50 hover:text-blue-500 transition-all active:scale-90">
                <Share2 size={20} />
              </button>
            </div>
          </div>
          
          {/* Progress Slider */}
          <div className="mb-8 group/slider">
            <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
              <span>{Math.floor((audioRef.current?.currentTime || 0) / 60)}:{(Math.floor(audioRef.current?.currentTime || 0) % 60).toString().padStart(2, '0')}</span>
              <span className="text-green-600">Now Streaming</span>
              <span>{Math.floor((audioRef.current?.duration || 0) / 60)}:{(Math.floor(audioRef.current?.duration || 0) % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden cursor-pointer relative">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all duration-300 relative shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-green-500 opacity-0 group-hover/slider:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-8">
            <button className="text-gray-300 hover:text-gray-600 transition-colors">
              <SkipBack size={28} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all shadow-2xl active:scale-95 group/btn"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
            </button>
            <button className="text-gray-300 hover:text-gray-600 transition-colors">
              <SkipForward size={28} />
            </button>
            
            <div className="hidden lg:flex items-center gap-3 ml-auto text-gray-400">
              <button onClick={() => setIsMuted(!isMuted)}>
                <Volume2 size={20} className={isMuted ? 'text-red-400' : 'text-gray-400'} />
              </button>
              <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gray-300 rounded-full ${isMuted ? 'w-0' : 'w-3/4'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
};
