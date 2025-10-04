import { CountryData } from "@/types/pages";
import { 

  Home,
  Heart,
  GraduationCap,
  Briefcase,
} from "lucide-react";
export const countries: CountryData[] = [
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
