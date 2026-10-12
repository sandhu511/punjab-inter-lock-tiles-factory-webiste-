import { BUSINESS, PRODUCTS } from "./business";

export interface StoredAnnouncement {
  id: string;
  badge: string;
  text: string;
  highlightText?: string;
  actionLabel?: string;
  actionUrl?: string;
  isExternal?: boolean;
  isActive: boolean;
}

export interface StoredLead {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  tile: string;
  quantity: string;
  location: string;
  message?: string;
  status: "new" | "contacted" | "deal_won" | "completed" | "cancelled";
  createdAt: string;
  notes?: string;
}

export interface StoredProduct {
  id: string;
  name: string;
  nameEn: string;
  pa: string;
  desc: string;
  pricePerSqFt?: string;
  thickness?: string;
  inStock: boolean;
}

export interface StoredReview {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  source: string;
}

// Default strong admin credentials
export const DEFAULT_ADMIN_CREDENTIALS = {
  username: "punjab_admin_2026",
  password: "Punjab@Tiles#Secure99000!",
};

export const DEFAULT_ANNOUNCEMENTS: StoredAnnouncement[] = [
  {
    id: "factory-offer",
    badge: "ਸੀਮਤ ਆਫਰ",
    text: "ਸਿੱਧਾ ਫੈਕਟਰੀ ਰੇਟ 'ਤੇ ਪ੍ਰੀਮੀਅਮ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ — ਵਿਚੋਲਿਆਂ ਤੋਂ ਬਿਨਾਂ ਸਭ ਤੋਂ ਘੱਟ ਰੇਟ!",
    highlightText: "ਵਿਸ਼ੇਸ਼ ਛੋਟ",
    actionLabel: "ਰੇਟ ਪੁੱਛੋ",
    actionUrl: "/contact",
    isActive: true,
  },
  {
    id: "bulk-deal",
    badge: "ਥੋਕ ਰਿਆਇਤ",
    text: "ਠੇਕੇਦਾਰਾਂ ਅਤੇ ਵੱਡੇ ਆਰਡਰਾਂ 'ਤੇ ਵਿਸ਼ੇਸ਼ ਰਿਆਇਤ + ਪੂਰੇ ਪੰਜਾਬ ਵਿੱਚ ਤੇਜ਼ ਸਪਲਾਈ!",
    highlightText: "ਮੁਫ਼ਤ ਐਸਟੀਮੇਟ",
    actionLabel: "ਕਾਲ ਕਰੋ",
    actionUrl: `tel:${BUSINESS.phoneRaw}`,
    isExternal: true,
    isActive: true,
  },
  {
    id: "rating-trust",
    badge: "5.0 ★ ਗੂਗਲ ਰੇਟਿੰਗ",
    text: "ਗਹਿਰੀ ਬੁੱਟਰ (ਸੰਗਤ ਕਲਾਂ) ਵਿਖੇ ਗਾਹਕਾਂ ਦਾ ਸਭ ਤੋਂ ਭਰੋਸੇਮੰਦ ਇੰਟਰਲਾਕ ਟਾਈਲ ਨਿਰਮਾਤਾ!",
    highlightText: "100% ਕੁਆਲਿਟੀ",
    actionLabel: "ਸਮੀਖਿਆਵਾਂ",
    actionUrl: "/reviews",
    isActive: true,
  },
  {
    id: "heavy-duty",
    badge: "ਹੈਵੀ ਡਿਊਟੀ",
    text: "ਘਰਾਂ, ਵਿਹੜਿਆਂ, ਟਰੱਕਾਂ ਅਤੇ ਵਪਾਰਕ ਪਾਰਕਿੰਗਾਂ ਲਈ ਬੇਮਿਸਾਲ ਮਜ਼ਬੂਤੀ ਵਾਲੀਆਂ ਟਾਈਲਾਂ।",
    highlightText: "ਲੰਬੀ ਉਮਰ",
    actionLabel: "ਟਾਈਲਾਂ ਦੇਖੋ",
    actionUrl: "/products",
    isActive: true,
  },
];

