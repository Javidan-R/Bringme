// src/pages/Dashboard.tsx - Birləşdirilmiş VƏ Təkmilləşdirilmiş Final Versiya

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { 
  Search, Filter, Star, Zap, Heart, Shield, TrendingUp, 
  Home, ShoppingCart, Car, Dumbbell, Globe, Users, DollarSign, Landmark, ChevronRight 
} from "lucide-react";

// Tipi dəyişikliklər (Lütfen bu hissələri öz layihənizdə uyğun fayllara köçürün)
import { Country, SelectedPackage, VisaDetails } from "../modules/Dashboard/types";
import VisaCard from "../modules/Dashboard/components/VisaCard";
import VisaDetailsModal from "../modules/Dashboard/components/VisaDetailsModal";

// Layihənizdə mövcud olan mock dataları/styleləri import edin
// Qeyd: Bu importları layihənizin strukturuna uyğun düzəltməlisiniz.
import { cities } from "../lib/data/cities"; // CityCosts üçün data
import { COUNTRIES } from "../lib/data/country"; // CountryInfo üçün data
// import { cityCostsVariants } from "../modules/Onboarding/styles/cityCosts"; 
// import { countryInfoVariants } from "../modules/Onboarding/styles/countryInfo"; 
// import { CityData } from "../types/pages";

// Mock Style Funksiyaları (Əsl layihədə import olunmalıdır)
const cityCostsVariants = () => ({
    container: () => "p-6 bg-white rounded-xl shadow-lg",
    filterBar: () => "flex flex-wrap gap-4 mb-8 p-4 bg-stone-100 rounded-lg border border-stone-200",
    selectWrapper: () => "flex flex-col gap-1",
    label: () => "text-xs font-semibold text-stone-500",
    select: () => "p-2 border rounded-md shadow-sm text-sm",
    compareButton: () => "px-4 py-2.5 self-end bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition",
    cityCard: () => "bg-white p-6 rounded-xl border border-stone-200 shadow-md",
    cityHeader: () => "pb-4 mb-4 border-b border-stone-100 flex justify-between items-start",
    cityTitle: () => "flex items-center gap-3",
    cityName: () => "text-2xl font-bold text-stone-800",
    costSummary: () => "text-right",
    totalCost: () => "text-3xl font-extrabold text-indigo-600",
    perMonth: () => "text-sm text-stone-500",
    categorySection: () => "mb-4 pt-4 border-t border-stone-50",
    categoryHeader: () => "flex items-center gap-3 mb-3",
    categoryIcon: () => "w-5 h-5 text-indigo-500",
    categoryTitle: () => "text-lg font-bold text-stone-700",
    costGrid: () => "grid grid-cols-2 gap-x-4 gap-y-2",
    costItem: () => "flex justify-between items-center bg-stone-50 p-3 rounded-lg",
    costLabel: () => "text-sm text-stone-600",
    costValue: () => "text-sm font-semibold text-stone-800",
    comparisonGrid: () => "grid grid-cols-1 md:grid-cols-2 gap-6",
});

const countryInfoVariants = () => ({
    container: () => "p-6 bg-white rounded-xl shadow-lg",
    countryHeader: () => "flex justify-between items-start mb-6 pb-4 border-b border-stone-200",
    countryTitle: () => "flex items-center gap-4",
    flag: () => "text-5xl",
    countryName: () => "text-4xl font-extrabold text-stone-800",
    grid: () => "grid grid-cols-1 lg:grid-cols-3 gap-6",
    section: () => "bg-stone-50 p-5 rounded-xl border border-stone-200 shadow-sm col-span-1 lg:col-span-1",
    sectionTitle: () => "flex items-center gap-3 text-lg font-bold text-stone-700 mb-4 pb-2 border-b border-stone-100",
    sectionIcon: () => "w-5 h-5 text-green-600",
    infoList: () => "space-y-3",
    infoItem: () => "flex justify-between items-center py-2 border-b border-stone-100 last:border-b-0",
    infoLabel: () => "text-sm text-stone-500",
    infoValue: () => "text-sm font-semibold text-stone-700",
    categoryGrid: () => "grid grid-cols-2 gap-4",
    categoryCard: () => "p-4 bg-white border border-stone-200 rounded-lg hover:shadow-md transition",
    categoryTitle: () => "font-bold text-sm text-stone-800",
    categoryDesc: () => "text-xs text-stone-500 mt-1",
});

