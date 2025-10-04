// src/pages/Support.tsx
import { useState } from "react";
import { supportVariants } from "../modules/Onboarding/styles/support";

const Support: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    area: "",
    message: "",
  });

  const styles = supportVariants();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", area: "", message: "" });
  };

  return (
    <div className={styles.container()}>
      <h1 className={styles.title()}>Support</h1>
      <p className={styles.subtitle()}>
        Need help? Send us an email and we'll get back to you ASAP.
      </p>

      <form onSubmit={handleSubmit} className={styles.form()}>
        <div className={styles.row()}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={styles.input()}
            required
          />
          <input
            type="email"
            placeholder="Your E-Mail"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={styles.input()}
            required
          />
        </div>

        <div className={styles.formGroup()}>
          <div className="relative">
            <select
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              className={styles.select()}
              required
            >
              <option value="">Support Area</option>
              <option value="technical">Technical Issue</option>
              <option value="billing">Billing Question</option>
              <option value="visa">Visa Information</option>
              <option value="account">Account Management</option>
              <option value="other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6B7280]">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.formGroup()}>
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={styles.textarea()}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton()}>
          Send
        </button>
      </form>

      <div className={styles.footer()}>
        <a href="#" className={styles.link()}>Terms of Service</a>
        <a href="#" className={styles.link()}>Privacy Policy</a>
      </div>
    </div>
  );
};

export default Support;