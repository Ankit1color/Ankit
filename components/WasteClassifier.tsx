
import React, { useState, useRef } from 'react';
import { Camera, Trash2, CheckCircle2, AlertCircle, Loader2, Sparkles, X, Info } from 'lucide-react';
import { classifyWaste } from '../services/geminiService';
import { ClassificationResult, WasteCategory } from '../types';

export const WasteClassifier: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        analyzeImage(base64.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Data: string) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    try {
      const classification = await classifyWaste(base64Data);
      setResult(classification);
    } catch (err) {
      setError("AI analysis failed. Please ensure the lighting is good.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  const getTheme = (category: WasteCategory) => {
    switch (category) {
      case WasteCategory.WET: return { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-100', dot: 'bg-emerald-500' };
      case WasteCategory.DRY: return { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-100', dot: 'bg-blue-500' };
      case WasteCategory.EWASTE: return { bg: 'bg-zinc-50', text: 'text-zinc-800', border: 'border-zinc-200', dot: 'bg-zinc-800' };
      case WasteCategory.HAZARDOUS: return { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-100', dot: 'bg-rose-500' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-100', dot: 'bg-gray-400' };
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-50 p-6 md:p-10 flex flex-col h-full transition-all hover:shadow-green-50/50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            AI Object Scanner <Sparkles size={22} className="text-yellow-500 fill-yellow-400" />
          </h3>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Smart Segregation</p>
        </div>
        {image && (
          <button 
            onClick={reset}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all border border-gray-100"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 min-h-[320px] border-2 border-dashed border-gray-100 rounded-[3rem] p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50/30 hover:border-green-200 transition-all group relative active:scale-[0.98]"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2.5rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-green-100 transform group-hover:scale-110 transition-transform">
              <Camera size={44} strokeWidth={1.5} />
            </div>
            <p className="text-xl font-black text-gray-900 text-center mb-2">Scan Your Waste</p>
            <p className="text-gray-400 text-sm text-center max-w-[200px] leading-relaxed font-medium">Snap a photo and Gemini AI will do the sorting for you.</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              capture="environment"
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <div className="space-y-8 flex-1 flex flex-col">
            <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-50 shadow-inner group">
              <img src={image} alt="Target object" className="w-full h-full object-cover" />
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-500">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 border-4 border-green-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
                    <Sparkles size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-600 animate-pulse" />
                  </div>
                  <p className="font-black text-gray-900 tracking-widest uppercase text-xs">AI Processing...</p>
                </div>
              )}
            </div>

            {result && !isAnalyzing && (
              <div className={`p-8 rounded-[2.5rem] border-2 ${getTheme(result.category).bg} ${getTheme(result.category).border} animate-in slide-in-from-bottom-6 duration-700`}>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-50">
                    <div className={`w-3 h-3 rounded-full ${getTheme(result.category).dot} animate-pulse`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${getTheme(result.category).text}`}>{result.category}</span>
                    </div>
                    <h4 className="font-black text-2xl text-gray-900 leading-none mb-3 truncate">{result.objectName}</h4>
                    <p className="text-sm font-medium text-gray-600/80 leading-relaxed mb-6">{result.explanation}</p>
                    
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-3xl border border-white/50 shadow-sm flex items-start gap-3">
                      <div className="p-2 bg-green-50 rounded-xl">
                        <Info size={18} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">Clinic Disposal Advice</p>
                        <p className="text-sm font-bold text-gray-700 leading-snug">{result.disposalTip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && !isAnalyzing && (
              <div className="p-6 bg-rose-50 text-rose-800 rounded-[2rem] border border-rose-100 flex items-center gap-4 animate-in fade-in">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                   <AlertCircle size={24} className="text-rose-50" fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-widest">Scanner Error</p>
                  <p className="text-xs font-bold opacity-80">{error}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
