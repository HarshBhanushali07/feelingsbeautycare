import { LucideIcon, Scissors, Palette, Crown, Sparkles, Flower, Camera } from "lucide-react";
import makeupStation from "@/assets/makeup-station.jpg";
import bridalService from "@/assets/bridal-service.jpg";
import nailService from "@/assets/nail-service.jpg";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  icon: LucideIcon;
  image: string;
  popular?: boolean;
  trending?: boolean;
  rating: number;
  bookings: number;
  discount?: number;
  isConsultation?: boolean;
}

export const services: Service[] = [
  {
    id: "hair-cut-style",
    name: "Hair Cut & Style",
    description: "Professional haircut with styling, includes wash and blow-dry",
    price: 800,
    duration: 60,
    category: "Hair",
    icon: Scissors,
    image: makeupStation,
    popular: true,
    trending: false,
    rating: 4.8,
    bookings: 1250,
    discount: 0
  },
  {
    id: "bridal-makeup",
    name: "Bridal Makeup",
    description: "Complete bridal makeup with trial, HD finish, 8-hour wear",
    price: 8000,
    duration: 180,
    category: "Makeup",
    icon: Crown,
    image: bridalService,
    popular: true,
    trending: true,
    rating: 4.9,
    bookings: 450,
    discount: 10
  },
  {
    id: "bridal-package",
    name: "Bridal Package",
    description: "Complete bridal transformation with pre-bridal treatments",
    price: 15000,
    duration: 240,
    category: "Bridal",
    icon: Crown,
    image: bridalService,
    popular: true,
    trending: false,
    rating: 5.0,
    bookings: 280,
    discount: 0,
    isConsultation: true
  },
  {
    id: "facial-treatment",
    name: "Facial Treatment",
    description: "Deep cleansing and moisturizing facial with steam therapy",
    price: 1500,
    duration: 90,
    category: "Skincare",
    icon: Flower,
    image: makeupStation,
    popular: false,
    trending: false,
    rating: 4.7,
    bookings: 820,
    discount: 0
  },
  {
    id: "nail-art-manicure",
    name: "Nail Art & Manicure",
    description: "Creative nail art with manicure, gel polish included",
    price: 1200,
    duration: 45,
    category: "Nails",
    icon: Sparkles,
    image: nailService,
    popular: false,
    trending: true,
    rating: 4.6,
    bookings: 650,
    discount: 15
  },
  {
    id: "hair-coloring",
    name: "Hair Coloring",
    description: "Professional hair coloring service with premium products",
    price: 2500,
    duration: 120,
    category: "Hair",
    icon: Scissors,
    image: makeupStation,
    popular: false,
    trending: false,
    rating: 4.8,
    bookings: 380,
    discount: 0
  },
  {
    id: "eyebrow-threading",
    name: "Eyebrow Threading",
    description: "Precise eyebrow shaping and threading with aftercare",
    price: 300,
    duration: 20,
    category: "Beauty",
    icon: Sparkles,
    image: makeupStation,
    popular: false,
    trending: false,
    rating: 4.5,
    bookings: 920,
    discount: 0
  },
  {
    id: "photoshoot-makeup",
    name: "Photoshoot Makeup",
    description: "HD makeup for professional photography sessions",
    price: 2000,
    duration: 120,
    category: "Makeup",
    icon: Camera,
    image: bridalService,
    popular: false,
    trending: false,
    rating: 4.9,
    bookings: 320,
    discount: 0
  },
  {
    id: "manicure",
    name: "Manicure",
    description: "Professional manicure with nail care and polish",
    price: 800,
    duration: 45,
    category: "Nails",
    icon: Sparkles,
    image: nailService,
    popular: false,
    trending: false,
    rating: 4.6,
    bookings: 580,
    discount: 0
  },
  {
    id: "pedicure",
    name: "Pedicure",
    description: "Relaxing pedicure with foot massage and nail polish",
    price: 1000,
    duration: 60,
    category: "Nails",
    icon: Sparkles,
    image: nailService,
    popular: false,
    trending: false,
    rating: 4.7,
    bookings: 420,
    discount: 0
  },
  {
    id: "hair-spa",
    name: "Hair Spa Treatment",
    description: "Deep conditioning hair spa with scalp massage",
    price: 2000,
    duration: 90,
    category: "Hair",
    icon: Scissors,
    image: makeupStation,
    popular: false,
    trending: false,
    rating: 4.8,
    bookings: 350,
    discount: 0
  },
  {
    id: "party-makeup",
    name: "Party Makeup",
    description: "Glamorous party makeup for special occasions",
    price: 3500,
    duration: 90,
    category: "Makeup",
    icon: Palette,
    image: bridalService,
    popular: true,
    trending: false,
    rating: 4.8,
    bookings: 290,
    discount: 0
  }
];

export const serviceCategories = [...new Set(services.map(service => service.category))];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(service => service.category === category);
};

export const getPopularServices = (): Service[] => {
  return services.filter(service => service.popular);
};

export const getTrendingServices = (): Service[] => {
  return services.filter(service => service.trending);
};

export const calculateServicePrice = (service: Service): number => {
  if (service.discount && service.discount > 0) {
    return Math.round(service.price * (1 - service.discount / 100));
  }
  return service.price;
};

export const calculateTotalPrice = (selectedServices: Service[]): {
  original: number;
  total: number;
  totalDiscount: number;
  comboDiscount: number;
  duration: number;
} => {
  let original = 0;
  let total = 0;
  let totalDiscount = 0;

  selectedServices.forEach(service => {
    original += service.price;
    const discountAmount = service.discount ? (service.price * service.discount / 100) : 0;
    total += service.price - discountAmount;
    totalDiscount += discountAmount;
  });

  // Combo discount for multiple services
  let comboDiscount = 0;
  if (selectedServices.length >= 3) {
    comboDiscount = total * 0.1; // 10% combo discount
    total -= comboDiscount;
  }

  const duration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  return {
    original,
    total,
    totalDiscount: totalDiscount + comboDiscount,
    comboDiscount,
    duration
  };
};