// Mock Type Definitions (Əsl layihədə import olunmalıdır)
interface CityData {
    name: string;
    country: string;
    flag: string;
    totalMonthly: string;
    costs: {
        housing: { label: string; value: string }[];
        food: { label: string; value: string }[];
        transportation: { label: string; value: string }[];
        utilities: { label: string; value: string }[];
        lifestyle: { label: string; value: string }[];
    };
}


// Kontekst Tipi (DashboardLayout-dan gəlir)
interface LayoutContext {
  selectedCountries: Country[];
  activeCountryId: string | null;
  setActiveCountryId: (id: string | null) => void;
  setSelectedCountries: (countries: Country[]) => void;
  selectedPackage: SelectedPackage | null;
  setSelectedPackage: (pkg: SelectedPackage | null) => void;
}

type DashboardTab = "Visas" | "Country Info" | "City Costs";


// ... (Köməkçi Funksiyalar) ...

interface VisaFilters {
    workRights: boolean;
    residencyPath: boolean;
    minDuration: number;
    showFavourites: boolean;
}

const getCountryRiskScore = (country: string): 'Low' | 'Medium' | 'High' => {
    if (country.includes('Portugal') || country.includes('Estonia')) return 'Low';
    if (country.includes('Colombia')) return 'Medium';
    return 'Low'; // Default
};


// -----------------------------------------------------------
// A. BİRLƏŞDİRİLMİŞ: IntegratedCityCosts Komponenti
// -----------------------------------------------------------

