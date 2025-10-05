// src/data/countries.ts

import { Country } from "../../modules/Dashboard/types";

export const COUNTRIES: Country[] = [
  {
    id: "1",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    // ƏLAVƏ EDİLDİ: CityCosts komponenti üçün şəhərlər
    cities: ["Berlin", "Munich", "Frankfurt"], 
    visas: [
      {
        id: "g-1",
        countryId: "1",
        country: "Germany",
        visaName: "Freelance Visa",
        flag: "🇩🇪",
        duration: "2 year",
        visaType: "digital", 
        workRights: true,
        permanentResidency: true,
        requirements: [
          "Proof of sufficient funds (approx. €900/month).",
          "Local accommodation registration (Anmeldung).",
          "Health insurance valid for Germany.",
        ],
        costs: [
          { label: "Visa Fees", description: "Immigration office processing", amount: "$200" },
          { label: "Health Insurance (1 year)", description: "Mandatory coverage", amount: "$1200" },
        ],
        process: [
          { step: 1, description: "Book appointment and prepare documents." },
          { step: 2, description: "Attend appointment and submit biometrics." },
          { step: 3, description: "Receive decision and collect residence permit." },
        ],
        details: {
          duration: "2 years with possible extension.",
          workRights: "Allowed for self-employment/freelance in Germany.",
          residency: "Possible path to permanent residency after 3-5 years.",
        },
      },
      {
        id: "g-2",
        countryId: "1",
        country: "Germany",
        visaName: "Job Seeker Visa",
        flag: "🇩🇪",
        duration: "6 month",
        visaType: "investment", 
        workRights: false,
        permanentResidency: false,
        requirements: [
          "University degree recognized in Germany.",
          "Proof of sufficient funds for stay (€1020/month).",
        ],
        costs: [
          { label: "Application fee", description: "Consulate fee", amount: "$150" },
        ],
        process: [
          { step: 1, description: "Apply at German embassy/consulate." },
          { step: 2, description: "Travel to Germany and search for a job." },
        ],
        details: {
          duration: "6 months, cannot be extended, must find work to switch.",
          workRights: "Not allowed to work during the 6 months.",
          residency: "Can lead to PR if employed after finding a job.",
        },
      },
    ],
    
  },
  {
    id: "2",
    name: "Portugal",
    flag: "🇵🇹",
    region: "Europe",
    // ƏLAVƏ EDİLDİ: CityCosts komponenti üçün şəhərlər
    cities: ["Lisbon", "Porto", "Funchal"], 
    visas: [
      {
        id: "p-1",
        countryId: "2",
        country: "Portugal",
        visaName: "D7 Passive Income Visa",
        flag: "🇵🇹",
        duration: "2 year",
        visaType: "investment",
        workRights: false, 
        permanentResidency: true,
        requirements: [
          "Proof of substantial passive income (min. €8,460/year).",
          "Clean criminal record and NIF (tax number).",
          "Long-term accommodation agreement.",
        ],
        costs: [
          { label: "Visa Fees", description: "SEF processing", amount: "$180" },
          { label: "Legal Consultation", description: "Recommended service", amount: "$2000" },
        ],
        process: [
          { step: 1, description: "Obtain NIF and open a Portuguese bank account." },
          { step: 2, description: "Apply for the D7 visa at a consulate." },
          { step: 3, description: "Travel to Portugal and attend SEF interview." },
        ],
        details: {
          duration: "2 years; renewable for 3 years.",
          workRights: "Passive income only, work is generally restricted.",
          residency: "Eligible for PR after 5 years of legal residency.",
        },
      },
      // Təkrarlanan viza kartı üçün əlavə viza
      {
        id: "p-2",
        countryId: "2",
        country: "Portugal",
        visaName: "Digital Nomad Visa (D8)",
        flag: "🇵🇹",
        duration: "1 year",
        visaType: "digital",
        workRights: true,
        permanentResidency: true,
        requirements: [
          "Proof of monthly income (4x national minimum wage, approx. €3040).",
          "Employment contract from a foreign company.",
        ],
        costs: [
          { label: "Visa Fees", description: "Consulate/SEF", amount: "$180" },
        ],
        process: [
          { step: 1, description: "Apply for a residency visa at the consulate." },
          { step: 2, description: "Schedule a post-arrival appointment with SEF." },
        ],
        details: {
          duration: "1 year initial stay, can be extended.",
          workRights: "Allowed for remote work as per contract.",
          residency: "Eligible for PR after 5 years of legal residency.",
        },
      },
    ],
  },
  // Əlavə ölkələr
  {
    id: "3",
    name: "Spain",
    flag: "🇪🇸",
    region: "Europe",
    // ƏLAVƏ EDİLDİ: CityCosts komponenti üçün şəhərlər
    cities: ["Madrid", "Barcelona", "Valencia"],
    visas: [
      {
        id: "s-1",
        countryId: "3",
        country: "Spain",
        visaName: "Digital Nomad Visa",
        flag: "🇪🇸",
        duration: "1 year",
        visaType: "digital",
        workRights: true,
        permanentResidency: true,
        requirements: [
          "Proof of minimum professional relationship (3 months).",
          "Minimum income threshold (200% of minimum wage).",
        ],
        details: {
          duration: "1 year, renewable up to 5 years.",
          workRights: "Allowed for remote work.",
          residency: "Eligible for PR after 5 years.",
        },
        costs: [],
        process: [],
      },
    ],
  },
];