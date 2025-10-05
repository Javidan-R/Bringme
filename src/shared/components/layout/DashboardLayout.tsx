// src/layouts/DashboardLayout.tsx - FINAL VERSIYA (Donma Fix + 5 Yeni Funksionalıq)

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Star, Plus, Book, Settings, HelpCircle, LogOut, Zap, TrendingUp } from "lucide-react"; 
import { Country, SelectedPackage } from "@/modules/Dashboard/types";
import { COUNTRIES } from "../../../lib/data/country"; 
import CreateReportModal from "../../../modules/Dashboard/components/CreateReportModal";

// Mocked imports and constants...
const useClerk = () => ({ signOut: () => console.log('Signing out') });
const useAppDispatch = () => (action: any) => action.type === 'mock/clearUser' ? ({ type: 'mock/clearUser' }) : ({ type: 'mock/resetFormData' });
const clearUser = () => ({ type: 'mock/clearUser' });
const resetFormData = () => ({ type: 'mock/resetFormData' });

const DEFAULT_PREMIUM_PACKAGE: SelectedPackage = {
    id: "pkg-premium",
    title: "Pro Plan",
    credits: 50,
    price: 99,
    currency: "USD",
    features: ["Unlimited reports", "All filters", "Priority Support"]
};


const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useClerk();
  const dispatch = useAppDispatch();

  // State idarəetməsi
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountryIds, setSelectedCountryIds] = useState<string[]>(["1", "2", "3"]); 
  
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(() => {
    const raw = localStorage.getItem("selectedPackage");
    return raw ? JSON.parse(raw) : DEFAULT_PREMIUM_PACKAGE;
  });
  
  // YENİ F-1: SessionStorage-dan aktiv ölkəni yüklə
  const [activeCountryId, setActiveCountryId] = useState<string | null>(() => 
    sessionStorage.getItem("activeCountryId") || null
  ); 
  
  // Memoization: Ölkə obyektlərini hesablamaq
  const selectedCountries: Country[] = useMemo(() => 
    selectedCountryIds.map((id) => COUNTRIES.find((c) => c.id === id)).filter(Boolean) as Country[]
  , [selectedCountryIds]);

  const availableCountries: Country[] = useMemo(() => 
    COUNTRIES.filter((c) => !selectedCountryIds.includes(c.id))
  , [selectedCountryIds]);
  
  // YENİ F-2: Kredit Limitinin Sərhəddə Yoxlanılması
  const creditsRemaining = useMemo(() => 
      Math.max(0, selectedPackage?.credits || 0)
  , [selectedPackage]);


  // EFFECT 1 (Aktiv Ölkə İdarəetməsi - Donma Fix)
  useEffect(() => {
    // 1. SessionStorage-a yaz
    if (activeCountryId) {
        sessionStorage.setItem("activeCountryId", activeCountryId);
    } else {
        sessionStorage.removeItem("activeCountryId");
    }
      
    // 2. İlkin yüklənmədə/ölkə əlavə edildikdə avtomatik aktiv etmə
    if (selectedCountryIds.length > 0 && activeCountryId === null) {
        setActiveCountryId(selectedCountryIds[0]); 
    }
    
    // 3. Əgər aktiv ölkə silinibsə, yenisini aktiv et
    if (activeCountryId && !selectedCountryIds.includes(activeCountryId)) {
        setActiveCountryId(selectedCountryIds.length > 0 ? selectedCountryIds[0] : null);
    }
  }, [selectedCountryIds, activeCountryId]);

  // YENİ F-3: Brauzer Başlığı Dinamikliyi
  useEffect(() => {
    const activeCountry = selectedCountries.find(c => c.id === activeCountryId);
    if (activeCountry) {
        document.title = `${activeCountry.flag} ${activeCountry.name} Report | Bring Me Abroad`;
    } else if (location.pathname === "/dashboard") {
         document.title = `✨ Overview | Bring Me Abroad`;
    } else {
         document.title = `Dashboard | Bring Me Abroad`;
    }
  }, [activeCountryId, selectedCountries, location.pathname]);


  // Effect: LocalStorage persistency
  useEffect(() => {
    if (selectedPackage) {
        localStorage.setItem("selectedPackage", JSON.stringify(selectedPackage));
    } else {
        localStorage.removeItem("selectedPackage");
    }
  }, [selectedPackage]);

  // Callback: Logout
  const handleLogout = useCallback(async () => {
    sessionStorage.removeItem("activeCountryId"); // Session-u təmizlə
    await signOut();
    dispatch(clearUser());
    dispatch(resetFormData());
    navigate("/login", { replace: true });
  }, [signOut, dispatch, navigate]);

  // Callback: Ölkə silmək
  const removeCountry = useCallback((countryId: string) => {
    setSelectedCountryIds(prev => prev.filter(id => id !== countryId));
  }, []);

  // Callback: Ölkə əlavə etmək (Modal tərəfindən çağırılır)
  const addCountry = useCallback((countryId: string) => {
    if (!selectedCountryIds.includes(countryId) && creditsRemaining > 0) {
      setSelectedCountryIds((prev) => {
        const newIds = [...prev, countryId];
        setActiveCountryId(countryId); 
        return newIds;
      });
      
      setSelectedPackage(prev => {
          if (prev) {
              return { ...prev, credits: creditsRemaining - 1 };
          }
          return null;
      });
      
      setIsModalOpen(false); 
      // Yeni F-4: Ölkə əlavə edildikdə avtomatik Dashborda keçid
      if (location.pathname !== "/dashboard") {
          navigate("/dashboard");
      }
    }
  }, [selectedCountryIds, setSelectedPackage, creditsRemaining, navigate, location.pathname]);

  // YENİ F-5: Kreditləri Yükləmək (Mocked)
  const handleTopUpCredits = useCallback(() => {
    setSelectedPackage(prev => {
        if (prev) {
            alert("50 kredit uğurla yükləndi!");
            return { ...prev, credits: creditsRemaining + 50 };
        }
        return DEFAULT_PREMIUM_PACKAGE; // Əgər paket yoxdursa, premium paketi aktiv et
    });
  }, [creditsRemaining]);


  // ... Naviqasiya və UI klasları ...
  const baseNavItemClass = "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition-colors";
  
  const countryItemClass = (id: string) => `flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer text-gray-700 font-medium ${
    id === activeCountryId 
      ? "bg-indigo-100/80 border border-indigo-400 text-indigo-800 font-bold shadow-lg shadow-indigo-200/50 scale-[1.02]"
      : "bg-white/90 border border-stone-200 hover:bg-stone-100 hover:shadow-md"
  }`;


  return (
    <div className="flex min-h-screen bg-[#F6F3F2] text-gray-800">
      
      {/* Sidebar */}
      <aside className={`fixed z-40 w-72 h-full bg-white border-r border-gray-200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
          <div className="font-extrabold text-xl">
            <span className="text-gray-800">BRING ME</span>
            <span className="text-indigo-600"> ABROAD</span>
          </div>
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="px-4 py-5 flex-1 overflow-y-auto">
          <h4 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Reports</h4>

          {/* Nav Item: Overview */}
          <button
            onClick={() => { 
                navigate("/dashboard"); 
                setSidebarOpen(false); 
                setActiveCountryId(null); 
            }}
            className={`${baseNavItemClass} mb-4 ${
              location.pathname === "/dashboard" && activeCountryId === null
                ? "bg-yellow-100 text-yellow-800 font-bold shadow-md rounded-xl"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <Star className="w-4 h-4" /> Overview
          </button>

          {/* Selected Countries list (Clickable) */}
          <div className="mt-4 space-y-3">
            {selectedCountries.map((c) => (
              <div 
                key={c.id} 
                className={countryItemClass(c.id)}
                onClick={() => {
                    setActiveCountryId(c.id);
                    // Aktiv ölkə seçiləndə avtomatik dashboard-a keçid
                    if (location.pathname !== "/dashboard") {
                         navigate("/dashboard");
                    }
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{c.flag}</span>
                  <span className="font-semibold">{c.name}</span>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        removeCountry(c.id);
                    }} 
                    aria-label={`Remove ${c.name}`} 
                    className="p-1 hover:bg-red-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Country Button (Modal Trigger) - Premium Look */}
          <div className="mt-6 relative">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={creditsRemaining === 0}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 border-dashed text-sm shadow-lg transition transform hover:scale-[1.01] ${
                 creditsRemaining > 0 
                    ? "border-indigo-400 bg-indigo-50 hover:bg-indigo-100" 
                    : "border-gray-300 bg-gray-100 cursor-not-allowed"
              }`}
            >
              <div className={`flex items-center gap-2 font-extrabold ${creditsRemaining > 0 ? "text-indigo-700" : "text-gray-500"}`}>
                <Plus className="w-5 h-5" />
                <span>Add New Report</span>
              </div>
              <span className="text-sm font-semibold text-indigo-500">({availableCountries.length})</span>
            </button>
          </div>
        </div>
        
         {/* PREMIUM Credit Display */}
        {selectedPackage && (
            <div className="px-5 py-3 border-t border-indigo-200 bg-indigo-50/50 shadow-inner">
                 <div className="flex items-center justify-between text-sm font-bold text-indigo-700 mb-2">
                    <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4 fill-indigo-500" />
                        {selectedPackage.title}
                    </span>
                    <span className={`text-xs font-semibold ${creditsRemaining <= 5 ? 'text-red-500' : ''}`}>
                         {creditsRemaining} CREDITS LEFT
                    </span>
                 </div>
                 {/* YENİ F-4: Kredit Yükləmə Düyməsi */}
                 <button onClick={handleTopUpCredits} className="w-full text-center text-xs font-bold py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition flex items-center justify-center gap-1">
                     <TrendingUp className="w-3 h-3"/> Top Up 50 Credits
                 </button>
            </div>
        )}

        {/* Bottom nav */}
        <div className="px-4 py-4 border-t border-gray-100 bg-white">
          <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Navigation</h4>
          <div className="space-y-2">
            {[
              { path: "/dashboard/blog", icon: Book, label: "Blog" },
              { path: "/dashboard/settings", icon: Settings, label: "Settings" },
              { path: "/dashboard/support", icon: HelpCircle, label: "Support" },
            ].map(({ path, icon: Icon, label }) => (
              <button
                key={path}
                onClick={() => { navigate(path); setSidebarOpen(false); }}
                className={`${baseNavItemClass} text-left ${location.pathname.startsWith(path) ? "bg-indigo-100 text-indigo-800 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
            <button onClick={handleLogout} className={`${baseNavItemClass} text-red-600 hover:bg-red-50 font-semibold`}>
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}


      {/* Main content area */}
      <div className="flex-1">
        {/* Mobile top bar to open sidebar */}
        <div className="md:hidden p-4 border-b bg-white shadow-md">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md bg-stone-100 shadow-sm">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <main className="p-4 md:p-8">
          <Outlet
            context={{
              selectedCountries,
              activeCountryId, 
              setActiveCountryId, 
              setSelectedCountries: (countries: Country[]) => {
                setSelectedCountryIds(countries.map((c) => c.id));
              },
              selectedPackage,
              setSelectedPackage,
            }}
          />
        </main>
      </div>
      
      {/* Create Report Modal */}
      <CreateReportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableCountries={availableCountries}
        selectedPackage={selectedPackage}
        onCreateReport={addCountry} 
      />
    </div>
  );
};

export default DashboardLayout;