const IntegratedCityCosts: React.FC<{ activeCountry: Country | undefined }> = ({ activeCountry }) => {
    
    // Default olaraq aktiv ölkənin paytaxtını seçirik, əgər tapılmasa ilk şəhəri.
    const initialCity1 = activeCountry?.cities?.[0] || cities[0].name;
    const [selectedCity1, setSelectedCity1] = useState(initialCity1);
    const [selectedCity2, setSelectedCity2] = useState("Lisbon"); // İkinci şəhər default olaraq Lisbon
    const [compareMode, setCompareMode] = useState(false);
    
    // Aktiv ölkə dəyişdikdə City 1-i avtomatik yenilə
    useEffect(() => {
        if (activeCountry && activeCountry.cities.length > 0) {
            // Əgər hazırda seçili şəhər yeni aktiv ölkənin şəhərlərində yoxdursa, yenisini seç
            if (!activeCountry.cities.includes(selectedCity1)) {
                setSelectedCity1(activeCountry.cities[0]);
            }
        }
    }, [activeCountry]); 

    const styles = cityCostsVariants();

    const city1Data = cities.find(c => c.name === selectedCity1) || cities.find(c => c.name === initialCity1) || cities[0];
    const city2Data = cities.find(c => c.name === selectedCity2) || cities[1];
    
    // Aktiv ölkənin şəhərlərini filtr et
    const activeCountryCities = useMemo(() => {
        if (!activeCountry) return cities;
        // Əsl layihədə activeCountry.cities array-ı olmalıdır.
        const cityNames = activeCountry.cities || []; 
        return cities.filter(c => cityNames.includes(c.name));
    }, [activeCountry]);


    const renderCityCard = (cityData: CityData) => (
        <div className={styles.cityCard()}>
          <div className={styles.cityHeader()}>
            <div className={styles.cityTitle()}>
              <span className="text-3xl">{cityData.flag}</span>
              <div>
                <h2 className={styles.cityName()}>{cityData.name}</h2>
                <p className="text-sm text-[#6B7280] font-inter">{cityData.country}</p>
              </div>
            </div>
            <div className={styles.costSummary()}>
              <div className={styles.totalCost()}>{cityData.totalMonthly}</div>
              <div className={styles.perMonth()}>per month (avg)</div>
            </div>
          </div>

          {/* Housing */}
          <div className={styles.categorySection()}>
            <div className={styles.categoryHeader()}>
              <Home className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Housing</h3>
            </div>
            <div className={styles.costGrid()}>
              {cityData.costs.housing.map((item, idx) => (
                <div key={idx} className={styles.costItem()}>
                  <span className={styles.costLabel()}>{item.label}</span>
                  <span className={styles.costValue()}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Food */}
          <div className={styles.categorySection()}>
            <div className={styles.categoryHeader()}>
              <ShoppingCart className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Food & Dining</h3>
            </div>
            <div className={styles.costGrid()}>
              {cityData.costs.food.map((item, idx) => (
                <div key={idx} className={styles.costItem()}>
                  <span className={styles.costLabel()}>{item.label}</span>
                  <span className={styles.costValue()}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div className={styles.categorySection()}>
            <div className={styles.categoryHeader()}>
              <Car className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Transportation</h3>
            </div>
            <div className={styles.costGrid()}>
              {cityData.costs.transportation.map((item, idx) => (
                <div key={idx} className={styles.costItem()}>
                  <span className={styles.costLabel()}>{item.label}</span>
                  <span className={styles.costValue()}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Utilities */}
          <div className={styles.categorySection()}>
            <div className={styles.categoryHeader()}>
              <Zap className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Utilities</h3>
            </div>
            <div className={styles.costGrid()}>
              {cityData.costs.utilities.map((item, idx) => (
                <div key={idx} className={styles.costItem()}>
                  <span className={styles.costLabel()}>{item.label}</span>
                  <span className={styles.costValue()}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle */}
          <div className={styles.categorySection()}>
            <div className={styles.categoryHeader()}>
              <Dumbbell className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Lifestyle</h3>
            </div>
            <div className={styles.costGrid()}>
              {cityData.costs.lifestyle.map((item, idx) => (
                <div key={idx} className={styles.costItem()}>
                  <span className={styles.costLabel()}>{item.label}</span>
                  <span className={styles.costValue()}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
    );

    return (
        <div className={styles.container()}>
            <h2 className="text-3xl font-bold text-stone-800 mb-6">Cost of Living Comparison: {activeCountry?.name}</h2>
            
            {/* Filter Bar (City Selection) */}
            <div className={styles.filterBar()}>
                <div className={styles.selectWrapper()}>
                    <div className={styles.label()}>Select City 1 ({activeCountry?.name})</div>
                    <select 
                        className={styles.select()}
                        value={selectedCity1}
                        onChange={(e) => setSelectedCity1(e.target.value)}
                    >
                        {activeCountryCities.map((city) => (
                            <option key={city.name} value={city.name}>
                                {city.flag} {city.name}
                            </option>
                        ))}
                    </select>
                </div>

                {compareMode && (
                    <div className={styles.selectWrapper()}>
                        <div className={styles.label()}>Select City 2 (Global)</div>
                        <select 
                            className={styles.select()}
                            value={selectedCity2}
                            onChange={(e) => setSelectedCity2(e.target.value)}
                        >
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.flag} {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <button
                    onClick={() => setCompareMode(!compareMode)}
                    className={styles.compareButton()}
                >
                    {compareMode ? "Single View" : "Compare Cities"}
                </button>
            </div>

            {/* City Cards */}
            {compareMode ? (
                <div className={styles.comparisonGrid()}>
                    {renderCityCard(city1Data)}
                    {renderCityCard(city2Data)}
                </div>
            ) : (
                renderCityCard(city1Data)
            )}
        </div>
    );
};


// -----------------------------------------------------------
// B. BİRLƏŞDİRİLMİŞ: IntegratedCountryInfo Komponenti
// -----------------------------------------------------------

const IntegratedCountryInfo: React.FC<{ activeCountry: Country | undefined }> = ({ activeCountry }) => {
    
    const styles = countryInfoVariants();
    
    if (!activeCountry) {
        return <p className="text-center text-stone-500">Please select a country to view detailed information.</p>;
    }

    // Aktiv ölkəni COUNTRIES datasından tapırıq
    const currentCountry = COUNTRIES.find(c => c.id === activeCountry.id) || COUNTRIES[0];

    return (
        <div className={styles.container()}>
            
            {/* Country Header */}
            <div className={styles.countryHeader()}>
                <div className={styles.countryTitle()}>
                    <div className={styles.flag()}>{currentCountry.flag}</div>
                    <div>
                        <h1 className={styles.countryName()}>{currentCountry.name}</h1>
                        <p className="text-sm text-[#6B7280] font-inter">
                            Official Capital: {currentCountry.cities[0]}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className={styles.grid()}>
                {/* Basic Information */}
                <div className={styles.section()}>
                    <h2 className={styles.sectionTitle()}>
                        <Globe className={styles.sectionIcon()} />
                        Basic Information
                    </h2>
                    <div className={styles.infoList()}>
                        <div className={styles.infoItem()}>
                            <span className={styles.infoLabel()}>Capital</span>
                            <span className={styles.infoValue()}>{currentCountry.cities[0]}</span>
                        </div>
                        <div className={styles.infoItem()}>
                            <span className={styles.infoLabel()}>Population</span>
                            <span className={styles.infoValue()}>~83M (Germany Mock)</span>
                        </div>
                        <div className={styles.infoItem()}>
                            <span className={styles.infoLabel()}>Currency</span>
                            <span className={styles.infoValue()}>EUR (€)</span>
                        </div>
                    </div>
                </div>

                {/* Key Categories */}
                <div className={styles.section()}>
                    <h2 className={styles.sectionTitle()}>
                        <Landmark className={styles.sectionIcon()} />
                        Key Information Categories
                    </h2>
                    <div className={styles.categoryGrid()}>
                        <div className={styles.categoryCard()}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">🏛️</span>
                                <ChevronRight className="w-4 h-4 text-[#9CA3AF] ml-auto" />
                            </div>
                            <h3 className={styles.categoryTitle()}>Taxes & Finance</h3>
                            <p className={styles.categoryDesc()}>Overview of income tax rates and bank account setup.</p>
                        </div>
                        <div className={styles.categoryCard()}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">🩺</span>
                                <ChevronRight className="w-4 h-4 text-[#9CA3AF] ml-auto" />
                            </div>
                            <h3 className={styles.categoryTitle()}>Healthcare System</h3>
                            <p className={styles.categoryDesc()}>Public vs. Private insurance requirements.</p>
                        </div>
                    </div>
                </div>

                {/* Living Costs Preview */}
                <div className={styles.section()}>
                    <h2 className={styles.sectionTitle()}>
                        <DollarSign className={styles.sectionIcon()} />
                        Average Monthly Costs
                    </h2>
                    <div className={styles.infoList()}>
                        <div className={styles.infoItem()}>
                            <span className={styles.infoLabel()}>Rent (1 bedroom, city center)</span>
                            <span className={styles.infoValue()}>
                                {currentCountry.name === "Germany" ? "€1,200" : "€900"}
                            </span>
                        </div>
                        <div className={styles.infoItem()}>
                            <span className={styles.infoLabel()}>Groceries</span>
                            <span className={styles.infoValue()}>
                                {currentCountry.name === "Germany" ? "€300" : "€200"}
                            </span>
                        </div>
                        <div className={styles.infoItem()}>
                            <span className={styles.infoLabel()}>Transportation</span>
                            <span className={styles.infoValue()}>
                                {currentCountry.name === "Germany" ? "€80" : "€40"}
                            </span>
                        </div>
                        <div className={styles.infoItem()}>
                            <span className={styles.infoLabel()}>Utilities</span>
                            <span className={styles.infoValue()}>
                                {currentCountry.name === "Germany" ? "€250" : "€120"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Service Providers */}
                <div className={styles.section()}>
                    <h2 className={styles.sectionTitle()}>
                        <Users className={styles.sectionIcon()} />
                        Popular Service Providers
                    </h2>
                    <div className="space-y-3">
                        <div className="p-3 border border-gray-200 rounded-lg">
                            <div className="font-semibold text-sm text-[#1F2A44] mb-1">Banks</div>
                            <div className="text-xs text-[#6B7280]">
                                {currentCountry.name === "Germany" 
                                ? "Deutsche Bank, Commerzbank, N26" 
                                : "Millennium BCP, Novo Banco, Revolut"}
                            </div>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-lg">
                            <div className="font-semibold text-sm text-[#1F2A44] mb-1">Telecom</div>
                            <div className="text-xs text-[#6B7280]">
                                {currentCountry.name === "Germany" 
                                ? "Telekom, Vodafone, O2" 
                                : "MEO, NOS, Vodafone"}
                            </div>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-lg">
                            <div className="font-semibold text-sm text-[#1F2A44] mb-1">Utilities</div>
                            <div className="text-xs text-[#6B7280]">
                                {currentCountry.name === "Germany" 
                                ? "E.ON, Vattenfall, EnBW" 
                                : "EDP, Galp, Endesa"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// -----------------------------------------------------------
// C. ƏSAS DASHBOARD KOMPONENTİ (5 Yeni Analitik Statistika)
// -----------------------------------------------------------

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  // Context-dən lazım olan məlumatları çəkirik
  const { selectedCountries, selectedPackage, setSelectedPackage, activeCountryId, setActiveCountryId } = useOutletContext<LayoutContext>();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVisa, setActiveVisa] = useState<VisaDetails | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>("Visas");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState<VisaFilters>({
      workRights: false,
      residencyPath: false,
      minDuration: 0,
      showFavourites: false,
  });
  
  const [favouriteVisaIds, setFavouriteVisaIds] = useState<Set<string>>(new Set());
  
  // Aktiv Ölkə Məlumatı
  const activeCountry = useMemo(() => {
    return selectedCountries.find(c => c.id === activeCountryId);
  }, [selectedCountries, activeCountryId]);

  const allVisas = useMemo(() => {
    return activeCountry?.visas || [];
  }, [activeCountry]);
  
  // Vizaların Filtrasiyası
  const filteredVisas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    
    let result = allVisas;
    
    if (q) {
        result = result.filter(v => 
            v.country.toLowerCase().includes(q) || 
            v.visaName.toLowerCase().includes(q)
        );
    }
    
    if (filters.showFavourites) {
        result = result.filter(v => favouriteVisaIds.has(v.id));
    }
    
    if (filters.workRights) {
        result = result.filter(v => v.workRights === true);
    }
    
    if (filters.residencyPath) {
        result = result.filter(v => v.permanentResidency === true);
    }
    
    if (filters.minDuration > 0) {
        result = result.filter(v => {
             const durationMatch = v.duration.match(/\d+/);
             const durationMonths = durationMatch ? parseInt(durationMatch[0]) : 0;
             const minMonths = filters.minDuration * 12; 
             return durationMonths >= minMonths;
        });
    }

    return result;
  }, [allVisas, searchQuery, filters, favouriteVisaIds]);
  
  // Vizaların qruplaşdırılması (sadəcə aktiv ölkəni göstərmək üçün)
  const groupedVisas = useMemo(() => {
      if (!activeCountry) return {};
      return { [activeCountry.name]: filteredVisas };
  }, [activeCountry, filteredVisas]);

  
  // YENİ F-1: Dinamik Statistikaların Hesablanması (5 Əlavə Statistika)
  const stats = useMemo(() => {
      if (!activeCountry) return null;
      
      const totalVisas = activeCountry.visas.length;
      const visasWithWorkRights = activeCountry.visas.filter(v => v.workRights).length;
      const visasWithResidencyPath = activeCountry.visas.filter(v => v.permanentResidency).length;
      
      // F-2: Vizaların orta müddəti
      const avgDuration = activeCountry.visas.reduce((sum, v) => {
          const durationMatch = v.duration.match(/\d+/);
          return sum + (durationMatch ? parseInt(durationMatch[0]) : 0);
      }, 0) / (totalVisas || 1);
      
      const favouritesInActiveCountry = activeCountry.visas.filter(v => favouriteVisaIds.has(v.id)).length;
      
      // F-3: Ən çox tələb olunan viza növü (Mock)
      const mostPopularType = activeCountry.visas.length > 0 ? (
          activeCountry.visas.find(v => v.visaType === 'digital') ? 'Digital Nomad' : 'Investment'
      ) : 'N/A';
      
      // F-4: Sürətli təsdiq ehtimalı (Mock Logic)
      const fastApprovalCount = activeCountry.visas.filter(v => v.duration.includes('month')).length;
      const fastApprovalPercentage = totalVisas > 0 ? ((fastApprovalCount / totalVisas) * 100).toFixed(0) : 0;

      // F-5: Yaşayış Xərcləri Müqayisəsi (Mock)
      const costOfLivingIndex = activeCountry.name === 'Germany' ? '1.4x' : '1.0x'; // Portugal default

      return {
          totalVisas,
          visasWithWorkRights,
          visasWithResidencyPath,
          avgDuration: avgDuration.toFixed(1),
          favouritesInActiveCountry,
          mostPopularType, // YENİ F-3
          fastApprovalPercentage, // YENİ F-4
          costOfLivingIndex, // YENİ F-5
      };
      
  }, [activeCountry, favouriteVisaIds]);
  

  const handleToggleFavourite = useCallback((visaId: string, e?: React.SyntheticEvent) => {
      e?.stopPropagation();
      setFavouriteVisaIds(prev => {
          const newSet = new Set(prev);
          if (newSet.has(visaId)) {
              newSet.delete(visaId);
          } else {
              newSet.add(visaId);
          }
          if (selectedPackage && (selectedPackage.credits || 0) <= 0) {
             alert("Action Restricted: Out of credits. Cannot add more favorites.");
             return prev;
          }
          return newSet;
      });
  }, [selectedPackage]);

  const handleSaveReport = useCallback((visa: VisaDetails) => {
    if (!selectedPackage || (selectedPackage.credits || 0) <= 0) {
        alert("Action Restricted: Please renew your package to save reports.");
        return;
    }
    alert(`Report for ${visa.country} saved successfully! (1 credit used)`);
  }, [selectedPackage]);

  const purchaseDemoPackage = useCallback(() => {
    const pkg: SelectedPackage = { id: "pkg-starter", title: "Starter Pack", credits: 5, price: 49, currency: "USD", features: ["5 reports", "Basic filters", "Favourites"] };
    setSelectedPackage(pkg);
    alert("Starter Package activated (5 credits added). Enjoy!");
  }, [setSelectedPackage]);
  
  const handleViewDetails = useCallback((visa: VisaDetails) => {
      setActiveVisa(visa);
  }, []);

  return (
    <div className="min-h-screen pb-10">
      
      {/* Header & Global Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Star className="w-8 h-8 text-yellow-600" />
          <h1 className="text-4xl font-extrabold text-stone-800">Global Mobility Dashboard</h1>
        </div>
        
        <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-300 shadow-inner mt-4 sm:mt-0">
          {["Visas", "Country Info", "City Costs"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as DashboardTab)}
              className={`px-4 py-2 text-sm font-semibold transition-colors rounded-lg ${
                activeTab === tab
                  ? 'bg-stone-800 text-white shadow-md'
                  : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-8 gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search visas, countries, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:outline-none shadow-sm transition"
          />
        </div>
        
        <div className="flex gap-4">
             <button 
                onClick={() => setFilters(prev => ({ ...prev, showFavourites: !prev.showFavourites }))}
                className={`px-4 py-2.5 border rounded-xl flex items-center justify-center gap-2 font-semibold transition ${
                    filters.showFavourites ? 'bg-red-50 text-red-700 border-red-400 shadow-md' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100 shadow-sm'
                }`}
            >
                <Heart className="w-4 h-4 fill-current" /> Favourites ({favouriteVisaIds.size})
            </button>
            <button 
                onClick={() => setIsFilterPanelOpen(prev => !prev)}
                className="px-4 py-2.5 border border-stone-300 rounded-xl flex items-center justify-center gap-2 bg-white hover:bg-stone-100 shadow-sm font-semibold text-stone-700 transition"
            >
              <Filter className="w-4 h-4" /> Advanced Filters
            </button>
        </div>
      </div>
      
      {/* Enhanced Filter Panel */}
      {isFilterPanelOpen && (
          <div className="p-4 mb-8 bg-stone-50 border border-stone-300 rounded-xl shadow-inner">
              <h4 className="font-bold text-stone-700 mb-3">Refine Your Search</h4>
              <div className="flex flex-wrap gap-4 text-sm items-center">
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.workRights} onChange={() => setFilters(prev => ({ ...prev, workRights: !prev.workRights }))} className="form-checkbox h-4 w-4 text-indigo-600 rounded" />
                      <span className="text-stone-700">Allow Work Rights</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.residencyPath} onChange={() => setFilters(prev => ({ ...prev, residencyPath: !prev.residencyPath }))} className="form-checkbox h-4 w-4 text-indigo-600 rounded" />
                      <span className="text-stone-700">Path to Residency</span>
                  </label>

                  <label className="flex items-center gap-2 text-stone-700">
                      Min. Duration (Years):
                      <select 
                          value={filters.minDuration}
                          onChange={(e) => setFilters(prev => ({ ...prev, minDuration: parseInt(e.target.value) }))}
                          className="px-2 py-1 border rounded-lg bg-white"
                      >
                          {[0, 1, 2, 5].map(y => <option key={y} value={y}>{y === 0 ? 'Any' : `${y} Year`}</option>)}
                      </select>
                  </label>
              </div>
          </div>
      )}

      {/* Package Info Block */}
      {selectedPackage ? (
        <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-white border border-indigo-300 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <div className="font-bold text-stone-800 text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" /> Active Plan: {selectedPackage.title}
              </div>
              <div className="text-sm text-stone-700 mt-1">
                You have <span className="font-extrabold text-indigo-600">{selectedPackage.credits} credits</span> remaining for detailed reports and unlocks.
                {(selectedPackage.credits || 0) < 2 && <span className="ml-2 text-red-600 font-bold">(Low Credit Alert!)</span>}
              </div>
            </div>
            <button
              onClick={() => navigate("/settings/billing")}
              className="mt-3 sm:mt-0 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md flex-shrink-0"
            >
              Manage Subscription
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-10 p-5 rounded-2xl bg-white border border-red-300 shadow-md flex flex-col sm:flex-row items-center justify-between">
          <div className="text-sm text-red-700 font-semibold">
             **Action Required:** Your reports are locked. Activate a plan to save reports and use advanced filters.
          </div>
          <button onClick={purchaseDemoPackage} className="mt-3 sm:mt-0 px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-lg flex-shrink-0">
            Activate Starter Pack ($49)
          </button>
        </div>
      )}

      {/* YENİ: Aktiv ölkə yoxdursa xəbərdarlıq */}
      {activeCountryId === null && (
        <div className="text-stone-500 text-xl p-10 bg-white border border-stone-300 rounded-xl shadow-md text-center">
            <TrendingUp className="w-10 h-10 text-stone-400 mx-auto mb-4" />
            <h3 className="font-bold text-stone-700">Select a Country Report</h3>
            <p className="mt-2 text-base">Please click on an existing report in the sidebar (e.g., Portugal, France) or click "Add New Report" to start exploring its data.</p>
        </div>
      )}
      
      {/* Main Content Rendered by Active Tab */}
      
      {activeCountryId !== null && (
          <>
          
          {/* YENİ F-1 - F-5: Dinamik Statistika Paneli (Yalnız Aktiv Ölkə üçün) */}
          {activeTab === "Visas" && stats && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  <StatCard title="Total Visas" value={stats.totalVisas} icon={<Globe className="w-5 h-5 text-indigo-600" />} />
                  <StatCard title="Avg. Duration (Yrs)" value={stats.avgDuration} icon={<TrendingUp className="w-5 h-5 text-amber-600" />} /> {/* F-2 */}
                  <StatCard title="With Work Rights" value={stats.visasWithWorkRights} icon={<Users className="w-5 h-5 text-green-600" />} />
                  <StatCard title="Fast Approval %" value={`${stats.fastApprovalPercentage}%`} icon={<Zap className="w-5 h-5 text-blue-600" />} /> {/* F-4 */}
                  <StatCard title="Cost Index (vs Avg)" value={stats.costOfLivingIndex} icon={<DollarSign className="w-5 h-5 text-red-600" />} /> {/* F-5 */}
              </div>
          )}

          {/* Tab Content */}
          <div className="mt-8">
              {activeTab === "Visas" && (
                  <div className="space-y-12">
                      {Object.keys(groupedVisas).map(countryName => {
                          const risk = getCountryRiskScore(countryName);
                          const riskStyle = risk === 'High' ? 'text-red-600' : risk === 'Medium' ? 'text-yellow-600' : 'text-green-600';
                          
                          return (
                              <section key={countryName}>
                                  <h2 className="text-2xl font-extrabold text-gray-800 border-b border-stone-300 pb-3 mb-6 flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                          {activeCountry?.flag} {countryName} Visa Options
                                      </div>
                                      <div className={`text-base font-semibold flex items-center gap-2 px-3 py-1 rounded-full ${riskStyle} bg-stone-100 border border-stone-300`}>
                                          <Shield className="w-4 h-4" /> Risk Score: {risk}
                                      </div>
                                  </h2>
                                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                      {groupedVisas[countryName].map((visa) => (
                                          <VisaCard 
                                              key={visa.id} 
                                              visa={visa} 
                                              onView={handleViewDetails}
                                              onSaveReport={handleSaveReport}
                                              isFavourited={favouriteVisaIds.has(visa.id)} 
                                              onToggleFavourite={handleToggleFavourite}
                                          />
                                      ))}
                                  </div>
                              </section>
                          );
                      })}
                  </div>
              )}
              
              {activeTab === "Country Info" && <IntegratedCountryInfo activeCountry={activeCountry} />}
              
              {activeTab === "City Costs" && <IntegratedCityCosts activeCountry={activeCountry} />}
          </div>
          </>
      )}

      <VisaDetailsModal visa={activeVisa} onClose={() => setActiveVisa(null)} />
    </div>
  );
};

export default Dashboard;

// Köməkçi Komponent: Statistika Kartı
const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-md flex items-center gap-3">
        <div className="p-2 bg-stone-100 rounded-lg">
            {icon}
        </div>
        <div>
            <div className="text-xs font-medium text-stone-500 uppercase">{title}</div>
            <div className="text-xl font-bold text-stone-800">{value}</div>
        </div>
    </div>
);