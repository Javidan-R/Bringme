// src/modules/Dashboard/components/VisaCard.tsx - Final UI Design (Fix: isFavourited Prop Added)

import React, { FC, useState } from "react";
import { Bookmark, BookmarkMinus, Briefcase, Map, ChevronRight, Zap } from "lucide-react";
import { VisaDetails } from "../types";

// YENİLƏNMİŞ: Props interfeysinə favorit funksionallığı əlavə edildi
interface Props {
  visa: VisaDetails;
  onView: (visa: VisaDetails) => void;
  onSaveReport: (visa: VisaDetails) => void;
  className?: string;
  isFavourited: boolean; // Yeni Prop
  onToggleFavourite: (visaId: string, e?: React.SyntheticEvent) => void; // Yeni Prop
}

// Reuseable Tailwind Variant Stili: Rəng Palitrası və Gradient Spot
const getVisaStyle = (visaType: VisaDetails['visaType']) => {
    switch (visaType) {
        case 'digital':
            return {
                text: "Digital Nomad Visa",
                badgeBg: "bg-blue-600",
                shadow: "shadow-xl shadow-blue-500/20",
                bgSpot: "bg-blue-100/60",
                ring: "ring-blue-100",
                featureBg: "bg-blue-50/50",
                iconColor: "text-blue-600"
            };
        case 'investment':
            return {
                text: "Investment Visa",
                badgeBg: "bg-orange-600",
                shadow: "shadow-xl shadow-orange-500/20",
                bgSpot: "bg-orange-100/60",
                ring: "ring-orange-100",
                featureBg: "bg-orange-50/50",
                iconColor: "text-orange-600"
            };
        default: // Ancestry və ya digərləri
             return {
                text: "Ancestry Visa",
                badgeBg: "bg-purple-600",
                shadow: "shadow-xl shadow-purple-500/20",
                bgSpot: "bg-purple-100/60",
                ring: "ring-purple-100",
                featureBg: "bg-purple-50/50",
                iconColor: "text-purple-600"
            };
    }
};

