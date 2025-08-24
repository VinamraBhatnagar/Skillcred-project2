export interface Customer {
  id: string;
  name: string;
  segment: 'New Customer' | 'Loyal VIP' | 'At-Risk Shopper' | 'Recent Browser';
  recentPurchases: string[];
  interests: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface EmailVariation {
  variationName: string; // e.g., "Variation A", "Variation B"
  targetSegment: string;
  subject: string;
  body: string; // HTML content
  dynamicDiscountCode: string;
}

export interface CampaignSettings {
  goal: string;
  tone: 'Friendly & Casual' | 'Professional & Polished' | 'Excited & Urgent' | 'Informative & Helpful';
  numVariations: number;
}
