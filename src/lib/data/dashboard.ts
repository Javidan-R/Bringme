import { Country, VisaCard } from "../../types/pages";
export const initialCountries: Country[] = [
  { id: "1", name: "Germany", flag: "🇩🇪" },
  { id: "2", name: "Portugal", flag: "🇵🇹" },
];

export const allVisas: VisaCard[] = [
    {
      id: "1",
      countryId: "1",
      country: "Germany",
      flag: "🇩🇪",
      visaName: "Freelance Visa",
      visaType: "digital",
      duration: "2 year",
      requirements: [
        "Remote workers employed by non-Portuguese companies.",
        "Remote workers employed by non-Portuguese companies.",
        "Remote workers employed by non-Portuguese companies.",
      ],
      workRights: true,
      permanentResidency: true,
    },
    {
      id: "2",
      countryId: "2",
      country: "Portugal",
      flag: "🇵🇹",
      visaName: "D12 Visa",
      visaType: "investment",
      duration: "2 year",
      requirements: [
        "Remote workers employed by non-Portuguese companies.",
        "Remote workers employed by non-Portuguese companies.",
        "Remote workers employed by non-Portuguese companies.",
      ],
      workRights: true,
      permanentResidency: true,
    },
    {
      id: "3",
      countryId: "2",
      country: "Portugal",
      flag: "🇵🇹",
      visaName: "D12 Visa",
      visaType: "investment",
      duration: "2 year",
      requirements: [
        "Remote workers employed by non-Portuguese companies.",
        "Remote workers employed by non-Portuguese companies.",
        "Remote workers employed by non-Portuguese companies.",
      ],
      workRights: true,
      permanentResidency: true,
    },
  ];