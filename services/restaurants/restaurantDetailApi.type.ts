export type RestaurantMenuType = {
  id: number;
  created: string;
  deprecated: string;
  name: string;
  description: string | null;
  srcName: string;
  landingRestaurantId: number;
  restaurantId: string;
  menuSections: MenuSectionType[];
};

export type MenuSectionType = {
  id: number;
  created: string;
  deprecated: string;
  name: string;
  description?: string | null;
  srcName: string;
  landingRestaurantId: number;
  menuId: number;
  menuItems: MenuItemType[];
};

export type MenuItemType = {
  id: number;
  created: string;
  deprecated: string;
  name: string;
  description?: string | null;
  images: string[];
  price: number | null;
  stats: any;
  statsDisLikes: any;
  srcName: string;
  landingRestaurantId: number;
  menuSectionId: number;
  menuItemDietaries: any[];
};

export interface IRestaurantDetail {
  id: string;
  name: string;
  address: string;
  description: string;
  priceRange: number;
  country: string;
  postcode: string;
  state: string;
  street: string;
  city: string;
  geolocation: Geolocation;
  website: string;
  bannerImage: string;
  logo: string;
  stats: IRestaurantStats;
  deliveryProviders: DeliveryProvider[];
  bookingWidgets: BookingWidgets;
  contactPhone?: any;
  contactEmail?: any;
  slug: string;
  contactSocialMediaLinks?: any;
  openingHours?: any;
  restaurantType: RestaurantType;
  cuisines: RestaurantType[];
  restaurantLike: IRestaurantLike[];
  company?: any;
  isPublished: boolean;
  restaurantTemplate: ITemplate;
}

export interface ITemplate {
  id: number;
  created: string;
  updated: string;
  deprecated?: any;
  screenshot: string;
  features: any;
  name: string;
}

interface IRestaurantLike {
  id: number;
  created: string;
  updated: string;
  deprecated?: any;
  restaurantId: string;
  userId: string;
  isLiked: boolean;
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

interface All {
  totalLikes: number;
  percentLikes: number;
  totalReviews: number;
  totalDislikes: number;
  totalNonDietaryLikes: number;
}

interface Geolocation {
  x: number;
  y: number;
}

export type IDeliveryProviders = {
  id: string;
  name: string;
  description: string;
  priceRange: number;
  country: string;
  state: string;
  street: string;
  city: string;
  geolocation: Geolocation;
  website: string;
  bannerImage: string;
  stats: IRestaurantStats;
  deliveryProviders: DeliveryProvider[];
  bookingWidgets: BookingWidgets;
  contactPhone: string;
  contactEmail?: any;
  slug: string;
  contactSocialMediaLinks?: any;
  openingHours: OpeningHours;
  restaurantType: RestaurantType;
  cuisines: RestaurantType[];
  restaurantLike: any[];
  company?: any;
  isPublished: boolean;
};

interface RestaurantType {
  id: number;
  created: string;
  updated: string;
  deprecated?: any;
  name: string;
}

interface OpeningHours {
  Monday: Monday;
  Tuesday: Monday;
  Wednesday: Monday;
  Thursday: Monday;
  Friday: Monday;
  Saturday: Monday;
  Sunday: Monday;
}

interface Monday {
  isClosed: boolean;
  values: Value[];
}

interface Value {
  openTime: string;
  closeTime: string;
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

interface All {
  totalLikes: number;
  percentLikes: number;
  totalReviews: number;
  totalDislikes: number;
  totalNonDietaryLikes: number;
}

interface Geolocation {
  x: number;
  y: number;
}

export interface IRestaurantStats {
  all: All;
  [x: string]: All;
}
