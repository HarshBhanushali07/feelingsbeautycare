// Centralized constants for the Feelings Beauty Care website

export const CONTACT_INFO = {
  phone: "+91 98765 43210",
  email: "info@feelingsbeautycare.com",
  address: {
    street: "123 Beauty Street, Near City Mall",
    city: "Jamnagar",
    state: "Gujarat",
    pincode: "361001",
    full: "123 Beauty Street, Near City Mall, Jamnagar, Gujarat 361001"
  }
};

export const BUSINESS_HOURS = {
  monday: { open: "9:00 AM", close: "8:00 PM" },
  tuesday: { open: "9:00 AM", close: "8:00 PM" },
  wednesday: { open: "9:00 AM", close: "8:00 PM" },
  thursday: { open: "9:00 AM", close: "8:00 PM" },
  friday: { open: "9:00 AM", close: "8:00 PM" },
  saturday: { open: "9:00 AM", close: "9:00 PM" },
  sunday: { open: "10:00 AM", close: "7:00 PM" }
};

export const SOCIAL_MEDIA = {
  instagram: "https://instagram.com/feelingsbeautycare",
  facebook: "https://facebook.com/feelingsbeautycare",
  youtube: "https://youtube.com/@feelingsbeautycare"
};

export const COMPANY_INFO = {
  name: "Feelings Beauty Care",
  tagline: "Jamnagar's Premier Luxury Beauty Salon & Academy",
  description: "Experience the finest in beauty care since 2010",
  establishedYear: 2010
};

export const SEO_CONFIG = {
  siteName: "Feelings Beauty Care",
  siteDescription: "Experience luxury beauty care at Feelings Beauty Care. Premium salon services, bridal makeup, beauty courses & more in Jamnagar. Book your appointment today!",
  keywords: [
    "beauty salon",
    "makeup",
    "hair styling", 
    "bridal makeup",
    "beauty courses",
    "Jamnagar salon",
    "spa services",
    "facial treatments",
    "nail art",
    "beauty academy"
  ]
};

// Performance configurations
export const PERFORMANCE_CONFIG = {
  // 3D Component settings
  lowEndDevice: {
    segments: 8,
    enableShadows: false,
    enableReflections: false,
    animationReduced: true
  },
  mobile: {
    segments: 16, 
    enableShadows: false,
    enableReflections: false,
    animationReduced: false
  },
  desktop: {
    segments: 32,
    enableShadows: true,
    enableReflections: true,
    animationReduced: false
  }
};

// Touch target minimum sizes (accessibility compliance)
export const ACCESSIBILITY_CONFIG = {
  minTouchTarget: 44, // pixels
  minTouchSpacing: 8, // pixels
  focusRingWidth: 3 // pixels
};