export const INITIAL_LEADS: StoredLead[] = [
  {
    id: "lead-1",
    name: "ਸ. ਕੁਲਵਿੰਦਰ ਸਿੰਘ",
    phone: "+91 98721 34567",
    whatsapp: "+91 98721 34567",
    tile: "ਇੰਟਰਲਾਕ ਪੇਵਰ ਟਾਈਲਾਂ",
    quantity: "2500 ਵਰਗ ਫੁੱਟ",
    location: "ਬਠਿੰਡਾ ਰੋਡ, ਸੰਗਤ ਕਲਾਂ",
    message: "ਕੋਠੀ ਦੇ ਡਰਾਈਵ-ਵੇਅ ਅਤੇ ਵਿਹੜੇ ਲਈ ਲਾਲ ਅਤੇ ਪੀਲੇ ਰੰਗ ਦੀਆਂ ਟਾਈਲਾਂ ਚਾਹੀਦੀਆਂ ਹਨ।",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: "ਗਾਹਕ ਨੇ ਸਾਈਟ ਵਿਜ਼ਿਟ ਲਈ ਕਿਹਾ ਹੈ।",
  },
  {
    id: "lead-2",
    name: "ਜਗਤਾਰ ਸਿੰਘ ਢਿੱਲੋਂ",
    phone: "+91 94172 88990",
    whatsapp: "+91 94172 88990",
    tile: "ਹੈਵੀ-ਡਿਊਟੀ ਪੇਵਰ ਟਾਈਲਾਂ",
    quantity: "6000 ਵਰਗ ਫੁੱਟ",
    location: "ਫਾਰਮ ਹਾਊਸ ਅਤੇ ਗੋਦਾਮ, ਗਹਿਰੀ ਬੁੱਟਰ",
    message: "ਟਰੱਕਾਂ ਦੀ ਪਾਰਕਿੰਗ ਲਈ 80mm ਹੈਵੀ ਟਾਈਲਾਂ ਦੇ ਰੇਟ ਦੱਸੋ।",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    notes: "ਰੇਟ ਕੁਓਟ ਕਰ ਦਿੱਤਾ ਹੈ, ਸੈਂਪਲ ਚੈੱਕ ਕਰਵਾਉਣਾ ਹੈ।",
  },
  {
    id: "lead-3",
    name: "ਅਮਨਦੀਪ ਸ਼ਰਮਾ",
    phone: "+91 98888 12345",
    whatsapp: "+91 98888 12345",
    tile: "ਡਿਜ਼ਾਈਨਰ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ",
    quantity: "1200 ਵਰਗ ਫੁੱਟ",
    location: "ਮਾਡਲ ਟਾਊਨ, ਬਠਿੰਡਾ",
    message: "ਫਰੰਟ ਪੋਰਚ ਅਤੇ ਬਗੀਚੇ ਲਈ ਨਵੀਨਤਮ ਡਿਜ਼ਾਈਨ ਦਿਖਾਓ।",
    status: "deal_won",
    createdAt: new Date(Date.now() - 3600000 * 50).toISOString(),
    notes: "ਆਰਡਰ ਕਨਫਰਮ ਹੋ ਗਿਆ, ਐਡਵਾਂਸ ਮਿਲ ਗਿਆ।",
  },
];

export const INITIAL_PRODUCTS: StoredProduct[] = [
  {
    id: "paver",
    name: "ਇੰਟਰਲਾਕ ਪੇਵਰ ਟਾਈਲਾਂ",
    nameEn: "Interlock Paver Tiles",
    pa: "ਇੰਟਰਲਾਕ ਪੇਵਰ ਟਾਈਲ",
    desc: "ਘਰਾਂ ਦੇ ਡਰਾਈਵ-ਵੇਅ, ਵਿਹੜਿਆਂ ਅਤੇ ਬਾਹਰੀ ਥਾਵਾਂ ਲਈ ਉੱਚ ਮਜ਼ਬੂਤੀ ਅਤੇ ਹੰਢਣਸਾਰ ਪੇਵਿੰਗ ਟਾਈਲਾਂ।",
    pricePerSqFt: "₹38 - ₹45",
    thickness: "60mm",
    inStock: true,
  },
  {
    id: "designer",
    name: "ਡਿਜ਼ਾਈਨਰ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ",
    nameEn: "Designer Interlock Tiles",
    pa: "ਡਿਜ਼ਾਈਨਰ ਟਾਈਲ",
    desc: "ਸ਼ਾਨਦਾਰ ਦਿੱਖ ਅਤੇ ਪ੍ਰੀਮੀਅਮ ਸਜਾਵਟ ਲਈ ਆਧੁਨਿਕ ਪੈਟਰਨਾਂ ਅਤੇ ਆਕਰਸ਼ਕ ਫਿਨਿਸ਼ਿੰਗ ਵਾਲੀਆਂ ਟਾਈਲਾਂ।",
    pricePerSqFt: "₹48 - ₹58",
    thickness: "60mm",
    inStock: true,
  },
  {
    id: "heavy",
    name: "ਹੈਵੀ-ਡਿਊਟੀ ਪੇਵਰ ਟਾਈਲਾਂ",
    nameEn: "Heavy-Duty Paver Tiles",
    pa: "ਹੈਵੀ-ਡਿਊਟੀ ਟਾਈਲ",
    desc: "ਭਾਰੀ ਵਾਹਨਾਂ, ਟਰੱਕਾਂ ਅਤੇ ਵਪਾਰਕ ਖੇਤਰਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਤਾਕਤ ਅਤੇ ਮਜ਼ਬੂਤੀ ਨਾਲ ਤਿਆਰ ਕੀਤੀਆਂ ਟਾਈਲਾਂ।",
    pricePerSqFt: "₹52 - ₹65",
    thickness: "80mm / 100mm",
    inStock: true,
  },
  {
    id: "outdoor",
    name: "ਆਊਟਡੋਰ ਫਲੋਰਿੰਗ ਟਾਈਲਾਂ",
    nameEn: "Outdoor Flooring Tiles",
    pa: "ਆਊਟਡੋਰ ਫਲੋਰਿੰਗ",
    desc: "ਘਰਾਂ, ਦੁਕਾਨਾਂ, ਫਾਰਮ ਹਾਊਸਾਂ ਅਤੇ ਖੁੱਲ੍ਹੇ ਰਸਤਿਆਂ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਅਤੇ ਟਿਕਾਊ ਟਾਈਲਾਂ।",
    pricePerSqFt: "₹42 - ₹50",
    thickness: "60mm",
    inStock: true,
  },
];

