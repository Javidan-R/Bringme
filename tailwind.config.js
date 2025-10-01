/** @type {import('tailwindcss').Config} */
export default {
  // 1. Content: Tailwind-in sinif adlarını skan etməsi üçün zəruridir
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Digər fayl yollarını buraya əlavə edin
  ],

  // 2. Theme: Özəl rəng, aralıq, font və s. təyin etdiyiniz yer
  theme: {
    // Defolt mövzunu özəl dəyərlərinizlə genişləndirin
    extend: {
      // --- Özəl Rənglər (CSS dəyişənlərindən istifadə edir) ---
      colors: {
        'brand-gray-800': 'var(--color-brand-gray-800, #333333)',
        'brand-black': 'var(--color-brand-black, #000000)',
        'brand-white': 'var(--color-brand-white, #FFFFFF)',
        'brand-input-bg': 'var(--color-brand-input-bg, #F9FAFB)',
        'brand-input-focus': 'var(--color-brand-input-focus, #10B981)',
        'brand-step-active': 'var(--color-brand-step-active, #10B981)',
        'brand-step-border': 'var(--color-brand-step-border, #E5E7EB)',
        'brand-step-indicator-bg': 'var(--color-brand-step-indicator-bg, #F9FAFB)',
        'brand-modal-highlight': 'var(--color-brand-modal-highlight, #EF4444)',
        'brand-sidebar-bg': 'var(--color-brand-sidebar-bg, #FFFFFF)',
        'brand-gray-200': 'var(--color-brand-gray-200, #E5E7EB)',
        'brand-gray-600': 'var(--color-brand-gray-600, #6B7280)',
        'brand-login-text': 'var(--color-brand-login-text, #4B5563)',
        'brand-sidebar-base': 'var(--color-brand-sidebar-base, #FFFFFF)',
        'brand-login-bgStart': 'var(--color-brand-login-bgStart, #F3F4F6)',
        'brand-login-bgEnd': 'var(--color-brand-login-bgEnd, #E5E7EB)',
      },

      // --- Özəl Font Ailələri ---
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'cormorant': ['Cormorant', 'serif'],
      },

      // --- Özəl Aralıq/Məsafə (Spacing) ---
      spacing: {
        'gap': 'var(--spacing-gap, 0.5rem)',
        'px': 'var(--spacing-px, 1rem)',
        'py': 'var(--spacing-py, 0.75rem)',
        'px-mobile': 'var(--spacing-px-mobile, 0.75rem)',
        'px-desktop': 'var(--spacing-px-desktop, 1rem)',
        'py-py': 'var(--spacing-py-py, 0.75rem)',
        'error-gap': 'var(--spacing-error-gap, 0.25rem)',
        'step-gap': 'var(--spacing-step-gap, 0.75rem)',
        'step-padding': 'var(--spacing-step-padding, 0.75rem)',
        'step-indicator-gap': 'var(--spacing-indicator-gap, 0.5rem)',
        'step-indicator-px': 'var(--spacing-indicator-px, 1rem)',
        'step-indicator-py': 'var(--spacing-indicator-py, 0.5rem)',
        'modal-padding-mobile': 'var(--spacing-modal-padding-mobile, 1.5rem)',
        'modal-padding-desktop': 'var(--spacing-modal-padding-desktop, 2rem)',
        'login-px': 'var(--spacing-login-px, 1rem)',
        'login-title-margin': 'var(--spacing-login-title-margin, 2rem)',
        'login-button-gap': 'var(--spacing-login-button-gap, 0.5rem)',
        'login-section-margin': 'var(--spacing-login-section-margin, 1.5rem)',
        'login-divider-gap': 'var(--spacing-login-divider-gap, 0.75rem)',
        'login-error-margin': 'var(--spacing-login-error-margin, 1rem)',
        'sidebar-header-py': 'var(--spacing-sidebar-header-py, 1rem)',
        'sidebar-button-p': 'var(--spacing-sidebar-button-p, 0.5rem)',
        'sidebar-py-mobile': 'var(--spacing-sidebar-py-mobile, 1.5rem)',
        'sidebar-px-mobile': 'var(--spacing-sidebar-px-mobile, 1rem)',
        'sidebar-py-desktop': 'var(--spacing-sidebar-py-desktop, 2rem)',
        'sidebar-px-desktop': 'var(--spacing-sidebar-px-desktop, 1.5rem)',
        'sidebar-logo-margin': 'var(--spacing-sidebar-logo-margin, 2rem)',
        'sidebar-steps-margin': 'var(--spacing-sidebar-steps-margin, 1.5rem)',
        'sidebar-steps-gap': 'var(--spacing-sidebar-steps-gap, 0.5rem)',
        'sidebar-button-gap': 'var(--spacing-sidebar-button-gap, 0.5rem)',
        'sidebar-divider-margin': 'var(--spacing-sidebar-divider-margin, 1rem)',
        'checkbox-gap': 'var(--spacing-checkbox-gap, 0.5rem)',
        'mt-md': 'var(--spacing-mt-md, 1rem)',
        'mb-md': 'var(--spacing-mb-md, 1rem)',
      },

      // --- Özəl Ölçülər (Width/Height) ---
      width: {
        'button': 'var(--width-button, 10rem)',
        'login-icon-medium': 'var(--size-login-icon-medium, 1.5rem)',
        'login-icon-small': 'var(--size-login-icon-small, 1rem)',
        'sidebar-icon': 'var(--size-sidebar-icon, 1.5rem)',
        'sidebar-logo': 'var(--width-sidebar-logo, 8rem)',
        'step-circle': 'var(--size-step-circle, 2rem)',
        'step-dot': 'var(--size-step-dot, 0.375rem)',
        'step-dot-active': 'var(--size-step-dot-active, 0.5rem)',
        'checkbox': 'var(--size-checkbox, 1.25rem)',
        'modal': 'var(--width-modal, 30rem)',
      },
      height: {
        'button': 'var(--height-button, 2.75rem)',
        'login-icon-medium': 'var(--size-login-icon-medium, 1.5rem)',
        'login-icon-small': 'var(--size-login-icon-small, 1rem)',
        'sidebar-icon': 'var(--size-sidebar-icon, 1.5rem)',
        'step-circle': 'var(--size-step-circle, 2rem)',
        'step-dot': 'var(--size-step-dot, 0.375rem)',
        'step-dot-active': 'var(--size-step-dot-active, 0.5rem)',
        'checkbox': 'var(--size-checkbox, 1.25rem)',
        'input-mobile': 'var(--height-input-mobile, 2.5rem)',
        'input-desktop': 'var(--height-input-desktop, 2.75rem)',
        'sidebar-overlay': 'var(--height-sidebar-overlay, 15rem)',
      },

      // --- Özəl Tipoqrafiya (Font Size/Line Height) ---
      fontSize: {
        'login-title': 'var(--font-size-login-title, 2.25rem)',
        'step': 'var(--font-size-step, 1rem)',
        'modal-title-mobile': 'var(--font-size-modal-title-mobile, 1.5rem)',
        'modal-title-desktop': 'var(--font-size-modal-title-desktop, 2rem)',
      },
      lineHeight: {
        'login-or': 'var(--line-height-login-or, 1.5rem)',
        'checkbox': 'var(--line-height-checkbox, 1.5rem)',
        'modal-title-mobile': 'var(--line-height-modal-title-mobile, 1.75rem)',
        'modal-title-desktop': 'var(--line-height-modal-title-desktop, 2.25rem)',
        'modal-paragraph-mobile': 'var(--line-height-modal-paragraph-mobile, 1.5rem)',
        'modal-paragraph-desktop': 'var(--line-height-modal-paragraph-desktop, 1.75rem)',
      },

      // --- Özəl Border Radius, Shadow, və s. ---
      borderRadius: {
        'button': 'var(--radius-button, 0.5rem)',
        'input': 'var(--radius-input, 0.5rem)',
        'checkbox': 'var(--radius-checkbox, 0.25rem)',
        'step': 'var(--radius-step, 0.5rem)',
        'step-indicator': 'var(--radius-step-indicator, 0.5rem)',
        'modal': 'var(--radius-modal, 1rem)',
        'login-button': 'var(--radius-login-button, 0.5rem)',
      },
      boxShadow: {
        'button': 'var(--shadow-button, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1))',
        'modal': 'var(--shadow-modal, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1))',
      },
      blur: {
        'modal': 'var(--blur-modal, 4px)',
        'sidebar-overlay': 'var(--blur-sidebar-overlay, 4px)',
      },
      backgroundImage: {
        'sidebar-overlay-gradient': 'var(--bg-sidebar-overlay-gradient, linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%))',
      },
      borderWidth: {
        'border-width': 'var(--border-width, 1px)',
      },
      screens: {
        // Custom breakpoint for "firstmobile" utility usage in components
        'firstmobile': '360px',
      }
    },
  },
  plugins: [],
}