const VisaCard: FC<Props> = ({ 
    visa, 
    onView, 
    onSaveReport, 
    className, 
    isFavourited, 
    onToggleFavourite // Yeni prop-lar
}) => {
  // Daxili bookmark state və useEffect silinir, çünki isFavourited prop-dan gəlir
  const [note, setNote] = useState<string>(""); 
  const visaStyle = getVisaStyle(visa.visaType);
  
  const handleNoteChange = (val: string, e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setNote(val);
    // Real tətbiqdə burada yadda saxlama (debounce ilə API call) əlavə edilərdi
  };
  
  // Əsas kart sinifləri (Ağ fon, dərin kölgə, interaktiv həlqə)
  const cardClasses = `
    relative rounded-3xl p-6 bg-white 
    border border-gray-100
    ${visaStyle.shadow} 
    transition-all duration-300 ease-in-out 
    transform hover:-translate-y-0.5 hover:ring-4 ${visaStyle.ring}
    cursor-pointer group overflow-hidden ${className || ""}`;

  return (
    <article
      onClick={() => onView(visa)}
      className={cardClasses}
    >
        {/* Dizayna uyğun Sağ Üst Qradiyent Spotu */}
        <div 
            className={`absolute top-0 right-0 w-64 h-64 rounded-full 
                        ${visaStyle.bgSpot} 
                        transform translate-x-1/3 -translate-y-1/3 
                        transition-opacity duration-300 group-hover:opacity-100 opacity-60`}
            style={{ filter: 'blur(50px)' }}
        />
      
      <div className="relative z-10"> 
          
          {/* Başlıq və Badge Bölməsi */}
          <header className="flex justify-between items-start mb-5">
            <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                {visa.flag} {visa.country} <span className="text-gray-500 font-medium">— {visa.visaName}</span>
            </h3>
            
            <div className="flex items-center gap-3 flex-shrink-0">
                {/* Daxili Viza Müddəti */}
                <span className="text-sm font-semibold text-gray-600 px-3 py-1 rounded-full bg-gray-100 shadow-inner">
                    <Zap className={`inline w-3 h-3 mr-1 ${visaStyle.iconColor}`} /> {visa.duration}
                </span>
                {/* Viza Tipi Badge */}
                <span className={`px-3 py-1 rounded-lg text-sm font-bold text-white shadow-md ${visaStyle.badgeBg}`}>
                  {visaStyle.text}
                </span>
            </div>
          </header>

          {/* Əsas Kontent: Tələblər və Xüsusiyyətlər */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* 1. Tələblər (Requirements) */}
            <div className="md:col-span-2 pr-4 border-r border-gray-100">
              <h4 className="text-xs font-extrabold tracking-widest text-gray-500 mb-2 uppercase">KEY REQUIREMENTS</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {visa.requirements.slice(0, 3).map((r, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="mt-1 text-green-500">✔</span>
                    <span className="flex-1">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 2. Xüsusiyyətlər (Features - Görüntüdəki kimi kiçik kartlar) */}
            <div className="md:col-span-1 flex flex-col gap-3">
                
                {/* Work Rights */}
                <div className={`flex items-center gap-3 text-sm font-semibold p-3 rounded-xl ${visaStyle.featureBg} shadow-inner border border-gray-100`}>
                    <Briefcase className={`w-5 h-5 ${visaStyle.iconColor}`} />
                    <span className="text-gray-700">{visa.workRights ? 'Full Work Rights' : 'No Work Rights'}</span>
                </div>
                
                {/* Residency Path */}
                <div className={`flex items-center gap-3 text-sm font-semibold p-3 rounded-xl ${visaStyle.featureBg} shadow-inner border border-gray-100`}>
                    <Map className={`w-5 h-5 ${visaStyle.iconColor}`} />
                    <span className="text-gray-700">{visa.permanentResidency ? 'Path to Residency' : 'Temporary Status'}</span>
                </div>
            </div>
          </div>

          {/* Alt Hissə: Qeyd və Hərəkətlər */}
          <div className="pt-5 mt-5 border-t border-gray-100">
            <div className="flex gap-3 items-center">
                <input
                  placeholder="Add a quick note..."
                  value={note}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner bg-white"
                />
                
                {/* Reportu saxlamaq */}
                <button
                    onClick={(e) => { e.stopPropagation(); onSaveReport(visa); }}
                    className="p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-200 transition shadow-md"
                    title="Save as detailed report (Uses 1 Credit)"
                >
                    {/* Zap ikonu kredit istifadəsini simvolizə edir */}
                    <Zap className="w-5 h-5" /> 
                </button>
            </div>
            
            {/* Detalları Görüntüləmə Düyməsi */}
            <button
              onClick={(e) => { e.stopPropagation(); onView(visa); }}
              className="w-full mt-3 flex items-center justify-center gap-1 text-indigo-600 font-bold py-2 rounded-lg hover:bg-indigo-50 transition transform hover:scale-[1.005]"
              title="View full details and application process"
            >
                View Full Details
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />
            </button>
          </div>
          
          {/* YENİLƏNMİŞ: Bookmark Button (isFavourited prop-dan istifadə edir) */}
          <button
              onClick={(e) => onToggleFavourite(visa.id, e)} // Yuxarı komponentə xəbər verir
              title={isFavourited ? "Remove from favourites" : "Add to favourites"}
              className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm shadow-md transition duration-300 z-20 ${isFavourited ? 'bg-red-50 hover:bg-red-100 ring-1 ring-red-300' : 'bg-white/80 hover:bg-gray-100 ring-1 ring-gray-100'}`}
          >
              {isFavourited ? <BookmarkMinus className="w-5 h-5 text-red-600 fill-red-600" /> : <Bookmark className="w-5 h-5 text-gray-500" />}
          </button>
      </div>
    </article>
  );
};

export default VisaCard;