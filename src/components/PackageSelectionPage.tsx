// PackageSelectionPage.tsx
import { packageSelectionVariants } from "../lib/styles/packagesection";
import { Check } from "lucide-react";

const PackageSelectionPage: React.FC = () => {
  const packages = [
    {
      title: "Nomad",
      price: "$19",
      badge: "Standard",
      featured: false,
      features: [
        "Personalized Global Visa Discovery Report",
        "3 Personalized Country Reports",
      ],
    },
    {
      title: "Explorer",
      price: "$24",
      badge: "Launch Discount",
      featured: true,
      features: [
        "Personalized Global Visa Discovery Report",
        "5 Personalized Country Reports",
      ],
    },
  ];

  const details = [
    {
      title: "Visa Options",
      description:
        "Targeted visa options for a country, filtered for your unique situation and goals.",
    },
    {
      title: "Country Orientation",
      description:
        "Quick start overviews and terminology for a country's housing, healthcare, childcare, petcare, and more.",
    },
    {
      title: "Key Local Service Providers",
      description:
        "Key local service providers like banks, internet and utilities, furniture, and popular brands.",
    },
    {
      title: "Living Costs Budget Breakdown",
      description:
        "Personalized cost breakdowns for major cities, from rent to groceries and more.",
    },
  ];

  return (
    <div className={packageSelectionVariants().container()}>
      <div className={packageSelectionVariants().header()}>
        <h1 className={packageSelectionVariants().title()}>
          Choose Your Personalized Package
        </h1>
        <p className={packageSelectionVariants().subtitle()}>
          and instantly access your report.
        </p>
      </div>

      <div className={packageSelectionVariants().packagesWrapper()}>
        {packages.map((pkg) => {
          const styles = packageSelectionVariants({ featured: pkg.featured });
          
          return (
            <div key={pkg.title} className={styles.packageCard()}>
              <span className={styles.badge()}>{pkg.badge}</span>
              
              <div className={styles.packageHeader()}>
                <h2 className={styles.packageTitle()}>{pkg.title}</h2>
              </div>
              
              <div className="mb-4">
                <span className={styles.packagePrice()}>{pkg.price}</span>
              </div>

              <ul className={styles.featuresList()}>
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem()}>
                    <Check className={styles.checkIcon()} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.buttonWrapper()}>
                <button className={styles.chooseButton()}>
                  Choose Package
                </button>
                <p className={styles.paymentNote()}>One Time Payment</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={packageSelectionVariants().detailsSection()}>
        <h3 className={packageSelectionVariants().detailsTitle()}>
          Each Country Report includes
        </h3>
        <div className={packageSelectionVariants().detailsGrid()}>
          {details.map((detail, idx) => (
            <div key={idx} className={packageSelectionVariants().detailItem()}>
              <div className={packageSelectionVariants().detailIconWrapper()}>
                <Check className={packageSelectionVariants().detailCheckIcon()} />
              </div>
              <h4 className={packageSelectionVariants().detailHeader()}>
                {detail.title}
              </h4>
              <p className={packageSelectionVariants().detailDescription()}>
                {detail.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageSelectionPage;