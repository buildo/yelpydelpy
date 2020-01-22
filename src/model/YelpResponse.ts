import * as t from 'io-ts';

export const Category = t.type(
  {
    alias: t.string,
    title: t.string
  },
  'Category'
);
export type Category = t.TypeOf<typeof Category>;

export const Location = t.type(
  {
    address1: t.string,
    city: t.string,
    country: t.string,
    state: t.string
  },
  'Location'
);
export type Location = t.TypeOf<typeof Location>;

export const Business = t.type(
  {
    id: t.string,
    alias: t.string,
    name: t.string,
    image_url: t.string,
    is_closed: t.boolean,
    categories: t.array(Category),
    rating: t.number,
    location: Location,
    distance: t.number || undefined
  },
  'Business'
);
export interface Business extends t.TypeOf<typeof Business> {}

export const YelpSearchResponse = t.type({ businesses: t.array(Business) }, 'YelpSearchResponse');
export interface YelpSearchResponse extends t.TypeOf<typeof YelpSearchResponse> {}

export const Price = t.union(
  [t.literal('€'), t.literal('€€'), t.literal('€€€'), t.literal('€€€€')],
  'Price'
);
export type Price = t.TypeOf<typeof Price>;

export const Open = t.type(
  {
    is_overnight: t.boolean,
    start: t.string,
    end: t.string,
    day: t.number
  },
  'Open'
);
export interface Open extends t.TypeOf<typeof Open> {}

export const Hour = t.type(
  {
    open: t.array(Open),
    hours_type: t.string,
    is_open_now: t.boolean
  },
  'Hour'
);
export interface Hour extends t.TypeOf<typeof Hour> {}

export const Coordinates = t.type(
  {
    latitude: t.number,
    longitude: t.number
  },
  'Coordinates'
);
export interface Coordinates extends t.TypeOf<typeof Coordinates> {}

export const BusinessDetails = t.type(
  {
    ...Business.props,
    display_phone: t.string,
    review_count: t.number,
    photos: t.array(t.string),
    price: t.string,
    hours: t.array(Hour),
    coordinates: Coordinates
  },
  'BusinessDetails'
);
export interface BusinessDetails extends t.TypeOf<typeof BusinessDetails> {}
