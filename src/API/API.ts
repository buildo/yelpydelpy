import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import { identity } from 'fp-ts/lib/function';
import { YelpSearchResponse } from 'src/model/yelpResponse';

export const getRandomName = (length: number): TaskEither<unknown, string> => {
  return tryCatch(
    () =>
      fetch(`http://uinames.com/api/?minlen=${length}&maxlen=${length}`).then(res => res.json()),
    identity
  ).map(res => `${res.name} ${res.surname}`);
};

export function searchRestaurants(location: string, range: number): Promise<YelpSearchResponse> {
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${location}&radius=${range}`;
  const otherParams = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization:
        'Bearer edf9Mob9S677EmT7ZS4L6xRNU38RvVlbrHGiJ36g16ITkUsZv79M4aZHPC79tf0CAYKJwxeygKfIU1bvedQ4_FbgIQYK-aCAFh4KvJtIOx7vcZZlnKAs_QeBoCsfXnYx'
    }
  };

  return new Promise<YelpSearchResponse>((resolve, reject) => {
    fetch(url, otherParams)
      .then((response: Response) => {
        // convert Promise<Response> to Promise<YelpSearchResponse>
        const res: YelpSearchResponse = (response.json as any) as YelpSearchResponse;
        resolve(res);
      })
      .catch(() => reject());
  });
}
