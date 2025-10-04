// src/layouts/DashboardLayout.tsx
import { useState } from "react";
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
} from "lucide-react";
import { dashboardVariants } from "../../../lib/styles/dashboard";
import { useAppDispatch } from "../../../hooks";
import { Country } from "../../../types/pages";
import { clearUser } from "../../../modules/Auth/slice";
import { resetFormData } from "../../../modules/Onboarding/slice";


const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useClerk();
  const dispatch = useAppDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([
    { id: "1", name: "Germany", flag: "🇩🇪" },
    { id: "2", name: "Portugal", flag: "🇵🇹" },
  ]);

  const styles = dashboardVariants();

  const availableCountries: Country[] = [
    { id: "3", name: "Spain", flag: "🇪🇸" },
    { id: "4", name: "Italy", flag: "🇮🇹" },
    { id: "5", name: "France", flag: "🇫🇷" },
    { id: "6", name: "Netherlands", flag: "🇳🇱" },
  ];

  const handleLogout = () => {
    signOut();
    dispatch(clearUser());
    dispatch(resetFormData());
    navigate("/login", { replace: true });
  };

  const addCountry = (country: Country) => {
    if (!selectedCountries.find((c) => c.id === country.id)) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const removeCountry = (countryId: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c.id !== countryId));
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={styles.layout()}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={styles.mobileMenuButton()}
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className={dashboardVariants({ sidebarOpen }).sidebarOverlay()}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={dashboardVariants({ sidebarOpen }).sidebar()}>
        <div className={styles.sidebarContent()}>
          {/* Logo */}
          <div className={styles.logo()}>
            <div className={styles.logoAccent()}>BRING ME</div>
            <div className={styles.logoText()}>ABROAD</div>
          </div>

          {/* Reports Section */}
          <div className={styles.section()}>
            <h3 className={styles.sectionTitle()}>REPORTS</h3>

            <button
              onClick={() => {
                navigate("/dashboard");
                setSidebarOpen(false);
              }}
              className={dashboardVariants({
                active: isActive("/dashboard"),
              }).navItem()}
            >
              <Star className={styles.navIcon()} />
              <span>Overview</span>
            </button>

            {selectedCountries.length > 0 && (
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

            {availableCountries.length > 0 && (
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
            >
              <Book className={styles.navIcon()} />
              <span>Blog</span>
            </button>
            <button
              onClick={() => {
                navigate("/dashboard/settings");
                setSidebarOpen(false);
              }}
              className={dashboardVariants({
                active: isActive("/dashboard/settings"),
              }).navItem()}
            >
              <Settings className={styles.navIcon()} />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                navigate("/dashboard/support");
                setSidebarOpen(false);
              }}
              className={dashboardVariants({
                active: isActive("/dashboard/support"),
              }).navItem()}
            >
              <HelpCircle className={styles.navIcon()} />
              <span>Support</span>
            </button>
            <button
              onClick={handleLogout}
              className={dashboardVariants({ active: false }).navItem()}
            >
              <LogOut className={styles.navIcon()} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent()}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;