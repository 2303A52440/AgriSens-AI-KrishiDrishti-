import React from 'react';
import { ShieldAlert, Volume2, Square, Download, Activity, CheckCircle2, AlertTriangle, Bug } from 'lucide-react';
import { speakAdvisory, stopSpeaking } from '../services/tts_service';

export default function DiagnosticCard({ result, lang, t, isSpeaking, setIsSpeaking, onExportPdf }) {
  if (!result) return null;

  const { disease, confidence, affectedAreaPct, socMetrics } = result;

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToSpeak = `${disease.disease_name}. ${t.severityTitle}: ${disease.severity_level}. ${t.organicTab}: ${disease.organic_treatment}`;
      speakAdvisory(textToSpeak, lang, () => setIsSpeaking(false));
    }
  };

  // Severity gauge color & icon
  const getSeverityStyle = (pct) => {
    if (pct === 0) return { bg: 'bg-emerald-500', text: 'text-emerald-400', label: 'Healthy (0%)', icon: CheckCircle2 };
    if (pct < 25) return { bg: 'bg-amber-500', text: 'text-amber-400', label: 'Mild (10-25%)', icon: AlertTriangle };
    if (pct < 50) return { bg: 'bg-orange-500', text: 'text-orange-400', label: 'Moderate (25-50%)', icon: AlertTriangle };
    if (pct < 75) return { bg: 'bg-rose-500', text: 'text-rose-400', label: 'Severe (50-75%)', icon: ShieldAlert };
    return { bg: 'bg-purple-600', text: 'text-purple-400', label: 'Critical (>75%)', icon: Bug };
  };

  const severityStyle = getSeverityStyle(affectedAreaPct);
  const SeverityIcon = severityStyle.icon;

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl mb-6">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700/80 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {disease.crop}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {disease.category}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">{disease.disease_name}</h2>
          <p className="text-sm italic text-slate-400">{disease.scientific_name}</p>
        </div>

        {/* Confidence & Actions */}
        <div className="flex items-center gap-3">
          <div className="text-right bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.confidence}</span>
            <span className="text-lg font-bold text-emerald-400">{confidence}%</span>
          </div>

          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md ${
              isSpeaking
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isSpeaking ? (
              <>
                <Square className="w-4 h-4" />
                <span>{t.stopVoice}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{t.listenVoice}</span>
              </>
            )}
          </button>

          <button
            onClick={onExportPdf}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all"
            title="Download PDF Report"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">{t.exportReport}</span>
          </button>
        </div>
      </div>

      {/* Severity & Affected Surface Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <span className="text-xs text-slate-400 font-medium block mb-1">{t.severityTitle}</span>
          <div className="flex items-center gap-2">
            <SeverityIcon className={`w-5 h-5 ${severityStyle.text}`} />
            <span className={`text-base font-bold ${severityStyle.text}`}>{disease.severity_level}</span>
          </div>
        </div>

        {/* Lesion Surface Meter */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-slate-300 font-medium">{t.lesionArea}</span>
            <span className="font-bold text-white">{affectedAreaPct}% Surface Affected</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-500 ${severityStyle.bg}`}
              style={{ width: `${affectedAreaPct}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Symptoms List */}
      <div className="mt-4">
        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Key Observed Symptoms</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {disease.symptoms.map((sym, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-300">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{sym}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
