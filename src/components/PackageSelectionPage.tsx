import { Check } from "lucide-react";

const PackageSelectionPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-[16px] min-h-screen bg-gradient-to-b from-[#F4F0EF] to-[#FFF] md:p-[40px]">
      <h1
        className="text-[32px] font-bold text-[#1F2A44] text-center leading-[40px] mb-[8px] md:text-[40px] md:leading-[48px]"
        style={{ fontFamily: "Cormorant, serif" }}
      >
        Choose Your Personalized Package
      </h1>
      <p
        className="text-[#6B7280] text-center mb-[32px] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        and instantly access your report.
      </p>

      <div className="flex flex-col gap-[16px] w-full max-w-[1200px] md:flex-row">
        <div className="flex-1 bg-white rounded-[16px] p-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <h2
            className="text-[20px] font-bold text-[#1F2A44] leading-[28px] md:text-[24px] md:leading-[32px]"
            style={{ fontFamily: "Cormorant, serif" }}
          >
            Nomad
          </h2>
          <p
            className="text-[28px] font-bold text-[#1F2A44] mt-[8px] leading-[36px] md:text-[32px] md:leading-[40px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            $19
          </p>
          <ul className="mt-[16px] space-y-[8px]">
            <li
              className="flex items-center gap-[8px] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Check className="w-[20px] h-[20px] text-[#22C55E]" />
              Personalized Global Visa Discovery Report
            </li>
            <li
              className="flex items-center gap-[8px] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Check className="w-[20px] h-[20px] text-[#22C55E]" />
              3 Personalized Country Reports
            </li>
          </ul>
          <button
            className="mt-[24px] bg-[#1F2A44] text-white rounded-[16px] px-[24px] py-[12px] w-full text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] hover:bg-[#374151] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Choose Package
          </button>
          <p
            className="text-[#6B7280] text-center mt-[8px] text-[12px] leading-[16px] md:text-[14px] md:leading-[20px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            One Time Payment
          </p>
        </div>

        <div className="flex-1 bg-white rounded-[16px] p-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <h2
            className="text-[20px] font-bold text-[#1F2A44] leading-[28px] md:text-[24px] md:leading-[32px]"
            style={{ fontFamily: "Cormorant, serif" }}
          >
            Explorer
          </h2>
          <p
            className="text-[28px] font-bold text-[#1F2A44] mt-[8px] leading-[36px] md:text-[32px] md:leading-[40px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            $24
          </p>
          <ul className="mt-[16px] space-y-[8px]">
            <li
              className="flex items-center gap-[8px] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Check className="w-[20px] h-[20px] text-[#22C55E]" />
              Personalized Global Visa Discovery Report
            </li>
            <li
              className="flex items-center gap-[8px] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Check className="w-[20px] h-[20px] text-[#22C55E]" />
              5 Personalized Country Reports
            </li>
          </ul>
          <button
            className="mt-[24px] bg-[#1F2A44] text-white rounded-[16px] px-[24px] py-[12px] w-full text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] hover:bg-[#374151] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Choose Package
          </button>
          <p
            className="text-[#6B7280] text-center mt-[8px] text-[12px] leading-[16px] md:text-[14px] md:leading-[20px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            One Time Payment
          </p>
        </div>
      </div>

      <div className="mt-[32px] w-full max-w-[1200px]">
        <h3
          className="text-[18px] font-bold text-[#1F2A44] text-center leading-[24px] md:text-[20px] md:leading-[28px]"
          style={{ fontFamily: "Cormorant, serif" }}
        >
          Each Country Report Includes
        </h3>
        <div className="grid grid-cols-1 gap-[16px] mt-[16px] md:grid-cols-4">
          <div>
            <p
              className="flex items-center gap-[8px] text-[#6B7280] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Check className="w-[20px] h-[20px] text-[#22C55E]" />
              Visa Options
            </p>
            <p
              className="text-[#6B7280] text-[12px] leading-[16px] mt-[4px] md:text-[14px] md:leading-[20px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Targeted visa options for a country, filtered for your unique situation and goals.
            </p>
          </div>
          <div>
            <p
              className="flex items-center gap-[8px] text-[#6B7280] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Check className="w-[20px] h-[20px] text-[#22C55E]" />
              Country Orientation
            </p>
            <p
              className="text-[#6B7280] text-[12px] leading-[16px] mt-[4px] md:text-[14px] md:leading-[20px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Quick start overviews and terminology for a country’s housing, healthcare, childcare, petcare, and more.
            </p>
          </div>
          <div>
            <p
              className="flex items-center gap-[8px] text-[#6B7280] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Check className="w-[20px] h-[20px] text-[#22C55E]" />
              Key Local Service Providers
            </p>
            <p
              className="text-[#6B7280] text-[12px] leading-[16px] mt-[4px] md:text-[14px] md:leading-[20px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Key local service providers like banks, internet, utilities, furniture, and popular brands.
            </p>
          </div>
          <div>
            <p
              className="flex items-center gap-[8px] text-[#6B7280] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Check className="w-[20px] h-[20px] text-[#22C55E]" />
              Living Costs Budget Breakdown
            </p>
            <p
              className="text-[#6B7280] text-[12px] leading-[16px] mt-[4px] md:text-[14px] md:leading-[20px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Personalized cost breakdowns for major cities, from rent to groceries and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelectionPage;