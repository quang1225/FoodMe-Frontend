import { IDietary } from '../dietary/dietaryApi.types';

export type IRestaurant = {
  id: string;
  name: string;
  description: string;
  priceRange: number;
  country: string;
  state: string;
  street: string;
  city: string;
  geolocation: any;
  website: string;
  bannerImage: string;
  contactPhone: string;
  contactEmail: string;
  contactSocialMediaLinks: any;
  openingHours: any;
};

export type Cuisines = {
  name: string;
  id: number;
  created: string;
  deprecated: any;
};

export type SearchRestaurant = {
  restaurants: Array<IRestaurant>;
  dietaries: Array<IDietary>;
  cuisines: Array<Cuisines>;
  suburbs: any;
};

export type SearchLocation = {
  q: string;
  limit: number;
  format: string;
  addressdetails: 1;
};

export interface iType {
  id: number;
  name: string;
}
