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
    distance: t.number
  },
  'Business'
);
export type Business = t.TypeOf<typeof Business>;

export const YelpSearchResponse = t.type({ businesses: t.array(Business) }, 'YelpSearchResponse');
export interface YelpSearchResponse extends t.TypeOf<typeof YelpSearchResponse> {}

export const Price = t.union(
  [t.literal('€'), t.literal('€€'), t.literal('€€€'), t.literal('€€€€')],
  'Price'
);
export type Price = t.TypeOf<typeof Price>;
