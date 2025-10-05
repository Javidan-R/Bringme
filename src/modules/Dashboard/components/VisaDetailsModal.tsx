// src/modules/Dashboard/components/VisaDetailsModal.tsx - Muted UI & Rich Business Logic

import React, { useState, useEffect } from "react";
import { X, Clock, Briefcase, Map, BarChart, FileText, Download, Info, CheckCircle, Clock3 } from "lucide-react";
import { VisaDetails } from "../types";

interface Props {
  visa: VisaDetails | null;
  onClose: () => void;
}

// Stilin Yenidən İstifadəsi: Tutqun rənglər
const getVisaStyle = (visaType: VisaDetails['visaType']) => {
    switch (visaType) {
        case 'digital':
            return {
                text: "Digital Nomad Visa",
                bg: "bg-blue-800", // Badge daha tünd
                accentColor: "text-blue-800",
                shadow: "shadow-blue-900/10",
                bgSpot: "bg-blue-100/50" // Yuxarı sağ spot (Tutqun)
            };
        case 'investment':
            return {
                text: "Investment Visa",
                bg: "bg-red-800",
                accentColor: "text-red-800",
                shadow: "shadow-red-900/10",
                bgSpot: "bg-red-100/50"
            };
        default:
             return {
                text: "Ancestry Visa",
                bg: "bg-purple-800",
                accentColor: "text-purple-800",
                shadow: "shadow-purple-900/10",
                bgSpot: "bg-purple-100/50"
            };
    }
};

