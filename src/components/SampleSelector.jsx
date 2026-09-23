import React from 'react';
import diseaseDatabase from '../data/disease_database.json';

const CROP_ICONS = {
  rice_blast: '🌾',
  tomato_late_blight: '🍅',
  cotton_bacterial_blight: '☁️',
  potato_early_blight: '🥔',
  corn_fall_armyworm: '🌽',
  wheat_stripe_rust: '🌾',
  healthy_crop: '🍃'
};

export default function SampleSelector({ selectedCropId, onSelectCrop, t }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 mb-6">
      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
        {t.selectSample}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {diseaseDatabase.map((item) => {
          const isSelected = selectedCropId === item.id;
          const icon = CROP_ICONS[item.id] || '🌱';
          return (
            <button
              key={item.id}
              onClick={() => onSelectCrop(item.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all ${
                isSelected
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950'
                  : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <span className="text-2xl mb-1">{icon}</span>
              <span className="text-xs font-medium line-clamp-1">{item.crop.split(' ')[0]}</span>
              <span className="text-[10px] text-slate-400 line-clamp-1">{item.disease_name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
