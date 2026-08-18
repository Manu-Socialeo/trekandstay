export interface DodhamItineraryDay {
  dayNumber: number;
  dayTitle: string;
  route: string;
  icon: string;
  date: string;
  tagline: string;
  description: string[];
  activities: string[];
  mealsIncluded: string;
  stayLocation: string;
  stayType: string;
  altitude?: string;
  distance?: string;
  trekDifficulty?: string;
  mapQuery: string;
  mapUrl: string;
  keyHighlights: string[];
  image: string;
  imageCaption: string;
}

export interface DodhamPackageOption {
  id: 'bangalore' | 'delhi';
  name: string;
  startLocation: string;
  endLocation: string;
  pricePerPerson: number;
  badge: string;
  transportIncluded: string[];
  popular?: boolean;
}

export interface DodhamPickupLocation {
  name: string;
  city: string;
  address: string;
  reportingTime: string;
  googleMapUrl: string;
  notes: string;
}

export interface DodhamPackingItem {
  id: string;
  category: 'Essentials & ID' | 'Clothing & Thermals' | 'Footwear & Trek Gear' | 'Toiletries & Medical' | 'Electronics & Misc';
  title: string;
  description?: string;
  iconName: string;
  mandatory: boolean;
}

export interface DodhamBookingState {
  packageId: 'bangalore' | 'delhi';
  travelersCount: number;
  travelerName: string;
  travelerPhone: string;
  travelerEmail: string;
  travelerCity: string;
  includeRafting: boolean;
  includeBungee: boolean;
  paymentType: 'token' | 'full';
  utrNumber?: string;
  notes?: string;
}
