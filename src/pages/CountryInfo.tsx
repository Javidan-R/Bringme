// src/modules/Onboarding/components/CountryInfo.tsx (ehtimal olunan yer)

import React, { useState } from "react";
import { 
  Globe, 
  Users, 
  DollarSign, 
  Landmark,
  ChevronRight
} from "lucide-react";
// @ts-ignore (countryInfoVariants mövcud deyil, amma tipi saxlayaq)
import { countryInfoVariants } from "../modules/Onboarding/styles/countryInfo"; 
// Yol düzəlişi: COUNTRIES artıq layout-da olduğu üçün, bu ehtimal ki, düzgün yoldur
import { COUNTRIES } from "../lib/data/country"; 

const CountryInfo: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Germany");
  // styles ehtiyac yoxdursa silinə bilər, lakin UI saxlamaq üçün saxlanılır
  const styles = countryInfoVariants(); 
  
  // Aktiv ölkəni tap (əgər tapılmazsa, default olaraq ilk ölkəni götür)
  const currentCountry = COUNTRIES.find(c => c.name === selectedCountry) || COUNTRIES[0];

  return (
    <div className={styles.container()}>
      
      {/* Country Selector - Ölkə Seçicisi */}
      <div className="flex gap-4 mb-6">
        {COUNTRIES.map((country) => (
          <button
            key={country.name}
            onClick={() => setSelectedCountry(country.name)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedCountry === country.name
                ? "bg-[#2BD4A2] text-white shadow-lg"
                : "bg-white text-[#6B7280] hover:bg-gray-50"
            }`}
          >
            <span className="mr-2">{country.flag}</span>
            {country.name}
          </button>
        ))}
      </div>

      {/* Country Header - Ölkə Başlığı */}
      <div className={styles.countryHeader()}>
        <div className={styles.countryTitle()}>
          <div className={styles.flag()}>{currentCountry.flag}</div>
          <div>
            <h1 className={styles.countryName()}>{currentCountry.name}</h1>
            <p className="text-sm text-[#6B7280] font-inter">
              Region: {currentCountry.region}
            </p>
          </div>
        </div>
        {/* Quick Stats silindi, çünki data yoxdur */}
      </div>

      {/* Main Content Grid - Əsas Məzmun Gridi */}
      <div className={styles.grid()}>
        
        {/* Basic Information - Əsas Məlumat (Boş saxlanıldı, çünki data yoxdur) */}
        <div className={styles.section()}>
          <h2 className={styles.sectionTitle()}>
            <Globe className={styles.sectionIcon()} />
            Basic Information
          </h2>
          <p className="text-sm text-[#6B7280]">
            (Data currently unavailable in the COUNTRIES array.)
          </p>
        </div>

        {/* Key Categories - Əsas Kateqoriyalar (Boş saxlanıldı, çünki data yoxdur) */}
        <div className={styles.section()}>
          <h2 className={styles.sectionTitle()}>
            <Landmark className={styles.sectionIcon()} />
            Key Information Categories
          </h2>
          <p className="text-sm text-[#6B7280]">
            (Categories data currently unavailable.)
          </p>
        </div>

        {/* Living Costs Preview - Yaşayış Xərcləri (Mövcud statik data saxlanıldı) */}
        <div className={styles.section()}>
          <h2 className={styles.sectionTitle()}>
            <DollarSign className={styles.sectionIcon()} />
            Average Monthly Costs
          </h2>
          <div className={styles.infoList()}>
            <div className={styles.infoItem()}>
              <span className={styles.infoLabel()}>Rent (1 bedroom, city center)</span>
              <span className={styles.infoValue()}>
                {currentCountry.name === "Germany" ? "€1,200" : currentCountry.name === "Portugal" ? "€900" : "€950"}
              </span>
            </div>
            {/* ... (Digər xərc elementləri) ... */}
            <div className={styles.infoItem()}>
              <span className={styles.infoLabel()}>Groceries</span>
              <span className={styles.infoValue()}>
                {currentCountry.name === "Germany" ? "€300" : currentCountry.name === "Portugal" ? "€200" : "€250"}
              </span>
            </div>
             <div className={styles.infoItem()}>
              <span className={styles.infoLabel()}>Transportation</span>
              <span className={styles.infoValue()}>
                {currentCountry.name === "Germany" ? "€80" : currentCountry.name === "Portugal" ? "€40" : "€50"}
              </span>
            </div>
            <div className={styles.infoItem()}>
              <span className={styles.infoLabel()}>Utilities</span>
              <span className={styles.infoValue()}>
                {currentCountry.name === "Germany" ? "€250" : currentCountry.name === "Portugal" ? "€120" : "€150"}
              </span>
            </div>
          </div>
        </div>

        {/* Service Providers - Xidmət Təchizatçıları (Mövcud statik data saxlanıldı) */}
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
                  : currentCountry.name === "Portugal" 
                  ? "Millennium BCP, Novo Banco, Revolut"
                  : "Sabadell, Santander, BBVA"}
              </div>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="font-semibold text-sm text-[#1F2A44] mb-1">Telecom</div>
              <div className="text-xs text-[#6B7280]">
                {currentCountry.name === "Germany" 
                  ? "Telekom, Vodafone, O2" 
                  : currentCountry.name === "Portugal"
                  ? "MEO, NOS, Vodafone"
                  : "Movistar, Vodafone, Orange"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;