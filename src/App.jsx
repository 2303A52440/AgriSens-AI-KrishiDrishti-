import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SampleSelector from './components/SampleSelector';
import DiagnosticCard from './components/DiagnosticCard';
import AdvisoryPanel from './components/AdvisoryPanel';
import SocBenchmarkModal from './components/SocBenchmarkModal';
import { runOnDeviceInference } from './services/inference_engine';
import translations from './data/translations.json';
import { Camera, Upload, RefreshCw, Sparkles, AlertCircle, FileText } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('hi'); // Default Hindi for Bharat farmers
  const [selectedCropId, setSelectedCropId] = useState('rice_blast');
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSocModalOpen, setIsSocModalOpen] = useState(false);

  const t = translations[lang] || translations.en;

  // Run initial diagnostic on mount
  useEffect(() => {
    handleRunInference('rice_blast');
  }, []);

  const handleRunInference = async (cropId = selectedCropId) => {
    setIsAnalyzing(true);
    const output = await runOnDeviceInference(imagePreview, cropId);
    setResult(output);
    setIsAnalyzing(false);
  };

  const handleCropSelect = (id) => {
    setSelectedCropId(id);
    handleRunInference(id);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      handleRunInference(selectedCropId);
    }
  };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar
        lang={lang}
        setLang={setLang}
        openSocModal={() => setIsSocModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Sample Selector */}
        <SampleSelector
          selectedCropId={selectedCropId}
          onSelectCrop={handleCropSelect}
          t={t}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Image Capture / Scanner Zone */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>{t.uploadTitle}</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">{t.uploadDesc}</p>

              {/* Upload Dropzone Container */}
              <div className="relative border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-4 text-center transition-all bg-slate-950/60 overflow-hidden group">
                {/* SVG Mock Leaf Display */}
                <div className="w-full h-48 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-800">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Crop Leaf" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mb-2 animate-pulse">
                        <Sparkles className="w-8 h-8 text-emerald-400" />
                      </div>
                      <span className="text-xs font-semibold text-emerald-300">Target Leaf Scanner</span>
                      <span className="text-[10px] text-slate-500 mt-1">Live AI Edge Frame Ready</span>
                    </div>
                  )}

                  {/* Scanning Line Animation */}
                  {isAnalyzing && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent top-0 animate-ping"></div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <label className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors shadow-md shadow-emerald-950">
                    <Upload className="w-4 h-4" />
                    <span>Upload Leaf Photo</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>

                  <button
                    onClick={() => handleRunInference(selectedCropId)}
                    disabled={isAnalyzing}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
                    <span>Re-Scan</span>
                  </button>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-4 bg-slate-950/80 border border-slate-800 p-3 rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-normal">
                  Model executing locally on device. <strong className="text-slate-200">Zero data sent to cloud.</strong> Fully functional without internet connectivity.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic & Advisory Results */}
          <div className="lg:col-span-8">
            {isAnalyzing ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">{t.analyzing}</h3>
                <p className="text-xs text-slate-400">Processing tensor normalization & lesion segmentation on Edge SoC</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                <DiagnosticCard
                  result={result}
                  lang={lang}
                  t={t}
                  isSpeaking={isSpeaking}
                  setIsSpeaking={setIsSpeaking}
                  onExportPdf={handleExportPdf}
                />
                <AdvisoryPanel disease={result.disease} t={t} />
              </div>
            ) : null}
          </div>
        </div>
      </main>

      {/* SoC Modal */}
      <SocBenchmarkModal
        isOpen={isSocModalOpen}
        onClose={() => setIsSocModalOpen(false)}
        metrics={result?.socMetrics}
        t={t}
      />

      {/* Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800/80 py-4 mt-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div>
            <strong className="text-slate-200">Bharat AI-SoC Challenge 2026–27</strong> — Open Qualifying Entry
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Phase 1 Deadline: 30 Nov 2026</span>
            <span>100% On-Device Offline Operation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
