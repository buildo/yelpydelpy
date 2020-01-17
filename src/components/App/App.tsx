/*

This component is the entry point for our app.
It must be named exactly `App` and live in the `components/App` folder.
Typical tasks performed in this component are:
- general app layout
- choosing the correct component to render based on the current view

In this simple example it does a bit of both.

*/

import * as React from 'react';
import View from '../Base/View';
import SearchBar from '../SearchBar/SearchBar';
import { declareQueries } from 'avenger/lib/react';
import { currentView } from '../../queries';
import { SearchParams } from 'src/model/searchParams';
import { CurrentView } from 'src/model';
import { doUpdateCurrentView } from '../../commands';

function currentSearchParams(currentView: CurrentView): SearchParams {
  switch (currentView.view) {
    case 'search':
      return { location: currentView.location, range: currentView.range };
    case 'home':
      return { location: '', range: 1000 };
  }
}

const queries = declareQueries({ currentView });

class App extends React.Component<typeof queries.Props> {
  // when the user makes a research, update the URL with query params
  search = (res: SearchParams) => {
    doUpdateCurrentView({ view: 'search', ...res }).run();
  };

  render() {
    return this.props.queries.fold(
      () => null,
      () => null,
      ({ currentView }) => {
        return (
          <View column height="100%" hAlignContent="center" vAlignContent="center" className="app">
            <h1>yelpydelpy</h1>
            <View shrink={false} style={{ minWidth: '50%' }}>
              <SearchBar
                onSearch={this.search}
                currentSearchParams={currentSearchParams(currentView)}
              />
            </View>
          </View>
        );
      }
    );
  }
}

export default queries(App);
