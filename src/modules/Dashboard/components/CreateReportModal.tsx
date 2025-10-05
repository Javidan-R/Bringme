// src/modules/Dashboard/components/CreateReportModal.tsx - FINAL VERSIYA (Əlavə Etmə İşləkdir)

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { X, TrendingUp, ChevronDown, CheckCircle, AlertTriangle } from 'lucide-react';
import { Country, SelectedPackage } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    availableCountries: Country[];
    selectedPackage: SelectedPackage | null;
    onCreateReport: (countryId: string) => void;
}

const CreateReportModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    availableCountries, 
    selectedPackage, 
    onCreateReport 
}) => {
    
    const [selectedCountryId, setSelectedCountryId] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const selectedCountry = useMemo(() => 
        availableCountries.find(c => c.id === selectedCountryId)
    , [availableCountries, selectedCountryId]);

    const creditsRemaining = selectedPackage?.credits || 0;
    const canCreate = selectedCountryId !== '' && creditsRemaining > 0;
    
    // YENİ CALLBACK: Modalı bağlama və state-i sıfırlama
    const handleClose = useCallback(() => {
        setSelectedCountryId('');
        setIsDropdownOpen(false);
        onClose();
    }, [onClose]);
    
    // EFFECT: Modalın kənarına klikləmə və ESC ilə bağlanma
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, handleClose]); // handleClose useCallback olduğu üçün asılılıq təhlükəsizdir
    
    // REPORT YARATMA: Uğurlu çağırış
    const handleCreate = () => {
        if (canCreate) {
            // onCreateReport funksiyası (DashboardLayout-dakı addCountry) çağırılır.
            // Bu funksiya həm ölkəni əlavə edir, həm də modalı bağlayır (setIsModalOpen(false)).
            onCreateReport(selectedCountryId);
            
            // Sadəcə daxili state-i sıfırlamaq kifayətdir.
            setSelectedCountryId(''); 
            setIsDropdownOpen(false);
        }
    };
    
    if (!isOpen) return null;
    
    // PREMIUM UI KLASSLAR
    const backdropClass = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300";
    const modalClass = "relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 opacity-100 border border-gray-100";


    return (
        <div className={backdropClass}>
            <div className={modalClass} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                
                {/* Close Button */}
                <button 
                    onClick={handleClose} 
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 z-10 transition border border-gray-100"
                >
                    <X className="w-5 h-5 text-gray-700" />
                </button>

                <div className="p-8 md:p-12 text-center">
                    
                    {/* Başlıq və Təsvir */}
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-3">
                        Create a <span className="text-indigo-700">Country Report</span>
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto text-base">
                        Select a country to get a customized report that includes potential visa options, country information, and budget breakdowns.
                    </p>

                    {/* Ölkə Seçim Dropdown */}
                    <div className="relative mb-6">
                        <button 
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className={`w-full text-left px-5 py-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-between text-lg shadow-md ${
                                selectedCountry ? 'bg-white border-green-500 text-gray-800' : 'bg-white border-gray-300 text-gray-500 hover:border-indigo-500'
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                {selectedCountry ? (
                                    <>
                                        <span className="text-xl">{selectedCountry.flag}</span>
                                        <span className="font-semibold">{selectedCountry.name}</span>
                                        <CheckCircle className="w-4 h-4 text-green-500 ml-2 fill-green-500/20" />
                                    </>
                                ) : (
                                    'Select Country'
                                )}
                            </span>
                            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50 animate-fade-in">
                                {availableCountries.length > 0 ? (
                                    availableCountries.map(c => (
                                        <button
                                            key={c.id}
                                            onClick={() => { setSelectedCountryId(c.id); setIsDropdownOpen(false); }}
                                            className="w-full text-left px-5 py-3 hover:bg-indigo-50 flex items-center gap-3 text-gray-700 text-base transition-colors"
                                        >
                                            <span className="text-lg">{c.flag}</span>
                                            {c.name}
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-5 py-4 text-sm text-red-500 font-semibold flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4"/> No more unselected countries.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Report Yaratma Düyməsi (Premium Dizayn və Animasiya) */}
                    <button
                        onClick={handleCreate}
                        disabled={!canCreate}
                        className={`w-full px-8 py-4 rounded-xl font-extrabold text-lg transition-all duration-300 transform shadow-xl ${
                            canCreate 
                                ? 'bg-black text-white hover:bg-gray-800 shadow-black/40 hover:-translate-y-0.5' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                        }`}
                    >
                        Create report
                    </button>
                    
                    {/* BİZNES MƏNTİQİ: Kredit Məlumatı */}
                    <div className="mt-5 text-sm font-semibold text-center">
                        <div className={`flex items-center justify-center gap-2 ${creditsRemaining > 0 ? 'text-indigo-600' : 'text-red-600'}`}>
                            <TrendingUp className="w-4 h-4"/>
                            <span className="text-xs font-bold uppercase tracking-wider">USES 1 CREDIT</span>
                        </div>
                        <p className="mt-1 text-gray-600">
                            You have <span className="font-bold">{creditsRemaining} report credits</span> remaining.
                        </p>
                    </div>

                    {/* Kredit bitibsə xəbərdarlıq */}
                    {creditsRemaining <= 0 && (
                        <p className="mt-3 text-red-600 text-sm font-bold flex items-center justify-center gap-1">
                            <AlertTriangle className='w-4 h-4'/>
                            Please renew your subscription to create new reports.
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CreateReportModal;