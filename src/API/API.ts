import * as TE from 'fp-ts/lib/TaskEither';
import { identity } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { SearchParams } from 'src/model/searchParams';
import { YelpSearchResponse } from '../model/YelpSearchResponse';

// example
export const getRandomName = (length: number): TE.TaskEither<unknown, string> => {
  return TE.tryCatch(
    () =>
      fetch(`http://uinames.com/api/?minlen=${length}&maxlen=${length}`).then(res => res.json()),
    identity
  ).map(res => `${res.name} ${res.surname}`);
};

export const getRestaurants = (
  params: SearchParams
): TE.TaskEither<unknown, YelpSearchResponse> => {
  return pipe(
    `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${params.location}&radius=${params.range}`,
    url => TE.tryCatch(() => fetch(url), identity),
    TE.chain(res => TE.tryCatch(() => res.json(), identity)),
    TE.chain(json => TE.fromEither<unknown, YelpSearchResponse>(YelpSearchResponse.decode(json)))
  );
};

// const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${location}&radius=${range}`;
// const otherParaxms = {
//   method: 'GET',
//   headers: {
//     'content-type': 'application/json; charset=UTF-8',
//     Authorization:
//       'Bearer edf9Mob9S677EmT7ZS4L6xRNU38RvVlbrHGiJ36g16ITkUsZv79M4aZHPC79tf0CAYKJwxeygKfIU1bvedQ4_FbgIQYK-aCAFh4KvJtIOx7vcZZlnKAs_QeBoCsfXnYx'
//   }
// };
