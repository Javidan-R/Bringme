// src/pages/CityCosts.tsx
import { useState } from "react";
import { 
  Home, 
  ShoppingCart, 
  Car, 
  Zap,
  Dumbbell
} from "lucide-react";
import { cityCostsVariants } from "../modules/Onboarding/styles/cityCosts";
import { cities } from "../lib/data/cities";
import { CityData } from "../types/pages";


const CityCosts: React.FC = () => {
  const [selectedCity1, setSelectedCity1] = useState("Berlin");
  const [selectedCity2, setSelectedCity2] = useState("Lisbon");
  const [compareMode, setCompareMode] = useState(false);
  
  const styles = cityCostsVariants();



  const city1Data = cities.find(c => c.name === selectedCity1) || cities[0];
  const city2Data = cities.find(c => c.name === selectedCity2) || cities[1];

  const renderCityCard = (cityData: CityData) => (
    <div className={styles.cityCard()}>
      <div className={styles.cityHeader()}>
        <div className={styles.cityTitle()}>
          <span className="text-3xl">{cityData.flag}</span>
          <div>
            <h2 className={styles.cityName()}>{cityData.name}</h2>
            <p className="text-sm text-[#6B7280] font-inter">{cityData.country}</p>
          </div>
        </div>
        <div className={styles.costSummary()}>
          <div className={styles.totalCost()}>{cityData.totalMonthly}</div>
          <div className={styles.perMonth()}>per month (avg)</div>
        </div>
      </div>

      {/* Housing */}
      <div className={styles.categorySection()}>
        <div className={styles.categoryHeader()}>
          <Home className={styles.categoryIcon()} />
          <h3 className={styles.categoryTitle()}>Housing</h3>
        </div>
        <div className={styles.costGrid()}>
          {cityData.costs.housing.map((item, idx) => (
            <div key={idx} className={styles.costItem()}>
              <span className={styles.costLabel()}>{item.label}</span>
              <span className={styles.costValue()}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Food */}
      <div className={styles.categorySection()}>
        <div className={styles.categoryHeader()}>
          <ShoppingCart className={styles.categoryIcon()} />
          <h3 className={styles.categoryTitle()}>Food & Dining</h3>
        </div>
        <div className={styles.costGrid()}>
          {cityData.costs.food.map((item, idx) => (
            <div key={idx} className={styles.costItem()}>
              <span className={styles.costLabel()}>{item.label}</span>
              <span className={styles.costValue()}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transportation */}
      <div className={styles.categorySection()}>
        <div className={styles.categoryHeader()}>
          <Car className={styles.categoryIcon()} />
          <h3 className={styles.categoryTitle()}>Transportation</h3>
        </div>
        <div className={styles.costGrid()}>
          {cityData.costs.transportation.map((item, idx) => (
            <div key={idx} className={styles.costItem()}>
              <span className={styles.costLabel()}>{item.label}</span>
              <span className={styles.costValue()}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Utilities */}
      <div className={styles.categorySection()}>
        <div className={styles.categoryHeader()}>
          <Zap className={styles.categoryIcon()} />
          <h3 className={styles.categoryTitle()}>Utilities</h3>
        </div>
        <div className={styles.costGrid()}>
          {cityData.costs.utilities.map((item, idx) => (
            <div key={idx} className={styles.costItem()}>
              <span className={styles.costLabel()}>{item.label}</span>
              <span className={styles.costValue()}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lifestyle */}
      <div className={styles.categorySection()}>
        <div className={styles.categoryHeader()}>
          <Dumbbell className={styles.categoryIcon()} />
          <h3 className={styles.categoryTitle()}>Lifestyle</h3>
        </div>
        <div className={styles.costGrid()}>
          {cityData.costs.lifestyle.map((item, idx) => (
            <div key={idx} className={styles.costItem()}>
              <span className={styles.costLabel()}>{item.label}</span>
              <span className={styles.costValue()}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container()}>
      {/* Filter Bar */}
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
        )}

        <button
          onClick={() => setCompareMode(!compareMode)}
          className={styles.compareButton()}
        >
          {compareMode ? "Single View" : "Compare Cities"}
        </button>
      </div>

      {/* City Cards */}
      {compareMode ? (
        <div className={styles.comparisonGrid()}>
          {renderCityCard(city1Data)}
          {renderCityCard(city2Data)}
        </div>
      ) : (
        renderCityCard(city1Data)
      )}
    </div>
  );
};

export default CityCosts;