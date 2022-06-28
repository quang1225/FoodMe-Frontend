export interface IRestaurant {
  id: string;
  name: string;
  description: string;
  priceRange: number;
  country: string;
  state: string;
  street: string;
  city: string;
  geolocation: Geolocation;
  website?: any;
  bannerImage: string;
  stats: Stats;
  deliveryProviders: DeliveryProvider[];
  bookingWidgets: BookingWidgets;
  contactPhone?: any;
  contactEmail?: any;
  slug: string;
  contactSocialMediaLinks?: any;
  openingHours?: any;
  restaurantType: RestaurantType;
  dietaries: IDietary[];
  cuisines: RestaurantType[];
  isBookmarked: boolean;
  company?: any;
  isPublished: boolean;
  distance: number;
}

interface IDietary {
  id: number;
  created: string;
  updated: string;
  deprecated?: any;
  name: string;
  icon: string;
  alias: string;
  menuItemDietCount: number;
}

interface RestaurantType {
  id: number;
  created: string;
  updated: string;
  deprecated?: any;
  name: string;
}

interface BookingWidgets {
  'Open Table': OpenTable;
}

interface OpenTable {
  merchant_id: number;
  api_key?: any;
}

interface DeliveryProvider {
  deliveroo: string;
  menulog: string;
  heyyou: string;
}

interface Stats {
  '71572': _71572;
  '72165': _71572;
  '73627': _71572;
  all: All;
}

interface All {
  totalLikes: number;
  percentLikes: number;
  totalReviews: number;
  totalDislikes: number;
  totalNonDietaryLikes: number;
}

interface _71572 {
  totalLikes: number;
  percentLikes: number;
  totalReviews: number;
  totalDislikes: number;
}

interface Geolocation {
  x: number;
  y: number;
}
