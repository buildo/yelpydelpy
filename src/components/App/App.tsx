/*

This component is the entry point for our app.
It must be named exactly `App` and live in the `components/App` folder.
Typical tasks performed in this component are:
- general app layout
- choosing the correct component to render based on the current view

In this simple example it does a bit of both.

*/

import * as React from 'react';
import View from '../View';
import SearchBar from '../SearchBar/SearchBar';
import { declareQueries } from 'avenger/lib/react';
import { currentView } from '../../queries';
import { YelpSearchResponse, Business } from 'src/model/yelpResponse';

const queries = declareQueries({ currentView });

class App extends React.Component<typeof queries.Props> {
  onApiResponse = (res: YelpSearchResponse) => {
    res.businesses.map((business: Business) => {
      // TODO: actually do something with API response
      console.log(`${business.name}, ${Math.trunc(business.distance)}m`);
    });
    console.log(res);
  };

  render() {
    return (
      <View column height="100%" hAlignContent="center" vAlignContent="center" className="app">
        <h1>yelpydelpy</h1>
        <View width="50%">
          <SearchBar onSearchResponse={this.onApiResponse} />
        </View>
      </View>
    );
  }
}

export default queries(App);
