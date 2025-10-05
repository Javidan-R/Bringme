// src/pages/CityCosts.tsx

import React, { useState, useMemo, useEffect } from "react";
import { 
  Home, 
  ShoppingCart, 
  Car, 
  Zap,
  Dumbbell,
  AlertTriangle,
  ArrowUp, 
  ArrowDown
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
// @ts-ignore (cityCostsVariants ehtimal ki, stil faylıdır)
import { cityCostsVariants } from "../modules/Onboarding/styles/cityCosts"; 
import { cities as mockCityData } from "../lib/data/cities"; // Mock data adı dəyişdirildi
import { CityData, Country } from "@/modules/Dashboard/types"; // Ehtimal olunan tip yolu

// DashboardLayout context tipini müəyyənləşdirmək
interface DashboardContext {
  selectedCountries: Country[];
  activeCountryId: string | null;
}

// XƏBƏRDARLIQ: Mock data tipini düzgün əks etdirmək üçün.
const cities: CityData[] = mockCityData as CityData[];


const CityCosts: React.FC = () => {
  const { selectedCountries, activeCountryId } = useOutletContext<DashboardContext>();
  // @ts-ignore
  const styles = cityCostsVariants(); // UI stil variantları

  // Aktiv ölkəni tap
  const activeCountry = useMemo(() => 
    selectedCountries.find(c => c.id === activeCountryId) || selectedCountries[0]
  , [activeCountryId, selectedCountries]);

  // Aktiv ölkənin şəhər adlarını tap
  const cityOptions = useMemo(() => 
    activeCountry ? activeCountry.cities : []
  , [activeCountry]);


  // State-ləri dinamik et
  const [selectedCity1, setSelectedCity1] = useState(cityOptions[0] || "Berlin");
  const [selectedCity2, setSelectedCity2] = useState(cityOptions.length > 1 ? cityOptions[1] : "Lisbon");
  const [compareMode, setCompareMode] = useState(false);
  
  
  // YENİ F-1: Default Şəhər Düzəlişi (cityOptions dəyişdikdə state-i yenilə)
  useEffect(() => {
    if (cityOptions.length > 0) {
      // Əgər seçilmiş şəhər mövcud siyahıda yoxdursa, onu ilk şəhər ilə əvəz et
      if (!cityOptions.includes(selectedCity1)) {
        setSelectedCity1(cityOptions[0]);
      }
      if (!cityOptions.includes(selectedCity2)) {
         setSelectedCity2(cityOptions.length > 1 ? cityOptions[1] : cityOptions[0]);
      }
    }
  }, [cityOptions, selectedCity1, selectedCity2]);

  
  // Şəhər datalarını tap (Mock datadan)
  const city1Data: CityData | undefined = useMemo(() => 
      cities.find(c => c.name === selectedCity1)
  , [selectedCity1]);
  
  const city2Data: CityData | undefined = useMemo(() => 
      cities.find(c => c.name === selectedCity2)
  , [selectedCity2]);
  
  
  // Xərc Fərqini Hesablamaq (YENİ F-2)
  const getCostDifference = (cost1Str: string | undefined, cost2Str: string | undefined) => {
    if (!cost1Str || !cost2Str) return null;
    
    // Yalnız rəqəmləri çıxar (məsələn: "$1,200" -> 1200)
    const parseCost = (cost: string) => parseFloat(cost.replace(/[^\d\.]/g, ''));
    
    const cost1 = parseCost(cost1Str);
    const cost2 = parseCost(cost2Str);

    if (isNaN(cost1) || isNaN(cost2)) return null;
    
    const difference = cost1 - cost2;
    const isHigher = difference > 0;
    const absDifference = Math.abs(difference).toLocaleString();
    
    return {
      difference: absDifference,
      isHigher: isHigher,
      percentage: ((Math.abs(difference) / cost2) * 100).toFixed(1)
    };
  };
  
  const totalCostDifference = compareMode && city1Data && city2Data
    ? getCostDifference(city1Data.totalMonthly, city2Data.totalMonthly)
    : null;


  // Şəhər kartının render funksiyası (Premium UI)
  const renderCityCard = (cityData: CityData | undefined, isComparison: boolean = false) => {
      if (!cityData) {
          return (
              <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center min-h-[300px]">
                   <p className="text-gray-500 font-medium">No cost data available for this city.</p>
              </div>
          );
      }
      
      return (
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-indigo-50">
              <div className="flex items-start justify-between mb-6 border-b pb-4">
                  <div className="flex items-center gap-3">
                      <span className="text-4xl">{cityData.flag}</span>
                      <div>
                          <h2 className="text-2xl font-extrabold text-gray-900">{cityData.name}</h2>
                          <p className="text-sm text-indigo-600 font-semibold">{cityData.country}</p>
                      </div>
                  </div>
                  
                  <div className="text-right">
                      <div className="text-3xl font-black text-indigo-700">{cityData.totalMonthly}</div>
                      <div className="text-xs text-gray-500 font-medium tracking-wide uppercase">Total Monthly Cost</div>
                  </div>
              </div>

              {/* Housing */}
              <CategorySection 
                  title="Housing" 
                  icon={Home} 
                  costs={cityData.costs.housing} 
                  compareData={isComparison ? city2Data?.costs.housing : undefined}
              />
              {/* Food */}
              <CategorySection 
                  title="Food & Dining" 
                  icon={ShoppingCart} 
                  costs={cityData.costs.food} 
                  compareData={isComparison ? city2Data?.costs.food : undefined}
              />
              {/* Transportation */}
              <CategorySection 
                  title="Transportation" 
                  icon={Car} 
                  costs={cityData.costs.transportation} 
                  compareData={isComparison ? city2Data?.costs.transportation : undefined}
              />
              {/* Utilities */}
              <CategorySection 
                  title="Utilities" 
                  icon={Zap} 
                  costs={cityData.costs.utilities} 
                  compareData={isComparison ? city2Data?.costs.utilities : undefined}
              />
              {/* Lifestyle */}
              <CategorySection 
                  title="Lifestyle" 
                  icon={Dumbbell} 
                  costs={cityData.costs.lifestyle} 
                  compareData={isComparison ? city2Data?.costs.lifestyle : undefined}
              />
          </div>
      );
  };
  
  // YENİ F-3: Vahid Xərc Səviyyəsi Komponenti
  const CategorySection = ({ title, icon: Icon, costs, compareData }: any) => {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {costs.map((item: any, idx: number) => {
             const difference = compareMode && compareData?.[idx] 
                 ? getCostDifference(item.value, compareData[idx].value)
                 : null;

             return (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <span className="text-sm text-gray-600 font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-md font-bold text-gray-900">{item.value}</span>
                    {difference && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difference.isHigher ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                           {difference.isHigher ? <ArrowUp className="w-3 h-3 inline mr-0.5"/> : <ArrowDown className="w-3 h-3 inline mr-0.5"/>}
                           {difference.percentage}%
                        </span>
                    )}
                </div>
              </div>
          )})}
        </div>
      </div>
    );
  };
  
  // Əgər aktiv ölkə yoxdursa və ya şəhər seçimləri yoxdursa
  if (!activeCountry || cityOptions.length === 0) {
     return (
        <div className="p-8 bg-white rounded-xl shadow-lg text-center mt-10">
          <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">No City Data Available</h2>
          <p className="text-gray-600 mt-2">The selected country ({activeCountry?.name || "N/A"}) has no defined cities or corresponding cost data.</p>
        </div>
     );
  }


  return (
    <div className="p-4 md:p-8 bg-[#F6F3F2] min-h-full">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">City Cost Analysis</h1>
      <p className="text-lg text-gray-500 mb-8">Compare monthly expenses for major cities in {activeCountry.name}.</p>
      
      {/* Filter Bar (Premium Look) */}
      <div className="bg-white p-5 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row items-center gap-4 border border-indigo-200">
        
        <div className="flex flex-col flex-1 w-full md:w-auto">
          <label className="text-xs font-semibold text-gray-500 mb-1">CITY 1 (Base)</label>
          <select 
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
            value={selectedCity1}
            onChange={(e) => setSelectedCity1(e.target.value)}
          >
            {cityOptions.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>

        {compareMode && (
          <div className="flex flex-col flex-1 w-full md:w-auto">
            <label className="text-xs font-semibold text-gray-500 mb-1">CITY 2 (Comparison)</label>
            <select 
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
              value={selectedCity2}
              onChange={(e) => setSelectedCity2(e.target.value)}
            >
              {cityOptions.filter(city => city !== selectedCity1).map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`px-5 py-2.5 mt-4 md:mt-0 font-bold rounded-xl text-white transition-all w-full md:w-auto ${
            compareMode ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {compareMode ? "Hide Comparison" : "Compare Cities"}
        </button>
      </div>

      {/* Comparison Summary (Yeni F-2 Göstəricisi) */}
      {compareMode && totalCostDifference && (
        <div className={`p-4 rounded-xl shadow-md mb-8 font-semibold flex items-center justify-center gap-2 ${totalCostDifference.isHigher ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
             {totalCostDifference.isHigher ? <ArrowUp className="w-5 h-5"/> : <ArrowDown className="w-5 h-5"/>}
             <p>
                **{selectedCity1}** is **{totalCostDifference.isHigher ? 'more expensive' : 'cheaper'}** by **${totalCostDifference.difference}** ({totalCostDifference.percentage}%) compared to {selectedCity2}.
             </p>
        </div>
      )}

      {/* City Cards Display */}
      {compareMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {renderCityCard(city1Data, true)}
          {renderCityCard(city2Data)}
        </div>
      ) : (
        renderCityCard(city1Data)
      )}
    </div>
  );
};

export default CityCosts;