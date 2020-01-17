export interface YelpSearchResponse {
  businesses: Business[];
  total: number;
  region: Region;
}

export interface Business {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Category[];
  rating: number;
  coordinates: Center;
  transactions: any[];
  price?: Price;
  location: Location;
  phone: string;
  display_phone: string;
  distance: number;
}

export interface Category {
  alias: string;
  title: string;
}

export interface Location {
  address1: string;
  address2: null | string;
  address3: null | string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

export enum Price {
  Low = '€',
  Medium = '€€',
  High = '€€€',
  Fancy = '€€€€'
}

export interface Region {
  center: Center;
}

export interface Center {
  latitude: number;
  longitude: number;
}
