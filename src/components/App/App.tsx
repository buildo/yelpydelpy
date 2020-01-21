/*

This component is the entry point for our app.
It must be named exactly `App` and live in the `components/App` folder.
Typical tasks performed in this component are:
- general app layout
- choosing the correct component to render based on the current view

In this simple example it does a bit of both.

*/

import * as React from 'react';
import View from '../Basic/View';
import SearchBar from '../Shared/SearchBar/SearchBar';
import { declareQueries } from 'avenger/lib/react';
import { currentView } from '../../queries';
import { SearchParams } from 'src/model/searchParams';
import { CurrentView } from 'src/model';
import { doUpdateCurrentView } from '../../commands';

import './app.scss';

import ResultsList from '../Shared/ResultsList/ResultsList';

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
          <View
            column
            style={{ height: '100%', overflow: 'auto' }}
            hAlignContent="center"
            vAlignContent={currentView.view === 'search' ? 'top' : 'center'}
            className="app"
          >
            <View shrink={false}>
              <h1>yelpydelpy</h1>
            </View>

            <View shrink={false} style={{ marginBottom: '10px' }}>
              <SearchBar
                currentSearchParams={currentSearchParams(currentView)}
                onSearch={this.search}
              />
            </View>

            {currentView.view === 'search' && (
              <View column shrink={false} style={{ minWidth: '50%', minHeight: '50%' }}>
                <ResultsList
                  queries={{
                    restaurants: { range: currentView.range, location: currentView.location }
                  }}
                />
              </View>
            )}
          </View>
        );
      }
    );
  }
}

export default queries(App);
