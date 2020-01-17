/*

In this file we can define all the avenger queries that are needed in our app.

*/

//import { queryStrict, available } from 'avenger';
import { getCurrentView } from 'avenger/lib/browser';
import * as API from '../API';
import { locationToView } from '../model';

import { YelpSearchResponse } from 'src/model/yelpResponse';

export const currentView = getCurrentView(locationToView);

export function queryRestaurants(location: string, radius: number): Promise<YelpSearchResponse> {
  return API.searchRestaurants(location, radius);
}