export const INITIAL_REVIEWS: StoredReview[] = [
  {
    id: "rev-1",
    name: "ਚਰਨਜੀਤ ਸਿੰਘ",
    text: "ਬਹੁਤ ਵਧੀਆ ਲਾਕ ਟਾਈਲਾਂ ਨੇ, ਰੇਟ ਵੀ ਸਭ ਨਾਲੋਂ ਘੱਟ ਆ",
    rating: 5,
    date: "2026-02-15",
    source: "Google Review",
  },
  {
    id: "rev-2",
    name: "ਬਲਰਾਜ ਸਿੰਘ",
    text: "ਬੰਬ ਅੱਗ - ਸ਼ਾਨਦਾਰ ਕੁਆਲਿਟੀ ਅਤੇ ਮਜ਼ਬੂਤੀ",
    rating: 5,
    date: "2026-03-01",
    source: "Google Review",
  },
  {
    id: "rev-3",
    name: "ਹਰਪ੍ਰੀਤ ਸਿੰਘ ਬਰਾੜ",
    text: "ਸਮੇਂ ਸਿਰ ਡਿਲੀਵਰੀ ਅਤੇ ਬਹੁਤ ਵਧੀਆ ਵਿਵਹਾਰ। ਰੇਟ ਵੀ ਮਾਰਕੀਟ ਨਾਲੋਂ ਬਹੁਤ ਕਿਫ਼ਾਇਤੀ ਸੀ।",
    rating: 5,
    date: "2026-03-20",
    source: "ਸਿੱਧਾ ਗਾਹਕ",
  },
];

// Helper functions for persistent local storage access
const STORAGE_KEYS = {
  AUTH_USER: "punjab_tiles_admin_user",
  CREDENTIALS: "punjab_tiles_admin_credentials",
  ANNOUNCEMENTS: "punjab_tiles_announcements",
  LEADS: "punjab_tiles_leads",
  PRODUCTS: "punjab_tiles_products",
  REVIEWS: "punjab_tiles_reviews",
  SETTINGS: "punjab_tiles_settings",
};

export function getAdminCredentials() {
  if (typeof window === "undefined") return DEFAULT_ADMIN_CREDENTIALS;
  const stored = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
  if (!stored) return DEFAULT_ADMIN_CREDENTIALS;
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_ADMIN_CREDENTIALS;
  }
}

export function saveAdminCredentials(creds: typeof DEFAULT_ADMIN_CREDENTIALS) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(creds));
  }
}

export function getAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEYS.AUTH_USER) === "authenticated";
}

export function setAdminSession(isAuth: boolean) {
  if (typeof window !== "undefined") {
    if (isAuth) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, "authenticated");
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  }
}

export function getStoredAnnouncements(): StoredAnnouncement[] {
  if (typeof window === "undefined") return DEFAULT_ANNOUNCEMENTS;
  const stored = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    return DEFAULT_ANNOUNCEMENTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_ANNOUNCEMENTS;
  }
}

export function saveStoredAnnouncements(list: StoredAnnouncement[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(list));
    window.dispatchEvent(new Event("announcements_updated"));
  }
}

export function getStoredLeads(): StoredLead[] {
  if (typeof window === "undefined") return INITIAL_LEADS;
  const stored = localStorage.getItem(STORAGE_KEYS.LEADS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
    return INITIAL_LEADS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_LEADS;
  }
}

export function saveStoredLeads(leads: StoredLead[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }
}

export function addLead(lead: Omit<StoredLead, "id" | "createdAt" | "status">) {
  const current = getStoredLeads();
  const newLead: StoredLead = {
    ...lead,
    id: `lead-${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  saveStoredLeads([newLead, ...current]);
  return newLead;
}

export function getStoredProducts(): StoredProduct[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: StoredProduct[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }
}

export function getStoredReviews(): StoredReview[] {
  if (typeof window === "undefined") return INITIAL_REVIEWS;
  const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_REVIEWS;
  }
}

export function saveStoredReviews(reviews: StoredReview[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }
}
