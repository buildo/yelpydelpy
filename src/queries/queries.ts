/*

In this file we can define all the avenger queries that are needed in our app.

*/

import { queryStrict, refetch, available } from 'avenger';
import { getCurrentView } from 'avenger/lib/browser';
import * as API from '../API';
import { locationToView } from '../model';
import { pipe } from 'fp-ts/lib/pipeable';
import { SearchParams } from 'src/model/searchParams';
import * as TE from 'fp-ts/lib/TaskEither';

export const currentView = getCurrentView(locationToView);

export const restaurants = queryStrict(
  (params: SearchParams) =>
    pipe(
      API.getRestaurants(params),
      TE.map(resp => resp.businesses)
    ),
  refetch
);

export const restaurantDetails = queryStrict(
  (id: string) => API.getRestaurantDetails(id),
  available
);
