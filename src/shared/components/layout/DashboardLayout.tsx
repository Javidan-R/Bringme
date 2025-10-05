
import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import {
  Star,
  Plus,
  Book,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Menu,
  Search,
  Bell,
  User,
  ChevronDown,
  ChevronRight,
  Package,
  TrendingUp,
  Clock,
  Bookmark,
  History,
  Filter,
  Download,
  Share2,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  RefreshCw,
  Activity,
  Zap,
  Target,
  Award,
  Calendar,
  MessageSquare,
  FileText,
  BarChart3,
  Eye,
  Heart,
  Globe,
} from "lucide-react";
import { dashboardVariants } from "../../../lib/styles/dashboard";
import { useAppDispatch } from "../../../hooks";
import { Country } from "../../../types/pages";
import { clearUser } from "../../../modules/Auth/slice";
import { resetFormData } from "../../../modules/Onboarding/slice";

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  icon: any;
}

interface Shortcut {
  id: string;
  label: string;
  path: string;
  icon: any;
  color: string;
}

const EnhancedDashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useClerk();
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([
    { id: "1", name: "Germany", flag: "🇩🇪" },
    { id: "2", name: "Portugal", flag: "🇵🇹" },
  ]);

  // FEATURE 1: Search Functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  // FEATURE 2: Notifications System
  const [notifications, setNotifications] = useState<Activity[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  // FEATURE 3: Recent Activity Tracker
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [showActivity, setShowActivity] = useState(false);

  // FEATURE 4: Quick Actions Shortcuts
  const [shortcuts] = useState<Shortcut[]>([
    { id: "1", label: "Create Report", path: "/dashboard", icon: FileText, color: "blue" },
    { id: "2", label: "View Analytics", path: "/dashboard", icon: BarChart3, color: "purple" },
    { id: "3", label: "Bookmarks", path: "/dashboard", icon: Bookmark, color: "yellow" },
    { id: "4", label: "Support", path: "/dashboard/support", icon: HelpCircle, color: "green" },
  ]);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // FEATURE 5: Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // FEATURE 6: Sidebar Pinned State
  const [sidebarPinned, setSidebarPinned] = useState(false);

  // FEATURE 7: Collapsed Sidebar Mode
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // FEATURE 8: User Profile Menu
  const [showUserMenu, setShowUserMenu] = useState(false);

  // FEATURE 9: Quick Stats Widget
  const [showStats, setShowStats] = useState(true);
  const [stats, setStats] = useState({
    reports: 5,
    countries: selectedCountries.length,
    bookmarks: 12,
    activityToday: 8
  });

  // FEATURE 10: Keyboard Shortcuts
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  const styles = dashboardVariants();
  const availableCountries: Country[] = [
    { id: "3", name: "Spain", flag: "🇪🇸" },
    { id: "4", name: "Italy", flag: "🇮🇹" },
    { id: "5", name: "France", flag: "🇫🇷" },
    { id: "6", name: "Netherlands", flag: "🇳🇱" },
  ];

  // Load saved preferences
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));

    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed) setSidebarCollapsed(JSON.parse(savedCollapsed));

    const savedActivity = localStorage.getItem('recentActivity');
    if (savedActivity) setRecentActivity(JSON.parse(savedActivity));

    // Initialize notifications
    setNotifications([
      { id: "1", type: "success", description: "Report for Germany created", timestamp: new Date(), icon: FileText },
      { id: "2", type: "info", description: "New visa requirements available", timestamp: new Date(), icon: Bell },
      { id: "3", type: "warning", description: "Package expires in 30 days", timestamp: new Date(), icon: Package },
    ]);
  }, []);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'k':
            e.preventDefault();
            setShowSearch(true);
            break;
          case 'b':
            e.preventDefault();
            setSidebarCollapsed(!sidebarCollapsed);
            break;
          case '/':
            e.preventDefault();
            setShowKeyboardHelp(true);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sidebarCollapsed]);

  // Activity tracker
  const trackActivity = (type: string, description: string, icon: any) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type,
      description,
      timestamp: new Date(),
      icon
    };
    const updated = [newActivity, ...recentActivity].slice(0, 20);
    setRecentActivity(updated);
    localStorage.setItem('recentActivity', JSON.stringify(updated));
  };

  const handleLogout = () => {
    trackActivity("logout", "User logged out", LogOut);
    signOut();
    dispatch(clearUser());
    dispatch(resetFormData());
    navigate("/login", { replace: true });
  };

  const addCountry = (country: Country) => {
    if (!selectedCountries.find((c) => c.id === country.id)) {
      setSelectedCountries([...selectedCountries, country]);
      trackActivity("country_added", `Added ${country.name} to reports`, Plus);
      setStats({...stats, countries: stats.countries + 1});
    }
  };

  const removeCountry = (countryId: string) => {
    const country = selectedCountries.find(c => c.id === countryId);
    setSelectedCountries(selectedCountries.filter((c) => c.id !== countryId));
    if (country) {
      trackActivity("country_removed", `Removed ${country.name}`, X);
      setStats({...stats, countries: stats.countries - 1});
    }
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    trackActivity("theme_changed", `Switched to ${newMode ? 'dark' : 'light'} mode`, darkMode ? Sun : Moon);
  };

  const toggleSidebarCollapse = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  return (
    <div className={`${styles.layout()} ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Top Bar */}
      <div className={`fixed top-0 right-0 left-0 lg:left-64 h-16 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b z-30 flex items-center justify-between px-6`}>
        {/* Mobile Menu + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Dashboard
          </h1>
        </div>

        {/* Top Bar Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''} rounded-lg relative`}
            title="Search (Ctrl+K)"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Quick Shortcuts */}
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className={`p-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''} rounded-lg relative`}
          >
            <Zap className="w-5 h-5" />
          </button>

          {/* Activity */}
          <button
            onClick={() => setShowActivity(!showActivity)}
            className={`p-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''} rounded-lg relative`}
          >
            <Activity className="w-5 h-5" />
            {recentActivity.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''} rounded-lg relative`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''} rounded-lg`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2 p-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''} rounded-lg`}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <div className={`absolute right-0 top-full mt-2 w-56 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border p-2 z-50`}>
                <div className="px-3 py-2 border-b mb-2">
                  <div className={`font-semibold ${darkMode ? 'text-white' : ''}`}>User Name</div>
                  <div className="text-sm text-gray-500">user@email.com</div>
                </div>
                <button
                  onClick={() => navigate("/dashboard/settings")}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700 text-white' : ''} rounded flex items-center gap-2`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={() => setShowKeyboardHelp(true)}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700 text-white' : ''} rounded flex items-center gap-2`}
                >
                  <Target className="w-4 h-4" />
                  Keyboard Shortcuts
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded flex items-center gap-2 mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl w-full max-w-2xl mx-4`}>
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries, visas, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                  autoFocus
                />
              </div>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="text-sm text-gray-500 mb-2">Recent searches</div>
              <div className="space-y-2">
                <button className={`w-full text-left p-3 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''} rounded-lg flex items-center gap-3`}>
                  <Clock className="w-4 h-4" />
                  Germany visa requirements
                </button>
                <button className={`w-full text-left p-3 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''} rounded-lg flex items-center gap-3`}>
                  <Clock className="w-4 h-4" />
                  Portugal cost of living
                </button>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setShowSearch(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className={`fixed right-4 top-20 w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl border z-50 max-h-[600px] overflow-hidden flex flex-col`}>
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className={`font-bold ${darkMode ? 'text-white' : ''}`}>Notifications</h3>
            <button onClick={() => setShowNotifications(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            {notifications.map(notif => (
              <div key={notif.id} className={`p-4 border-b hover:bg-gray-50 ${darkMode ? 'hover:bg-gray-700' : ''} cursor-pointer`}>
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notif.type === 'success' ? 'bg-green-100' : notif.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <notif.icon className={`w-5 h-5 ${
                      notif.type === 'success' ? 'text-green-600' : notif.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{notif.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {notif.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <button
              onClick={() => setUnreadCount(0)}
              className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}

      {/* Activity Panel */}
      {showActivity && (
        <div className={`fixed right-4 top-20 w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl border z-50 max-h-[600px] overflow-hidden flex flex-col`}>
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className={`font-bold ${darkMode ? 'text-white' : ''}`}>Recent Activity</h3>
            <button onClick={() => setShowActivity(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-4">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No recent activity</div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex gap-3 items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm ${darkMode ? 'text-white' : ''}`}>{activity.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {activity.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Shortcuts Panel */}
      {showShortcuts && (
        <div className={`fixed right-4 top-20 w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl border z-50`}>
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className={`font-bold ${darkMode ? 'text-white' : ''}`}>Quick Actions</h3>
            <button onClick={() => setShowShortcuts(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {shortcuts.map(shortcut => (
              <button
                key={shortcut.id}
                onClick={() => {
                  navigate(shortcut.path);
                  setShowShortcuts(false);
                  trackActivity("shortcut_used", `Used ${shortcut.label}`, shortcut.icon);
                }}
                className={`p-4 border rounded-xl hover:shadow-md transition-all text-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
              >
                <shortcut.icon className={`w-6 h-6 mx-auto mb-2 text-${shortcut.color}-500`} />
                <div className={`text-sm font-medium ${darkMode ? 'text-white' : ''}`}>{shortcut.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-2xl w-full p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>Keyboard Shortcuts</h2>
              <button onClick={() => setShowKeyboardHelp(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Search</span>
                  <kbd className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">Ctrl + K</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Toggle Sidebar</span>
                  <kbd className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">Ctrl + B</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Help</span>
                  <kbd className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">Ctrl + /</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className={dashboardVariants({ sidebarOpen }).sidebarOverlay()}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${dashboardVariants({ sidebarOpen }).sidebar()} ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-all duration-300 pt-16`}
      >
        <div className={styles.sidebarContent()}>
          {/* Logo */}
          {!sidebarCollapsed && (
            <div className={`${styles.logo()} mb-6`}>
              <div className={styles.logoAccent()}>BRING ME</div>
              <div className={styles.logoText()}>ABROAD</div>
            </div>
          )}

          {/* Collapse Toggle */}
          <button
            onClick={toggleSidebarCollapse}
            className={`w-full mb-4 p-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''} rounded-lg flex items-center justify-center`}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          {/* Stats Widget */}
          {showStats && !sidebarCollapsed && (
            <div className={`mb-6 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} rounded-xl`}>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>{stats.reports}</div>
                  <div className="text-xs text-gray-600">Reports</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-purple-600'}`}>{stats.countries}</div>
                  <div className="text-xs text-gray-600">Countries</div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Section */}
          <div className={styles.section()}>
            {!sidebarCollapsed && <h3 className={styles.sectionTitle()}>REPORTS</h3>}

            <button
              onClick={() => {
                navigate("/dashboard");
                setSidebarOpen(false);
                trackActivity("navigation", "Navigated to Overview", Star);
              }}
              className={dashboardVariants({
                active: isActive("/dashboard"),
              }).navItem()}
              title={sidebarCollapsed ? "Overview" : ""}
            >
              <Star className={styles.navIcon()} />
              {!sidebarCollapsed && <span>Overview</span>}
            </button>

            {selectedCountries.length > 0 && !sidebarCollapsed && (
              <div className={styles.countryList()}>
                {selectedCountries.map((country) => (
                  <div
                    key={country.id}
                    className={dashboardVariants({ active: false }).countryItem()}
                  >
                    <div className={styles.countryContent()}>
                      <span className={styles.flag()}>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                    <button
                      onClick={() => removeCountry(country.id)}
                      className={styles.removeButton()}
                      aria-label={`Remove ${country.name}`}
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {availableCountries.length > 0 && !sidebarCollapsed && (
              <div className="relative group">
                <button className={styles.addButton()}>
                  <Plus className="w-4 h-4" />
                  <span>Add Country</span>
                  <span className="text-[#9CA3AF]">({availableCountries.length})</span>
                </button>

                <div className="hidden group-hover:block absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  {availableCountries.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => addCountry(country)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className={styles.bottomNav()}>
            <button
              onClick={() => {
                navigate("/dashboard/blog");
                setSidebarOpen(false);
              }}
              className={dashboardVariants({
                active: isActive("/dashboard/blog"),
              }).navItem()}
              title={sidebarCollapsed ? "Blog" : ""}
            >
              <Book className={styles.navIcon()} />
              {!sidebarCollapsed && <span>Blog</span>}
            </button>
            <button
              onClick={() => {
                navigate("/dashboard/settings");
                setSidebarOpen(false);
              }}
              className={dashboardVariants({
                active: isActive("/dashboard/settings"),
              }).navItem()}
              title={sidebarCollapsed ? "Settings" : ""}
            >
              <Settings className={styles.navIcon()} />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
            <button
              onClick={() => {
                navigate("/dashboard/support");
                setSidebarOpen(false);
              }}
              className={dashboardVariants({
                active: isActive("/dashboard/support"),
              }).navItem()}
              title={sidebarCollapsed ? "Support" : ""}
            >
              <HelpCircle className={styles.navIcon()} />
              {!sidebarCollapsed && <span>Support</span>}
            </button>
            <button
              onClick={handleLogout}
              className={dashboardVariants({ active: false }).navItem()}
              title={sidebarCollapsed ? "Logout" : ""}
            >
              <LogOut className={styles.navIcon()} />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${styles.mainContent()} pt-16 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default EnhancedDashboardLayout;