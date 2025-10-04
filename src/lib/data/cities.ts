import { CityData } from "../../types/pages";

  export const cities: CityData[] = [
    {
      name: "Berlin",
      country: "Germany",
      flag: "🇩🇪",
      totalMonthly: "€2,450",
      costs: {
        housing: [
          { label: "1 bedroom apartment (center)", value: "€1,200" },
          { label: "1 bedroom apartment (outside)", value: "€850" },
          { label: "3 bedroom apartment (center)", value: "€2,100" },
        ],
        food: [
          { label: "Meal at inexpensive restaurant", value: "€12" },
          { label: "Meal for 2 (mid-range)", value: "€55" },
          { label: "Monthly groceries (1 person)", value: "€300" },
        ],
        transportation: [
          { label: "Monthly public transport pass", value: "€80" },
          { label: "Taxi 1km", value: "€2.50" },
          { label: "Gasoline (1 liter)", value: "€1.75" },
        ],
        utilities: [
          { label: "Basic utilities (85m²)", value: "€250" },
          { label: "Internet (60 Mbps+)", value: "€35" },
          { label: "Mobile plan", value: "€20" },
        ],
        lifestyle: [
          { label: "Fitness club monthly", value: "€45" },
          { label: "Cinema ticket", value: "€12" },
          { label: "Cappuccino", value: "€3.50" },
        ],
      },
    },
    {
      name: "Lisbon",
      country: "Portugal",
      flag: "🇵🇹",
      totalMonthly: "€1,850",
      costs: {
        housing: [
          { label: "1 bedroom apartment (center)", value: "€900" },
          { label: "1 bedroom apartment (outside)", value: "€650" },
          { label: "3 bedroom apartment (center)", value: "€1,600" },
        ],
        food: [
          { label: "Meal at inexpensive restaurant", value: "€10" },
          { label: "Meal for 2 (mid-range)", value: "€40" },
          { label: "Monthly groceries (1 person)", value: "€200" },
        ],
        transportation: [
          { label: "Monthly public transport pass", value: "€40" },
          { label: "Taxi 1km", value: "€1.50" },
          { label: "Gasoline (1 liter)", value: "€1.65" },
        ],
        utilities: [
          { label: "Basic utilities (85m²)", value: "€120" },
          { label: "Internet (60 Mbps+)", value: "€35" },
          { label: "Mobile plan", value: "€15" },
        ],
        lifestyle: [
          { label: "Fitness club monthly", value: "€35" },
          { label: "Cinema ticket", value: "€7" },
          { label: "Cappuccino", value: "€1.50" },
        ],
      },
    },
  ];