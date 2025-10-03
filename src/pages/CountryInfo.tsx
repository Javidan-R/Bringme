// src/pages/CountryInfo.tsx
import { useState } from "react";
import { 
  Globe, 
  Users, 
  DollarSign, 
  Landmark,
  Home,
  Heart,
  GraduationCap,
  Briefcase,
  ChevronRight
} from "lucide-react";
import { countryInfoVariants } from "../lib/styles/countryInfo";

interface CountryData {
  name: string;
  flag: string;
  capital: string;
  population: string;
  currency: string;
  language: string;
  timezone: string;
  climate: string;
  costOfLiving: string;
  categories: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  basicInfo: {
    label: string;
    value: string;
  }[];
}

const CountryInfo: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Germany");
  const styles = countryInfoVariants();

  const countries: CountryData[] = [
    {
      name: "Germany",
      flag: "🇩🇪",
      capital: "Berlin",
      population: "83M",
      currency: "EUR",
      language: "German",
      timezone: "CET (UTC+1)",
      climate: "Temperate",
      costOfLiving: "High",
      categories: [
        {
          icon: <Home className="w-5 h-5" />,
          title: "Housing",
          description: "Rental market, buying property"
        },
        {
          icon: <Heart className="w-5 h-5" />,
          title: "Healthcare",
          description: "Public & private insurance"
        },
        {
          icon: <GraduationCap className="w-5 h-5" />,
          title: "Education",
          description: "Schools, universities"
        },
        {
          icon: <Briefcase className="w-5 h-5" />,
          title: "Employment",
          description: "Job market, regulations"
        },
      ],
      basicInfo: [
        { label: "Capital", value: "Berlin" },
        { label: "Population", value: "83 million" },
        { label: "Currency", value: "Euro (EUR)" },
        { label: "Official Language", value: "German" },
        { label: "Time Zone", value: "CET (UTC+1)" },
        { label: "Climate", value: "Temperate seasonal" },
        { label: "GDP per Capita", value: "$51,860" },
        { label: "Internet Speed", value: "100+ Mbps avg" },
      ]
    },
    {
      name: "Portugal",
      flag: "🇵🇹",
      capital: "Lisbon",
      population: "10M",
      currency: "EUR",
      language: "Portuguese",
      timezone: "WET (UTC+0)",
      climate: "Mediterranean",
      costOfLiving: "Medium",
      categories: [
        {
          icon: <Home className="w-5 h-5" />,
          title: "Housing",
          description: "Affordable coastal living"
        },
        {
          icon: <Heart className="w-5 h-5" />,
          title: "Healthcare",
          description: "SNS public system"
        },
        {
          icon: <GraduationCap className="w-5 h-5" />,
          title: "Education",
          description: "International schools available"
        },
        {
          icon: <Briefcase className="w-5 h-5" />,
          title: "Employment",
          description: "Growing tech sector"
        },
      ],
      basicInfo: [
        { label: "Capital", value: "Lisbon" },
        { label: "Population", value: "10.3 million" },
        { label: "Currency", value: "Euro (EUR)" },
        { label: "Official Language", value: "Portuguese" },
        { label: "Time Zone", value: "WET (UTC+0)" },
        { label: "Climate", value: "Mediterranean" },
        { label: "GDP per Capita", value: "$24,570" },
        { label: "Internet Speed", value: "200+ Mbps avg" },
      ]
    }
  ];

  const currentCountry = countries.find(c => c.name === selectedCountry) || countries[0];

  return (
    <div className={styles.container()}>
      {/* Country Selector */}
      <div className="flex gap-4 mb-6">
        {countries.map((country) => (
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

      {/* Country Header */}
      <div className={styles.countryHeader()}>
        <div className={styles.countryTitle()}>
          <div className={styles.flag()}>{currentCountry.flag}</div>
          <div>
            <h1 className={styles.countryName()}>{currentCountry.name}</h1>
            <p className="text-sm text-[#6B7280] font-inter">
              Capital: {currentCountry.capital}
            </p>
          </div>
        </div>

        <div className={styles.quickStats()}>
          <div className={styles.statItem()}>
            <div className={styles.statValue()}>{currentCountry.population}</div>
            <div className={styles.statLabel()}>Population</div>
          </div>
          <div className={styles.statItem()}>
            <div className={styles.statValue()}>{currentCountry.currency}</div>
            <div className={styles.statLabel()}>Currency</div>
          </div>
          <div className={styles.statItem()}>
            <div className={styles.statValue()}>{currentCountry.costOfLiving}</div>
            <div className={styles.statLabel()}>Cost of Living</div>
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
            {currentCountry.basicInfo.map((info, idx) => (
              <div key={idx} className={styles.infoItem()}>
                <span className={styles.infoLabel()}>{info.label}</span>
                <span className={styles.infoValue()}>{info.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Categories */}
        <div className={styles.section()}>
          <h2 className={styles.sectionTitle()}>
            <Landmark className={styles.sectionIcon()} />
            Key Information Categories
          </h2>
          <div className={styles.categoryGrid()}>
            {currentCountry.categories.map((category, idx) => (
              <div key={idx} className={styles.categoryCard()}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[#2BD4A2]">{category.icon}</div>
                  <ChevronRight className="w-4 h-4 text-[#9CA3AF] ml-auto" />
                </div>
                <h3 className={styles.categoryTitle()}>{category.title}</h3>
                <p className={styles.categoryDesc()}>{category.description}</p>
              </div>
            ))}
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

export default CountryInfo;