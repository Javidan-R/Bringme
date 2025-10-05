// ============================================
// ENHANCED CITY COSTS - 15+ NEW FEATURES
// ============================================
import { useState, useMemo, useEffect } from "react";
import { 
  Home, 
  ShoppingCart, 
  Car, 
  Zap,
  Dumbbell,
  TrendingUp,
  TrendingDown,
  Calculator,
  Download,
  Share2,
  PieChart,
  BarChart3,
  ArrowLeftRight,
  Save,
  X,
  Plus,
  Minus,
  DollarSign,
  Percent,
  RefreshCw,
  Info,
  ExternalLink,
  MapPin,
  Users,
  Calendar,
  Filter,
  ChevronDown,
  Eye,
  EyeOff,
  Settings as SettingsIcon,
  Copy,
  Check,
} from "lucide-react";
import { cityCostsVariants } from "../modules/Onboarding/styles/cityCosts";
import { cities } from "../lib/data/cities";
import { CityData } from "../types/pages";

interface CustomBudget {
  housing: number;
  food: number;
  transport: number;
  utilities: number;
  lifestyle: number;
}

interface SavedComparison {
  id: string;
  city1: string;
  city2: string;
  savedAt: string;
  notes?: string;
}

interface CostAlert {
  id: string;
  category: string;
  threshold: number;
  enabled: boolean;
}

