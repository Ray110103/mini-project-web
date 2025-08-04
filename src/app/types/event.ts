export interface Event {
  id: string; // Using string as ID type, assuming it's a UUID or string type
  slug: string;
  title: string;
  description: string; // Updated to string for description text
  location: string;
  content: string; // Assuming content is HTML or rich text content
  category: string;
  thumbnail: string;
  startDate: string;  // Updated to string for better handling (ISO date format is good for JSON)
  endDate: string;    // Same as above
  price: number;
  adminId: number;
  updatedAt: string;  // Date should be ISO string if passed in API
  createdAt: string;  // Same as above
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
