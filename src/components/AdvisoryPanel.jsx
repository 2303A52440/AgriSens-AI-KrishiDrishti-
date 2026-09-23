import React, { useState } from 'react';
import { Leaf, TestTube, ShieldCheck, MapPin, Calculator } from 'lucide-react';

export default function AdvisoryPanel({ disease, t }) {
  const [activeTab, setActiveTab] = useState('organic');
  const [landAcres, setLandAcres] = useState(1);

  if (!disease) return null;

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-700 pb-3 mb-5">
        <button
          onClick={() => setActiveTab('organic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'organic'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Leaf className="w-4 h-4 text-emerald-300" />
          <span>{t.organicTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('chemical')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'chemical'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <TestTube className="w-4 h-4 text-cyan-300" />
          <span>{t.chemicalTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('preventive')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'preventive'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-indigo-300" />
          <span>{t.preventiveTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('regional')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'regional'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4 text-amber-300" />
          <span>{t.regionalTab}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-4">
        {/* 1. Organic Tab */}
        {activeTab === 'organic' && (
          <div className="space-y-4">
            <div className="bg-emerald-950/40 border border-emerald-800/80 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-emerald-300 mb-2">Eco-Friendly & Biological Treatment</h4>
              <p className="text-sm text-slate-200 leading-relaxed">{disease.organic_treatment}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block mb-1">💧 Irrigation Advisory</span>
                <p className="text-xs text-slate-300">{disease.irrigation_advisory}</p>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block mb-1">🌱 Soil & Bio-Nutritional Guidance</span>
                <p className="text-xs text-slate-300">{disease.fertilizer_guidance}</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Chemical Tab */}
        {activeTab === 'chemical' && (
          <div className="space-y-4">
            <div className="bg-cyan-950/40 border border-cyan-800/80 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-cyan-300 mb-2">Recommended Chemical Intervention</h4>
              <p className="text-sm text-slate-200 leading-relaxed">{disease.chemical_treatment}</p>
            </div>

            {/* Dosage Calculator */}
            <div className="bg-slate-900/80 border border-slate-700/80 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{t.dosageCalc}</h4>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-xs text-slate-300 font-medium">{t.enterLand}</label>
                  <input
                    type="number"
                    min="0.25"
                    step="0.25"
                    max="50"
                    value={landAcres}
                    onChange={(e) => setLandAcres(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className="w-24 bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-sm font-bold text-white text-center focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs text-slate-400 font-medium">Acres</span>
                </div>

                <div className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 w-full sm:w-auto text-right">
                  <span className="text-[10px] text-slate-400 block">{t.totalDosage}</span>
                  <span className="text-sm font-extrabold text-cyan-400">
                    {disease.chemical_dosage_per_acre !== 'N/A - 0 Dosage Needed'
                      ? `${disease.chemical_dosage_per_acre} × ${landAcres} Acres`
                      : '0 Dosage (Healthy)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Preventive Tab */}
        {activeTab === 'preventive' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cultural & Field Protection Measures</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {disease.preventive_measures.map((measure, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-200 leading-normal">{measure}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Regional Tab */}
        {activeTab === 'regional' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(disease.regional_guidance).map(([zone, text]) => (
              <div key={zone} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">{zone} India Zone</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
