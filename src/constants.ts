import { Customer, Product } from './types';

export const initialCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Alice Johnson",
    segment: "Loyal VIP",
    recentPurchases: ["prod-101", "prod-203"],
    interests: ["skincare", "haircare"],
  },
  {
    id: "cust-002",
    name: "Bob Williams",
    segment: "New Customer",
    recentPurchases: [],
    interests: ["gadgets", "audio"],
  },
  {
    id: "cust-003",
    name: "Charlie Brown",
    segment: "At-Risk Shopper",
    recentPurchases: ["prod-301"],
    interests: ["home goods", "kitchenware"],
  },
];

export const initialProducts: Product[] = [
  {
    id: "prod-101",
    name: "Hydrating Face Serum",
    description: "A lightweight serum packed with hyaluronic acid to deeply moisturize skin.",
    price: 45.00,
    category: "Skincare",
    imageUrl: "https://picsum.photos/seed/serum/300/300",
  },
  {
    id: "prod-203",
    name: "Noise-Cancelling Headphones",
    description: "Immerse yourself in sound with these premium over-ear headphones.",
    price: 299.99,
    category: "Electronics",
    imageUrl: "https://picsum.photos/seed/headphones/300/300",
  },
  {
    id: "prod-301",
    name: "Artisan Ceramic Mug",
    description: "Hand-crafted ceramic mug, perfect for your morning coffee or tea.",
    price: 25.00,
    category: "Home Goods",
    imageUrl: "https://picsum.photos/seed/mug/300/300",
  },
  {
    id: "prod-405",
    name: "Smart Fitness Tracker",
    description: "Monitor your activity, sleep, and health with this sleek wearable.",
    price: 129.50,
    category: "Electronics",
    imageUrl: "https://picsum.photos/seed/tracker/300/300"
  }
];