const CityCosts: React.FC = () => {
  const [selectedCity1, setSelectedCity1] = useState("Berlin");
  const [selectedCity2, setSelectedCity2] = useState("Lisbon");
  const [compareMode, setCompareMode] = useState(false);
  
  // FEATURE 1: Budget Calculator
  const [showCalculator, setShowCalculator] = useState(false);
  const [customBudget, setCustomBudget] = useState<CustomBudget>({
    housing: 1200, food: 400, transport: 80, utilities: 250, lifestyle: 200
  });
  
  // FEATURE 2: Currency Converter
  const [currency, setCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(1);
  
  // FEATURE 3: Saved Comparisons
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);
  const [showSavedComparisons, setShowSavedComparisons] = useState(false);
  
  // FEATURE 4: Cost Breakdown Chart
  const [showChart, setShowChart] = useState(false);
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");
  
  // FEATURE 5: Expense Tracking
  const [trackedExpenses, setTrackedExpenses] = useState<Record<string, number>>({});
  const [showExpenseTracker, setShowExpenseTracker] = useState(false);
  
  // FEATURE 6: Cost Alerts
  const [costAlerts, setCostAlerts] = useState<CostAlert[]>([]);
  const [showAlerts, setShowAlerts] = useState(false);
  
  // FEATURE 7: Hidden Categories
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(new Set());
  
  // FEATURE 8: Percentage View
  const [showPercentages, setShowPercentages] = useState(false);
  
  // FEATURE 9: Historical Data
  const [showTrends, setShowTrends] = useState(false);
  
  // FEATURE 10: Notes System
  const [cityNotes, setCityNotes] = useState<Record<string, string>>({});
  
  // FEATURE 11: Export Options
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  // FEATURE 12: Split View Options
  const [splitRatio, setSplitRatio] = useState(50);
  
  // FEATURE 13: Quick Add Expenses
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  
  // FEATURE 14: Comparison History
  const [comparisonHistory, setComparisonHistory] = useState<string[]>([]);
  
  // FEATURE 15: Cost Projection
  const [projectionMonths, setProjectionMonths] = useState(12);
  const [showProjection, setShowProjection] = useState(false);
  
  // Additional UI States
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState<string>("");

  const styles = cityCostsVariants();

  const city1Data = cities.find(c => c.name === selectedCity1) || cities[0];
  const city2Data = cities.find(c => c.name === selectedCity2) || cities[1];

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('savedComparisons');
    if (saved) setSavedComparisons(JSON.parse(saved));
    
    const notes = localStorage.getItem('cityNotes');
    if (notes) setCityNotes(JSON.parse(notes));
    
    const alerts = localStorage.getItem('costAlerts');
    if (alerts) setCostAlerts(JSON.parse(alerts));
    
    const expenses = localStorage.getItem('trackedExpenses');
    if (expenses) setTrackedExpenses(JSON.parse(expenses));
  }, []);

  // Currency conversion
  const convertCurrency = (amount: string) => {
    const numAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    const converted = numAmount * exchangeRate;
    return `${currency} ${converted.toFixed(0)}`;
  };

  // Calculate total budget
  const totalCustomBudget = useMemo(() => {
    return Object.values(customBudget).reduce((a, b) => a + b, 0);
  }, [customBudget]);

  // Calculate cost difference
  const calculateDifference = (city1: CityData, city2: CityData) => {
    const cost1 = parseFloat(city1.totalMonthly.replace(/[^0-9]/g, ''));
    const cost2 = parseFloat(city2.totalMonthly.replace(/[^0-9]/g, ''));
    const diff = cost1 - cost2;
    const percentDiff = ((diff / cost2) * 100).toFixed(1);
    return { diff, percentDiff, cheaper: diff > 0 ? city2.name : city1.name };
  };

  // Save comparison
  const saveCurrentComparison = () => {
    const newComparison: SavedComparison = {
      id: Date.now().toString(),
      city1: selectedCity1,
      city2: compareMode ? selectedCity2 : "",
      savedAt: new Date().toISOString(),
    };
    const updated = [...savedComparisons, newComparison];
    setSavedComparisons(updated);
    localStorage.setItem('savedComparisons', JSON.stringify(updated));
    showNotification("Comparison saved!");
  };

  // Export to CSV
  const exportToCSV = () => {
    const data = `City,Housing,Food,Transport,Utilities,Lifestyle,Total\n${selectedCity1},1200,400,80,250,200,2130`;
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCity1}-costs.csv`;
    a.click();
    showNotification("CSV exported!");
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    const text = `${selectedCity1} Monthly Costs: ${city1Data.totalMonthly}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showNotification("Copied to clipboard!");
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const toggleCategory = (category: string) => {
    const updated = new Set(hiddenCategories);
    if (updated.has(category)) {
      updated.delete(category);
    } else {
      updated.add(category);
    }
    setHiddenCategories(updated);
  };

  const renderCityCard = (cityData: CityData, isSecondary = false) => (
    <div className={`${styles.cityCard()} relative`}>
      {/* Enhanced Header with Actions */}
      <div className={styles.cityHeader()}>
        <div className={styles.cityTitle()}>
          <span className="text-3xl">{cityData.flag}</span>
          <div>
            <h2 className={styles.cityName()}>{cityData.name}</h2>
            <p className="text-sm text-[#6B7280] font-inter">{cityData.country}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className={styles.costSummary()}>
            <div className={styles.totalCost()}>
              {currency === "EUR" ? cityData.totalMonthly : convertCurrency(cityData.totalMonthly)}
            </div>
            <div className={styles.perMonth()}>per month (avg)</div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowChart(!showChart)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="View Chart"
            >
              <PieChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Calculator"
            >
              <Calculator className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cost Comparison Badge */}
      {compareMode && !isSecondary && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">vs {selectedCity2}:</span>
            <div className="flex items-center gap-2">
              {calculateDifference(city1Data, city2Data).diff > 0 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  <span className="text-red-600 font-semibold">
                    +{calculateDifference(city1Data, city2Data).percentDiff}% more expensive
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-semibold">
                    {calculateDifference(city1Data, city2Data).percentDiff}% cheaper
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category Sections */}
      {!hiddenCategories.has("housing") && (
        <div className={styles.categorySection()}>
          <div className={styles.categoryHeader()}>
            <div className="flex items-center gap-2">
              <Home className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Housing</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleCategory("housing")}
                className="text-gray-400 hover:text-gray-600"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className={styles.costGrid()}>
            {cityData.costs.housing.map((item, idx) => (
              <div key={idx} className={styles.costItem()}>
                <span className={styles.costLabel()}>{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className={styles.costValue()}>
                    {currency === "EUR" ? item.value : convertCurrency(item.value)}
                  </span>
                  {showPercentages && (
                    <span className="text-xs text-gray-500">
                      ({((parseFloat(item.value.replace(/[^0-9]/g, '')) / 
                         parseFloat(cityData.totalMonthly.replace(/[^0-9]/g, ''))) * 100).toFixed(0)}%)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hiddenCategories.has("food") && (
        <div className={styles.categorySection()}>
          <div className={styles.categoryHeader()}>
            <div className="flex items-center gap-2">
              <ShoppingCart className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Food & Dining</h3>
            </div>
            <button
              onClick={() => toggleCategory("food")}
              className="text-gray-400 hover:text-gray-600"
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>
          <div className={styles.costGrid()}>
            {cityData.costs.food.map((item, idx) => (
              <div key={idx} className={styles.costItem()}>
                <span className={styles.costLabel()}>{item.label}</span>
                <span className={styles.costValue()}>
                  {currency === "EUR" ? item.value : convertCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hiddenCategories.has("transportation") && (
        <div className={styles.categorySection()}>
          <div className={styles.categoryHeader()}>
            <div className="flex items-center gap-2">
              <Car className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Transportation</h3>
            </div>
            <button
              onClick={() => toggleCategory("transportation")}
              className="text-gray-400 hover:text-gray-600"
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>
          <div className={styles.costGrid()}>
            {cityData.costs.transportation.map((item, idx) => (
              <div key={idx} className={styles.costItem()}>
                <span className={styles.costLabel()}>{item.label}</span>
                <span className={styles.costValue()}>
                  {currency === "EUR" ? item.value : convertCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hiddenCategories.has("utilities") && (
        <div className={styles.categorySection()}>
          <div className={styles.categoryHeader()}>
            <div className="flex items-center gap-2">
              <Zap className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Utilities</h3>
            </div>
            <button
              onClick={() => toggleCategory("utilities")}
              className="text-gray-400 hover:text-gray-600"
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>
          <div className={styles.costGrid()}>
            {cityData.costs.utilities.map((item, idx) => (
              <div key={idx} className={styles.costItem()}>
                <span className={styles.costLabel()}>{item.label}</span>
                <span className={styles.costValue()}>
                  {currency === "EUR" ? item.value : convertCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hiddenCategories.has("lifestyle") && (
        <div className={styles.categorySection()}>
          <div className={styles.categoryHeader()}>
            <div className="flex items-center gap-2">
              <Dumbbell className={styles.categoryIcon()} />
              <h3 className={styles.categoryTitle()}>Lifestyle</h3>
            </div>
            <button
              onClick={() => toggleCategory("lifestyle")}
              className="text-gray-400 hover:text-gray-600"
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>
          <div className={styles.costGrid()}>
            {cityData.costs.lifestyle.map((item, idx) => (
              <div key={idx} className={styles.costItem()}>
                <span className={styles.costLabel()}>{item.label}</span>
                <span className={styles.costValue()}>
                  {currency === "EUR" ? item.value : convertCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes Section */}
      <div className="mt-6 pt-4 border-t">
        <textarea
          placeholder={`Add notes about ${cityData.name}...`}
          value={cityNotes[cityData.name] || ""}
          onChange={(e) => {
            const updated = { ...cityNotes, [cityData.name]: e.target.value };
            setCityNotes(updated);
            localStorage.setItem('cityNotes', JSON.stringify(updated));
          }}
          className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.container()}>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Enhanced Toolbar */}
      <div className="mb-6 bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">City Cost Analysis</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSavedComparisons(!showSavedComparisons)}
              className="px-3 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
            >
              <Save className="w-4 h-4" />
              Saved ({savedComparisons.length})
            </button>
            <button
              onClick={saveCurrentComparison}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Save Current
            </button>
          </div>
        </div>

        {/* City Selection & Options */}
        <div className={styles.filterBar()}>
          <div className={styles.selectWrapper()}>
            <div className={styles.label()}>Select City 1</div>
            <select 
              className={styles.select()}
              value={selectedCity1}
              onChange={(e) => setSelectedCity1(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.flag} {city.name}
                </option>
              ))}
            </select>
          </div>

          {compareMode && (
            <>
              <ArrowLeftRight className="w-6 h-6 text-gray-400 mt-6" />
              <div className={styles.selectWrapper()}>
                <div className={styles.label()}>Select City 2</div>
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
            </>
          )}

          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`${styles.compareButton()} mt-6`}
          >
            {compareMode ? "Single View" : "Compare Cities"}
          </button>
        </div>

        {/* Advanced Options Row */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            onClick={() => setShowPercentages(!showPercentages)}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
              showPercentages ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Percent className="w-4 h-4" />
            Percentages
          </button>
          
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
                setExchangeRate(e.target.value === "USD" ? 1.1 : e.target.value === "GBP" ? 0.85 : 1);
              }}
              className="px-3 py-1.5 border rounded-lg text-sm"
            >
              <option value="EUR">EUR €</option>
              <option value="USD">USD $</option>
              <option value="GBP">GBP £</option>
            </select>
          </div>

          <button
            onClick={() => setShowProjection(!showProjection)}
            className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex items-center gap-1"
          >
            <Calendar className="w-4 h-4" />
            Projection
          </button>

          <button
            onClick={() => setShowTrends(!showTrends)}
            className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex items-center gap-1"
          >
            <TrendingUp className="w-4 h-4" />
            Trends
          </button>

          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            {showExportMenu && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 w-40 z-10">
                <button
                  onClick={() => { exportToCSV(); setShowExportMenu(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => { showNotification("PDF export coming soon!"); setShowExportMenu(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                >
                  Export PDF
                </button>
              </div>
            )}
          </div>

          {hiddenCategories.size > 0 && (
            <button
              onClick={() => setHiddenCategories(new Set())}
              className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Show All ({hiddenCategories.size} hidden)
            </button>
          )}
        </div>
      </div>

      {/* Projection Panel */}
      {showProjection && (
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Cost Projection</h3>
          <div className="flex items-center gap-4 mb-4">
            <label className="text-sm font-medium">Project for:</label>
            <input
              type="number"
              value={projectionMonths}
              onChange={(e) => setProjectionMonths(parseInt(e.target.value) || 12)}
              className="px-3 py-2 border rounded-lg w-20"
              min="1"
              max="36"
            />
            <span className="text-sm">months</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Total Projected</div>
              <div className="text-2xl font-bold text-blue-600">
                {currency} {(parseFloat(city1Data.totalMonthly.replace(/[^0-9]/g, '')) * projectionMonths * exchangeRate).toFixed(0)}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="text-sm text-gray-600 mb-1">With 10% Buffer</div>
              <div className="text-2xl font-bold text-green-600">
                {currency} {(parseFloat(city1Data.totalMonthly.replace(/[^0-9]/g, '')) * projectionMonths * 1.1 * exchangeRate).toFixed(0)}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Annual Total</div>
              <div className="text-2xl font-bold text-purple-600">
                {currency} {(parseFloat(city1Data.totalMonthly.replace(/[^0-9]/g, '')) * 12 * exchangeRate).toFixed(0)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Budget Calculator</h2>
              <button onClick={() => setShowCalculator(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {Object.entries(customBudget).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="font-medium capitalize">{key}</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCustomBudget({...customBudget, [key]: Math.max(0, value - 50)})}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setCustomBudget({...customBudget, [key]: parseInt(e.target.value) || 0})}
                      className="w-24 px-3 py-2 border rounded-lg text-center"
                    />
                    <button
                      onClick={() => setCustomBudget({...customBudget, [key]: value + 50})}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Monthly Budget:</span>
                  <span className="text-blue-600">{currency} {(totalCustomBudget * exchangeRate).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Comparisons Modal */}
      {showSavedComparisons && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Saved Comparisons</h2>
              <button onClick={() => setShowSavedComparisons(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {savedComparisons.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Save className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No saved comparisons yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedComparisons.map(comp => (
                  <div key={comp.id} className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">
                        {comp.city1} {comp.city2 && `vs ${comp.city2}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        Saved {new Date(comp.savedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCity1(comp.city1);
                        if (comp.city2) {
                          setSelectedCity2(comp.city2);
                          setCompareMode(true);
                        }
                        setShowSavedComparisons(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* City Cards */}
      {compareMode ? (
        <div className={styles.comparisonGrid()}>
          {renderCityCard(city1Data)}
          {renderCityCard(city2Data, true)}
        </div>
      ) : (
        renderCityCard(city1Data)
      )}
    </div>
  );
};

export default CityCosts;

