import { useState, useMemo, useCallback } from "react";
import {
  Star,
  Briefcase,
  Home,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { dashboardVariants } from "../lib/styles/dashboard";
import CountryInfo from "./CountryInfo";
import CityCosts from "./CityCosts";
import { Country } from "../types/pages";
import { allVisas, initialCountries } from "../lib/data/dashboard";
type TabType = "visas" | "country" | "costs";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("visas");
  const [selectedCountries] = useState<Country[]>(initialCountries);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [tabTransition, setTabTransition] = useState(false);

  const styles = dashboardVariants();

  const filteredVisas = useMemo(
    () =>
      allVisas.filter((visa) =>
        selectedCountries.some((country) => country.id === visa.countryId)
      ),
    [selectedCountries]
  );

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

  const renderVisasTab = useCallback(() => {
    if (filteredVisas.length === 0) {
      return (
        <div className={styles.emptyState()}>
          <p className={styles.emptyText()}>
            No countries selected. Add countries from the sidebar to see visa options.
          </p>
        </div>
      );
    }

    return (
      <div>
        {filteredVisas.map((visa) => {
          const isExpanded = expandedCards.has(visa.id);
          return (
            <div key={visa.id} className={styles.visaCard()}>
              <div className={styles.cardHeader()}>
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
                  <span
                    className={dashboardVariants({
                      visaType: visa.visaType,
                    }).visaBadge()}
                  >
                    {visa.visaType === "digital" && "Digital Nomad Visa"}
                    {visa.visaType === "investment" && "Investment Visa"}
                    {visa.visaType === "freelance" && "Freelance Visa"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleCard(visa.id)}
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
              <div
                className={dashboardVariants({
                  expanded: isExpanded,
                }).requirementsSection()}
              >
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
                        <span>Path to permanent residency</span>
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
  }, [filteredVisas, expandedCards, styles, toggleCard]);

  const renderTabContent = useMemo(() => {
    const contentClass = `transition-all duration-300 ${
      tabTransition
        ? "opacity-0 transform translate-y-4"
        : "opacity-100 transform translate-y-0"
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
        <div className={styles.header()}>
          <h1 className={styles.pageTitle()}>
            <Star className="w-8 h-8 text-[#FFD700]" />
            Overview
          </h1>
          <div className={styles.tabs()}>
            <button
              onClick={() => handleTabChange("visas")}
              className={dashboardVariants({
                active: activeTab === "visas",
              }).tab()}
            >
              Visas
            </button>
            <button
              onClick={() => handleTabChange("country")}
              className={dashboardVariants({
                active: activeTab === "country",
              }).tab()}
            >
              Country Info
            </button>
            <button
              onClick={() => handleTabChange("costs")}
              className={dashboardVariants({
                active: activeTab === "costs",
              }).tab()}
            >
              City Costs
            </button>
          </div>
        </div>
        {renderTabContent}
      </main>
    </div>
  );
};

export default Dashboard;