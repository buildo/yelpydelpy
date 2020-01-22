import * as TE from 'fp-ts/lib/TaskEither';
import { identity } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { SearchParams } from 'src/model/searchParams';
import { YelpSearchResponse, BusinessDetails } from '../model/YelpResponse';

// NOTE: use corsproxy-https to avoid CORS issues

export const getRestaurants = (
  params: SearchParams
): TE.TaskEither<unknown, YelpSearchResponse> => {
  return pipe(
    `${protocol}://${proxy}/${yelpApi}/businesses/search?term=restaurants&location=${params.location}&radius=${params.range}`,
    url => TE.tryCatch(() => fetch(url, init), identity),
    TE.chain(res => TE.tryCatch(() => res.json(), identity)),
    TE.chain(json => TE.fromEither<unknown, YelpSearchResponse>(YelpSearchResponse.decode(json)))
  );
};

export const getRestaurantDetails = (id: string): TE.TaskEither<unknown, BusinessDetails> => {
  return pipe(
    `${protocol}://${proxy}/${yelpApi}/businesses/${id}`,
    url => TE.tryCatch(() => fetch(url, init), identity),
    TE.chain(res => TE.tryCatch(() => res.json(), identity)),
    TE.chain(json => TE.fromEither<unknown, BusinessDetails>(BusinessDetails.decode(json)))
  );
};

const init: RequestInit = {
  method: 'GET',
  headers: {
    Authorization:
      'Bearer edf9Mob9S677EmT7ZS4L6xRNU38RvVlbrHGiJ36g16ITkUsZv79M4aZHPC79tf0CAYKJwxeygKfIU1bvedQ4_FbgIQYK-aCAFh4KvJtIOx7vcZZlnKAs_QeBoCsfXnYx'
  }
};

const protocol = 'http';
const proxy = 'localhost:1337';
const yelpApi = 'api.yelp.com/v3';
