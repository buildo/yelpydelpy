import * as t from 'io-ts';

import { Category, Location } from './YelpSearchResponse';

export const Open = t.type({
  is_overnight: t.boolean,
  start: t.string,
  end: t.string,
  day: t.number
});
export interface Open extends t.TypeOf<typeof Open> {}

export const Hour = t.type({
  open: t.array(Open),
  hours_type: t.string,
  is_open_now: t.boolean
});
export interface Hour extends t.TypeOf<typeof Hour> {}

export const BusinessDetails = t.type(
  {
    id: t.string,
    name: t.string,
    image_url: t.string,
    url: t.string,
    display_phone: t.string,
    review_count: t.number,
    categories: Category,
    rating: t.number,
    location: Location,
    photos: t.array(t.string),
    price: t.string,
    hours: t.array(Hour)
  },
  'BusinessDetails'
);
export interface BusinessDetails extends t.TypeOf<typeof BusinessDetails> {}