const VisaDetailsModal: React.FC<Props> = ({ visa, onClose }) => {
  if (!visa) return null;
  
  const [downloading, setDownloading] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(true);
  // BUSINESS LOGIC: Hər addımın tamamlanma statusunu simulyasiya edir
  const [processCompletion, setProcessCompletion] = useState<Record<number, 'completed' | 'in-progress' | 'pending'>>({
      1: 'completed',
      2: 'in-progress',
      3: 'pending',
      4: 'pending',
  });
  
  const visaStyle = getVisaStyle(visa.visaType);
  
  // Sənədi yükləmə funksiyası (Biznes Logic)
  const handleDownload = () => {
    setDownloading(true);
    // Simulyasiya: Yüklənmə başladıqdan sonra 2-ci addımı tamamlanmış kimi qeyd et
    setTimeout(() => {
        alert("Official document package downloaded!");
        setDownloading(false);
        setProcessCompletion(prev => ({
            ...prev,
            2: 'completed',
            3: 'in-progress' // Növbəti addıma keçid
        }));
    }, 1500);
  };
  
  // Proses Statusu üçün Ikon & Stil
  const getProcessStatus = (step: number) => {
      const status = processCompletion[step] || 'pending';
      switch (status) {
          case 'completed':
              return { icon: CheckCircle, classes: "bg-green-100 text-green-700" };
          case 'in-progress':
              return { icon: Clock3, classes: "bg-yellow-100 text-yellow-700 animate-pulse" };
          case 'pending':
          default:
              return { icon: Info, classes: "bg-gray-200 text-gray-600" };
      }
  };
  
  // UX: Modal açılanda yuxarıya scroll etmək
  useEffect(() => {
      const modalContent = document.getElementById('visa-modal-content');
      if (modalContent) {
          modalContent.scrollTop = 0;
      }
  }, [visa]);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />
      
      {/* Modal Content Container (Tutqun Fond) */}
      <div 
        id="visa-modal-content"
        className="relative w-full max-w-6xl bg-stone-100/95 rounded-3xl shadow-2xl overflow-y-auto transform transition-all duration-500 scale-100 opacity-100 overflow-hidden" 
        style={{ maxHeight: "95vh" }}
      >
        
        {/* Yuxarı Sağ Qradiyent Spotu */}
         <div 
            className={`absolute top-0 right-0 w-80 h-80 rounded-full 
                        ${visaStyle.bgSpot} opacity-70 
                        transform translate-x-1/3 -translate-y-1/3 z-0`}
            style={{ filter: 'blur(70px)' }} 
        />
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 p-3 rounded-full bg-white shadow-xl hover:bg-gray-100 z-30 transition">
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="p-6 md:p-10 relative z-10">
          
          {/* Başlıq Bölməsi */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-300 pb-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                  {visa.flag} {visa.country} <span className="text-stone-600">— {visa.visaName}</span>
              </h2>
              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <span className="text-lg font-semibold text-stone-600 px-3 py-1 rounded-full bg-white shadow-sm">{visa.duration}</span>
                  <span className={`px-4 py-2 rounded-lg text-sm font-bold text-white shadow-lg ${visaStyle.bg}`}>
                      {visaStyle.text}
                  </span>
              </div>
          </header>

          {/* Əsas Kontent: Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sütun 1 & 2: Costs and Process */}
            <div className="lg:col-span-2">
              
              {/* 1. Potential Setup Costs (Tutqun fond) */}
              <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg ring-1 ring-stone-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                    <BarChart className={`w-6 h-6 ${visaStyle.accentColor}`} /> Potential Setup Costs
                </h3>
                {visa.costs?.map((c, i) => (
                  <div key={i} className="flex justify-between py-4 border-b border-stone-200 last:border-0">
                    <div>
                      <div className="font-bold text-lg text-gray-800">{c.label}</div>
                      <div className="text-sm text-stone-600">{c.description}</div>
                    </div>
                    <div className="text-xl font-extrabold text-gray-800">${c.amount}</div>
                  </div>
                ))}
              </div>

              {/* 2. Process (Tutqun fond və Dinamik Status) */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                    <FileText className="w-6 h-6" /> Process
                </h3>
                
                <div className="space-y-4">
                  {visa.process?.map((p) => {
                    const status = getProcessStatus(p.step);
                    const Icon = status.icon;

                    return (
                        <div key={p.step} className={`flex gap-4 items-start p-4 rounded-lg shadow-inner border border-stone-200 transition duration-300 ${status.classes.includes('completed') ? 'bg-green-50' : 'bg-white hover:bg-stone-50'}`}>
                          {/* Dinamik Status Ikonu */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-base shadow-md flex-shrink-0 ring-1 ring-stone-200 ${status.classes}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <p className="text-gray-700 flex-1 pt-0.5">{p.description}</p>
                        </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sütun 3: Features and Requirements (Sağ Sidebar) */}
            <aside className="lg:col-span-1 space-y-4">
              
              {/* 3. Key Details / Features (Tutqun fond) */}
              <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-stone-200 space-y-4">
                <h4 className="text-sm font-bold text-stone-600 uppercase pb-2 border-b border-stone-200">Visa Summary</h4>

                {/* Duration */}
                <div className="p-3 rounded-lg bg-stone-50/50 flex flex-col gap-1 shadow-inner">
                    <div className="flex items-center gap-2 text-sm font-bold text-stone-700"><Clock className="w-4 h-4 text-stone-600" /> Duration</div>
                    <span className="text-base font-semibold text-gray-800 ml-6">{visa.duration} with possibility of extension.</span>
                </div>

                {/* Work Rights */}
                <div className="p-3 rounded-lg bg-stone-50/50 flex flex-col gap-1 shadow-inner">
                    <div className="flex items-center gap-2 text-sm font-bold text-stone-700"><Briefcase className="w-4 h-4 text-stone-600" /> Work Rights</div>
                    <span className="text-base font-semibold text-gray-800 ml-6">{visa.workRights ? "Allowed" : "Not Allowed"}</span>
                </div>
                
                {/* Residency Path */}
                <div className="p-3 rounded-lg bg-stone-50/50 flex flex-col gap-1 shadow-inner">
                    <div className="flex items-center gap-2 text-sm font-bold text-stone-700"><Map className="w-4 h-4 text-stone-600" /> Residency Path</div>
                    <span className="text-base font-semibold text-gray-800 ml-6">{visa.permanentResidency ? "Possible" : "Limited"}</span>
                </div>
              </div>

              {/* 4. Requirements Summary (Tutqun fond) */}
              <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-stone-200">
                <h4 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2"><Info className="w-6 h-6 text-stone-600" /> Requirements</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    {visa.requirements.map((r, i) => (
                        <li key={i} className="flex gap-2 items-start">
                            <span className="mt-1 text-green-500">•</span>
                            <span className="flex-1">{r}</span>
                        </li>
                    ))}
                </ul>
              </div>

              {/* 5. Action Buttons (Download - Biznes Logic) */}
              <div className="p-4 rounded-xl bg-indigo-800 shadow-xl shadow-indigo-900/50">
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white text-indigo-800 text-base font-extrabold hover:bg-indigo-50 transition transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <Download className="w-5 h-5" /> 
                    {downloading ? 'Preparing Package...' : 'Download Official Docs'}
                </button>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaDetailsModal;