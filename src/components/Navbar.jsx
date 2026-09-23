import React from 'react';
import { Sprout, WifiOff, Cpu, Globe } from 'lucide-react';
import translations from '../data/translations.json';

const LANGUAGES = [
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'en', label: 'English' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' }
];

export default function Navbar({ lang, setLang, openSocModal }) {
  const t = translations[lang] || translations.en;

  return (
    <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-40 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2.5 rounded-xl shadow-lg shadow-emerald-900/30">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-wide">{t.appTitle}</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Bharat AI-SoC
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{t.subtitle}</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Offline Badge */}
          <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-inner">
            <WifiOff className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{t.offlineBadge}</span>
          </div>

          {/* SoC Benchmark Button */}
          <button
            onClick={openSocModal}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            title="View Edge SoC Benchmarks"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">{t.socBenchmark}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1">
            <Globe className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
