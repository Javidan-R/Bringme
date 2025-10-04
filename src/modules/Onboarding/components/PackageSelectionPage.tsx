import { packages, details } from "../../../lib/data/package";
import { packageSelectionVariants } from "../../Checkout/styles/packagesection";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PackageSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const handlePackageSelect = async (pkg: typeof packages[0]) => {
    setLoading(pkg.title);
    
    // Store selected package in localStorage
    localStorage.setItem('selectedPackage', JSON.stringify({
      title: pkg.title,
      price: pkg.price,
      features: pkg.features,
      badge: pkg.badge,
      featured: pkg.featured,
      selectedAt: new Date().toISOString()
    }));

    // Simulate payment processing or any async operation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Navigate to dashboard
    navigate('/dashboard', { 
      state: { 
        packagePurchased: true,
        packageTitle: pkg.title 
      } 
    });
  };

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
          const isLoading = loading === pkg.title;
          
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
                <button 
                  className={styles.chooseButton()}
                  onClick={() => handlePackageSelect(pkg)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Choose Package'}
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
