import { Ticket } from "./ticket";

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  content: string;
  category: string;
  thumbnail: string;
  startDate: Date;
  endDate: Date;
  adminId: number;
  updatedAt: Date;
  createdAt: Date;
  price: number;
  tickets?: Ticket[];
  admin?: {
    name: string;
    pictureProfile?: string;
  };
}



export interface Organizer {
  id: string;  // Using string as ID, can be UUID or another identifier
  name: string;
  avatar?: string; // Optional avatar image URL or data
}

export interface EventsResponse {
  data: Event[];  // Array of Event objects
  meta: {
    total: number; // Total number of events in the response
    page: number;  // Current page number
    pageSize: number;  // Number of items per page
    totalPages: number;  // Total pages for pagination
  };
}

export const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "music", label: "Music" },
  { value: "nightlife", label: "Nightlife" },
  { value: "arts", label: "Arts" },
  { value: "food", label: "Food" },
  { value: "business", label: "Business" },
  { value: "dating", label: "Dating" },
  { value: "sports", label: "Sports" },
  { value: "family", label: "Family" },
  { value: "technology", label: "Technology" },
  { value: "health", label: "Health & Wellness" },
];

export const LOCATIONS = [
  { value: "all", label: "All Locations" },
  { value: "jakarta", label: "Jakarta" },
  { value: "bandung", label: "Bandung" },
  { value: "surabaya", label: "Surabaya" },
  { value: "bali", label: "Bali" },
  { value: "yogyakarta", label: "Yogyakarta" },
  { value: "medan", label: "Medan" },
  { value: "semarang", label: "Semarang" },
];
