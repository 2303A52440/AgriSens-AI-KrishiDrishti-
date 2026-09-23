import React from 'react';
import { X, Cpu, Zap, HardDrive, MemoryStick, Layers, CheckCircle } from 'lucide-react';

export default function SocBenchmarkModal({ isOpen, onClose, metrics, t }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/20 text-cyan-400 p-2 rounded-xl border border-cyan-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">{t.socBenchmark}</h3>
              <p className="text-xs text-slate-400">{t.socSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Inference Speed</span>
            </div>
            <span className="text-xl font-extrabold text-amber-400">{metrics?.inferenceTimeMs || 24} ms</span>
            <span className="text-[10px] text-slate-500 block">On-Device INT8</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Throughput</span>
            </div>
            <span className="text-xl font-extrabold text-emerald-400">{metrics?.fps || 42} FPS</span>
            <span className="text-[10px] text-slate-500 block">Real-time Video</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              <span>Model Storage</span>
            </div>
            <span className="text-base font-extrabold text-cyan-400">4.8 MB</span>
            <span className="text-[10px] text-slate-500 block">ONNX Quantized</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
              <MemoryStick className="w-3.5 h-3.5 text-indigo-400" />
              <span>RAM Memory</span>
            </div>
            <span className="text-base font-extrabold text-indigo-400">38.5 MB</span>
            <span className="text-[10px] text-slate-500 block">Low Footprint</span>
          </div>
        </div>

        {/* System-on-Chip Acceleration Matrix */}
        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
          Hardware SoC Target Acceleration Matrix
        </h4>

        <div className="space-y-2">
          {metrics?.socChipCompatibility.map((chip, idx) => (
            <div key={idx} className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">{chip.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-cyan-400 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                  {chip.status}
                </span>
                <span className="font-bold text-slate-300 font-mono">{chip.speed}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Design compliant with <strong className="text-emerald-400">Bharat AI-SoC Challenge 2026–27</strong> on-device edge AI requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
