// src/pages/Settings.tsx
import { settingsVariants } from "../lib/styles/settings";
import { useState } from "react";

const Settings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [profilePublic, setProfilePublic] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  
  const styles = settingsVariants();

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className={styles.container()}>
      <div className={styles.header()}>
        <h1 className={styles.title()}>Settings</h1>
        <p className={styles.subtitle()}>
          You have 2 Country Reports remaining.
        </p>
      </div>

      {/* Upgrade Card */}
      <div className={styles.upgradeCard()}>
        <div className={styles.upgradeContent()}>
          <p className={styles.upgradeText()}>
            Get 3 Additional Country Reports for $10
          </p>
          <button className={styles.upgradeButton()}>
            Get 3 Additional Country Reports for $10
          </button>
          <span className={styles.upgradeNote()}>ONE-TIME PAYMENT</span>
        </div>
      </div>

      {/* Account Settings */}
      <div className={styles.card()}>
        <h2 className={styles.sectionTitle()}>Account Information</h2>
        
        <div className={styles.formGroup()}>
          <label className={styles.label()}>Email Address</label>
          <input
            type="email"
            className={styles.input()}
            placeholder="your.email@example.com"
            defaultValue="user@example.com"
          />
        </div>

        <div className={styles.formGroup()}>
          <label className={styles.label()}>Full Name</label>
          <input
            type="text"
            className={styles.input()}
            placeholder="Enter your name"
            defaultValue="John Doe"
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className={styles.card()}>
        <h2 className={styles.sectionTitle()}>Notifications</h2>

        <div className={styles.switchWrapper()}>
          <span className={styles.switchLabel()}>Email notifications</span>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={settingsVariants({ 
              switchActive: emailNotifications 
            }).switch()}
            aria-label="Toggle email notifications"
          >
            <span className={settingsVariants({ 
              switchActive: emailNotifications 
            }).switchButton()} />
          </button>
        </div>

        <div className={styles.switchWrapper()}>
          <span className={styles.switchLabel()}>Marketing emails</span>
          <button
            onClick={() => setMarketingEmails(!marketingEmails)}
            className={settingsVariants({ 
              switchActive: marketingEmails 
            }).switch()}
            aria-label="Toggle marketing emails"
          >
            <span className={settingsVariants({ 
              switchActive: marketingEmails 
            }).switchButton()} />
          </button>
        </div>

        <div className={styles.switchWrapper()}>
          <span className={styles.switchLabel()}>Weekly digest</span>
          <button
            onClick={() => setWeeklyDigest(!weeklyDigest)}
            className={settingsVariants({ 
              switchActive: weeklyDigest 
            }).switch()}
            aria-label="Toggle weekly digest"
          >
            <span className={settingsVariants({ 
              switchActive: weeklyDigest 
            }).switchButton()} />
          </button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className={styles.card()}>
        <h2 className={styles.sectionTitle()}>Privacy & Security</h2>
        
        <div className={styles.switchWrapper()}>
          <span className={styles.switchLabel()}>Make profile public</span>
          <button
            onClick={() => setProfilePublic(!profilePublic)}
            className={settingsVariants({ 
              switchActive: profilePublic 
            }).switch()}
            aria-label="Toggle profile visibility"
          >
            <span className={settingsVariants({ 
              switchActive: profilePublic 
            }).switchButton()} />
          </button>
        </div>

        <div className={styles.switchWrapper()}>
          <span className={styles.switchLabel()}>Two-factor authentication</span>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={settingsVariants({ 
              switchActive: twoFactor 
            }).switch()}
            aria-label="Toggle two-factor authentication"
          >
            <span className={settingsVariants({ 
              switchActive: twoFactor 
            }).switchButton()} />
          </button>
        </div>
      </div>

      <button onClick={handleSave} className={styles.saveButton()}>
        Save Changes
      </button>
    </div>
  );
};

export default Settings;