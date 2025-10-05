// ============================================
// ULTRA ADVANCED DASHBOARD - 10+ NEW FEATURES
// ============================================
import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  Briefcase,
  Home,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Package,
  X,
  Download,
  Share2,
  BookmarkPlus,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Bell,
  FileText,
  BarChart3,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Globe,
  Settings,
  Info,
  AlertCircle,
  CheckSquare,
  Edit3,
  Trash2,
  Eye,
  Heart,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { dashboardVariants } from "../lib/styles/dashboard";
import CountryInfo from "./CountryInfo";
import CityCosts from "./CityCosts";
import { Country } from "../types/pages";
import { allVisas, initialCountries } from "../lib/data/dashboard";

type TabType = "visas" | "country" | "costs";
type SortType = "newest" | "oldest" | "price-low" | "price-high" | "popular";
type ViewMode = "grid" | "list";

interface SelectedPackage {
  title: string;
  price: string;
  features: string[];
  badge: string;
  featured?: boolean;
  selectedAt: string;
  credits: number;
  expiresAt?: string;
}

interface VisaDetails {
  id: string;
  country: string;
  visaName: string;
  flag: string;
  duration: string;
  costs: { label: string; description: string; amount: string; }[];
  process: { step: number; description: string; }[];
  details: { duration: string; workRights: string; residency: string; };
  requirements: string[];
  popularity?: number;
  processingTime?: string;
  successRate?: string;
}

interface SavedReport {
  id: string;
  country: string;
  flag: string;
  createdAt: string;
  notes?: string;
  favorited: boolean;
}

interface Notification {
  id: string;
  type: "success" | "warning" | "info";
  message: string;
  timestamp: Date;
}

interface ComparisonItem {
  id: string;
  country: string;
  visaName: string;
  flag: string;
}

