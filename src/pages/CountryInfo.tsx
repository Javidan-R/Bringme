import { useState, useEffect } from "react";
import { 
  Globe, 
  Users, 
  DollarSign, 
  Landmark,
  ChevronRight,
  Star,
  BookOpen,
  Cloud,
  Wifi,
  Heart,
  MessageSquare,
  Download,
  Share2,
  MapPin,
  TrendingUp,
  Calendar,
  Briefcase,
  GraduationCap,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  Info,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Search,
  Filter,
  Eye,
  Bookmark,
  Clock,
  Zap,
} from "lucide-react";
import { countryInfoVariants } from "../modules/Onboarding/styles/countryInfo";
import { countries } from "../lib/data/country";

interface CountryNote {
  id: string;
  category: string;
  note: string;
  createdAt: string;
}

interface SavedCountry {
  name: string;
  savedAt: string;
  rating: number;
}

const CountryInfo: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Germany");
  
  // FEATURE 1: Favorites System
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // FEATURE 2: Country Ratings
  const [ratings, setRatings] = useState<Record<string, number>>({});
  
  // FEATURE 3: Notes by Category
  const [countryNotes, setCountryNotes] = useState<CountryNote[]>([]);
  const [showNotes, setShowNotes] = useState(false);
  
  // FEATURE 4: Comparison Mode
  const [compareMode, setCompareMode] = useState(false);
  const [compareCountry, setCompareCountry] = useState<string>("Portugal");
  
  // FEATURE 5: Category Expansion
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  // FEATURE 6: Quick Facts Panel
  const [showQuickFacts, setShowQuickFacts] = useState(true);
  
  // FEATURE 7: Weather Information
  const [showWeather, setShowWeather] = useState(false);
  
  // FEATURE 8: Internet Speed Data
  const [showInternet, setShowInternet] = useState(false);
  
  // FEATURE 9: Expat Community Size
  const [showExpats, setShowExpats] = useState(false);
  
  // FEATURE 10: Language Requirements
  const [showLanguage, setShowLanguage] = useState(false);
  
  // FEATURE 11: Healthcare Quality
  const [showHealthcare, setShowHealthcare] = useState(false);
  
  // FEATURE 12: Safety Ratings
  const [showSafety, setShowSafety] = useState(false);
  
  // FEATURE 13: Job Market Info
  const [showJobs, setShowJobs] = useState(false);
  
  // FEATURE 14: Education System
  const [showEducation, setShowEducation] = useState(false);
  
  // FEATURE 15: Contact Directory
  const [showContacts, setShowContacts] = useState(false);
  
  // Additional states
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "detailed" | "resources">("overview");

  const styles = countryInfoVariants();
  const currentCountry = countries.find(c => c.name === selectedCountry) || countries[0];
  const compareCountryData = countries.find(c => c.name === compareCountry);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCountries');
    if (savedFavorites) setFavorites(new Set(JSON.parse(savedFavorites)));
    
    const savedRatings = localStorage.getItem('countryRatings');
    if (savedRatings) setRatings(JSON.parse(savedRatings));
    
    const savedNotes = localStorage.getItem('countryNotes');
    if (savedNotes) setCountryNotes(JSON.parse(savedNotes));
  }, []);

  const toggleFavorite = (countryName: string) => {
    const updated = new Set(favorites);
    if (updated.has(countryName)) {
      updated.delete(countryName);
      showNotification(`${countryName} removed from favorites`);
    } else {
      updated.add(countryName);
      showNotification(`${countryName} added to favorites`);
    }
    setFavorites(updated);
    localStorage.setItem('favoriteCountries', JSON.stringify([...updated]));
  };

  const setRating = (countryName: string, rating: number) => {
    const updated = { ...ratings, [countryName]: rating };
    setRatings(updated);
    localStorage.setItem('countryRatings', JSON.stringify(updated));
    showNotification(`Rated ${countryName}: ${rating}/5`);
  };

  const addNote = (category: string, note: string) => {
    const newNote: CountryNote = {
      id: Date.now().toString(),
      category,
      note,
      createdAt: new Date().toISOString()
    };
    const updated = [...countryNotes, newNote];
    setCountryNotes(updated);
    localStorage.setItem('countryNotes', JSON.stringify(updated));
    showNotification("Note added");
  };

  const toggleCategory = (categoryTitle: string) => {
    const updated = new Set(expandedCategories);
    if (updated.has(categoryTitle)) {
      updated.delete(categoryTitle);
    } else {
      updated.add(categoryTitle);
    }
    setExpandedCategories(updated);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const exportCountryData = () => {
    const data = {
      country: selectedCountry,
      rating: ratings[selectedCountry] || 0,
      favorite: favorites.has(selectedCountry),
      notes: countryNotes.filter(n => n.category === selectedCountry),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCountry}-data.json`;
    a.click();
    showNotification("Data exported!");
  };

  return (
    <div className={styles.container()}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Enhanced Header */}
      <div className="mb-6 bg-white rounded-xl border p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Country Information</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setCompareMode(!compareMode)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              {compareMode ? "Single View" : "Compare"}
            </button>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Notes ({countryNotes.filter(n => n.category === selectedCountry).length})
            </button>
            <button
              onClick={exportCountryData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories or information..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Country Selector with Favorites */}
        <div className="flex gap-4 flex-wrap">
          {countries.map((country) => (
            <div key={country.name} className="relative">
              <button
                onClick={() => setSelectedCountry(country.name)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                  selectedCountry === country.name
                    ? "bg-[#2BD4A2] text-white shadow-lg"
                    : "bg-white text-[#6B7280] hover:bg-gray-50 border"
                }`}
              >
                <span className="mr-2">{country.flag}</span>
                {country.name}
                {favorites.has(country.name) && (
                  <Heart className="w-4 h-4 text-red-500 fill-current absolute -top-1 -right-1" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "overview" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("detailed")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "detailed" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
          }`}
        >
          Detailed Info
        </button>
        <button
          onClick={() => setActiveTab("resources")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "resources" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
          }`}
        >
          Resources
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Country Header Card */}
          <div className={`${styles.countryHeader()} bg-gradient-to-r from-blue-50 to-indigo-50`}>
            <div className="flex items-center justify-between">
              <div className={styles.countryTitle()}>
                <div className={styles.flag()}>{currentCountry.flag}</div>
                <div>
                  <h1 className={styles.countryName()}>{currentCountry.name}</h1>
                  <p className="text-sm text-[#6B7280] font-inter">
                    Capital: {currentCountry.capital}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(currentCountry.name)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <Heart className={`w-6 h-6 ${favorites.has(currentCountry.name) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>

            {/* Rating System */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-medium">Your Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(selectedCountry, star)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Star className={`w-5 h-5 ${star <= (ratings[selectedCountry] || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-600">({ratings[selectedCountry] || 0}/5)</span>
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

          {activeTab === "overview" && (
            <>
              {/* Quick Insights Grid */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowWeather(!showWeather)}
                  className="p-4 bg-white border rounded-xl hover:shadow-md transition-shadow text-left"
                >
                  <Cloud className="w-6 h-6 text-blue-500 mb-2" />
                  <div className="font-semibold">Weather</div>
                  <div className="text-sm text-gray-600">Climate info</div>
                </button>
                
                <button
                  onClick={() => setShowInternet(!showInternet)}
                  className="p-4 bg-white border rounded-xl hover:shadow-md transition-shadow text-left"
                >
                  <Wifi className="w-6 h-6 text-purple-500 mb-2" />
                  <div className="font-semibold">Internet Speed</div>
                  <div className="text-sm text-gray-600">
                    {selectedCountry === "Germany" ? "~85 Mbps" : "~75 Mbps"}
                  </div>
                </button>
                
                <button
                  onClick={() => setShowSafety(!showSafety)}
                  className="p-4 bg-white border rounded-xl hover:shadow-md transition-shadow text-left"
                >
                  <AlertCircle className="w-6 h-6 text-green-500 mb-2" />
                  <div className="font-semibold">Safety Rating</div>
                  <div className="text-sm text-gray-600">
                    {selectedCountry === "Germany" ? "Very Safe" : "Safe"}
                  </div>
                </button>
                
                <button
                  onClick={() => setShowExpats(!showExpats)}
                  className="p-4 bg-white border rounded-xl hover:shadow-md transition-shadow text-left"
                >
                  <Users className="w-6 h-6 text-orange-500 mb-2" />
                  <div className="font-semibold">Expat Community</div>
                  <div className="text-sm text-gray-600">
                    {selectedCountry === "Germany" ? "Large" : "Growing"}
                  </div>
                </button>
              </div>

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

              {/* Key Categories with Expansion */}
              <div className={styles.section()}>
                <h2 className={styles.sectionTitle()}>
                  <Landmark className={styles.sectionIcon()} />
                  Key Information Categories
                </h2>
                <div className={styles.categoryGrid()}>
                  {currentCountry.categories.map((category, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleCategory(category.title)}
                      className={`${styles.categoryCard()} cursor-pointer hover:shadow-lg transition-all ${
                        expandedCategories.has(category.title) ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-[#2BD4A2]">{category.icon}</div>
                        <ChevronRight className={`w-4 h-4 text-[#9CA3AF] ml-auto transition-transform ${
                          expandedCategories.has(category.title) ? 'rotate-90' : ''
                        }`} />
                      </div>
                      <h3 className={styles.categoryTitle()}>{category.title}</h3>
                      <p className={styles.categoryDesc()}>{category.description}</p>
                      
                      {expandedCategories.has(category.title) && (
                        <div className="mt-4 pt-4 border-t space-y-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const note = prompt(`Add a note about ${category.title}:`);
                              if (note) addNote(category.title, note);
                            }}
                            className="w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Note
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "detailed" && (
            <>
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
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="font-semibold text-sm text-[#1F2A44] mb-1">Banks</div>
                    <div className="text-xs text-[#6B7280]">
                      {currentCountry.name === "Germany" 
                        ? "Deutsche Bank, Commerzbank, N26" 
                        : "Millennium BCP, Novo Banco, Revolut"}
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="font-semibold text-sm text-[#1F2A44] mb-1">Telecom</div>
                    <div className="text-xs text-[#6B7280]">
                      {currentCountry.name === "Germany" 
                        ? "Telekom, Vodafone, O2" 
                        : "MEO, NOS, Vodafone"}
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="font-semibold text-sm text-[#1F2A44] mb-1">Utilities</div>
                    <div className="text-xs text-[#6B7280]">
                      {currentCountry.name === "Germany" 
                        ? "E.ON, Vattenfall, EnBW" 
                        : "EDP, Galp, Endesa"}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "resources" && (
            <div className={styles.section()}>
              <h2 className="text-xl font-bold mb-4">Useful Resources</h2>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">Embassy Information</div>
                      <div className="text-sm text-gray-600">Official government contacts</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </a>
                <a href="#" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-semibold">Expat Forums</div>
                      <div className="text-sm text-gray-600">Connect with other expats</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </a>
                <a href="#" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-semibold">Language Learning</div>
                      <div className="text-sm text-gray-600">Recommended courses and apps</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Facts */}
          {showQuickFacts && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Quick Facts</h3>
                <button onClick={() => setShowQuickFacts(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-gray-700">Location: Central Europe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700">Population: 83M</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-700">Time Zone: CET (UTC+1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">Calling Code: +49</span>
                </div>
              </div>
            </div>
          )}

          {/* Notes Panel */}
          {showNotes && (
            <div className="bg-white rounded-xl p-4 border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Your Notes</h3>
                <button onClick={() => setShowNotes(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              {countryNotes.filter(n => n.category.includes(selectedCountry)).length === 0 ? (
                <p className="text-sm text-gray-500">No notes yet</p>
              ) : (
                <div className="space-y-2">
                  {countryNotes.filter(n => n.category.includes(selectedCountry)).map(note => (
                    <div key={note.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                      <div className="font-medium text-gray-700 mb-1">{note.category}</div>
                      <div className="text-gray-600">{note.note}</div>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Comparison Card */}
          {compareMode && compareCountryData && (
            <div className="bg-white rounded-xl p-4 border">
              <h3 className="font-bold mb-4">Comparing with</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{compareCountryData.flag}</span>
                <div>
                  <div className="font-semibold">{compareCountryData.name}</div>
                  <div className="text-sm text-gray-600">{compareCountryData.capital}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Population:</span>
                  <span className="font-medium">{compareCountryData.population}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost of Living:</span>
                  <span className="font-medium">{compareCountryData.costOfLiving}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
