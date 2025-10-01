// src/pages/Dashboard.tsx
import { useNavigate, Link } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { useAppDispatch } from "../hooks";
import { clearUser } from "../features/authSlice";
import { resetFormData } from "../features/onboardingSlice";
import { LogOut, Map, Building, HelpCircle, Settings } from "lucide-react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut();
    dispatch(clearUser());
    dispatch(resetFormData());
    navigate("/login", { replace: true });
  };

  // Sidebar navigation items
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <Map className="w-5 h-5" /> },
    { label: "Country Info", path: "/country-info", icon: <Building className="w-5 h-5" /> },
    { label: "Cities", path: "/cities", icon: <Building className="w-5 h-5" /> },
    { label: "Support", path: "/support", icon: <HelpCircle className="w-5 h-5" /> },
    { label: "Settings", path: "/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#F4F0EF] to-[#FFF]">
      {/* Sidebar */}
      <aside
        className="w-full md:w-[280px] bg-[#1F2A44] text-white p-[24px] flex-shrink-0"
        aria-label="Dashboard Navigation"
      >
        <h2
          className="text-[24px] font-bold mb-[32px] leading-[32px]"
          style={{ fontFamily: "Cormorant, serif" }}
        >
          Bring Me Abroad
        </h2>
        <nav className="space-y-[8px]">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-[8px] px-[12px] py-[8px] text-[16px] leading-[24px] text-gray-300 hover:text-white hover:bg-[#374151] rounded-[8px] transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
              aria-current={item.path === "/dashboard" ? "page" : undefined}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-[32px] flex items-center gap-[8px] px-[12px] py-[8px] text-[16px] leading-[24px] text-gray-300 hover:text-white hover:bg-[#374151] rounded-[8px] transition-colors w-full"
          style={{ fontFamily: "Inter, sans-serif" }}
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-[24px] md:p-[40px] overflow-y-auto">
        <h1
          className="text-[30px] font-bold text-[#1F2A44] mb-[24px] leading-[40px]"
          style={{ fontFamily: "Cormorant, serif" }}
        >
          Dashboard
        </h1>
        <section aria-live="polite">
          <p
            className="text-[16px] text-[#6B7280] leading-[24px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Welcome to your dashboard! Here you can explore visa recommendations, country
            information, and more.
          </p>
          {/* Placeholder for future content */}
          <div className="mt-[24px] grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div className="p-[24px] bg-white rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
              <h2
                className="text-[20px] font-bold text-[#1F2A44] mb-[8px] leading-[28px]"
                style={{ fontFamily: "Cormorant, serif" }}
              >
                Visa Recommendations
              </h2>
              <p
                className="text-[14px] text-[#6B7280] leading-[20px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                View personalized visa options based on your profile.
              </p>
            </div>
            <div className="p-[24px] bg-white rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
              <h2
                className="text-[20px] font-bold text-[#1F2A44] mb-[8px] leading-[28px]"
                style={{ fontFamily: "Cormorant, serif" }}
              >
                Next Steps
              </h2>
              <p
                className="text-[14px] text-[#6B7280] leading-[20px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Complete your profile to unlock more features.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;