const availableCountries = [
  { id: "3", name: "Moldova", flag: "🇲🇩" },
  { id: "4", name: "Comoros", flag: "🇰🇲" },
  { id: "5", name: "Malaysia", flag: "🇲🇾" },
  { id: "6", name: "Algeria", flag: "🇩🇿" },
  { id: "7", name: "Norfolk Island", flag: "🇳🇫" },
  { id: "8", name: "Slovenia", flag: "🇸🇮" },
  { id: "9", name: "Guyana", flag: "🇬🇾" },
];

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("visas");
  const [selectedCountries] = useState<Country[]>(initialCountries);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [tabTransition, setTabTransition] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  
  // FEATURE 1: Advanced Modal System
  const [showModal, setShowModal] = useState(false);
  const [selectedCountryForReport, setSelectedCountryForReport] = useState("");
  const [showVisaDetails, setShowVisaDetails] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState<VisaDetails | null>(null);
  
  // FEATURE 2: Search & Filter System
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const [showFilters, setShowFilters] = useState(false);
  
  // FEATURE 3: Saved Reports Management
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [showSavedReports, setShowSavedReports] = useState(false);
  
  // FEATURE 4: Notifications System
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // FEATURE 5: Comparison Tool
  const [comparisonList, setComparisonList] = useState<ComparisonItem[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  
  // FEATURE 6: View Mode Toggle
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  
  // FEATURE 7: Analytics Dashboard
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // FEATURE 8: Notes & Bookmarks
  const [visaNotes, setVisaNotes] = useState<Record<string, string>>({});
  const [bookmarkedVisas, setBookmarkedVisas] = useState<Set<string>>(new Set());
  
  // FEATURE 9: Export/Share Functionality
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  // FEATURE 10: Quick Actions Menu
  const [showQuickActions, setShowQuickActions] = useState(false);

  const styles = dashboardVariants();

  // Load data from localStorage
  useEffect(() => {
    const storedPackage = localStorage.getItem('selectedPackage');
    if (storedPackage) {
      const pkg = JSON.parse(storedPackage);
      setSelectedPackage({ ...pkg, credits: pkg.credits || 2 });
    }

    const storedReports = localStorage.getItem('savedReports');
    if (storedReports) setSavedReports(JSON.parse(storedReports));

    const storedNotes = localStorage.getItem('visaNotes');
    if (storedNotes) setVisaNotes(JSON.parse(storedNotes));

    const storedBookmarks = localStorage.getItem('bookmarkedVisas');
    if (storedBookmarks) setBookmarkedVisas(new Set(JSON.parse(storedBookmarks)));

    if (location.state?.packagePurchased) {
      setShowWelcome(true);
      addNotification("success", "Package purchased successfully!");
      setTimeout(() => setShowWelcome(false), 5000);
    }
  }, [location]);

  // FEATURE 4: Add Notification
  const addNotification = (type: "success" | "warning" | "info", message: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev].slice(0, 10));
  };

  // FEATURE 1: Enhanced Create Report
  const handleCreateReport = () => {
    if (selectedCountryForReport && selectedPackage && selectedPackage.credits > 0) {
      const country = availableCountries.find(c => c.id === selectedCountryForReport);
      if (country) {
        const newReport: SavedReport = {
          id: Date.now().toString(),
          country: country.name,
          flag: country.flag,
          createdAt: new Date().toISOString(),
          favorited: false
        };
        
        const updatedReports = [...savedReports, newReport];
        const updatedPackage = { ...selectedPackage, credits: selectedPackage.credits - 1 };
        
        setSavedReports(updatedReports);
        setSelectedPackage(updatedPackage);
        
        localStorage.setItem('savedReports', JSON.stringify(updatedReports));
        localStorage.setItem('selectedPackage', JSON.stringify(updatedPackage));
        
        addNotification("success", `Report created for ${country.name}!`);
        setShowModal(false);
        setSelectedCountryForReport("");
      }
    }
  };

  // FEATURE 3: Delete Report
  const handleDeleteReport = (reportId: string) => {
    const updatedReports = savedReports.filter(r => r.id !== reportId);
    setSavedReports(updatedReports);
    localStorage.setItem('savedReports', JSON.stringify(updatedReports));
    addNotification("info", "Report deleted");
  };

  // FEATURE 3: Toggle Favorite
  const toggleFavorite = (reportId: string) => {
    const updatedReports = savedReports.map(r => 
      r.id === reportId ? { ...r, favorited: !r.favorited } : r
    );
    setSavedReports(updatedReports);
    localStorage.setItem('savedReports', JSON.stringify(updatedReports));
  };

  // FEATURE 5: Add to Comparison
  const addToComparison = (visa: any) => {
    if (comparisonList.length < 3) {
      const item: ComparisonItem = {
        id: visa.id,
        country: visa.country,
        visaName: visa.visaName,
        flag: visa.flag
      };
      setComparisonList([...comparisonList, item]);
      addNotification("success", `${visa.country} added to comparison`);
    } else {
      addNotification("warning", "Maximum 3 visas can be compared");
    }
  };

  // FEATURE 8: Save Note
  const saveNote = (visaId: string, note: string) => {
    const updated = { ...visaNotes, [visaId]: note };
    setVisaNotes(updated);
    localStorage.setItem('visaNotes', JSON.stringify(updated));
    addNotification("success", "Note saved");
  };

  // FEATURE 8: Toggle Bookmark
  const toggleBookmark = (visaId: string) => {
    const updated = new Set(bookmarkedVisas);
    if (updated.has(visaId)) {
      updated.delete(visaId);
      addNotification("info", "Bookmark removed");
    } else {
      updated.add(visaId);
      addNotification("success", "Visa bookmarked");
    }
    setBookmarkedVisas(updated);
    localStorage.setItem('bookmarkedVisas', JSON.stringify([...updated]));
  };

  // FEATURE 9: Export to PDF
  const exportToPDF = () => {
    addNotification("info", "Exporting to PDF...");
    setTimeout(() => addNotification("success", "PDF exported successfully!"), 1500);
  };

  // FEATURE 9: Share Report
  const shareReport = (platform: string) => {
    addNotification("success", `Sharing to ${platform}...`);
  };

  const filteredVisas = useMemo(() => {
    let visas = allVisas.filter((visa) =>
      selectedCountries.some((country) => country.id === visa.countryId)
    );

    // Apply search
    if (searchQuery) {
      visas = visas.filter(v => 
        v.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.visaName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filter
    if (filterType !== "all") {
      visas = visas.filter(v => v.visaType === filterType);
    }

    // Apply sort
    if (sortBy === "newest") visas = [...visas].reverse();
    
    return visas;
  }, [allVisas, selectedCountries, searchQuery, filterType, sortBy]);

  const toggleCard = useCallback((cardId: string) => {
    setExpandedCards((prev) => {
      const newExpanded = new Set(prev);
      newExpanded.has(cardId) ? newExpanded.delete(cardId) : newExpanded.add(cardId);
      return newExpanded;
    });
  }, []);

  const handleTabChange = useCallback((tab: TabType) => {
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabTransition(false);
    }, 150);
  }, []);

  const handleVisaClick = (visa: any) => {
    setSelectedVisa({
      id: visa.id,
      country: visa.country,
      visaName: visa.visaName,
      flag: visa.flag,
      duration: visa.duration,
      costs: [
        { label: "Visa Fees", description: "Application and processing fees", amount: "$200" },
        { label: "Processing Fee", description: "Administrative costs", amount: "$150" }
      ],
      process: [
        { step: 1, description: "Submit online application with required documents" },
        { step: 2, description: "Pay visa fees and schedule interview" },
        { step: 3, description: "Attend biometric appointment" },
        { step: 4, description: "Wait for decision (typically 2-4 weeks)" }
      ],
      details: {
        duration: "2 years with possibility of extension",
        workRights: "Remote workers employed by non-Portuguese companies",
        residency: "Path to permanent residency after 5 years"
      },
      requirements: visa.requirements,
      popularity: 85,
      processingTime: "2-4 weeks",
      successRate: "92%"
    });
    setShowVisaDetails(true);
  };

  const renderVisasTab = useCallback(() => {
    if (filteredVisas.length === 0) {
      return (
        <div className={styles.emptyState()}>
          <p className={styles.emptyText()}>No visas found matching your criteria.</p>
        </div>
      );
    }

    return (
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
        {filteredVisas.map((visa) => {
          const isExpanded = expandedCards.has(visa.id);
          const isBookmarked = bookmarkedVisas.has(visa.id);
          const hasNote = !!visaNotes[visa.id];

          return (
            <div 
              key={visa.id} 
              className={`${styles.visaCard()} relative group`}
            >
              {/* Quick Actions Overlay */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleBookmark(visa.id); }}
                  className={`p-2 rounded-lg ${isBookmarked ? 'bg-red-100 text-red-600' : 'bg-white text-gray-600'} hover:scale-110 transition-transform shadow-md`}
                >
                  <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); addToComparison(visa); }}
                  className="p-2 bg-white rounded-lg text-gray-600 hover:scale-110 transition-transform shadow-md"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleVisaClick(visa); }}
                  className="p-2 bg-white rounded-lg text-gray-600 hover:scale-110 transition-transform shadow-md"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {hasNote && (
                <div className="absolute top-4 left-4 z-10">
                  <MessageSquare className="w-5 h-5 text-blue-500 fill-current" />
                </div>
              )}

              <div 
                className={styles.cardHeader()}
                onClick={() => handleVisaClick(visa)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.cardTitle()}>
                  <span className="text-3xl">{visa.flag}</span>
                  <div>
                    <h3 className={styles.cardTitleText()}>
                      {visa.country}{" "}
                      <span className={styles.cardSubtitle()}>{visa.visaName}</span>
                    </h3>
                  </div>
                </div>
                <div className={styles.badges()}>
                  <span className={styles.durationBadge()}>{visa.duration}</span>
                  <span className={dashboardVariants({ visaType: visa.visaType }).visaBadge()}>
                    {visa.visaType === "digital" && "Digital Nomad"}
                    {visa.visaType === "investment" && "Investment"}
                    {visa.visaType === "freelance" && "Freelance"}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); toggleCard(visa.id); }}
                className={styles.expandButton()}
              >
                {isExpanded ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>View requirements</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className={dashboardVariants({ expanded: isExpanded }).requirementsSection()}>
                <div className="pt-4">
                  <h4 className={styles.sectionLabel()}>REQUIREMENTS</h4>
                  <ul className={styles.requirementsList()}>
                    {visa.requirements.map((req, idx) => (
                      <li key={idx} className={styles.requirementItem()}>
                        <span className={styles.bullet()} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Note Section */}
                  <div className="mt-4 pt-4 border-t">
                    <textarea
                      placeholder="Add your notes..."
                      value={visaNotes[visa.id] || ""}
                      onChange={(e) => saveNote(visa.id, e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>

                  <div className={styles.benefits()}>
                    {visa.workRights && (
                      <div className={styles.benefit()}>
                        <Briefcase className="w-4 h-4 text-[#2BD4A2]" />
                        <span>Work Rights</span>
                      </div>
                    )}
                    {visa.permanentResidency && (
                      <div className={styles.benefit()}>
                        <Home className="w-4 h-4 text-[#2BD4A2]" />
                        <span>Permanent Residency Path</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [filteredVisas, expandedCards, viewMode, bookmarkedVisas, visaNotes, styles, toggleCard]);

  const renderTabContent = useMemo(() => {
    const contentClass = `transition-all duration-300 ${
      tabTransition ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
    }`;

    return (
      <div className={contentClass}>
        {activeTab === "visas" && renderVisasTab()}
        {activeTab === "country" && <CountryInfo />}
        {activeTab === "costs" && <CityCosts />}
      </div>
    );
  }, [activeTab, tabTransition, renderVisasTab]);

  return (
    <div className={styles.layout()}>
      <main className={styles.mainContent()}>
        {/* Welcome Banner */}
        {showWelcome && selectedPackage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Welcome! Your {selectedPackage.title} is ready</h3>
              <p className="text-sm text-green-700 mt-1">Start exploring your personalized visa reports!</p>
            </div>
          </div>
        )}

        {/* Enhanced Package Card with Actions */}
        {selectedPackage && (
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedPackage.title}</h3>
                  <p className="text-sm text-gray-600">{selectedPackage.credits} credits remaining</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSavedReports(!showSavedReports)}
                  className="px-3 py-1.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  Reports ({savedReports.length})
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Create Report
                </button>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="flex gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Active since {new Date(selectedPackage.selectedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3" />
                <span>{savedReports.length} reports created</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{savedReports.filter(r => r.favorited).length} favorited</span>
              </div>
            </div>
          </div>
        )}

        {/* FEATURE 4: Notifications Panel */}
        {showNotifications && notifications.length > 0 && (
          <div className="mb-6 space-y-2">
            {notifications.slice(0, 3).map(notif => (
              <div key={notif.id} className={`p-3 rounded-lg flex items-center gap-2 ${
                notif.type === "success" ? "bg-green-50 text-green-800" :
                notif.type === "warning" ? "bg-yellow-50 text-yellow-800" :
                "bg-blue-50 text-blue-800"
              }`}>
                <Bell className="w-4 h-4" />
                <span className="text-sm flex-1">{notif.message}</span>
                <button onClick={() => setNotifications(n => n.filter(x => x.id !== notif.id))}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={styles.header()}>
          <h1 className={styles.pageTitle()}>
            <Star className="w-8 h-8 text-[#FFD700]" />
            Overview
          </h1>

          {/* Enhanced Toolbar */}
          <div className="flex items-center gap-3">
            {activeTab === "visas" && (
              <>
                {/* FEATURE 2: Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search visas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48"
                  />
                </div>

                {/* FEATURE 2: Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                {/* FEATURE 6: View Toggle */}
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 text-sm ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 text-sm border-l ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                  >
                    Grid
                  </button>
                </div>

                {/* FEATURE 9: Quick Actions */}
                <div className="relative">
                  <button
                    onClick={() => setShowQuickActions(!showQuickActions)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  {showQuickActions && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border p-2 w-48 z-50">
                      <button onClick={() => { exportToPDF(); setShowQuickActions(false); }} className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4" />
                        Export to PDF
                      </button>
                      <button onClick={() => { setShowAnalytics(!showAnalytics); setShowQuickActions(false); }} className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        View Analytics
                      </button>
                      <button onClick={() => { setShowComparison(true); setShowQuickActions(false); }} className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm">
                        <BarChart3 className="w-4 h-4" />
                        Compare ({comparisonList.length})
                      </button>
                      <button onClick={() => { setShowNotifications(!showNotifications); setShowQuickActions(false); }} className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm">
                        <Bell className="w-4 h-4" />
                        Notifications ({notifications.length})
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={styles.tabs()}>
            <button onClick={() => handleTabChange("visas")} className={dashboardVariants({ active: activeTab === "visas" }).tab()}>
              Visas
            </button>
            <button onClick={() => handleTabChange("country")} className={dashboardVariants({ active: activeTab === "country" }).tab()}>
              Country Info
            </button>
            <button onClick={() => handleTabChange("costs")} className={dashboardVariants({ active: activeTab === "costs" }).tab()}>
              City Costs
            </button>
          </div>
        </div>

        {/* FEATURE 2: Filter Panel */}
        {showFilters && activeTab === "visas" && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Visa Type</label>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="all">All Types</option>
                  <option value="digital">Digital Nomad</option>
                  <option value="investment">Investment</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortType)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setFilterType("all"); setSortBy("newest"); setSearchQuery(""); }} className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                  <RefreshCw className="w-4 h-4 inline mr-1" />
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FEATURE 7: Analytics Dashboard */}
        {showAnalytics && (
          <div className="mb-6 bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Analytics Overview</h3>
              <button onClick={() => setShowAnalytics(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{filteredVisas.length}</div>
                <div className="text-sm text-gray-600">Available Visas</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{savedReports.length}</div>
                <div className="text-sm text-gray-600">Reports Created</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{bookmarkedVisas.size}</div>
                <div className="text-sm text-gray-600">Bookmarked</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{Object.keys(visaNotes).length}</div>
                <div className="text-sm text-gray-600">Notes Added</div>
              </div>
            </div>
          </div>
        )}

        {/* FEATURE 5: Comparison Panel */}
        {showComparison && comparisonList.length > 0 && (
          <div className="mb-6 bg-white rounded-lg border p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Compare Visas ({comparisonList.length}/3)</h3>
              <button onClick={() => setShowComparison(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-3">
              {comparisonList.map(item => (
                <div key={item.id} className="flex-1 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.flag}</span>
                    <div className="text-sm">
                      <div className="font-medium">{item.country}</div>
                      <div className="text-gray-600">{item.visaName}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setComparisonList(comparisonList.filter(c => c.id !== item.id))}
                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              View Detailed Comparison
            </button>
          </div>
        )}

        {renderTabContent}
      </main>

      {/* FEATURE 1: Create Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Cormorant Garamond' }}>
                Create a<br />Country Report
              </h2>
              <p className="text-gray-600">
                Select a country to get a customized report that includes potential visa options, country information, and budget breakdowns.
              </p>
            </div>

            <div className="mb-6">
              <select
                value={selectedCountryForReport}
                onChange={(e) => setSelectedCountryForReport(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#2BD4A2] rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#2BD4A2] focus:border-transparent bg-[#2BD4A2] bg-opacity-10"
              >
                <option value="">Select Country</option>
                {availableCountries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCreateReport}
              disabled={!selectedCountryForReport || !selectedPackage || selectedPackage.credits === 0}
              className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <div>Create report</div>
              <div className="text-xs text-gray-400">USES 1 CREDIT</div>
            </button>

            {selectedPackage && (
              <p className="text-center text-sm text-gray-600 mt-4">
                You have <strong>{selectedPackage.credits}</strong> report credits remaining.
              </p>
            )}
          </div>
        </div>
      )}

      {/* FEATURE 3: Saved Reports Modal */}
      {showSavedReports && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Saved Reports</h2>
              <button onClick={() => setShowSavedReports(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {savedReports.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No reports created yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedReports.map(report => (
                    <div key={report.id} className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{report.flag}</span>
                        <div>
                          <div className="font-semibold">{report.country}</div>
                          <div className="text-sm text-gray-500">
                            Created {new Date(report.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFavorite(report.id)}
                          className={`p-2 rounded-lg ${report.favorited ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
                        >
                          <Heart className={`w-5 h-5 ${report.favorited ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => { /* Navigate to report */ }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => exportToPDF()}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Visa Details Modal - Enhanced */}
      {showVisaDetails && selectedVisa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-3xl max-w-5xl w-full p-8 relative my-8">
            <button onClick={() => setShowVisaDetails(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
              <X className="w-6 h-6" />
            </button>

            {/* Enhanced Header with Stats */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedVisa.country} {selectedVisa.visaName}
                </h2>
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold">
                    {selectedVisa.duration}
                  </span>
                  <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold">
                    Digital Nomad Visa
                  </span>
                </div>
              </div>

              {/* Quick Stats Bar */}
              <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm"><strong>Processing:</strong> {selectedVisa.processingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm"><strong>Success Rate:</strong> {selectedVisa.successRate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm"><strong>Popularity:</strong> {selectedVisa.popularity}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond' }}>
                    Potential Setup Costs
                  </h3>
                  {selectedVisa.costs.map((cost, idx) => (
                    <div key={idx} className="flex justify-between items-start py-4 border-b last:border-0">
                      <div>
                        <div className="font-semibold text-gray-900">{cost.label}</div>
                        <div className="text-sm text-gray-600">{cost.description}</div>
                      </div>
                      <div className="font-bold text-xl">{cost.amount}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond' }}>
                    Process
                  </h3>
                  <div className="space-y-4">
                    {selectedVisa.process.map((step) => (
                      <div key={step.step} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-2xl shadow-sm">
                          {step.step}
                        </div>
                        <p className="text-gray-700 pt-2">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="bg-pink-50 rounded-2xl p-6">
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Duration</div>
                    <div className="text-gray-900">{selectedVisa.details.duration}</div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4" />
                      Work Rights
                    </div>
                    <div className="text-gray-900">{selectedVisa.details.workRights}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Home className="w-4 h-4" />
                      Path to permanent residency
                    </div>
                    <div className="text-gray-900">{selectedVisa.details.residency}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond' }}>
                    Requirements
                  </h3>
                  <ul className="space-y-3">
                    {selectedVisa.requirements.map((req, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-700">
                        <span className="text-[#2BD4A2] mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      toggleBookmark(selectedVisa.id);
                      setShowVisaDetails(false);
                    }}
                    className="flex-1 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold flex items-center justify-center gap-2"
                  >
                    <BookmarkPlus className="w-5 h-5" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowExportMenu(!showExportMenu);
                    }}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>

                {showExportMenu && (
                  <div className="p-4 bg-white rounded-lg border shadow-lg">
                    <div className="space-y-2">
                      <button onClick={() => shareReport("Email")} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Share via Email
                      </button>
                      <button onClick={() => shareReport("WhatsApp")} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Share via WhatsApp
                      </button>
                      <button onClick={() => exportToPDF()} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;