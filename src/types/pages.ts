
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

 export interface CountryData {
  name: string;
  flag: string;
  capital: string;
  population: string;
  currency: string;
  language: string;
  timezone: string;
  climate: string;
  costOfLiving: string;
  categories: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  basicInfo: {
    label: string;
    value: string;
  }[];
}



export interface FormData {
  general: {
    nationality: string[];
    age: number | null;
    homeSize: number | null;
    bedrooms: number | null;
    regions: string[];
  };
  family: {
    hasPartner: string;
    partnerNationality: string[];
    hasChildren: boolean;
  };
  education: {
    highestLevel: string;
    field: string;
    interestedInEducationVisa: boolean;
    educationFields: string;
  };
  work: {
    remoteWork: string;
    passiveIncome: number | null;
    jobType: string;
    monthlyIncome: number | null;
    interestedInBusinessVisa: boolean;
  };
  money: {
    interestedInInvestmentVisa: boolean;
    savings: number | null;
  };
  ancestry: {
    hasAncestry: boolean;
    relatives: { relative: string; passport: string }[];
  };
}


export interface Country {
  id: string;
  name: string;
  flag: string;
}

export interface VisaCard {
  id: string;
  countryId: string;
  country: string;
  flag: string;
  visaName: string;
  visaType: "digital" | "investment" | "freelance";
  duration: string;
  requirements: string[];
  workRights: boolean;
  permanentResidency: boolean;
}
